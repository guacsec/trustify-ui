// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { PackagesTab } from "./PackagesTab";

test.describe("Columns validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Columns", async ({ page }) => {
    const packageTab = await PackagesTab.build(page, "quarkus-bom");

    const toolbar = await packageTab.getToolbar();
    const table = await packageTab.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "commons-compress" });
    await expect(table).toHaveColumnWithValue("Name", "commons-compress");

    // Version
    await expect(table).toHaveColumnWithValue("Version", "1.21.0.redhat-00001");

    // Vulnerabilities
    await expect(
      table._table
        .locator(`td[data-label="Vulnerabilities"]`)
        .locator("div[aria-label='total']"),
    ).toContainText("1");

    // Licenses
    await expect(
      table._table.locator(`td[data-label="Licenses"]`),
    ).toContainText("2 Licenses");

    await table._table
      .locator(`td[data-label="Licenses"] button[aria-expanded]`)
      .click();

    await expect(
      table._table
        .locator(`td[data-label="Licenses"]`)
        .nth(1)
        .locator("ul > li", { hasText: "Apache-2.0" }),
    ).toBeVisible();
    await expect(
      table._table
        .locator(`td[data-label="Licenses"]`)
        .nth(1)
        .locator("ul > li", { hasText: "NOASSERTION" }),
    ).toBeVisible();

    // PURL
    await expect(table).toHaveColumnWithValue(
      "PURLs",
      "pkg:maven/org.apache.commons/commons-compress@1.21.0.redhat-00001?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
    );

    // CPE
    await expect(table).toHaveColumnWithValue("CPEs", "0 CPEs");
  });
});
