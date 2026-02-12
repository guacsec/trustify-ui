import { type Locator, type Page, expect } from "@playwright/test";

export class Table<
  const TColumns extends readonly string[],
  const TActions extends readonly string[],
> {
  private readonly _page: Page;
  readonly _table: Locator;
  readonly _columns: TColumns;
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: allowed
  private readonly _actions: TActions;

  private constructor(
    page: Page,
    table: Locator,
    columns: TColumns,
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
    const TColumns extends readonly string[],
    const TActions extends readonly string[],
  >(page: Page, tableAriaLabel: string, columns: TColumns, actions: TActions) {
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

  async clickSortBy(columnName: TColumns[number]) {
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

  async expandCell(columnName: TColumns[number], rowIndex: number) {
    const column = await this.getColumn(columnName);
    await column.nth(rowIndex).click();

    const expandedCell = column.nth(rowIndex + 1);
    await expect(expandedCell).toBeVisible();
    return expandedCell;
  }

  async expandRow(rowIndex: number) {
    const rows = await this.getRows();
    const row = rows.nth(rowIndex);

    const toggleButton = row.getByRole("button", { name: "Details" });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();

    const expandedArea = row.locator(".pf-m-expanded");
    await expect(expandedArea).toBeVisible();
    return expandedArea;
  }

  async getRows() {
    const rows = this._table.locator("tbody");
    await expect(rows).toBeVisible();
    return rows;
  }

  async getColumn(columnName: TColumns[number]) {
    const column = this._table.locator(`td[data-label="${columnName}"]`);
    await expect(column.first()).toBeVisible();
    return column;
  }

  async getColumnHeader(columnName: TColumns[number]) {
    const columnHeader = this._table.getByRole("columnheader", {
      name: columnName,
      exact: true,
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
    columnName: TColumns[number],
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
    cellValues: Partial<Record<TColumns[number], string>>,
  ): Promise<Locator> {
    // Start with all table rows
    let rowLocator = this._table.locator("tbody tr");

    // Filter rows based on each column-value pair
    for (const columnName of Object.keys(cellValues) as Array<
      TColumns[number]
    >) {
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

  /**
   * Returns table column information based on entity type
   * @param type Category of the data (e.g., "SBOMs", "Packages", "Vulnerabilities", "Advisories")
   * @returns Object containing columnKey and columnName for the entity type
   */
  static getTableInfo(type: string): { columnKey: string; columnName: string } {
    switch (type) {
      case "SBOMs":
      case "SBOM":
        return { columnKey: "name", columnName: "Name" };
      case "Advisories":
      case "Advisory":
        return { columnKey: "identifier", columnName: "ID" };
      case "Vulnerabilities":
      case "CVE":
        return { columnKey: "identifier", columnName: "ID" };
      case "Packages":
      case "Package":
        return { columnKey: "name", columnName: "Name" };
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }

  /**
   * Returns sortable column names for a given entity type
   * @param type Category of the data (e.g., "SBOMs", "Packages", "Vulnerabilities", "Advisories")
   * @returns Array of sortable column names for the entity type
   */
  static getSortableColumns(type: string): string[] {
    switch (type) {
      case "Vulnerabilities":
        return ["ID", "CVSS", "Date published"];
      case "Advisories":
        return ["ID", "Revision"];
      case "Packages":
        return ["Name", "Namespace", "Version"];
      case "SBOMs":
        return ["Name", "Created on"];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }

  /**
   * Converts plural entity type to singular form
   * @param pluralType Plural entity type (e.g., "SBOMs", "Packages", "Vulnerabilities", "Advisories")
   * @returns Singular form of the entity type
   */
  static toSingular(pluralType: string): string {
    switch (pluralType) {
      case "SBOMs":
        return "SBOM";
      case "Packages":
        return "Package";
      case "Vulnerabilities":
        return "CVE";
      case "Advisories":
        return "Advisory";
      default:
        throw new Error(`Unknown plural type: ${pluralType}`);
    }
  }
}
