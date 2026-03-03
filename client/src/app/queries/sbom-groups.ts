import type { HubRequestParams } from "@app/api/models";
import type { AxiosError } from "axios";
import {
  useQueries,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import { client } from "@app/axios-config/apiInit";
import {
  deleteSbomGroup,
  type Group,
  type GroupRequest,
  listSbomGroups,
} from "@app/client";
import { requestParamsQuery } from "@app/hooks/table-controls";
import { FILTER_NULL_VALUE } from "@app/Constants";

export const SBOMGroupsQueryKey = "sbom-groups";

/**
 * Fetch root-level groups only (where parent IS NULL), with pagination.
 */
export const useFetchSbomGroups = (
  parentId: string | undefined,
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  const { q, ...rest } = requestParamsQuery(params);
  const parentQuery = `parent=${parentId ?? FILTER_NULL_VALUE}`;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMGroupsQueryKey, parentId, params],
    queryFn: () => {
      return listSbomGroups({
        client,
        query: {
          ...rest,
          q: [q, parentQuery].filter((e) => e).join("&"),
          totals: true,
        },
      });
    },
    enabled: !disableQuery,
  });

  return {
    result: {
      data: data?.data?.items ?? [],
      total: data?.data?.total ?? 0,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
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
