import type { Page } from "@playwright/test";
import { Pagination } from "../../Pagination";
import { Table } from "../../Table";
import { Toolbar } from "../../Toolbar";
import { PackageDetailsPage } from "../PackageDetailsPage";

export class VulnerabilitiesTab {
  private readonly _page: Page;
  _detailsPage: PackageDetailsPage;

  private constructor(page: Page, layout: PackageDetailsPage) {
    this._page = page;
    this._detailsPage = layout;
  }

  /**
   * Build the tab by navigating to the package details page and selecting the tab.
   */
  static async build(page: Page, packageDetail: Record<string, string>) {
    const detailsPage = await PackageDetailsPage.build(page, {
      Name: packageDetail.Name,
      Version: packageDetail.Version,
    });
    await detailsPage._layout.selectTab("Vulnerabilities");

    return new VulnerabilitiesTab(page, detailsPage);
  }

  /**
   * Build the tab from the current page state WITHOUT navigating.
   * @param page - The Playwright page object
   * @param packageName - Optional package name to verify the page header
   */
  static async fromCurrentPage(page: Page, packageName?: string) {
    const detailsPage = await PackageDetailsPage.fromCurrentPage(
      page,
      packageName,
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
      ["ID", "Description", "CVSS", "Date published"],
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
