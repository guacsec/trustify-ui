// @ts-check

import type { Page } from "@playwright/test";

import path from "node:path";
import { expect } from "../../assertions";
import { test } from "../../fixtures";
import type { FileUpload } from "../FileUpload";

/**
 * Configuration for filter test helpers
 */
export interface UploadTestConfig {
  fileUploader: FileUpload;
}

export const testUploadFilesParallel = (
  testName: string,
  {
    files,
    getConfig,
  }: {
    files: {
      path: string;
      status: "success" | "danger";
    }[];
    getConfig: ({ page }: { page: Page }) => Promise<UploadTestConfig>;
  },
) =>
  test(`Upload parallel - ${testName}`, async ({ page }) => {
    const config = await getConfig({ page });
    const fileUploader = config.fileUploader;

    await fileUploader.uploadFiles(files.map((e) => e.path));

    // Summary status
    await expect(fileUploader).toHaveSummaryUploadStatus({
      totalFiles: files.length,
      successfulFiles: files.filter((e) => e.status === "success").length,
    });

    // File status
    for (const file of files) {
      const fileName = path.basename(file.path);
      await expect(fileUploader).toHaveItemUploadStatus({
        fileName,
        status: file.status,
      });
    }
  });

export const testUploadFilesSequentially = (
  testName: string,
  {
    files,
    getConfig,
  }: {
    files: {
      path: string;
      status: "success" | "danger";
    }[];
    getConfig: ({ page }: { page: Page }) => Promise<UploadTestConfig>;
  },
) =>
  test(`Upload sequentially- ${testName}`, async ({ page }) => {
    const config = await getConfig({ page });
    const fileUploader = config.fileUploader;

    let successfulFilesCount = 0;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file.status === "success") {
        successfulFilesCount++;
      }

      // Upload file
      await fileUploader.uploadFiles([file.path]);

      // Summary status
      if (successfulFilesCount > 0) {
        await expect(fileUploader).toHaveSummaryUploadStatus({
          totalFiles: index + 1,
          successfulFiles: successfulFilesCount,
        });
      }

      // File status
      const fileName = path.basename(file.path);
      await expect(fileUploader).toHaveItemUploadStatus({
        fileName,
        status: file.status,
      });
    }
  });

export const testRemoveFiles = ({
  files,
  getConfig,
}: {
  files: {
    path: string;
    status: "success" | "danger";
  }[];
  getConfig: ({ page }: { page: Page }) => Promise<UploadTestConfig>;
}) =>
  test("Remove files sequentially", async ({ page }) => {
    const config = await getConfig({ page });
    const fileUploader = config.fileUploader;

    await fileUploader.uploadFiles(files.map((e) => e.path));

    // Summary status
    let successfulFilesCount = files.filter(
      (e) => e.status === "success",
    ).length;
    await expect(fileUploader).toHaveSummaryUploadStatus({
      totalFiles: files.length,
      successfulFiles: successfulFilesCount,
    });

    // Remove files
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const fileName = path.basename(file.path);
      const statusItem = await fileUploader.getUploadStatusItem(fileName);

      await statusItem
        .getByRole("button", { name: "Remove from list" })
        .click();

      const totalFiles = files.length - index - 1;
      if (file.status === "success") {
        successfulFilesCount--;
      }

      await expect(fileUploader).toHaveSummaryUploadStatus({
        totalFiles,
        successfulFiles: successfulFilesCount,
      });
    }
  });

export const testInvalidFileExtensions = ({
  filesPaths,
  getConfig,
}: {
  filesPaths: string[];
  getConfig: ({ page }: { page: Page }) => Promise<UploadTestConfig>;
}) =>
  test("Error handling", async ({ page }) => {
    const config = await getConfig({ page });
    const fileUploader = config.fileUploader;

    await fileUploader.uploadFiles(filesPaths);

    const invalidFilesModal = page.getByRole("dialog", {
      name: "unsupported file upload attempted",
    });
    await expect(invalidFilesModal).toBeVisible();

    for (const filePath of filesPaths) {
      const fileName = path.basename(filePath);
      await expect(invalidFilesModal).toContainText(fileName);
    }
  });
