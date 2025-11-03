import type { Page } from "@playwright/test";
import { Navigation } from "../Navigation";
import { Toolbar } from "../Toolbar";
import { Table } from "../Table";
import { Pagination } from "../Pagination";

export class PackageListPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("Packages");

    return new PackageListPage(page);
  }

  async getToolbar() {
    const t = await Toolbar.build<{name: string, surname: number}>(this._page, "package-toolbar");
    t.someMethod("name");
    return await Toolbar.build<{name: string, surname: number}>(this._page, "package-toolbar");
  }

  async getTable() {
    return await Table.build(this._page, "Package table");
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `package-table-pagination-${top ? "top" : "bottom"}`,
    );
  }
}
