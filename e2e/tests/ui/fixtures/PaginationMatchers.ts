import { expect as baseExpect } from "@playwright/test";
import type { Pagination } from "../pages/Pagination";
import type { MatcherResult } from "./types";

export interface PaginationMatchers {
  toBeFirstPage(): Promise<MatcherResult>;
  toHaveNextPage(): Promise<MatcherResult>;
  toHavePreviousPage(): Promise<MatcherResult>;
}

type PaginationMatcherDefinitions = {
  readonly [K in keyof PaginationMatchers]: (
    receiver: Pagination,
  ) => Promise<MatcherResult>;
};

export const paginationTests = baseExpect.extend<PaginationMatcherDefinitions>({
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

      // Verify previous pages are disabled as it is the first page
      const isPreviousPageEnabled = false;
      await verifyPreviousPage(pagination, isPreviousPageEnabled);

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
      const isPreviousPageEnabled = true;
      await verifyPreviousPage(pagination, isPreviousPageEnabled);
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

/**
 * @param isEnabled if true then it verifies whether or not the "previous" page is enabled
 */
const verifyPreviousPage = async (
  pagination: Pagination,
  isEnabled: boolean,
) => {
  // Verify that "previous" button
  const prevPageButton = pagination.getPreviousPageButton();
  await baseExpect(prevPageButton).toBeVisible();
  await (isEnabled
    ? baseExpect(prevPageButton)
    : baseExpect(prevPageButton).not
  ).toBeEnabled();

  // Verify that "go to first page" button
  const firstPageButton = pagination.getFirstPageButton();
  await baseExpect(firstPageButton).toBeVisible();
  await (isEnabled
    ? baseExpect(firstPageButton)
    : baseExpect(firstPageButton).not
  ).toBeEnabled();
};
