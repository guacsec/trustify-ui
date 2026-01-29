import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { DetailsPage } from "../../helpers/DetailsPage";

import { SbomListPage } from "../../pages/sbom-list/SbomListPage";
import { LabelsModal } from "../../pages/LabelsModal";

export const { Given, When, Then } = createBdd(test);

Given(
  "An ingested SBOM {string} containing Vulnerabilities",
  async ({ page }, sbomName) => {
    const listPage = await SbomListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    await toolbar.applyFilter({ "Filter text": sbomName });
    await expect(table).toHaveColumnWithValue("Name", sbomName);

    // Check vulnerabilities column has non-zero value
    const vulnColumn = await table.getColumn("Vulnerabilities");
    await expect(vulnColumn.first()).not.toHaveText("0");
  },
);

When(
  "User Adds Labels {string} to {string} SBOM from List Page",
  async ({ page }, labelList, sbomName) => {
    const listPage = await SbomListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    await toolbar.applyFilter({ "Filter text": sbomName });
    await expect(table).toHaveColumnWithValue("Name", sbomName);

    await table.clickAction("Edit labels", 0);

    const labelsModal = await LabelsModal.build(page);
    const detailsPage = new DetailsPage(page);

    // Generate random labels if placeholder is used
    const labelsToAdd =
      labelList === "RANDOM_LABELS" ? detailsPage.generateLabels() : labelList;
    const labelsArray = labelsToAdd.split(",").map((l: string) => l.trim());

    await labelsModal.addLabels(labelsArray);
    await labelsModal.clickSave();

    // Store generated labels for verification
    // biome-ignore lint/suspicious/noExplicitAny: allowed
    (page as any).testContext = {
      // biome-ignore lint/suspicious/noExplicitAny: allowed
      ...(page as any).testContext,
      generatedLabels: labelsToAdd,
    };
  },
);

Then(
  "The Label list {string} added to the SBOM {string} on List Page",
  async ({ page }, labelList, sbomName) => {
    const detailsPage = new DetailsPage(page);

    // Use stored generated labels if placeholder was used
    const labelsToVerify =
      labelList === "RANDOM_LABELS"
        ? // biome-ignore lint/suspicious/noExplicitAny: allowed
          (page as any).testContext?.generatedLabels || labelList
        : labelList;
    await detailsPage.verifyLabels(labelsToVerify, sbomName);
  },
);
