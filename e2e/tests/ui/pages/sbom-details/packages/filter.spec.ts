// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { PackagesTab } from "./PackagesTab";

test.describe("Filter validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filters", async ({ page }) => {
    const packageTab = await PackagesTab.build(page, "quarkus-bom");

    const toolbar = await packageTab.getToolbar();
    const table = await packageTab.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "commons-compress" });
    await expect(table).toHaveColumnWithValue("Name", "commons-compress");

    // Labels filter
    await toolbar.applyFilter({ License: ["Apache-2.0", "NOASSERTION"] });
    await expect(table).toHaveColumnWithValue("Name", "commons-compress");
  });
});
