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
import { type TGroupTreeNode, useFetchGroups } from "@app/queries/groups";

/**
 * Recursively flatten all nodes in a tree structure.
 * Unlike the table's flattenVisibleRows, this flattens ALL nodes regardless of expansion state.
 * This allows us to set bulk selection controls on ALL nodes, regardless of expansion state.
 */
const flattenAllNodes = (nodes: TGroupTreeNode[]): TGroupTreeNode[] => {
  const result: TGroupTreeNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children.length > 0) {
      result.push(...flattenAllNodes(node.children));
    }
  }
  return result;
};

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
    "" | "name",
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

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "id",
    currentPageItems: groups,
    totalItemCount,
    isLoading: isFetching,
    hasActionsColumn: true,
  });

  const allFlattenedItems = React.useMemo(
    () => flattenAllNodes(tableControls.currentPageItems),
    [tableControls.currentPageItems],
  );

  // All tree nodes should have bulk selection enabled
  const bulkSelectionControls = useBulkSelection({
    isEqual: (a, b) => a.id === b.id,
    filteredItems: allFlattenedItems,
    currentPageItems: allFlattenedItems,
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
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
