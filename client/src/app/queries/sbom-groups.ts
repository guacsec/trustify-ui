import { client } from "@app/axios-config/apiInit";
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { readSbomGroup } from "@app/client";

export const SBOMGroupsQueryKey = "sbom-groups";

export const SBOMGroupByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [SBOMGroupsQueryKey, id],
    queryFn: () => readSbomGroup({ client, path: { id } }),
  });
};

export const useFetchSBOMGroupById = (id: string) => {
  const { data, isLoading, error } = useQuery(SBOMGroupByIdQueryOptions(id));
  return {
    sbomGroup: data?.data,
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
  };
};

export const useSuspenseSBOMGroupById = (id: string) => {
  const { data, isLoading, error, refetch } = useSuspenseQuery({
    ...SBOMGroupByIdQueryOptions(id),
  });
  return {
    sbomGroup: data.data,
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};
