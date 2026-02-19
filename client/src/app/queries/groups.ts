import type { HubRequestParams } from "@app/api/models";
import type { AxiosError } from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";

import { client } from "@app/axios-config/apiInit";
import { listSbomGroups } from "@app/client";
import { requestParamsQuery } from "@app/hooks/table-controls";

export const GroupQueryKey = "groups";

export type TGroupDD = {
  id: string;
  parent?: string | null;
  name: string;
  description?: string | null;
  labels?: Record<string, string | null>;
  number_of_groups?: number | null;
  number_of_sboms?: number | null;
};

/**
 * Prepend a parent filter to an existing q value.
 *
 * The backend uses `\x00` (NUL byte) as a sentinel for IS NULL, so
 * `parent=\x00` returns only root-level groups.
 * `parent=<uuid>` returns only direct children of that group.
 */
function withParentFilter(parentValue: string, existingQ?: string): string {
  const filter = `parent=${parentValue}`;
  return existingQ ? `${filter}&${existingQ}` : filter;
}

/**
 * Fetch root-level groups only (where parent IS NULL), with pagination.
 */
export const useFetchGroups = (
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [GroupQueryKey, "roots", params],
    queryFn: () => {
      const query = requestParamsQuery(params);
      return listSbomGroups({
        client,
        query: {
          ...query,
          q: withParentFilter("\x00", query.q),
          totals: true,
        },
      });
    },
    enabled: !disableQuery,
  });

  return {
    result: {
      data: (data?.data?.items as TGroupDD[]) ?? [],
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
export const useFetchGroupChildren = (parentIds: string[]) => {
  const results = useQueries({
    queries: parentIds.map((parentId) => ({
      queryKey: [GroupQueryKey, "children", parentId],
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

  return {
    data: results.flatMap((r) => (r.data?.data?.items as TGroupDD[]) ?? []),
    isFetching: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
  };
};
