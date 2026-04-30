import React from "react";
import type { AxiosError } from "axios";

import {
  FILTER_TEXT_CATEGORY_KEY,
  TablePersistenceKeyPrefixes,
} from "@app/Constants";
import { FilterType } from "@app/components/FilterToolbar";
import {
  type ITableControls,
  getHubRequestParams,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useFetchAllModels } from "@app/queries/models";
import type { SbomModel } from "@app/client";

interface IModelSearchContext {
  tableControls: ITableControls<
    SbomModel,
    "name" | "suppliedBy" | "licenses",
    "name",
    "",
    string
  >;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

const contextDefaultValue = {} as IModelSearchContext;

export const ModelSearchContext =
  React.createContext<IModelSearchContext>(contextDefaultValue);

interface IModelProvider {
  children: React.ReactNode;
}

export const ModelSearchProvider: React.FunctionComponent<IModelProvider> = ({
  children,
}) => {
  const tableControlState = useTableControlState<
    SbomModel,
    "name" | "suppliedBy" | "licenses",
    "name",
    "",
    string
  >({
    tableName: "model",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.models,
    persistTo: "urlParams",
    columnNames: {
      name: "Name",
      suppliedBy: "Supplied by",
      licenses: "License",
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
    getHubRequestParams({
      ...tableControlState,
      hubSortFieldKeys: {
        name: "name",
      },
    }),
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
