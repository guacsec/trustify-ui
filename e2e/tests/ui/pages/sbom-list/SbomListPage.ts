import { expect, type Page } from "@playwright/test";
import { Navigation } from "../Navigation";
import { Pagination } from "../Pagination";
import { Table } from "../Table";
import { Toolbar } from "../Toolbar";

export class SbomListPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("All SBOMs");
    return new SbomListPage(page);
  }

  static async fromCurrentPage(page: Page) {
    return new SbomListPage(page);
  }

  async getToolbar() {
    return await Toolbar.build(
      this._page,
      "sbom-toolbar",
      {
        "Filter text": "string",
        "Created on": "dateRange",
        Label: "typeahead",
        License: "typeahead",
      },
      {
        buttonAriaLabel: "SBOM actions",
        actions: ["Upload SBOM", "Generate vulnerability report"],
      },
    );
  }

  async selectSbomsByName(sbomNames: string[]) {
    const toolbar = await this.getToolbar();
    for (const sbomName of sbomNames) {
      await toolbar.applyFilter({ "Filter text": sbomName });
      const table = await this.getTable();
      const rows = await table.getRowsByCellValue({ Name: sbomName }, true);
      const checkbox = rows.first().locator('input[type="checkbox"]');
      await checkbox.check();
    }
  }

  async reload() {
    await this._page.reload();
    await this.getTable();
  }

  async openActionsMenu() {
    await this._page
      .getByRole("button", { name: "SBOM actions", exact: true })
      .click();
  }

  /** The remediation report action is a toolbar button, not a kebab menu item. */
  getRemediationReportAction() {
    return this._page.getByRole("button", {
      name: "Generate remediation report",
      exact: true,
    });
  }

  async clickRemediationReport() {
    const action = this.getRemediationReportAction();
    await expect(action).toBeEnabled();
    await action.click();
  }

  async getTable() {
    return await Table.build(
      this._page,
      "sbom-table",
      [
        "Name",
        "Version",
        "Supplier",
        "Labels",
        "Created on",
        "Dependencies",
        "Vulnerabilities",
      ],
      ["Edit labels", "Download SBOM", "Download License Report", "Delete"],
    );
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `sbom-table-pagination-${top ? "top" : "bottom"}`,
    );
  }
}
