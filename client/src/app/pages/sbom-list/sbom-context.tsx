import React from "react";

import type { AxiosError } from "axios";
import { useDebounceValue } from "usehooks-ts";

import {
  FILTER_TEXT_CATEGORY_KEY,
  TablePersistenceKeyPrefixes,
} from "@app/Constants";
import {
  joinKeyValueAsString,
  splitStringAsKeyValue,
} from "@app/api/model-utils";
import type {
  SbomHead,
  SbomPackage,
  SbomSummary,
  SourceDocument,
} from "@app/client";
import { FilterType } from "@app/components/FilterToolbar";
import {
  type BulkSelectionValues,
  useBulkSelection,
} from "@app/hooks/selection";
import {
  type ITableControls,
  getHubRequestParams,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useFetchLicenses } from "@app/queries/licenses";
import { useFetchSBOMLabels, useFetchSBOMs } from "@app/queries/sboms";

interface ISbomSearchContext {
  tableControls: ITableControls<
    SbomSummary,
    | "name"
    | "version"
    | "packages"
    | "published"
    | "supplier"
    | "labels"
    | "vulnerabilities",
    "name" | "published",
    "" | "published" | "labels" | "license",
    string
  >;

  bulkSelection: {
    isEnabled: boolean;
    controls: BulkSelectionValues<
      SbomHead &
        SourceDocument & {
          described_by: Array<SbomPackage>;
        }
    >;
  };

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

const contextDefaultValue = {} as ISbomSearchContext;

export const SbomSearchContext =
  React.createContext<ISbomSearchContext>(contextDefaultValue);

interface ISbomProvider {
  isBulkSelectionEnabled?: boolean;
  children: React.ReactNode;
}

export const SbomSearchProvider: React.FunctionComponent<ISbomProvider> = ({
  isBulkSelectionEnabled,
  children,
}) => {
  const [inputValueLabel, setInputValueLabel] = React.useState("");
  const [debouncedInputValueLabel] = useDebounceValue(inputValueLabel, 400);
  const { labels } = useFetchSBOMLabels(debouncedInputValueLabel);

  const [inputValueLicense, setInputValueLicense] = React.useState("");
  const [debouncedInputValueLicense] = useDebounceValue(inputValueLicense, 400);
  const {
    result: { data: licenses },
  } = useFetchLicenses({
    filters: [
      {
        field: FILTER_TEXT_CATEGORY_KEY,
        operator: "~",
        value: debouncedInputValueLicense,
      },
    ],
    sort: { field: "license", direction: "asc" },
    page: { pageNumber: 1, itemsPerPage: 10 },
  });

  const tableControlState = useTableControlState({
    tableName: "sbom",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.sboms,
    persistTo: "urlParams",
    columnNames: {
      name: "Name",
      version: "Version",
      supplier: "Supplier",
      labels: "Labels",
      published: "Created on",
      packages: "Dependencies",
      vulnerabilities: "Vulnerabilities",
    },
    isPaginationEnabled: true,
    isSortEnabled: true,
    sortableColumns: ["name", "published"],
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: FILTER_TEXT_CATEGORY_KEY,
        title: "Filter text",
        placeholderText: "Search",
        type: FilterType.search,
      },
      {
        categoryKey: "published",
        title: "Created on",
        type: FilterType.dateRange,
      },
      {
        categoryKey: "labels",
        title: "Label",
        type: FilterType.autocompleteLabel,
        placeholderText: "Filter results by label",
        selectOptions: labels.map((e) => {
          const keyValue = joinKeyValueAsString({ key: e.key, value: e.value });
          return {
            value: keyValue,
            label: keyValue,
          };
        }),
        onInputValueChange: setInputValueLabel,
      },
      {
        categoryKey: "license",
        title: "License",
        type: FilterType.asyncMultiselect,
        placeholderText: "Filter results by license",
        selectOptions: licenses.map((e) => {
          return {
            value: e.license,
            label: e.license,
          };
        }),
        onInputValueChange: setInputValueLicense,
      },
    ],
    isExpansionEnabled: false,
    isSelectionEnabled: isBulkSelectionEnabled,
  });

  const {
    result: { data: advisories, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchSBOMs(
    getHubRequestParams({
      ...tableControlState,
      hubSortFieldKeys: {
        name: "name",
        published: "published",
      },
    }),
    (tableControlState.filterState.filterValues.labels ?? []).map((label) =>
      splitStringAsKeyValue(label),
    ),
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "id",
    currentPageItems: advisories,
    totalItemCount,
    isLoading: isFetching,
  });

  const bulkSelectionControls = useBulkSelection({
    isEqual: (a, b) => a.id === b.id,
    filteredItems: tableControls.filteredItems,
    currentPageItems: tableControls.currentPageItems,
  });

  return (
    <SbomSearchContext.Provider
      value={{
        totalItemCount,
        isFetching,
        fetchError,
        tableControls,
        bulkSelection: {
          isEnabled: !!isBulkSelectionEnabled,
          controls: bulkSelectionControls,
        },
      }}
    >
      {children}
    </SbomSearchContext.Provider>
  );
};
