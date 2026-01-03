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
    const vulnerabilityTab = await VulnerabilitiesTab.build(
      page,
      "quarkus-bom",
    );
    const table = await vulnerabilityTab.getTable();

    await expect(table).toBeSortedBy("Id", "ascending");

    // Reverse sorting
    await table.clickSortBy("Id");
    await expect(table).toBeSortedBy("Id", "descending");
  });
});
