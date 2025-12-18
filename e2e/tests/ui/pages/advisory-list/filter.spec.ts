// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { AdvisoryListPage } from "./AdvisoryListPage";

test.describe("Filter validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filters", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "CVE-2024-26308" });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");

    // Date filter
    await toolbar.applyFilter({
      Revision: { from: "03/26/2025", to: "03/28/2025" },
    });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");

    // Labels filter
    await toolbar.applyFilter({ Label: ["type=cve"] });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");
  });
});
