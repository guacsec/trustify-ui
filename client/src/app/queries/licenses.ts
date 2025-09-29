import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { client } from "@app/axios-config/apiInit";
import { listLicenses } from "@app/client";

export const LicensesQueryKey = "licenses";

export const useFetchLicenses = (filterText: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [LicensesQueryKey, filterText],
    queryFn: () => {
      return listLicenses({
        client,
        query: { limit: 10, q: filterText },
      });
    },
    placeholderData: keepPreviousData,
  });

  return {
    licenses: data?.data?.items || [],
    isFetching: isLoading,
    fetchError: error as AxiosError,
    refetch,
  };
};
