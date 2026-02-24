import {
  keepPreviousData,
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

// API function to check if group name is unique
// Returns boolean
export const checkGroupNameUniqueness = async (
  name: string,
  parentId?: string,
): Promise<boolean> => {
  try {
    // Build query based on whether parent is specified

    const response = await listSbomGroups({
      client,
      query: {
        q: `parent=${parentId || ""}&name=${name}`,
        limit: 1,
      },
    });
    const isUnique = !response.data?.items || response.data?.items.length === 0;
    return isUnique;
  } catch (error) {
    // On error, assume name is available (fail open for better UX)
    console.error("Failed to check group name uniqueness:", error);
    return true;
  }
};

export const useFetchSBOMGroups = (params?: FetchSBOMGroupsParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMGroupsQueryKey, params],
    queryFn: () =>
      listSbomGroups({
        client,
        query: params,
      }),
    placeholderData: keepPreviousData,
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
