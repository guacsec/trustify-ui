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
import { useFetchCryptoAlgorithms } from "@app/queries/crypto";

import { CryptoSearchContext } from "./crypto-context";

interface ICryptoProvider {
  children: React.ReactNode;
  assetType?: string;
}

/** Context provider that manages table state and data fetching for the cryptography algorithm list. */
export const CryptoSearchProvider: React.FunctionComponent<ICryptoProvider> = ({
  children,
  assetType,
}) => {
  const tableControlState = useTableControlState({
    tableName: "crypto",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.cryptography,
    persistTo: "urlParams",
    columnNames: {
      name: "Algorithm",
      primitive: "Primitive",
      occurrences: "Occurrences",
      policy: "Policy",
      recommendation: "Recommendation",
      usage: "Usage",
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
        title: "Filter",
        placeholderText: "Search by algorithm name",
        type: FilterType.search,
      },
      {
        categoryKey: "policy",
        title: "Policy",
        type: FilterType.select,
        selectOptions: [
          { value: "compliant", label: "Compliant" },
          { value: "warning", label: "Warning" },
          { value: "non_compliant", label: "Non-compliant" },
        ],
        serverFilterField: "policy_status",
      },
    ],
    isExpansionEnabled: false,
  });

  const {
    result: { data: algorithms, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchCryptoAlgorithms(
    {
      ...getHubRequestParams({
        ...tableControlState,
        hubSortFieldKeys: {
          name: "name",
        },
      }),
      total: true,
    },
    assetType,
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "node_id",
    currentPageItems: algorithms,
    totalItemCount,
    isLoading: isFetching,
  });

  return (
    <CryptoSearchContext.Provider
      value={{ totalItemCount, isFetching, fetchError, tableControls }}
    >
      {children}
    </CryptoSearchContext.Provider>
  );
};
