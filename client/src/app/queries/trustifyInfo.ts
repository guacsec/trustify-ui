import { useQuery } from "@tanstack/react-query";

import { client } from "@app/axios-config/apiInit";
import { info } from "@app/client";

export const TrustifyInfoQueryKey = "trustifyInfo";

/** Fetches instance metadata from GET /.well-known/trustify (cached for the session lifetime). */
export const useFetchTrustifyInfo = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [TrustifyInfoQueryKey],
    queryFn: () => info({ client }),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
  });

  return {
    trustifyInfo: data?.data,
    isLoading,
    error,
  };
};
