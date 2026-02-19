import React from "react";
import type { AxiosError } from "axios";
import { FILTER_TEXT_CATEGORY_KEY } from "@app/Constants";
import { FilterType } from "@app/components/FilterToolbar";
import {
  getHubRequestParams,
  type ITableControls,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useSelectionState } from "@app/hooks/useSelectionState";
import { TablePersistenceKeyPrefixes } from "@app/Constants";
import { usePersistentState } from "@app/hooks/usePersistentState";
import type { TGroupDD } from "@app/queries/groups";
import { useFetchGroupChildren, useFetchGroups } from "@app/queries/groups";
import { buildGroupTree } from "./utils";
export type TGroupTreeNode = TGroupDD & {
  children: TGroupTreeNode[];
};

interface ITreeExpansionState {
  expandedNodeIds: string[];
  setExpandedNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ITreeSelectionState {
  selectedNodes: TGroupDD[];
  isNodeSelected(node: TGroupTreeNode): boolean;
  areAllSelected: boolean;
  selectNodes: (nodes: TGroupTreeNode[], isSelected: boolean) => void;
  selectOnlyNodes: (nodes: TGroupTreeNode[]) => void;
  selectAllNodes: (isSelected: boolean) => void;
}

interface IGroupsContext {
  tableControls: ITableControls<
    TGroupTreeNode,
    // Column keys
    "name",
    // Sortable column keys
    "name",
    // Filter categories
    "",
    // Persistence key prefix
    string
  >;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;

  // Tree fields
  treeExpansion: ITreeExpansionState;
  treeSelection: ITreeSelectionState;
  treeData: TGroupTreeNode[];
}

const contextDefaultValue = {} as IGroupsContext;

export const GroupsContext =
  React.createContext<IGroupsContext>(contextDefaultValue);

interface IGroupsProvider {
  children: React.ReactNode;
}

export const GroupsProvider: React.FunctionComponent<IGroupsProvider> = ({
  children,
}) => {
  const tableControlState = useTableControlState({
    tableName: "groups",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.groups,
    persistTo: "urlParams",
    columnNames: {
      name: "name",
    },
    isPaginationEnabled: true,
    isSortEnabled: true,
    sortableColumns: ["name"],
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: FILTER_TEXT_CATEGORY_KEY,
        title: "Filter",
        placeholderText: "Search",
        type: FilterType.search,
      },
    ],
    isExpansionEnabled: true,
    expandableVariant: "single",
  });

  // Expansion state persisted to URL params (stores group IDs)
  const [expandedNodeIds, setExpandedNodeIdsInternal] = usePersistentState<
    string[],
    typeof TablePersistenceKeyPrefixes.groups,
    "expandedNodes"
  >({
    isEnabled: true,
    defaultValue: [],
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.groups,
    persistTo: "urlParams",
    keys: ["expandedNodes"],
    serialize: (ids) => ({
      expandedNodes: ids.length > 0 ? ids.join(",") : null,
    }),
    deserialize: ({ expandedNodes }) =>
      expandedNodes ? expandedNodes.split(",") : [],
  });

  // Wrap setter to support functional updates
  const setExpandedNodeIds: React.Dispatch<React.SetStateAction<string[]>> =
    React.useCallback(
      (value) => {
        if (typeof value === "function") {
          setExpandedNodeIdsInternal(value(expandedNodeIds));
        } else {
          setExpandedNodeIdsInternal(value);
        }
      },
      [expandedNodeIds, setExpandedNodeIdsInternal],
    );

  // Fetch paginated root groups (parent IS NULL)
  const {
    result: { data: rootGroups, total: totalItemCount },
    isFetching: isRootsFetching,
    fetchError,
  } = useFetchGroups(
    getHubRequestParams({
      ...tableControlState,
      hubSortFieldKeys: {
        name: "name",
      },
    }),
  );

  // Fetch children for all expanded groups
  const { data: childGroups, isFetching: isChildrenFetching } =
    useFetchGroupChildren(expandedNodeIds);

  // Merge root groups + children into a flat list, then build tree
  const allGroups = React.useMemo(
    () => [...rootGroups, ...childGroups],
    [rootGroups, childGroups],
  );

  const roots = React.useMemo(() => {
    return buildGroupTree(allGroups);
  }, [allGroups]);

  const isFetching = isRootsFetching || isChildrenFetching;

  const {
    selectedItems: selectedNodes,
    isItemSelected: isNodeSelected,
    areAllSelected,
    selectItems: selectNodes,
    selectOnly: selectOnlyNodes,
    selectAll: selectAllNodes,
  } = useSelectionState({
    items: allGroups,
    isEqual: (a, b) => a.id === b.id,
  });

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "id",
    currentPageItems: roots,
    totalItemCount,
    isLoading: isFetching,
    hasActionsColumn: true,
  });

  return (
    <GroupsContext.Provider
      value={{
        tableControls,
        isFetching,
        fetchError,
        totalItemCount,
        treeExpansion: {
          expandedNodeIds,
          setExpandedNodeIds,
        },
        treeSelection: {
          selectedNodes,
          isNodeSelected,
          areAllSelected,
          selectNodes,
          selectOnlyNodes,
          selectAllNodes,
        },
        treeData: roots,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
