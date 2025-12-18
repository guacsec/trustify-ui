import { type Locator, type Page, expect } from "@playwright/test";

export interface TColumnValue {
  isSortable: boolean;
}

export class Table<
  TColumn extends Record<string, TColumnValue>,
  const TActions extends readonly string[],
  TColumnName extends Extract<keyof TColumn, string>,
> {
  private readonly _page: Page;
  readonly _table: Locator;
  readonly _columns: TColumn;
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: allowed
  private readonly _actions: TActions;

  protected type!: {
    ColumnName: Extract<keyof TColumn, string>;
  };

  private constructor(
    page: Page,
    table: Locator,
    columns: TColumn,
    actions: TActions,
  ) {
    this._page = page;
    this._table = table;
    this._columns = columns;
    this._actions = actions;
  }

  /**
   * @param page
   * @param tableAriaLabel the unique aria-label that corresponds to the DOM element that contains the Table. E.g. <table aria-label="identifier"></table>
   * @returns a new instance of a Toolbar
   */
  static async build<
    TColumn extends Record<string, TColumnValue>,
    const TActions extends readonly string[],
  >(page: Page, tableAriaLabel: string, columns: TColumn, actions: TActions) {
    const table = page.locator(`table[aria-label="${tableAriaLabel}"]`);
    await expect(table).toBeVisible();

    const result = new Table(page, table, columns, actions);
    await result.waitUntilDataIsLoaded();
    return result;
  }

  /**
   * @param waitMs - Optional. Milliseconds to wait before checking table data.
   */
  public async waitUntilDataIsLoaded(waitMs = 500) {
    await this._page.waitForTimeout(waitMs);

    const rows = this._table.locator(
      'xpath=//tbody[not(@aria-label="Table loading")]',
    );
    await expect(rows.first()).toBeVisible();

    await expect.poll(() => rows.count()).toBeGreaterThanOrEqual(1);
  }

  async clickSortBy(columnName: TColumnName) {
    await this._table
      .getByRole("button", { name: columnName, exact: true })
      .click();
    await this.waitUntilDataIsLoaded();
  }

  async clickAction(actionName: TActions[number], rowIndex: number) {
    await this._table
      .locator(`button[aria-label="Kebab toggle"]`)
      .nth(rowIndex)
      .click();

    await this._page.getByRole("menuitem", { name: actionName }).click();
  }

  async getColumn(columnName: TColumnName) {
    const column = this._table.locator(`td[data-label="${columnName}"]`);
    await expect(column.first()).toBeVisible();
    return column;
  }

  async getColumnHeader(columnName: TColumnName) {
    const columnHeader = this._table.getByRole("columnheader", {
      name: columnName,
    });
    await expect(columnHeader).toBeVisible();
    return columnHeader;
  }

  /**
   * Gets the tooltip button for a column header
   * @param columnName The name of the column
   * @param tooltipMessage The tooltip text (used as the accessible name of the button)
   * @returns The tooltip button locator
   */
  getColumnTooltipButton(
    columnName: TColumnName,
    tooltipMessage: string,
  ): Locator {
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
   * const rows = table.getRowsByCellValue({ "Name": "curl" });
   *
   * // Get rows matching multiple criteria
   * const rows = table.getRowsByCellValue({ "Name": "curl", "Version": "7.29.0" });
   */
  async getRowsByCellValue(
    cellValues: Partial<Record<TColumnName, string>>,
  ): Promise<Locator> {
    // Start with all table rows
    let rowLocator = this._table.locator("tbody tr");

    // Filter rows based on each column-value pair
    for (const columnName of Object.keys(cellValues) as Array<TColumnName>) {
      const value = cellValues[columnName];
      rowLocator = rowLocator.filter({
        has: this._page.locator(`td[data-label="${columnName}"]`, {
          hasText: value,
        }),
      });
    }

    await expect(rowLocator.first()).toBeVisible();
    return rowLocator;
  }
}
