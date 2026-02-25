import type { Page } from "@playwright/test";
import { Navigation } from "../Navigation";
import { Toolbar } from "../Toolbar";
import { Table } from "../Table";
import { Pagination } from "../Pagination";

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
    return await Toolbar.build(this._page, "sbom-toolbar");
  }

  async getTable() {
    return await Table.build(
      this._page,
      "sbom-table",
      {
        Name: { isSortable: true },
        Version: { isSortable: false },
        Supplier: { isSortable: false },
        Labels: { isSortable: false },
        "Created on": { isSortable: true },
        Dependencies: { isSortable: false },
        Vulnerabilities: { isSortable: false },
      },
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
