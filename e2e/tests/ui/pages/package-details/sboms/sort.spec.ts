// @ts-check

import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { SbomsTab } from "./SbomsTab";
import { expectSort } from "../../Helpers";

test.describe("Sort validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  //here
  test("Sort", async ({ page }) => {
    const sbomTab = await SbomsTab.build(page, {
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    const table = await sbomTab.getTable();

    const columnNameSelector = table._table.locator(`td[data-label="Name"]`);

    const ascList = await columnNameSelector.allInnerTexts();
    expectSort(ascList, true);

    // Reverse sorting
    await table.clickSortBy("Name");
    const descList = await columnNameSelector.allInnerTexts();
    expectSort(descList, false);
  });
});
