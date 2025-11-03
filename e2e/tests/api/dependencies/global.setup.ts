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

// TODO once the backend is stable the upload should be done in parallel and not serial
const uploadSboms = async (axios: AxiosInstance, files: string[]) => {
  files.reduce(async (prev, next) => {
    await prev;

    const filePath = path.join(__dirname, `../../common/assets/sbom/${next}`);
    fs.statSync(filePath); // Verify file exists
    const fileStream = fs.createReadStream(filePath);
    const contentType = next.endsWith(".bz2")
      ? "application/json+bzip2"
      : "application/json";

    return axios.post("/api/v2/sbom", fileStream, {
      headers: { "Content-Type": contentType },
    });
  }, Promise.resolve());
};

// TODO once the backend is stable the upload should be done in parallel and not serial
const uploadAdvisories = async (axios: AxiosInstance, files: string[]) => {
  files.reduce(async (prev, next) => {
    await prev;

    const filePath = path.join(__dirname, `../../common/assets/csaf/${next}`);
    fs.statSync(filePath); // Verify file exists
    const fileStream = fs.createReadStream(filePath);
    const contentType = next.endsWith(".bz2")
      ? "application/json+bzip2"
      : "application/json";

    return axios.post("/api/v2/advisory", fileStream, {
      headers: { "Content-Type": contentType },
    });
  }, Promise.resolve());
};
