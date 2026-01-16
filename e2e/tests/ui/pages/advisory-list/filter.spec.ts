// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import {
  testBrowserNavigationBackAndForward,
  testClearAllFilters,
  testFilterMatches,
  testFilterShowsEmptyState,
  testRemovalOfFiltersFromToolbar,
  testUrlPersistence,
} from "../common/filter-test-helpers";
import { AdvisoryListPage } from "./AdvisoryListPage";

test.describe("Filter validations", { tag: ["@filtering"] }, () => {
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

  testFilterMatches("Filter partial text match", {
    filters: { "Filter text": "CVE-2024" },
    assertions: { columnName: "ID", value: "CVE-2024-29025" },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with non existent advisory", {
    filters: { "Filter text": "nonexistent-advisory-12345" },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testClearAllFilters({
    filters: {
      "Filter text": "text",
      Revision: { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=cve"],
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testRemovalOfFiltersFromToolbar({
    filters: {
      "Filter text": "text",
      Revision: { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=cve"],
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });
});

test.describe("Filter edge cases", { tag: ["@filtering"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  testFilterShowsEmptyState("Filter with special characters in text", {
    filters: {
      "Filter text": "CVE-2024*",
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with very long text string", {
    filters: {
      "Filter text": "CVE-".repeat(100),
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterMatches("Whitespace variations", {
    filters: { "Filter text": "  CVE-2024  " },
    assertions: { columnName: "ID", value: "CVE-2024-29025" },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with same start and end date", {
    filters: {
      Revision: { from: "03/27/2025", to: "03/27/2025" },
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with future date range", {
    filters: {
      Revision: { from: "01/01/2030", to: "12/31/2030" },
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterMatches("Empty filter input is handled", {
    filters: { "Filter text": "" },
    assertions: { columnName: "ID", value: "CVE-2024-29025" },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });
});

test.describe("Filter state persistence", { tag: ["@filtering"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  testUrlPersistence({
    filters: {
      "Filter text": "CVE-2024-26308",
      Revision: { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=cve", "type=osv"],
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testBrowserNavigationBackAndForward({
    filters: {
      "Filter text": "CVE-2024-26308",
      Revision: { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=cve", "type=osv"],
    },
    getConfig: async ({ page }) => {
      const listPage = await AdvisoryListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });
});
