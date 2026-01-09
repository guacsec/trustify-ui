// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { AdvisoryListPage } from "./AdvisoryListPage";

test.describe("Filter + Pagination + Sorting", { tag: ["@tier1"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filter persists across pagination and sort interactions", async ({
    page,
  }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();
    const pagination = await listPage.getPagination();

    // Apply filter
    await toolbar.applyFilter({ "Filter text": "CVE-2023" });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2023");

    // Change sort - filter should persist
    await table.clickSortBy("ID");
    await expect(toolbar).toHaveLabels({ "Filter text": "CVE-2023" });
    await expect(table).toBeSortedBy("ID", "ascending");
    await expect(table).toHaveColumnWithValue("ID", "CVE-2023");

    // Navigate to next page - filter and sort should persist
    await pagination.getNextPageButton().click();
    await expect(toolbar).toHaveLabels({ "Filter text": "CVE-2023" });
    await expect(table).toBeSortedBy("ID", "ascending");
    await expect(pagination).toHavePreviousPage();
    await expect(table).toHaveColumnWithValue("ID", "CVE-2023");

    // Toggle sort order - filter should still persist
    await table.clickSortBy("ID");
    await expect(table).toBeSortedBy("ID", "descending");
    await expect(toolbar).toHaveLabels({ "Filter text": "CVE-2023" });
  });

  test("Pagination resets to page 1 when filter changes", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();
    const pagination = await listPage.getPagination();

    // Navigate to next page
    await pagination.getNextPageButton().click();

    // Verify we're not on first page
    await expect(pagination).toHavePreviousPage();
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });

    // Apply filter - should reset to page 1
    await toolbar.applyFilter({ "Filter text": "CVE-2024" });

    // Should be back on page 1 (prev/first buttons disabled)
    await expect(pagination).toBeFirstPage();
  });

  test("Multiple filters with pagination and sort", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();
    const pagination = await listPage.getPagination();

    // Apply multiple filters
    await toolbar.applyFilter({
      "Filter text": "CVE-2023",
      Label: ["type=cve"],
    });

    // Apply sort
    await table.clickSortBy("ID");

    // Navigate to next page
    await pagination.getNextPageButton().click();

    // All three should be active
    await expect(toolbar).toHaveLabels({
      "Filter text": "CVE-2023",
      Label: ["type=cve"],
    });
    await expect(table).toBeSortedBy("ID", "ascending");
    await expect(pagination).toHavePreviousPage();

    // Results should still be filtered
    await expect(table).toHaveColumnWithValue("ID", "CVE-2023");
  });

  test("Removing filter maintains sort", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Apply filter and sort
    await toolbar.applyFilter({ "Filter text": "CVE-2024" });
    await table.clickSortBy("ID");

    // Verify both are active
    await expect(table).toBeSortedBy("ID", "ascending");
    await expect(toolbar).toHaveLabels({ "Filter text": "CVE-2024" });

    // Remove filter
    await toolbar.removeFilterChip("Filter text", "CVE-2024");

    // Sort should still be active
    await expect(table).toBeSortedBy("ID", "ascending");
  });

  test("Progressive filter narrowing reduces result count", async ({
    page,
  }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Initial count
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });

    // Apply first filter
    await toolbar.applyFilter({ "Filter text": "CVE-2024" });

    // Should narrow results
    await expect(table).toHaveNumberOfRows({ equal: 3 });

    // Add label filter
    await toolbar.applyFilter({ Label: ["type=cve"] });
    await expect(table).toHaveNumberOfRows({ equal: 2 });
  });

  test("Filter with pagination navigation works correctly", async ({
    page,
  }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();
    const pagination = await listPage.getPagination();

    // Apply filter
    await toolbar.applyFilter({ "Filter text": "CVE-2024" });

    // Verify initial state - should be on first page
    await expect(pagination).toBeFirstPage();

    // If there are enough results, next button should be enabled
    const nextButton = pagination.getNextPageButton();
    const isNextEnabled = await nextButton.isEnabled();

    if (isNextEnabled) {
      // Navigate to next page
      await nextButton.click();
      await table.waitUntilDataIsLoaded();

      // Should have previous page available now
      await expect(pagination).toHavePreviousPage();

      // Navigate back
      await pagination.getPreviousPageButton().click();
      await table.waitUntilDataIsLoaded();

      // Should be on first page again
      await expect(pagination).toBeFirstPage();
    }
  });
});
