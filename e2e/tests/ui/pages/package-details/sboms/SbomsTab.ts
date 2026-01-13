import type { Page } from "@playwright/test";
import { PackageDetailsPage } from "../PackageDetailsPage";
import { Toolbar } from "../../Toolbar";
import { Table } from "../../Table";
import { Pagination } from "../../Pagination";

export class SbomsTab {
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
    await detailsPage._layout.selectTab("SBOMs using package");

    return new SbomsTab(page, detailsPage);
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
    await detailsPage._layout.selectTab("SBOMs using package");

    return new SbomsTab(page, detailsPage);
  }

  async getToolbar() {
    return await Toolbar.build(this._page, "SBOM toolbar");
  }

  async getTable() {
    return await Table.build(this._page, "SBOM table");
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `sbom-table-pagination-${top ? "top" : "bottom"}`,
    );
  }
}
