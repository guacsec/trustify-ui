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
import { uploadAdvisories, uploadSboms } from "../helpers/upload";

setup.describe("Ingest initial data", () => {
  setup.skip(
    process.env.SKIP_INGESTION === "true",
    "Skipping global.setup data ingestion",
  );

  setup("Upload files", async ({ axios }) => {
    setup.setTimeout(SETUP_TIMEOUT);

    logger.info("Setup: start uploading assets");
    await uploadSboms(axios, "../../common/assets/sbom/", SBOM_FILES);
    await uploadAdvisories(axios, "../../common/assets/csaf/", ADVISORY_FILES);
    logger.info("Setup: upload finished successfully");
  });
});

