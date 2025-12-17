// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { PackageListPage } from "./PackageListPage";

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
    let tableRow = await table.getRowsByCellValue({
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    expect(await tableRow.count()).toBeGreaterThan(0);

    // Type filter
    await toolbar.applyFilter({ Type: ["Maven", "RPM"] });
    tableRow = await table.getRowsByCellValue({
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    expect(await tableRow.count()).toBeGreaterThan(0);

    // Architecture
    await toolbar.applyFilter({ Architecture: ["S390", "No Arch"] });
    await expect(table).toHaveEmptyState();
  });
});
