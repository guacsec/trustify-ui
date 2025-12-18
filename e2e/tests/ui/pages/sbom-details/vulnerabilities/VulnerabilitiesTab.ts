import type { Page } from "@playwright/test";
import { Pagination } from "../../Pagination";
import { Table } from "../../Table";
import { Toolbar } from "../../Toolbar";
import { SbomDetailsPage } from "../SbomDetailsPage";

export class VulnerabilitiesTab {
  private readonly _page: Page;
  _detailsPage: SbomDetailsPage;

  private constructor(page: Page, layout: SbomDetailsPage) {
    this._page = page;
    this._detailsPage = layout;
  }

  /**
   * Build the tab by navigating to the SBOM details page and selecting the tab.
   */
  static async build(page: Page, sbomName: string) {
    const detailsPage = await SbomDetailsPage.build(page, sbomName);
    await detailsPage._layout.selectTab("Vulnerabilities");

    return new VulnerabilitiesTab(page, detailsPage);
  }

  /**
   * Build the tab from the current page state WITHOUT navigating.
   * @param page - The Playwright page object
   * @param sbomName - Optional SBOM name to verify the page header
   */
  static async fromCurrentPage(page: Page, sbomName?: string) {
    const detailsPage = await SbomDetailsPage.fromCurrentPage(page, sbomName);
    return new VulnerabilitiesTab(page, detailsPage);
  }

  async getToolbar() {
    return await Toolbar.build(this._page, "Vulnerability toolbar");
  }

  async getTable() {
    return await Table.build(
      this._page,
      "Vulnerability table",
      {
        Id: { isSortable: true },
        Description: { isSortable: false },
        CVSS: { isSortable: true },
        "Affected dependencies": { isSortable: true },
        Published: { isSortable: true },
        Updated: { isSortable: true },
      },
      [],
    );
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `vulnerability-table-pagination-${top ? "top" : "bottom"}`,
    );
  }
}
