// @ts-check

import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { PackageListPage } from "./PackageListPage";
import { expect } from "@playwright/test";

test.describe("Filter validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filters", async ({ page }) => {
    const listPage = await PackageListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "keycloak-core" });
    await table.waitUntilDataIsLoaded();
    let tableRow = table.getRowsByCellValue({
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    await expect(await tableRow.count()).toBeGreaterThan(0);

    // Type filter
    await toolbar.applyFilter({ Type: ["Maven", "RPM"] });
    await table.waitUntilDataIsLoaded();
    tableRow = table.getRowsByCellValue({
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    await expect(await tableRow.count()).toBeGreaterThan(0);

    // Architecture
    await toolbar.applyFilter({ Architecture: ["S390", "No Arch"] });
    await table.waitUntilDataIsLoaded();
    await table.verifyTableHasNoData();
  });
});
