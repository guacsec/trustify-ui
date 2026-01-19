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
    const vulnerabilityTab = await VulnerabilitiesTab.build(
      page,
      "quarkus-bom",
    );

    const table = await vulnerabilityTab.getTable();

    const ids = await table._table
      .locator(`td[data-label="Id"]`)
      .allInnerTexts();
    const idIndex = ids.indexOf("CVE-2023-4853");
    expect(idIndex).not.toBe(-1);

    // Id
    await expect(table).toHaveColumnWithValue("Id", "CVE-2023-4853", idIndex);

    // Description
    await expect(table).toHaveColumnWithValue(
      "Description",
      "quarkus: HTTP security policy bypass",
      idIndex,
    );

    // CVSS
    await expect(table).toHaveColumnWithValue("CVSS", "High(8.1)", idIndex);

    // Affected dependencies
    await expect(table).toHaveColumnWithValue(
      "Affected dependencies",
      "3",
      idIndex,
    );

    const expandedCell = await table.expandCell(
      "Affected dependencies",
      idIndex,
    );

    await expect(expandedCell).toContainText("quarkus-undertow");
    await expect(expandedCell).toContainText("quarkus-keycloak-authorization");
    await expect(expandedCell).toContainText("quarkus-vertx-http");
  });
});
