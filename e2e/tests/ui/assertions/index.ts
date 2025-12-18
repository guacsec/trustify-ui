import { mergeExpects } from "@playwright/test";

import type { Table, TColumnValue } from "../pages/Table";
import { tableAssertions, type TableMatchers } from "./TableMatchers";

import type { Pagination } from "../pages/Pagination";
import {
  paginationAssertions,
  type PaginationMatchers,
} from "./PaginationMatchers";

const merged = mergeExpects(
  tableAssertions,
  paginationAssertions,
  // Add more custom assertions here
);

// Create overloaded expect that preserves types for all custom matchers

/**
 * Overload from TableMatchers.ts
 */
function typedExpect<
  TColumn extends Record<string, TColumnValue>,
  const TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
>(
  value: Table<TColumn, TActions, TColumnName>,
): Omit<
  ReturnType<typeof merged<Table<TColumn, TActions, TColumnName>>>,
  keyof TableMatchers<TColumn, TActions, TColumnName>
> &
  TableMatchers<TColumn, TActions, TColumnName>;

/**
 * Overload from PaginationMatchers.ts
 */
function typedExpect(
  value: Pagination,
): Omit<ReturnType<typeof merged<Pagination>>, keyof PaginationMatchers> &
  PaginationMatchers;

// Default overload
function typedExpect<T>(value: T): ReturnType<typeof merged<T>>;
function typedExpect<T>(value: T): unknown {
  return merged(value);
}

export const expect = Object.assign(typedExpect, merged);
