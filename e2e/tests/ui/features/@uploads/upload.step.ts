import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { FileUpload } from "../../pages/FileUpload";
import { resolveAssetPath } from "../../pages/Helpers";
import { AdvisoryListPage } from "../../pages/advisory-list/AdvisoryListPage";
import { AdvisoryUploadPage } from "../../pages/advisory-upload/AdvisoryUploadPage";
import { SBOMUploadPage } from "../../pages/sbom-upload/SBOMUploadPage";
import { SbomListPage } from "../../pages/sbom-list/SbomListPage";

export const { Given, When, Then } = createBdd(test);

// --- Given (feature-specific) ---

Given("User is on the Upload Advisory page", async ({ page }) => {
  await AdvisoryUploadPage.buildFromBrowserPath(page);
});

Given("User is on the Upload SBOM page", async ({ page }) => {
  await SBOMUploadPage.buildFromBrowserPath(page);
});

// --- When (feature-specific navigation) ---

When("User navigates to the advisory list page", async ({ page }) => {
  await AdvisoryListPage.build(page);
});

When("User navigates to the SBOM list page", async ({ page }) => {
  await SbomListPage.build(page);
});

When(
  "User clicks Upload Advisory button from the toolbar",
  async ({ page }) => {
    const toolbar = page.locator("[aria-label='advisory-toolbar']");
    await expect(toolbar).toBeVisible();
    await toolbar.getByRole("button", { name: "Upload Advisory" }).click();
  },
);

When("User clicks Upload SBOM action from the toolbar", async ({ page }) => {
  const listPage = await SbomListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.clickKebabAction("Upload SBOM");
});

// --- When (shared upload actions) ---

When(
  "User uploads file {string} from {string}",
  async ({ page }, fileName: string, filePath: string) => {
    const fileUploader = await FileUpload.build(page);
    const resolvedPath = resolveAssetPath(filePath, fileName);
    await fileUploader.uploadFiles([resolvedPath]);
  },
);

When(
  "User uploads files {string} from {string}",
  async ({ page }, fileNamesCsv: string, filePath: string) => {
    const fileUploader = await FileUpload.build(page);
    const fileNames = fileNamesCsv.split(",").map((f) => f.trim());
    const resolvedPaths = fileNames.map((fn) => resolveAssetPath(filePath, fn));
    await fileUploader.uploadFiles(resolvedPaths);
  },
);

When(
  "User removes file {string} from the upload list",
  async ({ page }, fileName: string) => {
    const fileUploader = await FileUpload.build(page);
    const statusItem = await fileUploader.getUploadStatusItem(fileName);
    await statusItem.getByRole("button", { name: "Remove from list" }).click();
  },
);

// --- Then (shared assertions) ---

Then(
  "The application navigates to the Upload Advisory page",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/advisories\/upload$/);
  },
);

Then("The application navigates to the Upload SBOM page", async ({ page }) => {
  await expect(page).toHaveURL(/\/sboms\/upload$/);
});

Then(
  "The upload page heading is {string}",
  async ({ page }, heading: string) => {
    await expect(
      page.getByRole("heading", { level: 1, name: heading }),
    ).toBeVisible();
  },
);

Then(
  "The breadcrumb shows {string} link and {string} as active item",
  async ({ page }, linkText: string, activeText: string) => {
    const breadcrumb = page.locator("nav[aria-label='Breadcrumb']");
    await expect(
      breadcrumb.getByRole("link", { name: linkText }),
    ).toBeVisible();
    await expect(breadcrumb.getByText(activeText)).toBeVisible();
  },
);

Then(
  "The supported formats description mentions {string} and {string}",
  async ({ page }, format1: string, format2: string) => {
    const description = page.getByText("Upload a");
    await expect(description).toBeVisible();
    await expect(description).toContainText(format1);
    await expect(description).toContainText(format2);
  },
);

Then("The upload area displays {string}", async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then("The Upload button is visible in the upload area", async ({ page }) => {
  const fileUploader = await FileUpload.build(page);
  await expect(fileUploader.getUploadButton()).toBeVisible();
});

Then(
  "The upload summary shows {string}",
  async ({ page }, summaryText: string) => {
    const match = summaryText.match(/(\d+) of (\d+) files uploaded/);
    if (!match) {
      throw new Error(`Invalid summary format: "${summaryText}"`);
    }
    const successfulFiles = Number(match[1]);
    const totalFiles = Number(match[2]);

    const fileUploader = await FileUpload.build(page);
    await expect(fileUploader).toHaveSummaryUploadStatus({
      successfulFiles,
      totalFiles,
    });
  },
);

Then(
  "The uploaded file {string} shows {string} status",
  async ({ page }, fileName: string, status: string) => {
    const fileUploader = await FileUpload.build(page);
    await expect(fileUploader).toHaveItemUploadStatus({
      fileName,
      status: status as "success" | "danger",
    });
  },
);

Then(
  "The unsupported file modal is displayed containing {string}",
  async ({ page }, fileName: string) => {
    const modal = page.getByRole("dialog", {
      name: "unsupported file upload attempted",
    });
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(fileName);
  },
);
