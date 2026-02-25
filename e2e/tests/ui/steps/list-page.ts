import { createBdd } from "playwright-bdd";

import { test } from "../fixtures";

import { expect } from "../assertions";

import { SbomListPage } from "../pages/sbom-list/SbomListPage";

export const { Given, When, Then } = createBdd(test);

Given("An ingested SBOM {string} is available", async ({ page }, sbomName) => {
  const sbomListPage = await SbomListPage.build(page);

  const toolbar = await sbomListPage.getToolbar();
  const table = await sbomListPage.getTable();

  await toolbar.applyFilter({ "Filter text": sbomName });
  await table.waitUntilDataIsLoaded();
  await expect(table).toHaveColumnWithValue("Name", sbomName);
});
