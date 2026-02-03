// @ts-check

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
import { LicenseListPage } from "./LicenseListPage";

test.describe("Filter validations", { tag: "@filtering" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  testFilterMatches("Filter partial text match - Apache", {
    filters: { Name: "Apache" },
    assertions: { columnName: "Name", value: "Apache" },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterMatches("Filter partial text match - MIT", {
    filters: { Name: "MIT" },
    assertions: { columnName: "Name", value: "MIT" },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with no results", {
    filters: { Name: "nonexistent-license-12345" },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
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
      Name: "Apache",
    },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
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
      Name: "Apache",
    },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
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

  testFilterMatches("Whitespace variations", {
    filters: { Name: "  Apache  " },
    assertions: { columnName: "Name", value: "Apache" },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterMatches("Empty filter input is handled", {
    filters: { Name: "" },
    assertions: { columnName: "Name", value: "Abstyles License" },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with special characters", {
    filters: {
      Name: "Apache*",
    },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with very long text", {
    filters: {
      Name: "Apache-".repeat(100),
    },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
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
      Name: "Apache",
    },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
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
      Name: "Apache",
    },
    getConfig: async ({ page }) => {
      const listPage = await LicenseListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });
});
