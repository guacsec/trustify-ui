import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { client } from "@app/axios-config/apiInit";

import { createSbomGroup, listSbomGroups } from "@app/client";
import type { GroupRequest, ListSbomGroupsData } from "@app/client";

export type FetchSBOMGroupsParams = ListSbomGroupsData["query"];

export const SBOMGroupsQueryKey = "sbom-groups";

export const useFetchSBOMGroups = (params?: FetchSBOMGroupsParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMGroupsQueryKey, params],
    queryFn: () =>
      listSbomGroups({
        client,
        query: params,
      })
  });

  return {
    groups: data,
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};

export const useCreateSBOMGroupMutation = (
  onSuccess: () => void,
  onError: (err: AxiosError) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: GroupRequest) => {
      const response = await createSbomGroup({ client, body });
      return response.data;
    },
    onSuccess: async () => {
      onSuccess();
      await queryClient.invalidateQueries({ queryKey: [SBOMGroupsQueryKey] });
    },
    onError: onError,
  });
};
