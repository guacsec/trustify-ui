// @ts-check

import { expect } from "@playwright/test";

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
    await expect(tableRow.locator(`td[data-label="Namespace"]`)).toContainText(
      "org.keycloak",
    );

    // Version
    await expect(tableRow.locator(`td[data-label="Version"]`)).toContainText(
      "18.0.6.redhat-00001",
    );

    // Type
    await expect(tableRow.locator(`td[data-label="Type"]`)).toContainText(
      "maven",
    );

    // Qualifiers
    await expect(tableRow.locator(`td[data-label="Qualifiers"]`)).toContainText(
      "type=jar",
    );
    await expect(tableRow.locator(`td[data-label="Qualifiers"]`)).toContainText(
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
