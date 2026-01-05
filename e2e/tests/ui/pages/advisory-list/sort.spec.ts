// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { AdvisoryListPage } from "./AdvisoryListPage";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  // TODO: enable after https://github.com/trustification/trustify/issues/1810 is fixed
  test.skip("Sort", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const table = await listPage.getTable();

    // ID Asc
    await table.clickSortBy("ID");
    await expect(table).toBeSortedBy("ID", "ascending");

    // ID Desc
    await table.clickSortBy("ID");
    await expect(table).toBeSortedBy("ID", "descending");
  });
});
