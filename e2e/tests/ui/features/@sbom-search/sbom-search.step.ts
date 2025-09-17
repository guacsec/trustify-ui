import { createBdd } from "playwright-bdd";
import { expect } from "playwright/test";

import { test } from "../../fixtures";
import { DetailsPage } from "../../helpers/DetailsPage";
import { ToolbarTable } from "../../helpers/ToolbarTable";
import { SbomListPage } from "../../pages/sbom-list/SbomListPage";

export const { Given, When, Then } = createBdd(test);

const SBOM_TABLE_NAME = "sbom-table";

Given("An ingested SBOM {string} is available", async ({ page }, sbomName) => {
  const sbomListPage = await SbomListPage.build(page);

  const toolbar = await sbomListPage.getToolbar();
  const table = await sbomListPage.getTable();

  await toolbar.applyTextFilter("Filter text", sbomName);
  await table.waitUntilDataIsLoaded();
  await table.verifyColumnContainsText("Name", sbomName);
});

Given(
  "An ingested SBOM {string} containing Vulnerabilities",
  async ({ page }, sbomName) => {
    const element = page.locator(
      `xpath=(//tr[contains(.,'${sbomName}')]/td[@data-label='Vulnerabilities']/div)[1]`,
    );
    await expect(element, "SBOM have no vulnerabilities").toHaveText(
      /^(?!0$).+/,
    );
  },
);

When(
  "User Adds Labels {string} to {string} SBOM from List Page",
  async ({ page }, labelList, sbomName) => {
    const toolbarTable = new ToolbarTable(page, SBOM_TABLE_NAME);
    await toolbarTable.editLabelsListPage(sbomName);
    const detailsPage = new DetailsPage(page);

    // Generate random labels if placeholder is used
    const labelsToAdd =
      labelList === "RANDOM_LABELS" ? detailsPage.generateLabels() : labelList;
    await detailsPage.addLabels(labelsToAdd);

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
