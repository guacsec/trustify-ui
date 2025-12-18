// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { VulnerabilitiesTab } from "./VulnerabilitiesTab";

// Table has no filters
test.describe.skip("Filter validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.skip("Filters", async ({ page }) => {
    const vulnerabilityTab = await VulnerabilitiesTab.build(
      page,
      "quarkus-bom",
    );

    const toolbar = await vulnerabilityTab.getToolbar();
    const table = await vulnerabilityTab.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "CVE-2023-4853" });
    await expect(table).toHaveColumnWithValue("Id", "CVE-2023-4853");

    // Labels filter
    await toolbar.applyFilter({ Severity: ["High"] });
    await expect(table).toHaveColumnWithValue("Id", "CVE-2023-4853");
  });
});
