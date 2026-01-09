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

      // Apply filter
      await toolbar.applyFilter({ "Filter text": "CVE-2024-26308" });

      // Verify URL contains filter params
      expect(page.url()).toContain("CVE-2024-26308");

      // Reload page
      await page.reload();
      await page.waitForLoadState("networkidle");

      // Verify filter is still active after reload
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

