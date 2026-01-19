import fs from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

import type { AxiosInstance } from "axios";

import { logger, SETUP_TIMEOUT } from "../../common/constants";
import { test as setup } from "../fixtures";

setup.describe("Ingest initial data", () => {
  setup.skip(
    process.env.SKIP_INGESTION === "true",
    "Skipping global.setup data ingestion",
  );

  setup("Upload files", async ({ axios }) => {
    setup.setTimeout(SETUP_TIMEOUT);

    logger.info("Setup: start uploading assets");

    const SBOM_FILES = await readDirectoryRecursively(
      path.join(__dirname, "../../common/dataset/sbom"),
    );
    const ADVISORY_FILES = await readDirectoryRecursively(
      path.join(__dirname, "../../common/dataset/advisory"),
    );

    await uploadFiles(axios, "sbom", SBOM_FILES);
    await uploadFiles(axios, "advisory", ADVISORY_FILES);

    logger.info("Setup: upload finished successfully");
  });
});

const uploadFiles = async (
  axios: AxiosInstance,
  type: "sbom" | "advisory",
  files: string[],
) => {
  const uploads = files.map((file) => {
    const fileStream = fs.createReadStream(file);
    const contentType = file.endsWith(".bz2")
      ? "application/json+bzip2"
      : "application/json";
    return axios.post(`/api/v2/${type}`, fileStream, {
      headers: { "Content-Type": contentType },
    });
  });

  await Promise.all(uploads);
};

const readDirectoryRecursively = async (dir: string) => {
  const result: string[] = [];

  const directoryFiles = await readdir(dir, { withFileTypes: true });
  for (const file of directoryFiles) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const subDirectoryFiles = await readDirectoryRecursively(filePath);
      result.push(...subDirectoryFiles);
    } else {
      result.push(filePath);
    }
  }

  return result;
};
