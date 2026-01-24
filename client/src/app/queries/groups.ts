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

export type TGroupTreeNode = TGroupDD & {
  children: TGroupTreeNode[];
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

  const { roots } = buildGroupTree(data?.items || []);

  return {
    result: {
      data: roots,
      // Use only top-level nodes for pagination
      total: roots.length,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};

/**
 * Generates a simple tree structure for groups
 */
export function buildGroupTree(items: TGroupDD[]) {
  const byId = new Map<string, TGroupTreeNode>();
  const roots: TGroupTreeNode[] = [];

  // initialize nodes
  for (const item of items) {
    byId.set(item.id, { ...item, children: [] });
  }

  // wire up parent/child relationships
  for (const node of byId.values()) {
    if (!node.parent) {
      roots.push(node);
      continue;
    }

    const parent = byId.get(node.parent);
    if (parent) {
      parent.children.push(node);
    } else {
      // orphan: parent id not found -> treat as root or handle however you want
      roots.push(node);
    }
  }

  return { roots, byId };
}
