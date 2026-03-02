// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { LicenseListPage } from "./LicenseListPage";

test.describe("Columns validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Columns", async ({ page }) => {
    const listPage = await LicenseListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    await toolbar.applyFilter({ Name: "Apache-2.0" });

    // Name
    await expect(table).toHaveColumnWithValue("Name", "Apache-2.0");

    // Packages
    await expect(table).toHaveColumnWithValue("Packages", /\d+ Package(s)?/);

    // SBOMs
    await expect(table).toHaveColumnWithValue("SBOMs", /\d+ SBOM(s)?/);
  });
});
