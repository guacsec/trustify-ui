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

    await pagination.validatePagination();
  });

  test("Items per page validations", async ({ page }) => {
    const packageTab = await PackagesTab.build(page, "quarkus-bom");

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
