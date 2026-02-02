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
import { SbomListPage } from "./SbomListPage";

test.describe("Filter validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Filters", async ({ page }) => {
    const listPage = await SbomListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Full search
    await toolbar.applyFilter({ "Filter text": "quarkus" });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");

    // Date filter
    await toolbar.applyFilter({
      "Created on": { from: "11/21/2023", to: "11/23/2023" },
    });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");

    // Labels filter
    await toolbar.applyFilter({ Label: ["type=spdx"] });
    await expect(table).toHaveColumnWithValue("Name", "quarkus-bom");
  });

  testFilterMatches("Filter partial text match", {
    filters: { "Filter text": "quarkus" },
    assertions: { columnName: "Name", value: "quarkus-bom" },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterShowsEmptyState("Filter with non existent advisory", {
    filters: { "Filter text": "nonexistent-sbom-12345" },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Created on": { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=spdx"],
      License: ["Apache-2.0", "Apache License 1.0"],
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Created on": { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=spdx"],
      License: ["Apache-2.0", "Apache License 1.0"],
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Filter text": "quarkus*",
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Filter text": "quarkus-".repeat(100),
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });

  testFilterMatches("Whitespace variations", {
    filters: { "Filter text": "  quarkus  " },
    assertions: { columnName: "Name", value: "quarkus-bom" },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Created on": { from: "03/27/2025", to: "03/27/2025" },
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Created on": { from: "01/01/2030", to: "12/31/2030" },
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
    assertions: { columnName: "Name", value: "claude-4-opus" },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Filter text": "quarkus",
      "Created on": { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=spdx"],
      License: ["Apache-2.0", "Apache License 1.0"],
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
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
      "Filter text": "quarkus",
      "Created on": { from: "03/26/2025", to: "03/28/2025" },
      Label: ["type=spdx"],
      License: ["Apache-2.0", "Apache License 1.0"],
    },
    getConfig: async ({ page }) => {
      const listPage = await SbomListPage.build(page);
      const toolbar = await listPage.getToolbar();
      const table = await listPage.getTable();
      return {
        toolbar,
        table,
      };
    },
  });
});
