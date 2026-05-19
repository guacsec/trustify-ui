import React from "react";

import {
  FILTER_TEXT_CATEGORY_KEY,
  TablePersistenceKeyPrefixes,
} from "@app/Constants";
import { FilterType } from "@app/components/FilterToolbar";
import {
  getHubRequestParams,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useFetchAllModels } from "@app/queries/models";

import { ModelSearchContext } from "./model-context";

interface IModelProvider {
  children: React.ReactNode;
}

export const ModelSearchProvider: React.FunctionComponent<IModelProvider> = ({
  children,
}) => {
  const tableControlState = useTableControlState({
    tableName: "model",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.models,
    persistTo: "urlParams",
    columnNames: {
      name: "Name",
      suppliedBy: "Supplied by",
      licenses: "License",
      sboms: "SBOMs",
    },
    isPaginationEnabled: true,
    isSortEnabled: true,
    sortableColumns: ["name"],
    initialSort: {
      columnKey: "name",
      direction: "asc",
    },
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: FILTER_TEXT_CATEGORY_KEY,
        title: "Filter",
        placeholderText: "Search",
        type: FilterType.search,
      },
    ],
    isExpansionEnabled: false,
  });

  const {
    result: { data: models, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchAllModels(
    {
      ...getHubRequestParams({
        ...tableControlState,
        hubSortFieldKeys: {
          name: "name",
        },
      }),
      total: true,
    },
    false,
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "id",
    currentPageItems: models,
    totalItemCount,
    isLoading: isFetching,
  });
  return (
    <ModelSearchContext.Provider
      value={{ totalItemCount, isFetching, fetchError, tableControls }}
    >
      {children}
    </ModelSearchContext.Provider>
  );
};
