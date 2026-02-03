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
import { PackageListPage } from "./PackageListPage";

test.describe("Filter validations", { tag: ["@filtering"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filters", async ({ page }) => {
    const listPage = await PackageListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "keycloak-core" });
    let tableRow = await table.getRowsByCellValue({
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    await expect(tableRow.count()).resolves.toBeGreaterThan(0);

    // Type filter
    await toolbar.applyFilter({ Type: ["Maven", "RPM"] });
    tableRow = await table.getRowsByCellValue({
      Name: "keycloak-core",
      Version: "18.0.6.redhat-00001",
    });
    await expect(tableRow.count()).resolves.toBeGreaterThan(0);

    // Architecture
    await toolbar.applyFilter({ Architecture: ["S390", "No Arch"] });
    await expect(table).toHaveEmptyState();
  });

  testFilterMatches("Filter partial text match", {
    filters: { "Filter text": "keycloak" },
    assertions: { columnName: "Name", value: "keycloak-adapter-core" },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with non existent package", {
    filters: { "Filter text": "nonexistent-package-12345" },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
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
      "Filter text": "keycloak",
      Type: ["Maven", "RPM"],
      Architecture: ["No Arch"],
    },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
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
      "Filter text": "keycloak",
      Type: ["Maven", "RPM"],
      Architecture: ["No Arch"],
    },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
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
      "Filter text": "keycloak*",
    },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
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
      "Filter text": "keycloak-".repeat(100),
    },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterMatches("Whitespace variations", {
    filters: { "Filter text": "  keycloak-core  " },
    assertions: { columnName: "Name", value: "keycloak-core" },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
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
    assertions: { columnName: "Name", value: "accordion" },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
      // const pagination = await listPage.getPagination();
      // await pagination.selectItemsPerPage(20);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      const rows = table._table.locator(
        `td[data-label="${table._columns[0]}"]`,
      );
      console.log("Row value", await rows.allTextContents());
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
      "Filter text": "keycloak-core",
      Type: ["Maven", "RPM"],
      Architecture: ["No Arch"],
      License: ["Apache-2.0", "Apache License 1.0"],
    },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
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
      "Filter text": "keycloak-core",
      Type: ["Maven", "RPM"],
      Architecture: ["No Arch"],
      License: ["Apache-2.0", "Apache License 1.0"],
    },
    getConfig: async ({ page }) => {
      const listPage = await PackageListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });
});
