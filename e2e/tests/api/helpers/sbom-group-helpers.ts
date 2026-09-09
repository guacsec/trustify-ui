import type { AxiosInstance } from "axios";
import { logger } from "../../common/constants";

type CreateGroupOptions = {
  description?: string;
  parent?: string;
  labels?: Record<string, string>;
};

type GroupResponse = {
  id: string;
  name: string;
  parent: string | null;
  description: string | null;
  labels: Record<string, string>;
};

type ListGroupsParams = {
  q?: string;
  sort?: string;
  offset?: number;
  limit?: number;
  total?: boolean;
  totals?: boolean;
  parents?: "skip" | "id" | "resolve";
};

export async function createGroup(
  axios: AxiosInstance,
  name: string,
  options?: CreateGroupOptions,
): Promise<{ id: string; etag: string }> {
  const body: Record<string, unknown> = { name };
  if (options?.description != null) body.description = options.description;
  if (options?.parent != null) body.parent = options.parent;
  if (options?.labels) body.labels = options.labels;

  const response = await axios.post("/api/v3/group/sbom", body);

  return {
    id: response.data.id,
    etag: response.headers["etag"] as string,
  };
}

export async function readGroup(
  axios: AxiosInstance,
  id: string,
): Promise<{ body: GroupResponse; etag: string }> {
  const response = await axios.get(`/api/v3/group/sbom/${id}`);

  return {
    body: response.data,
    etag: response.headers["etag"] as string,
  };
}

export async function updateGroup(
  axios: AxiosInstance,
  id: string,
  body: {
    name: string;
    description?: string | null;
    parent?: string | null;
    labels?: Record<string, string>;
  },
  etag?: string,
): Promise<{ etag: string }> {
  const headers: Record<string, string> = {};
  if (etag) {
    headers["If-Match"] = etag;
  }

  const response = await axios.put(`/api/v3/group/sbom/${id}`, body, {
    headers,
  });
  return {
    etag: response.headers["etag"] as string,
  };
}

export async function deleteGroup(
  axios: AxiosInstance,
  id: string,
  etag?: string,
): Promise<void> {
  const headers: Record<string, string> = {};
  if (etag) {
    headers["If-Match"] = etag;
  }

  await axios.delete(`/api/v3/group/sbom/${id}`, { headers });
}

export async function listGroups(
  axios: AxiosInstance,
  params?: ListGroupsParams,
) {
  const response = await axios.get("/api/v3/group/sbom", { params });
  return response.data;
}

export async function readAssignments(
  axios: AxiosInstance,
  sbomId: string,
): Promise<{ groupIds: string[]; etag: string }> {
  const response = await axios.get(`/api/v3/group/sbom-assignment/${sbomId}`);

  return {
    groupIds: response.data,
    etag: response.headers["etag"] as string,
  };
}

export async function updateAssignments(
  axios: AxiosInstance,
  sbomId: string,
  groupIds: string[],
  etag?: string,
): Promise<void> {
  const headers: Record<string, string> = {};
  if (etag) {
    headers["If-Match"] = etag;
  }

  await axios.put(`/api/v3/group/sbom-assignment/${sbomId}`, groupIds, {
    headers,
  });
}

export async function bulkAssign(
  axios: AxiosInstance,
  sbomIds: string[],
  groupIds: string[],
): Promise<void> {
  await axios.put("/api/v3/group/sbom-assignment", {
    sbom_ids: sbomIds,
    group_ids: groupIds,
  });
}

export async function patchAssignments(
  axios: AxiosInstance,
  sbomIds: string[],
  add: string[],
  remove: string[],
): Promise<void> {
  await axios.patch("/api/v3/group/sbom-assignment", {
    sbom_ids: sbomIds,
    add,
    remove,
  });
}

export async function findFirstSbomId(axios: AxiosInstance): Promise<string> {
  const response = await axios.get("/api/v3/sbom", {
    params: { limit: 1, offset: 0 },
  });
  if (response.data.items.length === 0) {
    throw new Error("No SBOMs found in database");
  }
  return response.data.items[0].id as string;
}

export async function findTwoSbomIds(
  axios: AxiosInstance,
): Promise<[string, string]> {
  const response = await axios.get("/api/v3/sbom", {
    params: { limit: 2, offset: 0 },
  });
  if (response.data.items.length < 2) {
    throw new Error("Expected at least 2 SBOMs in database");
  }
  return [
    response.data.items[0].id as string,
    response.data.items[1].id as string,
  ];
}

/**
 * Deletes groups in order. Pass children before parents to avoid 409 conflicts.
 */
export async function cleanupGroups(
  axios: AxiosInstance,
  groupIds: string[],
): Promise<void> {
  logger.info("Teardown: starting to delete SBOM groups.");

  for (const id of groupIds) {
    logger.info(`Teardown: deleting SBOM group with ID ${id}`);
    try {
      await axios.delete(`/api/v3/group/sbom/${id}`);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 404) {
        logger.warn(`Teardown: SBOM group ${id} not found during cleanup.`);
      } else {
        throw error;
      }
    }
  }
}
