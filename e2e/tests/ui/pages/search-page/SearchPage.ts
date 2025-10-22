import { expect, type Page } from "@playwright/test";
import { Navigation } from "../Navigation";
import { FilterCard } from "../FilterCard";
import { Table } from "../Table";
import { Pagination } from "../Pagination";
import { SearchPageTabs } from "../SearchPageTabs";

type Category = "sbom" | "package" | "vulnerability" | "advisory";
export type Tabs = "SBOMs" | "Packages" | "Vulnerabilities" | "Advisories";

export class SearchPage {
  private readonly _page: Page;
  private _category: Category | null = null;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("Search");
    return new SearchPage(page);
  }

  async switchTo(category: Tabs) {
    const tab = await SearchPageTabs.build(this._page, category);
    await tab.clickTab(category);
    if (category === "SBOMs") {
      this._category = "sbom";
    } else if (category === "Packages") {
      this._category = "package";
    } else if (category === "Vulnerabilities") {
      this._category = "vulnerability";
    } else if (category === "Advisories") {
      this._category = "advisory";
    }
  }

  async getFilterCard() {
    return await FilterCard.build(this._page, "Filter panel");
  }

  async getTable() {
    if (!this._category) throw new Error("No category selected");
    return await Table.build(this._page, `${this._category}-table`);
  }

  async getPagination(top: boolean = true) {
    if (!this._category) throw new Error("No category selected");
    return await Pagination.build(
      this._page,
      `${this._category}-table-pagination-${top ? "top" : "bottom"}`
    );
  }
}
