// @ts-check

import type { Page } from "@playwright/test";

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import type { Table, TColumnValue } from "../../pages/Table";
import type { Toolbar } from "../../pages/Toolbar";
import {
  isDateRangeFilter,
  isMultiSelectFilter,
  isStringFilter,
  isTypeaheadFilter,
  type FilterValueType,
  type TFilterValue,
} from "../../pages/utils";

/**
 * Configuration for filter test helpers
 */
export interface FilterTestConfig<
  /**
   * Toolbar
   */
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  /**
   * Table
   */
  TColumn extends Record<string, TColumnValue>,
  TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
> {
  toolbar: Toolbar<TFilter, TFilterName>;
  table: Table<TColumn, TActions, TColumnName>;
}

export const testFilterMatches = <
  /**
   * Toolbar
   */
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  /**
   * Table
   */
  TColumn extends Record<string, TColumnValue>,
  TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
>(
  testName: string,
  {
    filters,
    assertions,
    getConfig,
  }: {
    filters: Partial<FilterValueType<TFilter>>;
    assertions: { columnName: TColumnName; value: string; rowIndex?: number };
    getConfig: ({
      page,
    }: {
      page: Page;
    }) => Promise<
      FilterTestConfig<TFilter, TFilterName, TColumn, TActions, TColumnName>
    >;
  },
) =>
  test(`Filter matches - ${testName}`, async ({ page }) => {
    const config = await getConfig({ page });
    const toolbar = config.toolbar;
    const table = config.table;

    // Apply filter
    await toolbar.applyFilter(filters);

    // Test partial text search
    await expect(table).toHaveNumberOfRows({ greaterThan: 0 });
    await expect(table).toHaveColumnWithValue(
      assertions.columnName,
      assertions.value,
      assertions.rowIndex,
    );
  });

export const testFilterShowsEmptyState = <
  /**
   * Toolbar
   */
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  /**
   * Table
   */
  TColumn extends Record<string, TColumnValue>,
  TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
>(
  testName: string,
  {
    filters,
    getConfig,
  }: {
    filters: Partial<FilterValueType<TFilter>>;
    getConfig: ({
      page,
    }: {
      page: Page;
    }) => Promise<
      FilterTestConfig<TFilter, TFilterName, TColumn, TActions, TColumnName>
    >;
  },
) =>
  test(`Empty table - ${testName}`, async ({ page }) => {
    const config = await getConfig({ page });
    const { toolbar, table } = config;

    // Apply filter
    await toolbar.applyFilter(filters);

    // Should render no results
    await expect(table).toHaveEmptyState();
  });

export const testClearAllFilters = <
  /**
   * Toolbar
   */
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  /**
   * Table
   */
  TColumn extends Record<string, TColumnValue>,
  TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
>({
  filters,
  getConfig,
}: {
  filters: Partial<FilterValueType<TFilter>>;
  getConfig: ({
    page,
  }: {
    page: Page;
  }) => Promise<
    FilterTestConfig<TFilter, TFilterName, TColumn, TActions, TColumnName>
  >;
}) =>
  test("Clear all filters button removes all applied filters", async ({
    page,
  }) => {
    const config = await getConfig({ page });
    const { toolbar } = config;

    // Apply filter
    await toolbar.applyFilter(filters);

    // Clear all filters
    await toolbar.clearAllFilters();

    // Verify button erxists
    await expect(toolbar).toHaveNoLabels();
  });

export const testRemovalOfFiltersFromToolbar = <
  /**
   * Toolbar
   */
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  /**
   * Table
   */
  TColumn extends Record<string, TColumnValue>,
  TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
>({
  filters,
  getConfig,
}: {
  filters: Partial<FilterValueType<TFilter>>;
  getConfig: ({
    page,
  }: {
    page: Page;
  }) => Promise<
    FilterTestConfig<TFilter, TFilterName, TColumn, TActions, TColumnName>
  >;
}) =>
  test("Remove filters by clicking Toolbar should be possible", async ({
    page,
  }) => {
    const config = await getConfig({ page });
    const { toolbar } = config;

    // Test1: All chips should be removable individually
    await toolbar.applyFilter(filters);

    // Remove gradually chips
    for (const filterName of Object.keys(filters) as Array<TFilterName>) {
      const filterValue = filters[filterName];
      if (!filterValue) continue;

      const filterType = toolbar._filters[filterName];

      const chips: string[] = [];
      if (isStringFilter(filterType, filterValue)) {
        chips.push(filterValue);
      }
      if (isDateRangeFilter(filterType, filterValue)) {
        chips.push(filterValue.from);
      }
      if (isMultiSelectFilter(filterType, filterValue)) {
        chips.push(...filterValue);
      }
      if (isTypeaheadFilter(filterType, filterValue)) {
        chips.push(...filterValue);
      }

      for (const chipValue of chips) {
        await toolbar.removeFilterChip(filterName, chipValue);
      }
    }

    // All chips removed
    await expect(toolbar).toHaveNoLabels();

    // Test2: All filter groups should be removable individually
    await toolbar.applyFilter(filters);

    // Remove gradually chips
    for (const filterName of Object.keys(filters) as Array<TFilterName>) {
      await toolbar.removeFilterGroup(filterName);
    }

    // All chips removed
    await expect(toolbar).toHaveNoLabels();
  });

export const testUrlPersistence = <
  /**
   * Toolbar
   */
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  /**
   * Table
   */
  TColumn extends Record<string, TColumnValue>,
  TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
>({
  filters,
  getConfig,
}: {
  filters: Partial<FilterValueType<TFilter>>;
  getConfig: ({
    page,
  }: {
    page: Page;
  }) => Promise<
    FilterTestConfig<TFilter, TFilterName, TColumn, TActions, TColumnName>
  >;
}) =>
  test("Filters persist in URL and survive page reload", async ({ page }) => {
    const config = await getConfig({ page });
    const { toolbar } = config;

    // Apply filter
    await toolbar.applyFilter(filters);

    // Reload page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Verify filter is still active after reload
    await expect(toolbar).toHaveLabels(filters);
  });

export const testBrowserNavigationBackAndForward = <
  /**
   * Toolbar
   */
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  /**
   * Table
   */
  TColumn extends Record<string, TColumnValue>,
  TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
>({
  filters,
  getConfig,
}: {
  filters: Partial<FilterValueType<TFilter>>;
  getConfig: ({
    page,
  }: {
    page: Page;
  }) => Promise<
    FilterTestConfig<TFilter, TFilterName, TColumn, TActions, TColumnName>
  >;
}) =>
  test("Browser navigation (back/forward/goto) maintains filter state", async ({
    page,
  }) => {
    const config = await getConfig({ page });
    const { toolbar } = config;

    // Apply filters
    await toolbar.applyFilter(filters);

    const urlWithFilters = page.url();

    // Navigate away
    await page.goto("/not-found");
    await page.waitForLoadState("networkidle");

    // Test 1: Direct URL navigation
    await page.goto(urlWithFilters);
    await page.waitForLoadState("networkidle");
    await expect(toolbar).toHaveLabels(filters);
    // await expect(table).toHaveNumberOfRows({ greaterThan: 0 });

    // Navigate away again
    await page.goto("/not-found");
    await page.waitForLoadState("networkidle");

    // Test 2: Back button
    await page.goBack();
    await page.waitForLoadState("networkidle");
    await expect(toolbar).toHaveLabels(filters);

    // Test 3: Back then forward button
    await page.goBack();
    await page.waitForLoadState("networkidle");
    await page.goForward();
    await page.waitForLoadState("networkidle");
    await expect(toolbar).toHaveLabels(filters);
  });
