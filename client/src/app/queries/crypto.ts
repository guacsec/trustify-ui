import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { HubRequestParams } from "@app/api/models";
import { requestParamsQuery } from "@app/hooks/table-controls";

import type {
  CryptoAlgorithm,
  CryptoSummary,
} from "@app/pages/crypto-list/crypto-context";

export const CryptoAlgorithmsQueryKey = "crypto-algorithms";
export const CryptoSummaryQueryKey = "crypto-summary";

/** Fetches a paginated list of cryptographic algorithms, optionally filtered by asset type. */
export const useFetchCryptoAlgorithms = (
  params: HubRequestParams = {},
  assetType?: string,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [CryptoAlgorithmsQueryKey, params, assetType],
    queryFn: () => {
      const query = requestParamsQuery(params);
      return axios.get<{ items: CryptoAlgorithm[]; total: number | null }>(
        "/api/v3/crypto/algorithm",
        {
          params: {
            ...query,
            ...(assetType ? { asset_type: assetType } : {}),
          },
        },
      );
    },
  });

  return {
    result: {
      data: data?.data?.items || [],
      total: data?.data?.total ?? 0,
      params: params,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};

/** Fetches the portfolio-level PQC readiness summary for KPI cards. */
export const useFetchCryptoSummary = (disableQuery = false) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [CryptoSummaryQueryKey],
    queryFn: () => {
      return axios.get<CryptoSummary>("/api/v3/crypto/summary");
    },
    enabled: !disableQuery,
  });

  return {
    result: data?.data ?? null,
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};
