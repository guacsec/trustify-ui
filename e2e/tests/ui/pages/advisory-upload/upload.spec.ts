import path from "node:path";

import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import {
  testInvalidFileExtensions,
  testRemoveFiles,
  testUploadFilesParallel,
  testUploadFilesSequentially,
} from "../common/upload-test-helpers";
import { AdvisoryUploadPage } from "./AdvisoryUploadPage";

const TEST_FILES = {
  CVE_2022_45787: path.join(
    __dirname,
    "../../../common/dataset/advisory/csaf/cve-2022-45787.json.bz2",
  ),
  CVE_2023_0044: path.join(
    __dirname,
    "../../../common/dataset/advisory/csaf/cve-2023-0044.json.bz2",
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

  testUploadFilesSequentially("CSAF file (.bz2)", {
    files: [
      {
        path: TEST_FILES.CVE_2022_45787,
        status: "success",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
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
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testUploadFilesSequentially("additional files after initial completes", {
    files: [
      {
        path: TEST_FILES.CVE_2022_45787,
        status: "success",
      },
      {
        path: TEST_FILES.CVE_2023_0044,
        status: "success",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testUploadFilesParallel("multiple files simultaneously", {
    files: [
      {
        path: TEST_FILES.CVE_2022_45787,
        status: "success",
      },
      {
        path: TEST_FILES.CVE_2023_0044,
        status: "success",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testUploadFilesParallel("mix of success and failed uploads", {
    files: [
      {
        path: TEST_FILES.CVE_2022_45787,
        status: "success",
      },
      {
        path: TEST_FILES.CVE_2023_0044,
        status: "success",
      },
      {
        path: TEST_FILES.INVALID_JSON,
        status: "danger",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testRemoveFiles({
    files: [
      {
        path: TEST_FILES.CVE_2022_45787,
        status: "success",
      },
      {
        path: TEST_FILES.CVE_2023_0044,
        status: "success",
      },
      {
        path: TEST_FILES.INVALID_JSON,
        status: "danger",
      },
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });

  testInvalidFileExtensions({
    filesPaths: [TEST_FILES.INVALID_TXT],
    getConfig: async ({ page }) => {
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });
});
