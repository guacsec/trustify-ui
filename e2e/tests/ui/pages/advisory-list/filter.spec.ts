// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { Navigation } from "../Navigation";
import { AdvisoryListPage } from "./AdvisoryListPage";

test.describe("Filter validations", { tag: ["@tier1", "@filtering"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filters", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "CVE-2024-26308" });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");

    // Date filter
    await toolbar.applyFilter({
      Revision: { from: "03/26/2025", to: "03/28/2025" },
    });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");

    // Labels filter
    await toolbar.applyFilter({ Label: ["type=cve"] });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");
  });

  test("Filter with partial text match", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Test partial text search
    await toolbar.applyFilter({ "Filter text": "CVE-2024" });
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024");
  });

  test("Filter with no results shows empty state", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Apply filter that should return no results
    await toolbar.applyFilter({ "Filter text": "nonexistent-advisory-12345" });
    await expect(table).toHaveEmptyState();
  });

  test("Filter with wide date range", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Test with a wide date range
    await toolbar.applyFilter({
      Revision: { from: "01/01/2024", to: "12/31/2025" },
    });
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });
  });

  test("Filter with labels", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    await toolbar.applyFilter({ Label: ["type=cve"] });
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });
  });

  test("Clear all filters button removes all applied filters", async ({
    page,
  }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Apply multiple filters at once
    await toolbar.applyFilter({
      "Filter text": "CVE-2024",
      Revision: { from: "01/01/2024", to: "12/31/2025" },
      Label: ["type=cve"],
    });
    await expect(table).toHaveNumberOfRows({ lessThan: 5 });

    // Clear all filters
    await toolbar.clearAllFilters();

    // Should show more results (not filtered)
    await expect(table).toHaveNumberOfRows({ equal: 10 });
  });

  test("Remove individual filter chip updates results", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Assert initial rows
    await expect(table).toHaveNumberOfRows({ greaterThan: 1 });

    // Apply specific text filter
    await toolbar.applyFilter({ Label: ["type=cve", "type=csaf"] });
    await expect(table).toHaveEmptyState();

    // Remove the filter chip
    await toolbar.removeFilterChip("Label", "type=cve");

    // Table should update - should have more results now
    await expect(table).toHaveNumberOfRows({ greaterThan: 1 });
  });

  test("Remove entire filter group removes all filters in category", async ({
    page,
  }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Apply multiple filters across different categories
    await toolbar.applyFilter({ "Filter text": "CVE-2024" });
    await expect(table).toHaveNumberOfRows({ greaterThan: 1 });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024");

    // Add label filter
    await toolbar.applyFilter({ Label: ["type=cve", "type=csaf"] });
    await expect(table).toHaveEmptyState();

    // Remove entire Label group
    await toolbar.removeFilterGroup("Label");

    // Only "Label" filter should be removed
    await expect(toolbar).toHaveLabels({ "Filter text": "CVE-2024" });
    await expect(table).toHaveNumberOfRows({ greaterThan: 1 });
    await expect(table).toHaveColumnWithValue("ID", "CVE-2024");
  });

  test("Remove multiple filter groups sequentially", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);

    const toolbar = await listPage.getToolbar();

    // Apply multiple filters across different categories
    await toolbar.applyFilter({
      "Filter text": "CVE-2024",
      Label: ["type=cve", "type=csaf"],
      Revision: { from: "03/26/2025", to: "03/28/2025" },
    });

    // Remove entire Label group
    await toolbar.removeFilterGroup("Label");
    await toolbar.removeFilterGroup("Filter text");

    // Only "Revision" should remain
    await expect(toolbar).toHaveLabels({
      Revision: { from: "03/26/2025", to: "03/28/2025" },
    });
    await expect(toolbar).not.toHaveLabels({
      "Filter text": "CVE-2024",
      Label: ["type=cve", "type=csaf"],
    });
  });
});

test.describe(
  "URL state persistence",
  { tag: ["@tier1", "@filtering"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
    });

    test("Filters persist in URL and survive page reload", async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();

      // Apply filter
      await toolbar.applyFilter({ "Filter text": "CVE-2024-26308" });
      await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");

      // Verify URL contains filter params
      expect(page.url()).toContain("CVE-2024-26308");

      // Reload page
      await page.reload();
      await page.waitForLoadState("networkidle");

      // Verify filter is still active after reload
      await expect(table).toHaveColumnWithValue("ID", "CVE-2024-26308");
      await expect(toolbar).toHaveLabels({
        "Filter text": "CVE-2024-26308",
      });
    });

    test("Browser navigation (back/forward/goto) maintains filter state", async ({
      page,
    }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();

      // Apply multiple filters
      await toolbar.applyFilter({
        "Filter text": "CVE-2024",
        Label: ["type=cve"],
      });

      const urlWithFilters = page.url();

      // Navigate away
      const navigation = await Navigation.build(page);
      await navigation.goToSidebar("Importers");
      await page.waitForLoadState("networkidle");

      // Test 1: Direct URL navigation
      await page.goto(urlWithFilters);
      await page.waitForLoadState("networkidle");
      await expect(toolbar).toHaveLabels({
        "Filter text": "CVE-2024",
        Label: ["type=cve"],
      });
      await expect(table).toHaveNumberOfRows({ greaterThan: 0 });

      // Navigate away again
      await navigation.goToSidebar("Importers");
      await page.waitForLoadState("networkidle");

      // Test 2: Back button
      await page.goBack();
      await page.waitForLoadState("networkidle");
      await expect(toolbar).toHaveLabels({
        "Filter text": "CVE-2024",
        Label: ["type=cve"],
      });

      // Test 3: Back then forward button
      await page.goBack();
      await page.waitForLoadState("networkidle");
      await page.goForward();
      await page.waitForLoadState("networkidle");
      await expect(toolbar).toHaveLabels({
        "Filter text": "CVE-2024",
        Label: ["type=cve"],
      });
    });
  },
);

test.describe("Filter edge cases", { tag: ["@tier1", "@filtering"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filter with special characters in text", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Test with special characters
    await toolbar.applyFilter({ "Filter text": "CVE-2024*" });

    // These filters produce no matches and show a stable empty state.
    await expect(table).toHaveEmptyState();
  });

  test("Filter with very long text string", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    const longString = "CVE-".repeat(100);
    await toolbar.applyFilter({ "Filter text": longString });

    // Should handle gracefully
    await expect(table).toHaveEmptyState();
  });

  test("Filter with whitespace variations", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Test leading/trailing whitespace
    await toolbar.applyFilter({ "Filter text": "  CVE-2024  " });

    // Should either trim and find results or handle gracefully
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });
  });

  test("Filter with same start and end date", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Apply date filter with same date for start and end
    await toolbar.applyFilter({
      Revision: { from: "03/27/2025", to: "03/27/2025" },
    });

    // Should handle single-day range
    await expect(table).toHaveEmptyState();
  });

  test("Filter with future date range", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Apply date filter in the future
    await toolbar.applyFilter({
      Revision: { from: "01/01/2030", to: "12/31/2030" },
    });

    // Should show empty state as no data exists for future dates
    await expect(table).toHaveEmptyState();
  });

  test("Empty filter input is handled gracefully", async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Note: The Toolbar.applyFilter skips empty values, so this tests that behavior
    await toolbar.applyFilter({ "Filter text": "" });

    // Should show all results (not filtered)
    await expect(table).toHaveNumberOfRows({ equal: 10 });
  });
});

test.describe(
  "Filter integration tests",
  { tag: ["@tier1", "@filtering"] },
  () => {
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

    test("Pagination resets to page 1 when filter changes", async ({
      page,
    }) => {
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
  },
);
