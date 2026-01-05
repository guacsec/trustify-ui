// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { PackagesTab } from "./PackagesTab";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Sort", async ({ page }) => {
    const packageTab = await PackagesTab.build(page, "quarkus-bom");
    const table = await packageTab.getTable();

    await expect(table).toBeSortedBy("Name", "ascending");

    // Reverse sorting
    await table.clickSortBy("Name");
    await expect(table).toBeSortedBy("Name", "descending");
  });
});
