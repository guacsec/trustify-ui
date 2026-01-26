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

export type TGroupTreeNode = TGroupDD & {
  children: TGroupTreeNode[];
};

interface ITreeExpansionState {
  expandedNodeNames: string[];
  setExpandedNodeNames: React.Dispatch<React.SetStateAction<string[]>>;
  expandedDetailsNodeNames: string[];
  setExpandedDetailsNodeNames: React.Dispatch<React.SetStateAction<string[]>>;
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
  treeData: {
    roots: TGroupTreeNode[];
    byId: Map<string, TGroupTreeNode>;
  };
}

const contextDefaultValue = {} as IGroupsContext;

export const GroupsContext =
  React.createContext<IGroupsContext>(contextDefaultValue);

interface IGroupsProvider {
  isBulkSelectionEnabled?: boolean;
  children: React.ReactNode;
}

/**
 * Generates a simple tree structure for groups
 */
export function buildGroupTree(items: TGroupDD[]) {
  const byId = new Map<string, TGroupTreeNode>();
  const roots: TGroupTreeNode[] = [];

  // initialize nodes
  for (const item of items) {
    byId.set(item.id, { ...item, children: [] });
  }

  // wire up parent/child relationships
  for (const node of byId.values()) {
    if (!node.parent) {
      roots.push(node);
      continue;
    }

    const parent = byId.get(node.parent);
    if (parent) {
      parent.children.push(node);
    } else {
      // orphan: parent id not found -> treat as root.
      roots.push(node);
    }
  }

  return { roots, byId };
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

  const [expandedDetailsNodeNames, setExpandedDetailsNodeNamesInternal] =
    usePersistentState<
      string[],
      typeof TablePersistenceKeyPrefixes.groups,
      "expandedDetailsNodeNames"
    >({
      isEnabled: true,
      defaultValue: [],
      persistenceKeyPrefix: TablePersistenceKeyPrefixes.groups,
      persistTo: "sessionStorage",
      key: "expandedDetailsNodeNames",
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

  const setExpandedDetailsNodeNames: React.Dispatch<
    React.SetStateAction<string[]>
  > = React.useCallback(
    (value) => {
      if (typeof value === "function") {
        setExpandedDetailsNodeNamesInternal(value(expandedDetailsNodeNames));
      } else {
        setExpandedDetailsNodeNamesInternal(value);
      }
    },
    [expandedDetailsNodeNames, setExpandedDetailsNodeNamesInternal],
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

  const { roots, byId } = React.useMemo(() => {
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
          expandedDetailsNodeNames,
          setExpandedDetailsNodeNames,
        },
        treeSelection: {
          selectedNodeNames,
          setSelectedNodeNames,
        },
        treeData: { roots, byId },
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
