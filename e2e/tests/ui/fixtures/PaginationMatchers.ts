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
    try {
      // Verify that previous buttons are disabled being on the first page
      const prevPageButton = pagination.getPreviousPageButton();

      await baseExpect(prevPageButton).toBeVisible();
      await baseExpect(prevPageButton).toBeDisabled();

      // Verify that navigation button to first page is disabled being on the first page
      const firstPageButton = pagination.getFirstPageButton();
      await baseExpect(firstPageButton).toBeVisible();
      await baseExpect(firstPageButton).toBeDisabled();

      await expect(pagination).not.toHavePreviousPage();

      return {
        pass: true,
        message: () => "Pagination is on first page",
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
  toHaveNextPage: async (pagination: Pagination) => {
    try {
      // Verify next buttons are enabled as there are more than 11 rows present
      const nextPageButton = pagination.getNextPageButton();
      await baseExpect(nextPageButton).toBeVisible();
      await baseExpect(nextPageButton).not.toBeDisabled();

      // Verify that navigation button to last page is enabled
      const lastPageButton = pagination.getLastPageButton();
      await baseExpect(lastPageButton).toBeVisible();
      await baseExpect(lastPageButton).not.toBeDisabled();

      return {
        pass: true,
        message: () => "Next buttons are enabled",
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
  toHavePreviousPage: async (pagination: Pagination) => {
    try {
      // Verify that previous buttons are enabled after moving to next page
      const prevPageButton = pagination.getPreviousPageButton();
      await baseExpect(prevPageButton).toBeVisible();
      await baseExpect(prevPageButton).not.toBeDisabled();

      // Verify that navigation button to first page is enabled after moving to next page
      const firstPageButton = pagination.getFirstPageButton();
      await baseExpect(firstPageButton).toBeVisible();
      await baseExpect(firstPageButton).not.toBeDisabled();

      return {
        pass: true,
        message: () => "Has previous page",
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
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
