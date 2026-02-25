import React from "react";
import type { AxiosError } from "axios";
import {
  FILTER_TEXT_CATEGORY_KEY,
  TablePersistenceKeyPrefixes,
} from "@app/Constants";
import { FilterType } from "@app/components/FilterToolbar";
import {
  getHubRequestParams,
  type ITableControls,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useSelectionState } from "@app/hooks/useSelectionState";

import type { PaginatedResultsGroupDetails } from "@app/client";
import {
  useFetchSbomGroupChildren,
  useFetchSbomGroups,
} from "@app/queries/sbom-groups";
import { buildSbomGroupTree } from "./utils";

export type SbomGroupItem = PaginatedResultsGroupDetails["items"][number];

export type SbomGroupTreeNode = SbomGroupItem & {
  children: SbomGroupTreeNode[];
};

interface ITreeExpansionState {
  expandedNodeIds: string[];
  setExpandedNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ITreeSelectionState {
  selectedNodes: SbomGroupItem[];
  isNodeSelected(node: SbomGroupTreeNode): boolean;
  areAllSelected: boolean;
  selectNodes: (nodes: SbomGroupTreeNode[], isSelected: boolean) => void;
  selectOnlyNodes: (nodes: SbomGroupTreeNode[]) => void;
  selectAllNodes: (isSelected: boolean) => void;
}

interface ISbomGroupsContext {
  tableControls: ITableControls<
    SbomGroupTreeNode,
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
  treeData: SbomGroupTreeNode[];
}

const contextDefaultValue = {} as ISbomGroupsContext;

export const SbomGroupsContext =
  React.createContext<ISbomGroupsContext>(contextDefaultValue);

interface ISbomGroupsProvider {
  children: React.ReactNode;
}

export const SbomGroupsProvider: React.FunctionComponent<
  ISbomGroupsProvider
> = ({ children }) => {
  const tableControlState = useTableControlState({
    tableName: "sbom-groups",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.sbomGroups,
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

  // Expansion state stored in React state (transient UI state, not URL-worthy)
  const [expandedNodeIds, setExpandedNodeIds] = React.useState<string[]>([]);

  // Fetch paginated root groups (parent IS NULL)
  const {
    result: { data: rootGroups, total: totalItemCount },
    isFetching: isRootsFetching,
    fetchError,
  } = useFetchSbomGroups(
    getHubRequestParams({
      ...tableControlState,
      hubSortFieldKeys: {
        name: "name",
      },
    }),
  );

  // Fetch children for all expanded groups
  const { data: childGroups } = useFetchSbomGroupChildren(expandedNodeIds);

  // Merge root groups + children into a flat list, then build tree
  const allGroups = React.useMemo(
    () => [...rootGroups, ...childGroups],
    [rootGroups, childGroups],
  );

  const roots = React.useMemo(() => {
    return buildSbomGroupTree(allGroups);
  }, [allGroups]);

  // Only use root-fetching for the table loading state.
  const isFetching = isRootsFetching;

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
    <SbomGroupsContext.Provider
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
    </SbomGroupsContext.Provider>
  );
};
