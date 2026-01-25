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

test.describe("File Upload", { tag: ["@upload"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  testUploadFilesSequentially("CSAF file (.bz2)", {
    files: [
      {
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2022-45787.json.bz2",
        ),
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
        path: path.join(__dirname, "../../../common/assets/invalid-file.json"),
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
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2022-45787.json.bz2",
        ),
        status: "success",
      },
      {
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2023-0044.json.bz2",
        ),
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
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2022-45787.json.bz2",
        ),
        status: "success",
      },
      {
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2023-0044.json.bz2",
        ),
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
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2022-45787.json.bz2",
        ),
        status: "success",
      },
      {
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2023-0044.json.bz2",
        ),
        status: "success",
      },
      {
        path: path.join(__dirname, "../../../common/assets/invalid-file.json"),
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
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2022-45787.json.bz2",
        ),
        status: "success",
      },
      {
        path: path.join(
          __dirname,
          "../../../common/dataset/advisory/csaf/cve-2023-0044.json.bz2",
        ),
        status: "success",
      },
      {
        path: path.join(__dirname, "../../../common/assets/invalid-file.json"),
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
    filesPaths: [
      path.join(__dirname, "../../../common/assets/invalid-file.txt"),
    ],
    getConfig: async ({ page }) => {
      const uploadPage = await AdvisoryUploadPage.buildFromBrowserPath(page);
      const fileUploader = await uploadPage.getFileUploader();
      return { fileUploader };
    },
  });
});
