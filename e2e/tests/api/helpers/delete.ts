import type { AxiosInstance } from "axios";

import { logger } from "../../common/constants";

export async function deleteSboms(axios: AxiosInstance, sbomIds: string[]) {
  var existingSbomIds = [];

  for (const sbomId of sbomIds) {
    try {
      await axios.get(`/api/v2/sbom/${sbomId}`);
      existingSbomIds.push(sbomId);
    } catch (error) {
      logger.info(`SBOM with ID ${sbomId} does not exist anymore. Skipping.`);
    }
  }

  const deletionPromises = existingSbomIds.map((sbomId) =>
    axios.delete(`/api/v2/sbom/${sbomId}`).catch((error) => {
      logger.error(`Failed to delete SBOM with ID: ${sbomId}`, error);
    }),
  );

  const results = await Promise.allSettled(deletionPromises);

  const allSuccessful = results.every(
    (result) => result.status === "fulfilled" && result.value?.status === 200,
  );

  return allSuccessful;
}
