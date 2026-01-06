import { expect as baseExpect } from "@playwright/test";
import type { Table, TColumnValue } from "../pages/Table";
import type { MatcherResult } from "./types";

export interface TableMatchers<
  TColumn extends Record<string, TColumnValue>,
  _TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
> {
  toBeSortedBy(
    columnName: TColumnName,
    order: "ascending" | "descending",
  ): Promise<MatcherResult>;
  toHaveColumnWithValue(
    columnName: TColumnName,
    value: string,
    rowIndex?: number,
  ): Promise<MatcherResult>;
  toHaveNumberOfRows(expectedRows: {
    equal?: number;
    greaterThan?: number;
    lessThan?: number;
  }): Promise<MatcherResult>;
  toHaveEmptyState(): Promise<MatcherResult>;
}

type TableMatcherDefinitions = {
  readonly [K in keyof TableMatchers<
    Record<string, TColumnValue>,
    [],
    string
  >]: <
    TColumn extends Record<string, TColumnValue>,
    const TActions extends readonly string[],
    TColumnName extends Extract<keyof TColumn, string>,
  >(
    receiver: Table<TColumn, TActions, TColumnName>,
    ...args: Parameters<TableMatchers<TColumn, TActions, TColumnName>[K]>
  ) => Promise<MatcherResult>;
};

export const tableAssertions = baseExpect.extend<TableMatcherDefinitions>({
  toBeSortedBy: async <
    TColumn extends Record<string, TColumnValue>,
    const TActions extends readonly string[],
    TColumnName extends Extract<keyof TColumn, string>,
  >(
    table: Table<TColumn, TActions, TColumnName>,
    columnName: TColumnName,
    order: "ascending" | "descending",
  ) => {
    try {
      const columnHeader = await table.getColumnHeader(columnName);
      await baseExpect(columnHeader).toHaveAttribute("aria-sort", order);

      return {
        pass: true,
        message: () => `Table is sorted by ${columnName} in ${order} order`,
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
  toHaveColumnWithValue: async <
    TColumn extends Record<string, TColumnValue>,
    const TActions extends readonly string[],
    TColumnName extends Extract<keyof TColumn, string>,
  >(
    table: Table<TColumn, TActions, TColumnName>,
    columnName: TColumnName,
    value: string,
    rowIndex?: number,
  ) => {
    try {
      if (rowIndex === undefined) {
        await baseExpect(
          table._table
            .locator(`td[data-label="${columnName}"]`, {
              hasText: value,
            })
            .first(),
        ).toBeVisible();
      } else {
        await baseExpect(
          table._table.locator(`td[data-label="${columnName}"]`).nth(rowIndex),
        ).toContainText(value);
      }

      return {
        pass: true,
        message: () => `Table contains ${value} in column ${columnName}`,
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
  toHaveNumberOfRows: async <
    TColumn extends Record<string, TColumnValue>,
    const TActions extends readonly string[],
    TColumnName extends Extract<keyof TColumn, string>,
  >(
    table: Table<TColumn, TActions, TColumnName>,
    expectedRows: { equal?: number; greaterThan?: number; lessThan?: number },
  ) => {
    try {
      const rows = table._table.locator(
        `td[data-label="${Object.keys(table._columns)[0]}"]`,
      );

      if (expectedRows.equal) {
        await baseExpect.poll(() => rows.count()).toBe(expectedRows.equal);
      }
      if (expectedRows.greaterThan) {
        await baseExpect
          .poll(() => rows.count())
          .toBeGreaterThan(expectedRows.greaterThan);
      }
      if (expectedRows.lessThan) {
        await baseExpect
          .poll(() => rows.count())
          .toBeLessThan(expectedRows.lessThan);
      }

      return {
        pass: true,
        message: () => "Table contains expected rows",
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
  toHaveEmptyState: async <
    TColumn extends Record<string, TColumnValue>,
    const TActions extends readonly string[],
    TColumnName extends Extract<keyof TColumn, string>,
  >(
    table: Table<TColumn, TActions, TColumnName>,
  ): Promise<MatcherResult> => {
    try {
      await baseExpect(
        table._table.locator(`tbody[aria-label="Table empty"]`),
      ).toBeVisible();

      return {
        pass: true,
        message: () => "Table has empty state",
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
});
