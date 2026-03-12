import React from "react";
import type { AxiosError } from "axios";
import {
  FILTER_NULL_VALUE,
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
  useFetchSBOMGroups,
} from "@app/queries/sbom-groups";
import { buildSbomGroupTree } from "./utils";

export type SbomGroupItem = PaginatedResultsGroupDetails["items"][number];

export type SbomGroupTreeNode = SbomGroupItem & {
  children: SbomGroupTreeNode[];
};

interface ITreeExpansionState {
  expandedNodeIds: string[];
  setExpandedNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
  childrenNodeStatus: Map<
    string,
    { isFetching: boolean; fetchError: AxiosError | null }
  >;
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

  // When a search filter is active, pass null to search across ALL groups
  // (regardless of hierarchy). When no search is active, pass FILTER_NULL_VALUE
  // to show only root-level groups.
  const searchTerm =
    tableControlState.filterState.filterValues[FILTER_TEXT_CATEGORY_KEY]?.[0] ??
    "";
  const isSearchActive = searchTerm.trim().length > 0;
  const parentFilter = isSearchActive ? null : FILTER_NULL_VALUE;

  const {
    result: { data: rootGroups, total: totalItemCount },
    references,
    isFetching: isRootsFetching,
    fetchError,
  } = useFetchSBOMGroups(
    parentFilter,
    {
      ...getHubRequestParams({
        ...tableControlState,
        hubSortFieldKeys: {
          name: "name",
        },
      }),
    },
    {
      totals: true,
      parents: isSearchActive ? "resolve" : undefined,
    },
  );

  // When searching, auto-expand ancestor nodes so matched items are visible.
  // When not searching (or search changes), reset expanded nodes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: react to searchTerm and rootGroups changes
  React.useEffect(() => {
    if (isSearchActive && rootGroups.length > 0) {
      const ancestorIds = new Set<string>();
      for (const group of rootGroups) {
        let parentId = group.parent;
        while (parentId) {
          ancestorIds.add(parentId);
          const parentGroup = references.get(parentId);
          parentId = parentGroup?.parent;
        }
      }
      setExpandedNodeIds(Array.from(ancestorIds));
    } else {
      setExpandedNodeIds([]);
    }
  }, [searchTerm, rootGroups]);

  // Fetch children for all expanded groups
  const { data: childGroups, nodeStatus: childrenNodeStatus } =
    useFetchSbomGroupChildren(expandedNodeIds);

  // Merge references (ancestor groups from search), root groups, and children
  const allGroups = React.useMemo(() => {
    if (!isSearchActive) {
      return [...rootGroups, ...childGroups];
    }
    const merged = new Map<string, SbomGroupItem>();
    for (const [id, group] of references) {
      merged.set(id, group as SbomGroupItem);
    }
    for (const group of childGroups) {
      merged.set(group.id, group);
    }
    return Array.from(merged.values());
  }, [isSearchActive, rootGroups, childGroups, references]);

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
          childrenNodeStatus,
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
