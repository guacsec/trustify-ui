import type { Page } from "@playwright/test";
import { Pagination } from "../../Pagination";
import { Table } from "../../Table";
import { Toolbar } from "../../Toolbar";
import { AdvisoryDetailsPage } from "../AdvisoryDetailsPage";

export class VulnerabilitiesTab {
  private readonly _page: Page;
  _detailsPage: AdvisoryDetailsPage;

  private constructor(page: Page, layout: AdvisoryDetailsPage) {
    this._page = page;
    this._detailsPage = layout;
  }

  /**
   * Build the tab by navigating to the advisory details page and selecting the tab.
   */
  static async build(page: Page, advisoryID: string) {
    const detailsPage = await AdvisoryDetailsPage.build(page, advisoryID);
    await detailsPage._layout.selectTab("Vulnerabilities");

    return new VulnerabilitiesTab(page, detailsPage);
  }

  /**
   * Build the tab from the current page state WITHOUT navigating.
   * @param page - The Playwright page object
   * @param advisoryID - Optional advisory ID to verify the page header
   */
  static async fromCurrentPage(page: Page, advisoryID?: string) {
    const detailsPage = await AdvisoryDetailsPage.fromCurrentPage(
      page,
      advisoryID,
    );
    await detailsPage._layout.selectTab("Vulnerabilities");

    return new VulnerabilitiesTab(page, detailsPage);
  }

  async getToolbar() {
    return await Toolbar.build(this._page, "vulnerability toolbar");
  }

  async getTable() {
    return await Table.build(
      this._page,
      "vulnerability table",
      ["ID", "Title", "Discovery", "Release", "Score", "CWE"],
      [],
    );
  }

  async getPagination(location: "top" | "bottom" = "top") {
    return await Pagination.build(
      this._page,
      `vulnerability-table-pagination-${location}`,
    );
  }
}
