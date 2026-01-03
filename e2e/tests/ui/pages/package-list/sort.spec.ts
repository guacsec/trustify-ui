// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { PackageListPage } from "./PackageListPage";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Sort", async ({ page }) => {
    const listPage = await PackageListPage.build(page);
    const table = await listPage.getTable();

    // Name Asc
    await expect(table).toBeSortedBy("Name", "ascending");

    // Name Desc
    await table.clickSortBy("Name");
    await expect(table).toBeSortedBy("Name", "descending");
  });
});
