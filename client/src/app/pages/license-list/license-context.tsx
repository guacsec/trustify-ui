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
import { useFetchLicenses } from "@app/queries/licenses";
import type { LicenseText } from "@app/client";

interface ILicenseSearchContext {
  tableControls: ITableControls<
    LicenseText,
    "name" | "packages" | "sboms",
    "name",
    "" | "packages" | "sboms",
    string
  >;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

const contextDefaultValue = {} as ILicenseSearchContext;

export const LicenseSearchContext =
  React.createContext<ILicenseSearchContext>(contextDefaultValue);

interface ILicenseProvider {
  children: React.ReactNode;
}

export const LicenseSearchProvider: React.FunctionComponent<
  ILicenseProvider
> = ({ children }) => {
  const tableControlState = useTableControlState<
    LicenseText,
    "name" | "packages" | "sboms",
    "name",
    "" | "packages" | "sboms",
    string
  >({
    tableName: "license",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.licenses,
    persistTo: "urlParams",
    columnNames: {
      name: "Name",
      packages: "Packages",
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
        title: "Name",
        placeholderText: "Search by license name",
        type: FilterType.search,
      },
    ],
    isExpansionEnabled: false,
  });

  const {
    result: { data: licenses, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchLicenses(
    getHubRequestParams({
      ...tableControlState,
      hubSortFieldKeys: {
        name: "license",
      },
    }),
    false,
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "license",
    currentPageItems: licenses,
    totalItemCount,
    isLoading: isFetching,
  });
  return (
    <LicenseSearchContext.Provider
      value={{ totalItemCount, isFetching, fetchError, tableControls }}
    >
      {children}
    </LicenseSearchContext.Provider>
  );
};
