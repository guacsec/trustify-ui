import { client } from "@app/axios-config/apiInit";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { HubRequestParams } from "@app/api/models";
import type {
  CreateResponse,
  Group,
  GroupRequest,
  ListSbomGroupsData,
} from "@app/client";
import {
  createSbomGroup,
  deleteSbomGroup,
  listSbomGroups,
  updateSbomGroup,
} from "@app/client";
import { requestParamsQuery } from "@app/hooks/table-controls/getHubRequestParams";

export const SBOMGroupsQueryKey = "sbom-groups";

export const useFetchSBOMGroups = (
  params: HubRequestParams = {},
  extraQueryParams: Pick<
    NonNullable<ListSbomGroupsData["query"]>,
    "parents" | "totals"
  > = {},
  disableQuery: boolean = false,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMGroupsQueryKey, params, extraQueryParams],
    queryFn: () =>
      listSbomGroups({
        client,
        query: { ...requestParamsQuery(params), ...extraQueryParams },
      }),
    enabled: !disableQuery,
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

/**
 * Fetch children for multiple parent groups in parallel.
 *
 * Issues one query per parent ID using `useQueries`. Each query fetches all
 * direct children of the given parent (no pagination limit).
 */
export const useFetchSbomGroupChildren = (parentIds: string[]) => {
  const results = useQueries({
    queries: parentIds.map((parentId) => ({
      queryKey: [SBOMGroupsQueryKey, "children", parentId],
      queryFn: () =>
        listSbomGroups({
          client,
          query: {
            q: `parent=${parentId}`,
            totals: true,
            limit: 0,
          },
        }),
    })),
  });

  const nodeStatus = new Map<
    string,
    { isFetching: boolean; fetchError: AxiosError | null }
  >();
  parentIds.forEach((id, index) => {
    nodeStatus.set(id, {
      isFetching: results[index].isLoading,
      fetchError: (results[index].error as AxiosError) ?? null,
    });
  });

  return {
    data: results.flatMap((r) => r.data?.data?.items ?? []),
    isFetching: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
    nodeStatus,
  };
};

export const useDeleteSbomGroupMutation = (
  onSuccess: (payload: Group) => void,
  onError: (err: AxiosError) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Group) => {
      const { id, name } = payload;
      // NOTE: At the time of this writing this body data
      // is not actually used by the backend.
      // According to the OpenAPI spec it is required,
      // so it's included here for that reason.
      const body: GroupRequest = {
        name,
      };

      await deleteSbomGroup({ client, body, path: { id } });
    },
    onSuccess: async (_res, payload) => {
      onSuccess(payload);
      await queryClient.invalidateQueries({
        queryKey: [SBOMGroupsQueryKey],
      });
    },
    onError: async (err: AxiosError) => {
      onError(err);
      await queryClient.invalidateQueries({
        queryKey: [SBOMGroupsQueryKey],
      });
    },
  });
};
