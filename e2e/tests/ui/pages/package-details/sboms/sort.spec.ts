// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { SbomsTab } from "./SbomsTab";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Sort", async ({ page }) => {
    const sbomTab = await SbomsTab.build(page, {
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    const table = await sbomTab.getTable();

    await expect(table).toBeSortedBy("Name", "ascending");

    // Reverse sorting
    await table.clickSortBy("Name");
    await expect(table).toBeSortedBy("Name", "descending");
  });
});
