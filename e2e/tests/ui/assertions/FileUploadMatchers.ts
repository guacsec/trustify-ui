import { expect as baseExpect } from "@playwright/test";
import type { FileUpload } from "../pages/FileUpload";
import type { MatcherResult } from "./types";

export interface FileUploadMatchers {
  toHaveSummaryUploadStatus(expectedStatus: {
    successfulFiles: number;
    totalFiles: number;
  }): Promise<MatcherResult>;
  toHaveItemUploadStatus(expectedStatus: {
    fileName: string;
    status: "success" | "danger";
  }): Promise<MatcherResult>;
}

type FileUploadMatcherDefinitions = {
  readonly [K in keyof FileUploadMatchers]: (
    receiver: FileUpload,
    ...args: Parameters<FileUploadMatchers[K]>
  ) => Promise<MatcherResult>;
};

export const fileUploadAssertions =
  baseExpect.extend<FileUploadMatcherDefinitions>({
    toHaveSummaryUploadStatus: async (
      fileUpload: FileUpload,
      expectedStatus: {
        successfulFiles: number;
        totalFiles: number;
      },
    ): Promise<MatcherResult> => {
      try {
        await baseExpect(
          fileUpload._uploader.locator(
            ".pf-v6-c-multiple-file-upload__status .pf-v6-c-expandable-section__toggle",
          ),
        ).toContainText(
          `${expectedStatus.successfulFiles} of ${expectedStatus.totalFiles} files uploaded`,
        );

        return {
          pass: true,
          message: () => "Uploader has expected summary status",
        };
      } catch (error) {
        return {
          pass: false,
          message: () =>
            error instanceof Error ? error.message : String(error),
        };
      }
    },
    toHaveItemUploadStatus: async (
      fileUpload: FileUpload,
      expectedStatus: {
        fileName: string;
        status: "success" | "danger";
      },
    ): Promise<MatcherResult> => {
      try {
        const statusItem = await fileUpload.getUploadStatusItem(
          expectedStatus.fileName,
        );
        await baseExpect(
          statusItem.locator(`.pf-v6-c-progress.pf-m-${expectedStatus.status}`),
        ).toBeVisible();
        await baseExpect(
          statusItem.locator(".pf-v6-c-progress__status", { hasText: "100%" }),
        ).toBeVisible();

        return {
          pass: true,
          message: () => "Uploader has item with expected status",
        };
      } catch (error) {
        return {
          pass: false,
          message: () =>
            error instanceof Error ? error.message : String(error),
        };
      }
    },
  });
