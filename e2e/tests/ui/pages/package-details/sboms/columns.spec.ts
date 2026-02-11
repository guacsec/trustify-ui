// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { SbomsTab } from "./SbomsTab";

test.describe("Columns validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

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
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom", idIndex);

    // Version
    await expect(table).toHaveColumnWithValue(
      "Version",
      "2.13.8.Final-redhat-00004",
      idIndex,
    );

    // Supplier
    await expect(table).toHaveColumnWithValue(
      "Supplier",
      "Organization: Red Hat",
      idIndex,
    );
  });
});
