import type { Page } from "@playwright/test";
import { Pagination } from "../../Pagination";
import { Table } from "../../Table";
import { Toolbar } from "../../Toolbar";
import { PackageDetailsPage } from "../PackageDetailsPage";

export class SbomsTab {
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
    await detailsPage._layout.selectTab("SBOMs using package");

    return new SbomsTab(page, detailsPage);
  }

  async getToolbar() {
    return await Toolbar.build(this._page, "SBOM toolbar");
  }

  async getTable() {
    return await Table.build(
      this._page,
      "SBOM table",
      {
        Name: { isSortable: true },
        Version: { isSortable: false },
        Supplier: { isSortable: false },
      },
      [],
    );
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `sbom-table-pagination-${top ? "top" : "bottom"}`,
    );
  }
}
