import { expect, type Locator, type Page } from "@playwright/test";

export class Table {
  private readonly _page: Page;
  _table: Locator;

  private constructor(page: Page, table: Locator) {
    this._page = page;
    this._table = table;
  }

  /**
   * @param page
   * @param tableAriaLabel the unique aria-label that corresponds to the DOM element that contains the Table. E.g. <table aria-label="identifier"></table>
   * @returns a new instance of a Toolbar
   */
  static async build(page: Page, tableAriaLabel: string) {
    const table = page.locator(`table[aria-label="${tableAriaLabel}"]`);
    await expect(table).toBeVisible();

    const result = new Table(page, table);
    await result.waitUntilDataIsLoaded();
    return result;
  }

  /**
   * @param waitMs - Optional. Milliseconds to wait before checking table data.
   */
  async waitUntilDataIsLoaded(waitMs: number = 500) {
    await this._page.waitForTimeout(waitMs);

    const rows = this._table.locator(
      'xpath=//tbody[not(@aria-label="Table loading")]',
    );
    await expect(rows.first()).toBeVisible();

    await expect.poll(() => rows.count()).toBeGreaterThanOrEqual(1);
  }

  async clickSortBy(columnName: string) {
    await this._table
      .getByRole("button", { name: columnName, exact: true })
      .click();
    await this.waitUntilDataIsLoaded();
  }

  async clickAction(actionName: string, rowIndex: number) {
    await this._table
      .locator(`button[aria-label="Kebab toggle"]`)
      .nth(rowIndex)
      .click();

    await this._page.getByRole("menuitem", { name: actionName }).click();
  }

  async verifyTableIsSortedBy(columnName: string, asc: boolean = true) {
    await expect(
      this._table.getByRole("columnheader", { name: columnName }),
    ).toHaveAttribute("aria-sort", asc ? "ascending" : "descending");
  }

  async verifyColumnContainsText(columnName: string, expectedValue: string) {
    await expect(
      this._table.locator(`td[data-label="${columnName}"]`, {
        hasText: expectedValue,
      }),
    ).toBeVisible();
  }

  async verifyTableHasNoData() {
    await expect(
      this._table.locator(`tbody[aria-label="Table empty"]`),
    ).toBeVisible();
  }

  async validateNumberOfRows(
    expectedRows: {
      equal?: number;
      greaterThan?: number;
      lessThan?: number;
    },
    columnName: string,
  ) {
    const rows = this._table.locator(`td[data-label="${columnName}"]`);

    if (expectedRows.equal) {
      await expect.poll(() => rows.count()).toBe(expectedRows.equal);
    }
    if (expectedRows.greaterThan) {
      await expect
        .poll(() => rows.count())
        .toBeGreaterThan(expectedRows.greaterThan);
    }
    if (expectedRows.lessThan) {
      await expect.poll(() => rows.count()).toBeLessThan(expectedRows.lessThan);
    }
  }

  /**
   * Gets the tooltip button for a column header
   * @param columnName The name of the column
   * @param tooltipMessage The tooltip text (used as the accessible name of the button)
   * @returns The tooltip button locator
   */
  getColumnTooltipButton(columnName: string, tooltipMessage: string): Locator {
    const columnHeader = this._table.getByRole("columnheader", {
      name: new RegExp(columnName),
    });
    return columnHeader.getByRole("button", {
      name: tooltipMessage,
    });
  }

  /**
   * Gets table rows that match specific cell value(s)
   * @param cellValues An object mapping column names to expected values
   * @returns A locator for all matching rows
   * @example
   * // Get rows where Name column contains "curl"
   * const rows = await table.getRowsByCellValue({ "Name": "curl" });
   *
   * // Get rows matching multiple criteria
   * const rows = await table.getRowsByCellValue({ "Name": "curl", "Version": "7.29.0" });
   */
  getRowsByCellValue(cellValues: Record<string, string>): Locator {
    // Start with all table rows
    let rowLocator = this._table.locator("tbody tr");

    // Filter rows based on each column-value pair
    for (const [columnName, value] of Object.entries(cellValues)) {
      rowLocator = rowLocator.filter({
        has: this._page.locator(`td[data-label="${columnName}"]`, {
          hasText: value,
        }),
      });
    }

    return rowLocator;
  }
}
