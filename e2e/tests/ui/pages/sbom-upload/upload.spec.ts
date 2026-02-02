import path from "node:path";

import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import {
  testInvalidFileExtensions,
  testRemoveFiles,
  testUploadFilesParallel,
  testUploadFilesSequentially,
} from "../common/upload-test-helpers";
import { SBOMUploadPage } from "./SBOMUploadPage";

const TEST_FILES = {
  QUARKUS_BOM: path.join(
    __dirname,
    "../../../common/dataset/sbom/quarkus-bom-2.13.8.Final-redhat-00004.json.bz2",
  ),
  UBI9_MINIMAL: path.join(
    __dirname,
    "../../../common/dataset/sbom/ubi9-minimal-9.3-1361.json.bz2",
  ),
  INVALID_JSON: path.join(
    __dirname,
    "../../../common/assets/invalid-file.json",
  ),
  INVALID_TXT: path.join(__dirname, "../../../common/assets/invalid-file.txt"),
};

test.describe("File Upload", { tag: ["@upload"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  testUploadFilesSequentially("SBOM file (.bz2)", {
    files: [
      {
        path: TEST_FILES.QUARKUS_BOM,
        status: "success",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await SBOMUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testUploadFilesSequentially("Invalid file", {
    files: [
      {
        path: TEST_FILES.INVALID_JSON,
        status: "danger",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await SBOMUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testUploadFilesSequentially("additional files after initial completes", {
    files: [
      {
        path: TEST_FILES.QUARKUS_BOM,
        status: "success",
      },
      {
        path: TEST_FILES.UBI9_MINIMAL,
        status: "success",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await SBOMUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testUploadFilesParallel("multiple files simultaneously", {
    files: [
      {
        path: TEST_FILES.QUARKUS_BOM,
        status: "success",
      },
      {
        path: TEST_FILES.UBI9_MINIMAL,
        status: "success",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await SBOMUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testUploadFilesParallel("mix of success and failed uploads", {
    files: [
      {
        path: TEST_FILES.QUARKUS_BOM,
        status: "success",
      },
      {
        path: TEST_FILES.UBI9_MINIMAL,
        status: "success",
      },
      {
        path: TEST_FILES.INVALID_JSON,
        status: "danger",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await SBOMUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testRemoveFiles({
    files: [
      {
        path: TEST_FILES.QUARKUS_BOM,
        status: "success",
      },
      {
        path: TEST_FILES.UBI9_MINIMAL,
        status: "success",
      },
      {
        path: TEST_FILES.INVALID_JSON,
        status: "danger",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await SBOMUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testInvalidFileExtensions({
    filesPaths: [TEST_FILES.INVALID_TXT],
    getConfig: async ({ page }) => {
      const uploadPage = await SBOMUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });
});
