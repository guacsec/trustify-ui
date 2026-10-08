// @ts-check

// NOTE: These imports are relative to e2e/tests/ui/pages/sbom-list/
// To run, copy this file to: e2e/tests/ui/pages/sbom-list/
import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { SbomListPage } from "./SbomListPage";

test.describe("SBOM List - Smoke tests", { tag: "@smoke" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Page loads with correct structure", async ({ page }) => {
    const listPage = await SbomListPage.build(page);
    const table = await listPage.getTable();

    // Table has data
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });

    // Verify expected columns exist by checking a known SBOM
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ "Filter text": "quarkus-bom" });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");
  });

  test("Default sort is Name ascending", async ({ page }) => {
    const listPage = await SbomListPage.build(page);
    const table = await listPage.getTable();

    await expect(table).toBeSortedBy("Name", "ascending");
  });

  test("Filter by text shows matching results", async ({ page }) => {
    const listPage = await SbomListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Filter for quarkus
    await toolbar.applyFilter({ "Filter text": "quarkus" });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");

    // Clear and verify more results return
    await toolbar.clearAllFilters();
    await expect(toolbar).toHaveNoLabels();
    await expect(table).toHaveNumberOfRows({ greaterThan: 1 });
  });

  test("Pagination controls work", async ({ page }) => {
    const listPage = await SbomListPage.build(page);
    const pagination = await listPage.getPagination();
    const table = await listPage.getTable();

    // Set items per page to 10
    await pagination.selectItemsPerPage(10);
    await expect(table).toHaveNumberOfRows({ equal: 10 });

    // Verify first page state
    await expect(pagination).toBeFirstPage();
    await expect(pagination).toHaveNextPage();
  });
});
