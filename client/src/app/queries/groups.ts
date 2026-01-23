import { HubRequestParams } from "@app/api/models";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

export const GroupQueryKey = 'groups'
export type TGroupDD = {
  id: string;
  parent: string | null;
  name: string;
  labels: Record<string, any>;
};

export type TGroupTreeNode = TGroupDD & {
  children: TGroupTreeNode[];
};

const dummyData: { total: number, items: TGroupDD[], tree: Record<string, any> } = {
  total: 10,
  items: [
    {
      id: "uuid 1",
      parent: null,
      name: "group 1",
      labels: {}
    },
    {
      id: "uuid 2",
      parent: "uuid 1",
      name: "group 2",
      labels: {}
    },
    {
      id: "uuid 3",
      parent: "uuid 1",
      name: "group 3",
      labels: {}
    },
    {
      id: "uuid 4",
      parent: "uuid 1",
      name: "group 4",
      labels: {}
    },
    {
      id: "uuid 5",
      parent: "uuid 1",
      name: "group 5",
      labels: {}
    },
    {
      id: "uuid 6",
      parent: "uuid 1",
      name: "group 6",
      labels: {}
    },
    {
      id: "uuid 7",
      parent: "uuid 1",
      name: "group 7",
      labels: {}
    },
    {
      id: "uuid 8",
      parent: "uuid 1",
      name: "group 8",
      labels: {}
    },
    {
      id: "uuid 9",
      parent: "uuid 1",
      name: "group 10",
      labels: {}
    }
  ],
  tree: {},
};

export const useFetchGroups = (
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  //  const { q, ...rest } = requestParamsQuery((params));

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [GroupQueryKey, params],
    queryFn: () => Promise.resolve(dummyData),
    enabled: !disableQuery
  });

  const { roots } = buildGroupTree(dummyData.items);

  return {
    result: {
      data: roots || [],
      total: data?.total ?? 0,
      tree: data?.tree,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  }
}

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
