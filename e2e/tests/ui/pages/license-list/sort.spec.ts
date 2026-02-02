// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { LicenseListPage } from "./LicenseListPage";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Default ascending sort by Name column", async ({ page }) => {
    const listPage = await LicenseListPage.build(page);
    const table = await listPage.getTable();

    await expect(table).toBeSortedBy("Name", "ascending");
  });

  test("Toggle to descending sort", async ({ page }) => {
    const listPage = await LicenseListPage.build(page);
    const table = await listPage.getTable();

    // Reverse sorting
    await table.clickSortBy("Name");
    await expect(table).toBeSortedBy("Name", "descending");
  });
});
