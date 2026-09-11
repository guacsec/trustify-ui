import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { HubRequestParams } from "@app/api/models";
import { requestParamsQuery } from "@app/hooks/table-controls";

import type {
  CryptoAlgorithm,
  CryptoPolicySummary,
} from "@app/pages/crypto-list/crypto-context";

export const CryptoAlgorithmsQueryKey = "crypto-algorithms";
export const CryptoPolicySummaryQueryKey = "crypto-policy-summary";

/** Fetches a paginated list of cryptographic algorithms from GET /v3/crypto/algorithm. */
export const useFetchCryptoAlgorithms = (
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [CryptoAlgorithmsQueryKey, params],
    queryFn: () => {
      return axios.get<{ items: CryptoAlgorithm[]; total: number | null }>(
        "/api/v3/crypto/algorithm",
        { params: requestParamsQuery(params) },
      );
    },
    enabled: !disableQuery,
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

/** Fetches the policy evaluation summary from POST /v3/crypto/policy/evaluate. */
export const useFetchCryptoPolicySummary = (disableQuery = false) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [CryptoPolicySummaryQueryKey],
    queryFn: () => {
      return axios.post<{
        summary: CryptoPolicySummary;
      }>("/api/v3/crypto/policy/evaluate", {});
    },
    enabled: !disableQuery,
  });

  return {
    result: data?.data?.summary ?? null,
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};
