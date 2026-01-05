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
    const vulnerabilitiesTab = await VulnerabilitiesTab.build(
      page,
      "CVE-2024-26308",
    );
    const table = await vulnerabilitiesTab.getTable();

    const ids = await table._table
      .locator(`td[data-label="ID"]`)
      .allInnerTexts();
    const idIndex = ids.indexOf("CVE-2024-26308");
    expect(idIndex).not.toBe(-1);

    // ID
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308", idIndex);

    // Title
    await expect(table).toHaveColumnWithValue(
      "Title",
      "Apache Commons Compress: OutOfMemoryError unpacking broken Pack200 file",
      idIndex,
    );

    // CWE
    await expect(table).toHaveColumnWithValue("CWE", "CWE-770", idIndex);
  });
});
