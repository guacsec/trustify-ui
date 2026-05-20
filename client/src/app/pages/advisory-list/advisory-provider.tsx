import React from "react";

import {
  FILTER_TEXT_CATEGORY_KEY,
  TablePersistenceKeyPrefixes,
} from "@app/Constants";
import {
  joinKeyValueAsString,
  splitStringAsKeyValue,
} from "@app/api/model-utils";
import { FilterType } from "@app/components/FilterToolbar";
import {
  getHubRequestParams,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import {
  useFetchAdvisories,
  useFetchAdvisoryLabels,
} from "@app/queries/advisories";

import { AdvisorySearchContext } from "./advisory-context";

interface IAdvisoryProvider {
  children: React.ReactNode;
}

export const AdvisorySearchProvider: React.FunctionComponent<
  IAdvisoryProvider
> = ({ children }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");

  React.useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 400);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  const { labels } = useFetchAdvisoryLabels(debouncedInputValue);

  const tableControlState = useTableControlState({
    tableName: "advisory",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.advisories,
    persistTo: "urlParams",
    columnNames: {
      identifier: "ID",
      title: "Title",
      type: "Type",
      labels: "Labels",
      modified: "Revision",
      vulnerabilities: "Vulnerabilities",
    },
    isPaginationEnabled: true,
    isSortEnabled: true,
    sortableColumns: ["identifier", "modified"],
    initialSort: {
      columnKey: "modified",
      direction: "desc",
    },
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: FILTER_TEXT_CATEGORY_KEY,
        title: "Filter text",
        placeholderText: "Search",
        type: FilterType.search,
      },
      {
        categoryKey: "modified",
        title: "Revision",
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
        onInputValueChange: setInputValue,
      },
    ],
    isExpansionEnabled: false,
  });

  const {
    result: { data: advisories, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchAdvisories(
    {
      ...getHubRequestParams({
        ...tableControlState,
        hubSortFieldKeys: {
          identifier: "document_id",
          modified: "modified",
        },
      }),
      total: true,
    },
    (tableControlState.filterState.filterValues.labels ?? []).map((label) =>
      splitStringAsKeyValue(label),
    ),
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "identifier",
    currentPageItems: advisories,
    totalItemCount,
    isLoading: isFetching,
  });

  return (
    <AdvisorySearchContext.Provider
      value={{ totalItemCount, isFetching, fetchError, tableControls }}
    >
      {children}
    </AdvisorySearchContext.Provider>
  );
};
