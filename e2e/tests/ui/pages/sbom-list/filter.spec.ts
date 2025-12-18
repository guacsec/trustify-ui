// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { SbomListPage } from "./SbomListPage";

test.describe("Filter validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filters", async ({ page }) => {
    const listPage = await SbomListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "quarkus" });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");

    // Date filter
    await toolbar.applyFilter({
      "Created on": { from: "11/21/2023", to: "11/23/2023" },
    });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");

    // Labels filter
    await toolbar.applyFilter({ Label: ["type=spdx"] });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");
  });
});
