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
}

/** Context provider that manages table state and data fetching for the cryptography algorithm list. */
export const CryptoSearchProvider: React.FunctionComponent<ICryptoProvider> = ({
  children,
}) => {
  const tableControlState = useTableControlState({
    tableName: "crypto",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.cryptography,
    persistTo: "urlParams",
    columnNames: {
      name: "Name",
      asset_type: "Asset type",
      policy_status: "Policy status",
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
    false,
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
