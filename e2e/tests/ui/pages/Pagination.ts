import { expect, type Locator, type Page } from "@playwright/test";
import type { Table } from "./Table";

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

  // TODO: This seems not belonging here. This matches two entities: Pagination and Table so cannot moved to fixtures/PaginationMatchers.ts. Needs refactoring.
  async validateItemsPerPage(columnName: string, table: Table) {
    // Verify that only 10 items are displayed
    await this.selectItemsPerPage(10);
    await table.validateNumberOfRows({ equal: 10 }, columnName);

    // Verify that items less than or equal to 20 and greater than 10 are displayed
    await this.selectItemsPerPage(20);
    await table.validateNumberOfRows(
      { greaterThan: 10, lessThan: 21 },
      columnName,
    );
  }
}
