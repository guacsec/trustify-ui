import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { client } from "@app/axios-config/apiInit";

import type { HubRequestParams } from "@app/api/models";
import { createSbomGroup, listSbomGroups } from "@app/client";
import type { GroupRequest, ListSbomGroupsData } from "@app/client";
import { requestParamsQuery } from "@app/hooks/table-controls/getHubRequestParams";

export const SBOMGroupsQueryKey = "sbom-groups";

export const useFetchSBOMGroups = (
  params: HubRequestParams = {},
  extraQueryParams: Pick<
    NonNullable<ListSbomGroupsData["query"]>,
    "parents" | "totals"
  > = {},
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMGroupsQueryKey, params, extraQueryParams],
    queryFn: () =>
      listSbomGroups({
        client,
        query: { ...requestParamsQuery(params), ...extraQueryParams },
      }),
  });

  return {
    result: {
      data: data?.data?.items || [],
      total: data?.data?.total ?? 0,
      params,
    },
    rawData: data?.data,
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
