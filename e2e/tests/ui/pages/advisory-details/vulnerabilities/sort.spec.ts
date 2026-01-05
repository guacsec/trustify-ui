// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { VulnerabilitiesTab } from "./VulnerabilitiesTab";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Sort", async ({ page }) => {
    const vulnerabilitiesTab = await VulnerabilitiesTab.build(
      page,
      "CVE-2024-26308",
    );
    const table = await vulnerabilitiesTab.getTable();

    await expect(table).toBeSortedBy("ID", "ascending");

    // Reverse sorting
    await table.clickSortBy("ID");
    await expect(table).toBeSortedBy("ID", "descending");
  });
});
