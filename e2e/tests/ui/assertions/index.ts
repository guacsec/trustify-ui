import { mergeExpects } from "@playwright/test";

import type { Pagination } from "../pages/Pagination";
import {
  paginationAssertions,
  type PaginationMatchers,
} from "./PaginationMatchers";

const merged = mergeExpects(
  paginationAssertions,
  // Add more custom assertions here
);

// Create overloaded expect that preserves types for all custom matchers

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
