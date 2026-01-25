import type { HubRequestParams } from "@app/api/models";
import type { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { dummyData } from "@app/pages/groups/dummy-data";

export const GroupQueryKey = "groups";
export type TGroupDD = {
  id: string;
  parent: string | null;
  name: string;
  labels: Record<string, string>;
};

// TODO: Make actual requests once backend is ready
export const useFetchGroups = (
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [GroupQueryKey, params],
    queryFn: () => Promise.resolve(dummyData),
    enabled: !disableQuery,
  });

  const rootNodeCount = data?.items.filter((d) => d.parent === null).length;

  return {
    result: {
      data: data?.items ?? [],
      // Use only top-level nodes for pagination
      total: rootNodeCount ?? 0,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};
