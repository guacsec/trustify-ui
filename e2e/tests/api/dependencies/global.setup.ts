import fs from "node:fs";
import path from "node:path";

import type { AxiosInstance } from "axios";

import {
  ADVISORY_FILES,
  logger,
  SBOM_FILES,
  SETUP_TIMEOUT,
} from "../../common/constants";
import { test as setup } from "../fixtures";

setup.describe("Ingest initial data", () => {
  setup.skip(
    process.env.SKIP_INGESTION === "true",
    "Skipping global.setup data ingestion",
  );

  setup("Upload files", async ({ axios }) => {
    setup.setTimeout(SETUP_TIMEOUT);

    logger.info("Setup: start uploading assets");
    await uploadSboms(axios, SBOM_FILES);
    await uploadAdvisories(axios, ADVISORY_FILES);
    logger.info("Setup: upload finished successfully");
  });
});

/**
 * Get the asset configuration for the given asset type
 * @param assetType
 * @returns { assetPath: string, endpoint: string, displayName: string } for the given asset type
 * @throws { Error } if the asset type is unknown
 */
const getAssetConfig = (
  assetType: string,
): { assetPath: string; endpoint: string; displayName: string } => {
  if (assetType === "sbom") {
    return {
      assetPath: "../../common/assets/sbom/",
      endpoint: "/api/v2/sbom",
      displayName: "SBOM",
    };
  } else if (assetType === "advisory") {
    return {
      assetPath: "../../common/assets/csaf/",
      endpoint: "/api/v2/advisory",
      displayName: "Advisory",
    };
  } else {
    throw new Error(`Unknown asset type: ${assetType}`);
  }
};

/**
 * Common upload function with individual file status tracking
 * @param axios - Axios instance for making HTTP requests
 * @param files - Array of file names to upload
 * @param assetPath - Relative path to the asset directory
 * @param endpoint - API endpoint to upload to
 * @param displayName - Human-readable name for logging
 */
const uploadFiles = async (
  axios: AxiosInstance,
  files: string[],
  assetType: string,
) => {
  const { assetPath, endpoint, displayName } = getAssetConfig(assetType);
  for (const fileName of files) {
    const filePath = path.join(__dirname, assetPath, fileName);
    fs.statSync(filePath); // Verify file exists
    const fileStream = fs.createReadStream(filePath);
    const contentType = fileName.endsWith(".bz2")
      ? "application/json+bzip2"
      : "application/json";
    await axios
      .post(endpoint, fileStream, {
        headers: { "Content-Type": contentType },
      })
      .catch((error) => {
        logger.error(
          `${displayName} upload failed: ${fileName} - ${error.message}`,
        );
      });
  }
};

const uploadSboms = async (axios: AxiosInstance, files: string[]) => {
  await uploadFiles(axios, files, "sbom");
};

const uploadAdvisories = async (axios: AxiosInstance, files: string[]) => {
  await uploadFiles(axios, files, "advisory");
};
