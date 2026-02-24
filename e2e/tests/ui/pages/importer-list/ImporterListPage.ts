import { type Page, expect } from "@playwright/test";
import { Navigation } from "../Navigation";
import { Pagination } from "../Pagination";
import { Table } from "../Table";
import { Toolbar } from "../Toolbar";

export class ImporterListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async build(page: Page) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("Importers");

    return new ImporterListPage(page);
  }

  async getToolbar() {
    return await Toolbar.build(this.page, "importer-toolbar", {
      Name: "string",
      Status: "multiSelect",
    });
  }

  async getTable() {
    return await Table.build(
      this.page,
      "Importer table",
      ["Name", "Type", "Description", "Source", "Period", "State"],
      ["Run", "Enable", "Disable"],
    );
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this.page,
      `importer-table-pagination-${top ? "top" : "bottom"}`,
    );
  }

  async performImporterAction(
    importerName: string,
    action: "Run" | "Enable" | "Disable",
  ) {
    const table = await this.getTable();
    const rows = await table.getRowsByCellValue({ Name: importerName });
    const rowCount = await rows.count();

    expect(rowCount).toBeGreaterThan(0);

    const allRows = await table.getRows();
    const allRowCount = await allRows.count();
    const nameColumn = await table.getColumn("Name");
    let targetRowIndex = -1;

    for (let i = 0; i < allRowCount; i++) {
      const nameCell = nameColumn.nth(i);
      const nameText = await nameCell.textContent();

      if (nameText?.includes(importerName)) {
        targetRowIndex = i;
        break;
      }
    }

    expect(targetRowIndex).toBeGreaterThanOrEqual(0);
    await table.clickAction(action, targetRowIndex);
  }

  
}
