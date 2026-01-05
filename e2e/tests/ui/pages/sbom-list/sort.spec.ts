// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { SbomListPage } from "./SbomListPage";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Sort", async ({ page }) => {
    const listPage = await SbomListPage.build(page);
    const table = await listPage.getTable();

    await expect(table).toBeSortedBy("Name", "ascending");

    // Reverse sorting
    await table.clickSortBy("Name");
    await expect(table).toBeSortedBy("Name", "descending");
  });
});
