import React, { useMemo } from "react";

import type { AxiosError } from "axios";

import {
  FILTER_NULL_VALUE,
  FILTER_TEXT_CATEGORY_KEY,
  TablePersistenceKeyPrefixes,
} from "@app/Constants";
import type { Group, PaginatedResultsGroupDetails } from "@app/client";
import { FilterType } from "@app/components/FilterToolbar";
import {
  getHubRequestParams,
  type ITableControls,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useFetchSBOMGroups } from "@app/queries/sbom-groups";

import { findRootGroups } from "./utils";

export type SbomGroupItem = PaginatedResultsGroupDetails["items"][number];

interface ITreeExpansionState {
  isNodeExpanded: (node: SbomGroupItem) => boolean;
  toggleExpandedNodes: (node: SbomGroupItem) => void;
}

interface ISbomGroupsContext {
  tableControls: ITableControls<SbomGroupItem, "name", "name", "", string>;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;

  treeExpansion: ITreeExpansionState;

  // Group Form Modal
  groupCreateUpdateModalState: "create" | Group | null;
  setGroupCreateUpdateModalState: (value: "create" | Group | null) => void;
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

  // Track manually expanded node IDs (browse mode only)
  const [expandedNodeIds, setExpandedNodeIds] = React.useState<Set<string>>(
    new Set(),
  );

  const toggleExpandedNodes = React.useCallback((node: SbomGroupItem) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);

      if (next.has(node.id)) {
        next.delete(node.id);
      } else {
        next.add(node.id);
      }

      return next;
    });
  }, []);

  // When a search filter is active, pass null to search across ALL groups
  // (regardless of hierarchy). When no search is active, pass FILTER_NULL_VALUE
  // to show only root-level groups.
  const isSearchActive = useMemo(() => {
    const searchTerm =
      tableControlState.filterState.filterValues[
        FILTER_TEXT_CATEGORY_KEY
      ]?.[0] ?? "";
    return searchTerm.trim().length > 0;
  }, [tableControlState.filterState]);
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

  // Reset manual expansion when transitioning between search and browse modes so both start with a clean slate (no stale expansions)
  const prevIsSearchActive = React.useRef(isSearchActive);
  if (isSearchActive !== prevIsSearchActive.current) {
    setExpandedNodeIds(new Set());
  }
  prevIsSearchActive.current = isSearchActive;

  ///

  const activeExpandedIds = React.useMemo<Set<string>>(() => {
    if (!isSearchActive) return expandedNodeIds;
    if (fetchedGroups.length === 0) return new Set<string>();

    // Auto-expand all ancestor nodes of search results
    const ancestorIds = new Set<string>();
    for (const group of fetchedGroups) {
      let parentId = group.parent;
      while (parentId) {
        ancestorIds.add(parentId);
        const parentGroup = references.get(parentId);
        parentId = parentGroup?.parent;
      }
    }

    // Apply user toggles: symmetric difference with expandedNodeIds
    for (const id of expandedNodeIds) {
      if (ancestorIds.has(id)) {
        ancestorIds.delete(id);
      } else {
        ancestorIds.add(id);
      }
    }
    return ancestorIds;
  }, [isSearchActive, expandedNodeIds, fetchedGroups, references]);

  const isNodeExpanded = React.useCallback(
    (node: SbomGroupItem) => activeExpandedIds.has(node.id),
    [activeExpandedIds],
  );

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

  // Create/Edit states
  const [groupCreateUpdateModalState, setGroupCreateUpdateModalState] =
    React.useState<"create" | Group | null>(null);

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
        groupCreateUpdateModalState,
        setGroupCreateUpdateModalState,
      }}
    >
      {children}
    </SbomGroupsContext.Provider>
  );
};
