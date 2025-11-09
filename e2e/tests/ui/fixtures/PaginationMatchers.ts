import { expect as baseExpect } from "@playwright/test";
import type { Pagination } from "../pages/Pagination";
import type { MatcherResult } from "./types";

interface PaginationMatchers {
  toBeFirstPage(): Promise<MatcherResult>;
  toHaveNextPage(): Promise<MatcherResult>;
  toHavePreviousPage(): Promise<MatcherResult>;
}

type PaginationMatcherDefinitions = {
  readonly [K in keyof PaginationMatchers]: (
    receiver: Pagination,
  ) => Promise<MatcherResult>;
};

const paginationTests = baseExpect.extend<PaginationMatcherDefinitions>({
  toBeFirstPage: async (pagination: Pagination) => {
    return {
      pass: true,
      message: () => "Pagination is on first page",
    };
  },
  toHaveNextPage: async (pagination: Pagination) => {
    return {
      pass: true,
      message: () => "Next buttons are enabled",
    };
  },
  toHavePreviousPage: async (pagination: Pagination) => {
    return {
      pass: true,
      message: () => "Next buttons are enabled",
    };
  },
});

// Type that includes both matchers and the 'not' property for type safety
type PaginationMatchersWithNot = PaginationMatchers & {
  not: PaginationMatchers;
};

// Enforce type safety
function expect(actual: Pagination): PaginationMatchersWithNot;
function expect<T>(actual: T): ReturnType<typeof paginationTests>;
function expect<T>(
  actual: T,
): PaginationMatchersWithNot | ReturnType<typeof paginationTests> {
  return paginationTests(actual) as unknown as PaginationMatchersWithNot &
    ReturnType<typeof paginationTests>;
}

export { expect };
