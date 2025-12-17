// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { PackageListPage } from "./PackageListPage";

test.describe("Pagination validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Navigation button validations", async ({ page }) => {
    const listPage = await PackageListPage.build(page);
    const pagination = await listPage.getPagination();

    await pagination.validatePagination();
  });

  test("Items per page validations", async ({ page }) => {
    const listPage = await PackageListPage.build(page);

    const pagination = await listPage.getPagination();
    const table = await listPage.getTable();

    // Validate page with size=10
    await pagination.selectItemsPerPage(10);
    await expect(table).toHaveNumberOfRows({ equal: 10 });

    // Validate page with size=20
    await pagination.selectItemsPerPage(20);
    await expect(table).toHaveNumberOfRows({ greaterThan: 10, lessThan: 21 });
  });
});
