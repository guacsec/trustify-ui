// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { PackagesTab } from "./PackagesTab";

test.describe("Pagination validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Navigation button validations", async ({ page }) => {
    const packageTab = await PackagesTab.build(page, "quarkus-bom");
    const pagination = await packageTab.getPagination();

    // Verify first page
    await expect(pagination).toBeFirstPage();
    await expect(pagination).toHaveNextPage();

    // Navigate to next page
    await pagination.getNextPageButton().click();

    // Verify that previous buttons are enabled after moving to next page
    await expect(pagination).toHavePreviousPage();
  });

  test("Items per page validations", async ({ page }) => {
    const packageTab = await PackagesTab.build(page, "quarkus-bom");

    const pagination = await packageTab.getPagination();
    const table = await packageTab.getTable();

    await pagination.validateItemsPerPage("Name", table);
  });
});
