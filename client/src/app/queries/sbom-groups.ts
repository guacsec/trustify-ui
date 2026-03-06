import { useMemo } from "react";

import {
  queryOptions,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { HubRequestParams } from "@app/api/models";
import { client } from "@app/axios-config/apiInit";
import type {
  CreateResponse,
  Group,
  GroupRequest,
  ListSbomGroupsData,
  SbomHead,
} from "@app/client";
import {
  bulkUpdateSbomGroupAssignments,
  createSbomGroup,
  deleteSbomGroup,
  listSbomGroups,
  readSbomGroup,
  updateSbomGroup,
} from "@app/client";
import { requestParamsQuery } from "@app/hooks/table-controls/getHubRequestParams";

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

export const useFetchSBOMGroups = (
  parentId: string | null,
  params: HubRequestParams = {},
  extraQueryParams: Pick<
    NonNullable<ListSbomGroupsData["query"]>,
    "parents" | "totals"
  > = {},
) => {
  const { q, ...rest } = requestParamsQuery(params);
  const parentQuery = parentId ? `parent=${parentId}` : "";

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMGroupsQueryKey, parentId, { params, extraQueryParams }],
    queryFn: () =>
      listSbomGroups({
        client,
        query: {
          ...rest,
          ...extraQueryParams,
          q: [q, parentQuery].filter((e) => e).join("&"),
        },
      }),
  });

  const references = useMemo(() => {
    return [
      ...(data?.data?.items || []),
      ...(data?.data?.referenced || []),
    ].reduce((prev, current) => {
      prev.set(current.id, current);
      return prev;
    }, new Map<string, Group>());
  }, [data?.data]);

  return {
    result: {
      data: data?.data?.items || [],
      total: data?.data?.total ?? 0,
    },
    references,
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

export const useAddSBOMsToGroupsMutation = (
  onSuccess: (payload: { groups: Group[]; sboms: SbomHead[] }) => void,
  onError: (err: AxiosError) => void,
) => {
  return useMutation({
    mutationFn: async (payload: { groups: Group[]; sboms: SbomHead[] }) => {
      const { sboms, groups } = payload;
      const response = await bulkUpdateSbomGroupAssignments({
        client,
        body: {
          group_ids: groups.map((e) => e.id),
          sbom_ids: sboms.map((e) => e.id),
        },
      });
      return response.data;
    },
    onSuccess: async (_response, payload) => {
      onSuccess(payload);
    },
    onError: onError,
  });
};
