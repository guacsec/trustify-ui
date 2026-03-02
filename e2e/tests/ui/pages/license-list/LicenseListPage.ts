import type { Page } from "@playwright/test";
import { Navigation } from "../Navigation";
import { Pagination } from "../Pagination";
import { Table } from "../Table";
import { Toolbar } from "../Toolbar";

export class LicenseListPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("Licenses");

    return new LicenseListPage(page);
  }

  async getToolbar() {
    return await Toolbar.build(
      this._page,
      "license-toolbar",
      {
        Name: "string",
      },
      undefined,
    );
  }

  async getTable() {
    return await Table.build(
      this._page,
      "license-table",
      ["Name", "Packages", "SBOMs"],
      [],
    );
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `license-table-pagination-${top ? "top" : "bottom"}`,
    );
  }
}
