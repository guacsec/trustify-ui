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

  static async build(page: Page, packageDetail: Record<string, string>) {
    const detailsPage = await PackageDetailsPage.build(page, {
      Name: packageDetail.Name,
      Version: packageDetail.Version,
    });
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
      {
        ID: { isSortable: true },
        Description: { isSortable: false },
        CVSS: { isSortable: true },
        "Date published": { isSortable: true },
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
