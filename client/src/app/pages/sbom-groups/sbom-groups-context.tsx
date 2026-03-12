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

import type { PaginatedResultsGroupDetails } from "@app/client";
import { useFetchSBOMGroups } from "@app/queries/sbom-groups";
import { findRootGroups } from "./utils";

export type SbomGroupItem = PaginatedResultsGroupDetails["items"][number];

interface ITreeExpansionState {
  isNodeExpanded: (node: SbomGroupItem) => boolean;
  toggleExpandedNodes: (nodes: SbomGroupItem[], isExpanded: boolean) => void;
}

interface ISbomGroupsContext {
  tableControls: ITableControls<SbomGroupItem, "name", "name", "", string>;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;

  treeExpansion: ITreeExpansionState;
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

  // Track expanded node IDs in React state (transient UI state)
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

  const isNodeExpanded = React.useCallback(
    (node: SbomGroupItem) => expandedIds.has(node.id),
    [expandedIds],
  );

  const toggleExpandedNodes = React.useCallback(
    (nodes: SbomGroupItem[], isExpanded: boolean) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        for (const node of nodes) {
          if (isExpanded) {
            next.add(node.id);
          } else {
            next.delete(node.id);
          }
        }
        return next;
      });
    },
    [],
  );

  // When a search filter is active, pass null to search across ALL groups
  // (regardless of hierarchy). When no search is active, pass FILTER_NULL_VALUE
  // to show only root-level groups.
  const searchTerm =
    tableControlState.filterState.filterValues[FILTER_TEXT_CATEGORY_KEY]?.[0] ??
    "";
  const isSearchActive = searchTerm.trim().length > 0;
  const parentFilter = isSearchActive ? null : FILTER_NULL_VALUE;

  const {
    result: { data: fetchedGroups, total: totalItemCount },
    references,
    isFetching,
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
  // biome-ignore lint/correctness/useExhaustiveDependencies: `references` excluded to avoid re-running when the same fetch updates both `fetchedGroups` and `references` simultaneously
  React.useEffect(() => {
    if (isSearchActive && fetchedGroups.length > 0) {
      const ancestorIds = new Set<string>();
      for (const group of fetchedGroups) {
        let parentId = group.parent;
        while (parentId) {
          ancestorIds.add(parentId);
          const parentGroup = references.get(parentId);
          parentId = parentGroup?.parent;
        }
      }
      setExpandedIds(ancestorIds);
    } else {
      setExpandedIds(new Set());
    }
  }, [searchTerm, fetchedGroups]);

  // In search mode, find root ancestors from references; otherwise use fetchedGroups directly
  const currentPageItems = React.useMemo(() => {
    if (!isSearchActive) {
      return fetchedGroups;
    }
    const allReferenced = Array.from(references.values()) as SbomGroupItem[];
    return findRootGroups(allReferenced);
  }, [isSearchActive, fetchedGroups, references]);

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "id",
    currentPageItems,
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
          isNodeExpanded,
          toggleExpandedNodes,
        },
      }}
    >
      {children}
    </SbomGroupsContext.Provider>
  );
};
