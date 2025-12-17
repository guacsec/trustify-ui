// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { SbomsTab } from "./SbomsTab";

// Number of items less than 10, cannot tests pagination
test.describe.skip("Pagination validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Navigation button validations", async ({ page }) => {
    const sbomTab = await SbomsTab.build(page, {
      Name: "keycloak-core",
    });
    const pagination = await sbomTab.getPagination();

    // Verify first page
    await expect(pagination).toBeFirstPage();
    await expect(pagination).toHaveNextPage();

    // Navigate to next page
    await pagination.getNextPageButton().click();

    // Verify that previous buttons are enabled after moving to next page
    await expect(pagination).toHavePreviousPage();
  });

  test("Items per page validations", async ({ page }) => {
    const sbomTab = await SbomsTab.build(page, {
      Name: "keycloak-core",
    });

    const pagination = await sbomTab.getPagination();
    const table = await sbomTab.getTable();

    await pagination.validateItemsPerPage("Name", table);
  });
});
