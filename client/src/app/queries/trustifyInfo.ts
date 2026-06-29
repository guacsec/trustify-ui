import { useQuery } from "@tanstack/react-query";

import { client } from "@app/axios-config/apiInit";
import { info } from "@app/client";

export const TrustifyInfoQueryKey = "trustifyInfo";

/** Fetches instance metadata from GET /.well-known/trustify (cached for the session lifetime). */
export const useFetchTrustifyInfo = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [TrustifyInfoQueryKey],
    queryFn: () => info({ client }),
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
