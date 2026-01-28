import React from "react";
import type { AxiosError } from "axios";
import { FILTER_TEXT_CATEGORY_KEY } from "@app/Constants";
import { FilterType } from "@app/components/FilterToolbar";
import {
  type BulkSelectionValues,
  useBulkSelection,
} from "@app/hooks/selection";
import {
  getHubRequestParams,
  type ITableControls,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { TablePersistenceKeyPrefixes } from "@app/Constants";
import { usePersistentState } from "@app/hooks/usePersistentState";
import type { TGroupDD } from "@app/queries/groups";
import { useFetchGroups } from "@app/queries/groups";
import { buildGroupTree } from "./utils";

export type TGroupTreeNode = TGroupDD & {
  children: TGroupTreeNode[];
};

interface ITreeExpansionState {
  expandedNodeNames: string[];
  setExpandedNodeNames: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ITreeSelectionState {
  selectedNodeNames: string[];
  setSelectedNodeNames: React.Dispatch<React.SetStateAction<string[]>>;
}

interface IGroupsContext {
  // TODO: Update once SBOM Group types are finalized...
  tableControls: ITableControls<
    // TODO: UPDATE - Item Type
    TGroupTreeNode,
    // Column keys
    "name",
    // Sortable column keys
    "name",
    // Filter categories
    "",
    // Persistence key prefix...?
    string
  >;

  bulkSelection: {
    isEnabled: boolean;
    // TODO: Update once SBOM Group types are finalized...
    controls: BulkSelectionValues<TGroupTreeNode>;
  };

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
  isBulkSelectionEnabled?: boolean;
  children: React.ReactNode;
}

export const GroupsProvider: React.FunctionComponent<IGroupsProvider> = ({
  isBulkSelectionEnabled,
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
    isSelectionEnabled: isBulkSelectionEnabled,
    isExpansionEnabled: true,
    expandableVariant: "single",
  });

  // State functionality
  const [expandedNodeNames, setExpandedNodeNamesInternal] = usePersistentState<
    string[],
    typeof TablePersistenceKeyPrefixes.groups,
    "expandedNodeNames"
  >({
    isEnabled: true,
    defaultValue: [],
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.groups,
    persistTo: "urlParams",
    keys: ["expandedNodeNames"],
    serialize: (names) => ({
      expandedNodeNames: names.length > 0 ? names.join(",") : null,
    }),
    deserialize: ({ expandedNodeNames }) =>
      expandedNodeNames ? expandedNodeNames.split(",") : [],
  });

  // Wrap setters to support functional updates
  const setExpandedNodeNames: React.Dispatch<React.SetStateAction<string[]>> =
    React.useCallback(
      (value) => {
        if (typeof value === "function") {
          setExpandedNodeNamesInternal(value(expandedNodeNames));
        } else {
          setExpandedNodeNamesInternal(value);
        }
      },
      [expandedNodeNames, setExpandedNodeNamesInternal],
    );

  // Tree selection state
  const [selectedNodeNames, setSelectedNodeNames] = React.useState<string[]>(
    [],
  );

  const {
    result: { data: groups, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchGroups(
    getHubRequestParams({
      ...tableControlState,
      hubSortFieldKeys: {
        name: "name",
      },
    }),
  );

  const roots = React.useMemo(() => {
    return buildGroupTree(groups);
  }, [groups]);

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "id",
    currentPageItems: roots,
    totalItemCount,
    isLoading: isFetching,
    hasActionsColumn: true,
  });

  // Flatten the tree to get all nodes for bulk selection
  const flattenedNodes = React.useMemo(() => {
    const allNodes: TGroupTreeNode[] = [];
    const flatten = (nodes: TGroupTreeNode[]) => {
      for (const node of nodes) {
        allNodes.push(node);
        flatten(node.children);
      }
    };
    flatten(roots);
    return allNodes;
  }, [roots]);

  const bulkSelectionControls = useBulkSelection({
    isEqual: (a, b) => a.id === b.id,
    filteredItems: flattenedNodes,
    currentPageItems: flattenedNodes,
  });

  return (
    <GroupsContext.Provider
      value={{
        tableControls,
        isFetching,
        fetchError,
        totalItemCount,
        bulkSelection: {
          isEnabled: !!isBulkSelectionEnabled,
          controls: bulkSelectionControls,
        },
        treeExpansion: {
          expandedNodeNames,
          setExpandedNodeNames,
        },
        treeSelection: {
          selectedNodeNames,
          setSelectedNodeNames,
        },
        treeData: roots,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
