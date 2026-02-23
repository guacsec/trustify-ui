import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { listSbomGroups } from "@app/client";
import type { Group, ListSbomGroupsData } from "@app/client";

export interface SBOMGroup {
  id: string;
  name: string;
  description?: string | null;
  children?: SBOMGroup[];
}

export type FetchSBOMGroupsParams = ListSbomGroupsData["query"];

export const SBOMGroupsQueryKey = "sbom-groups";

/**
 * Convert flat list of groups with parent references to hierarchical structure
 */
const buildHierarchy = (groups: Group[]): SBOMGroup[] => {
  const groupMap = new Map<string, SBOMGroup>();
  const rootGroups: SBOMGroup[] = [];

  // First pass: Create all group objects
  for (const group of groups) {
    groupMap.set(group.id, {
      id: group.id,
      name: group.name,
      description: group.description,
      children: [],
    });
  }

  // Second pass: Build parent-child relationships
  for (const group of groups) {
    const sbomGroup = groupMap.get(group.id);
    if (!sbomGroup) continue;

    if (group.parent) {
      // Add to parent's children
      const parent = groupMap.get(group.parent);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(sbomGroup);
      } else {
        // Parent not in current result set, treat as root
        rootGroups.push(sbomGroup);
      }
    } else {
      // No parent, this is a root group
      rootGroups.push(sbomGroup);
    }
  }

  // Clean up empty children arrays
  const cleanupEmptyChildren = (group: SBOMGroup) => {
    if (group.children && group.children.length === 0) {
      delete group.children;
    } else if (group.children) {
      for (const child of group.children) {
        cleanupEmptyChildren(child);
      }
    }
  };

  for (const group of rootGroups) {
    cleanupEmptyChildren(group);
  }

  return rootGroups;
};

// API function to fetch SBOM groups
export const fetchSBOMGroupsAPI = async (
  params?: FetchSBOMGroupsParams,
): Promise<SBOMGroup[]> => {
  const response = await listSbomGroups({
    query: params,
  });

  if (!response.data) {
    return [];
  }

  const groups = response.data.items || [];

  // Convert flat list to hierarchical structure
  return buildHierarchy(groups);
};

export const useFetchSBOMGroups = (params?: FetchSBOMGroupsParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMGroupsQueryKey, params],
    queryFn: () => fetchSBOMGroupsAPI(params),
    placeholderData: keepPreviousData,
  });

  return {
    groups: data || [],
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};
