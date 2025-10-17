// @ts-check

import { expect } from "@playwright/test";

import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { SbomsTab } from "./SbomsTab";

test.describe("Columns validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  //here
  test("Columns", async ({ page }) => {
    const sbomTab = await SbomsTab.build(page, {
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    const table = await sbomTab.getTable();

    const ids = await table._table
      .locator(`td[data-label="Name"]`)
      .allInnerTexts();
    const idIndex = ids.indexOf("quarkus-bom");
    expect(idIndex).not.toBe(-1);

    // Name
    await expect(
      table._table.locator(`td[data-label="Name"]`).nth(idIndex),
    ).toContainText("quarkus-bom");

    // Version
    await expect(
      table._table.locator(`td[data-label="Version"]`).nth(idIndex),
    ).toContainText("2.13.8.Final-redhat-00004");

    // Supplier
    await expect(
      table._table.locator(`td[data-label="Supplier"]`).nth(idIndex),
    ).toContainText("Organization: Red Hat");
  });
});
