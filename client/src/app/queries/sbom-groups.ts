import { client } from "@app/axios-config/apiInit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { HubRequestParams } from "@app/api/models";
import type {
  CreateResponse,
  GroupRequest,
  ListSbomGroupsData,
} from "@app/client";
import { createSbomGroup, listSbomGroups, updateSbomGroup } from "@app/client";
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
  onSuccess: (response: CreateResponse | null, payload: GroupRequest) => void,
  onError: (err: AxiosError) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: GroupRequest) => {
      const response = await createSbomGroup({ client, body });
      return response.data;
    },
    onSuccess: async (response, payload) => {
      await queryClient.invalidateQueries({ queryKey: [SBOMGroupsQueryKey] });
      onSuccess(response ?? null, payload);
    },
    onError: onError,
  });
};

export const useUpdateSBOMGroupMutation = (
  onSuccess: (payload: { id: string; body: GroupRequest }) => void,
  onError: (err: AxiosError) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; body: GroupRequest }) => {
      const response = await updateSbomGroup({
        client,
        path: { id: payload.id },
        body: payload.body,
      });
      return response.data;
    },
    onSuccess: async (_response, payload) => {
      await queryClient.invalidateQueries({ queryKey: [SBOMGroupsQueryKey] });
      onSuccess(payload);
    },
    onError: onError,
  });
};
