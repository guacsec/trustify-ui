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

  async verifyImporterHasProgressIndicator(importerName: string) {
    const table = await this.getTable();
    const nameColumn = await table.getColumn("Name");
    const stateColumn = await table.getColumn("State");

    const allRows = await table.getRows();
    const allRowCount = await allRows.count();

    for (let i = 0; i < allRowCount; i++) {
      const nameCell = nameColumn.nth(i);
      const nameText = await nameCell.textContent();

      if (nameText?.includes(importerName)) {
        const stateCell = stateColumn.nth(i);
        const progressBar = stateCell.locator('[role="progressbar"]');
        const scheduledText = stateCell.getByText("Scheduled");

        // Wait a moment for the state to update
        await this.page.waitForTimeout(1000);

        // Check if either progress bar is visible or Scheduled state is shown
        const hasProgressBar =
          (await progressBar.count()) > 0 && (await progressBar.isVisible());
        const isScheduled = (await scheduledText.count()) > 0;

        if (hasProgressBar || isScheduled) {
          return;
        }

        // If neither is found, wait a bit longer and try again
        await this.page.waitForTimeout(2000);

        const hasProgressBarRetry =
          (await progressBar.count()) > 0 && (await progressBar.isVisible());
        const isScheduledRetry = (await scheduledText.count()) > 0;

        expect(hasProgressBarRetry || isScheduledRetry).toBeTruthy();
        return;
      }
    }

    throw new Error(`Importer "${importerName}" not found in table`);
  }

  async verifyImporterHasStateOrProgress(
    importerName: string,
    expectedState: string,
  ) {
    const table = await this.getTable();
    await table.getRowsByCellValue({ Name: importerName });
    const stateColumn = await table.getColumn("State");
    const nameColumn = await table.getColumn("Name");

    const allRows = await table.getRows();
    const allRowCount = await allRows.count();

    for (let i = 0; i < allRowCount; i++) {
      const nameCell = nameColumn.nth(i);
      const nameText = await nameCell.textContent();

      if (nameText?.includes(importerName)) {
        const stateCell = stateColumn.nth(i);
        const scheduledText = stateCell.getByText(expectedState);
        const progressBar = stateCell.locator('[role="progressbar"]');

        const isScheduledVisible = (await scheduledText.count()) > 0;
        const isProgressVisible = (await progressBar.count()) > 0;

        expect(isScheduledVisible || isProgressVisible).toBeTruthy();
        return;
      }
    }

    throw new Error(`Importer "${importerName}" not found in table`);
  }
}
