import { expect, type Locator, type Page } from "@playwright/test";

export class Pagination {
  private readonly _page: Page;
  _pagination: Locator;

  private constructor(page: Page, pagination: Locator) {
    this._page = page;
    this._pagination = pagination;
  }

  static async build(page: Page, paginationId: string) {
    const pagination = page.locator(`#${paginationId}`);
    await expect(pagination).toBeVisible();
    return new Pagination(page, pagination);
  }

  getFirstPageButton() {
    return this._pagination.locator("button[data-action='first']");
  }

  getPreviousPageButton() {
    return this._pagination.locator("button[data-action='previous']");
  }

  getNextPageButton() {
    return this._pagination.locator("button[data-action='next']");
  }

  getLastPageButton() {
    return this._pagination.locator("button[data-action='last']");
  }

  /**
   * Selects Number of rows per page on the table
   * @param perPage Number of rows
   */
  async selectItemsPerPage(perPage: 10 | 20 | 50 | 100) {
    await this._pagination
      .locator(`//button[@aria-haspopup='listbox']`)
      .click();
    await this._page
      .getByRole("menuitem", { name: `${perPage} per page` })
      .click();

    await expect(this._pagination.locator("input")).toHaveValue("1");
  }

  /**
   * @deprecated use fixtures/PaginationMatchers instead
   */
  async validatePagination() {
    // Verify next buttons are enabled as there are more than 11 rows present
    const nextPageButton = this._pagination.locator(
      "button[data-action='next']",
    );
    await expect(nextPageButton).toBeVisible();
    await expect(nextPageButton).not.toBeDisabled();

    // Verify that previous buttons are disabled being on the first page
    const prevPageButton = this._pagination.locator(
      "button[data-action='previous']",
    );
    await expect(prevPageButton).toBeVisible();
    await expect(prevPageButton).toBeDisabled();

    // Verify that navigation button to last page is enabled
    const lastPageButton = this._pagination.locator(
      "button[data-action='last']",
    );
    await expect(lastPageButton).toBeVisible();
    await expect(lastPageButton).not.toBeDisabled();

    // Verify that navigation button to first page is disabled being on the first page
    const firstPageButton = this._pagination.locator(
      "button[data-action='first']",
    );
    await expect(firstPageButton).toBeVisible();
    await expect(firstPageButton).toBeDisabled();

    // Navigate to next page
    await nextPageButton.click();

    // Verify that previous buttons are enabled after moving to next page
    await expect(prevPageButton).toBeVisible();
    await expect(prevPageButton).not.toBeDisabled();

    // Verify that navigation button to first page is enabled after moving to next page
    await expect(firstPageButton).toBeVisible();
    await expect(firstPageButton).not.toBeDisabled();

    // Moving back to the first page
    await firstPageButton.click();
  }
}
