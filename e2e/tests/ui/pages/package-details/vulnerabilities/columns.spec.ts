// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { VulnerabilitiesTab } from "./VulnerabilitiesTab";

test.describe("Columns validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Columns", async ({ page }) => {
    const vulnerabilitiesTab = await VulnerabilitiesTab.build(page, {
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    const table = await vulnerabilitiesTab.getTable();

    const ids = await table._table
      .locator(`td[data-label="ID"]`)
      .allInnerTexts();
    const idIndex = ids.indexOf("CVE-2023-1664");
    expect(idIndex).not.toBe(-1);

    // ID
    await expect(table).toHaveColumnWithValue("ID", "CVE-2023-1664", idIndex);

    // CVSS
    await expect(table).toHaveColumnWithValue("CVSS", "Medium(6.5)", idIndex);
  });
});
