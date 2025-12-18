// @ts-check

import { expect } from "../../../assertions";
import { test } from "../../../fixtures";
import { login } from "../../../helpers/Auth";
import { VulnerabilitiesTab } from "./VulnerabilitiesTab";

test.describe("Pagination validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Navigation button validations", async ({ page }) => {
    const vulnerabilityTab = await VulnerabilitiesTab.build(
      page,
      "quarkus-bom",
    );
    const pagination = await vulnerabilityTab.getPagination();

    // Verify first page
    await expect(pagination).toBeFirstPage();
    await expect(pagination).toHaveNextPage();

    // Navigate to next page
    await pagination.getNextPageButton().click();

    // Verify that previous buttons are enabled after moving to next page
    await expect(pagination).toHavePreviousPage();
  });

  test("Items per page validations", async ({ page }) => {
    const packageTab = await VulnerabilitiesTab.build(page, "quarkus-bom");

    const pagination = await packageTab.getPagination();
    const table = await packageTab.getTable();

    // Validate page with size=10
    await pagination.selectItemsPerPage(10);
    await expect(table).toHaveNumberOfRows({ equal: 10 });

    // Validate page with size=20
    await pagination.selectItemsPerPage(20);
    await expect(table).toHaveNumberOfRows({ greaterThan: 10, lessThan: 21 });
  });
});
