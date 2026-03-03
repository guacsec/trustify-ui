import type { AxiosInstance } from "axios";
import fs from "node:fs";
import { logger } from "../common/constants";

export async function uploadFiles(
  axios: AxiosInstance,
  type: "sbom" | "advisory",
  files: string[],
): Promise<string[]> {
  const uploads = files.map((file) => {
    const fileStream = fs.createReadStream(file);
    const contentType = file.endsWith(".bz2")
      ? "application/json+bzip2"
      : "application/json";
    return axios.post(`/api/v2/${type}`, fileStream, {
      headers: { "Content-Type": contentType },
    });
  });

  const responses = await Promise.all(uploads);
  const ids = responses.map((response) => response.data.id);

  return ids;
}

export async function deleteSboms(axios: AxiosInstance, sbomIds: string[]) {
  logger.info("Teardown: starting to delete SBOMs.");

  const deletes = sbomIds.map((id) => {
    logger.info(`Teardown: deleting SBOM with ID ${id}`);
    return axios.delete(`/api/v2/sbom/${id}`).catch((error) => {
      if (error.response?.status === 404) {
        logger.warn(`Teardown: SBOM ${id} not found during cleanup.`);
      } else {
        throw error;
      }
    });
  });

  await Promise.all(deletes);
}

export function getFullSbomPaths(sbomDir: string, sbomPaths: string[]) {
  var fullSbomPaths: string[] = [];
  sbomPaths.forEach((sbomPath) => {
    fullSbomPaths.push(`${sbomDir}/${sbomPath}`);
  });
  return fullSbomPaths;
}
