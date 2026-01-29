// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { AdvisoryListPage } from "./AdvisoryListPage";

test.describe("ID column validation", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("ID column", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "CVE-2024-26308" });

    // ID
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");
  });
});
