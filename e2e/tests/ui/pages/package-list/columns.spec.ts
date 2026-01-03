// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { PackageListPage } from "./PackageListPage";

test.describe("Columns validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Columns", async ({ page }) => {
    const listPage = await PackageListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "keycloak-core" });
    const tableRow = await table.getRowsByCellValue({
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });

    // Namespace
    await expect(table).toHaveColumnWithValue("Namespace", "org.keycloak");

    // Version
    await expect(table).toHaveColumnWithValue("Version", "18.0.6.redhat-00001");

    // Type
    await expect(table).toHaveColumnWithValue("Type", "maven");

    // Qualifiers
    await expect(table).toHaveColumnWithValue("Qualifiers", "type=jar");
    await expect(table).toHaveColumnWithValue(
      "Qualifiers",
      "repository_url=https://maven.repository.redhat.com/ga/",
    );

    // Vulnerabilities
    await expect(
      tableRow
        .locator(`td[data-label="Vulnerabilities"]`)
        .locator("div[aria-label='total']"),
    ).toContainText("1");
    await expect(
      tableRow
        .locator(`td[data-label="Vulnerabilities"]`)
        .locator("div[aria-label='medium']"),
    ).toContainText("1");
  });
});
