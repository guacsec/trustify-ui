import { expect, type Page } from "@playwright/test";
import { Navigation } from "../Navigation";
import { FilterCard } from "../FilterCard";
import { Table } from "../Table";
import { Pagination } from "../Pagination";
import { SearchPageTabs } from "../SearchPageTabs";
import { Toolbar } from "../Toolbar";

type Category = "sbom" | "package" | "vulnerability" | "advisory";
export type Tabs = "SBOMs" | "Packages" | "Vulnerabilities" | "Advisories";

export class SearchPage {
  private readonly _page: Page;
  private _category: Category | null = null;

  constructor(page: Page) {
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

    // Wait for the tab content to load
    await this._page.waitForTimeout(500);
  }

  async getFilterCard() {
    // The filter panel is in the left side of the Split component
    // Find it by looking for the card that contains filter headings
    const filterPanel = this._page.locator(".pf-v6-c-card__body").filter({
      has: this._page.locator("button:has-text('Clear all filters')"),
    });
    return await FilterCard.buildFromLocator(this._page, filterPanel);
  }

  get _filterCard() {
    return this._page.locator(".pf-v6-c-card__body").filter({
      has: this._page.locator("button:has-text('Clear all filters')"),
    });
  }

  async getToolbar() {
    if (!this._category) throw new Error("No category selected");

    switch (this._category) {
      case "sbom":
        return await Toolbar.build(this._page, "sbom-toolbar", {
          "Filter text": "string",
          "Created on": "dateRange",
          Label: "typeahead",
          License: "typeahead",
        });
      case "package":
        return await Toolbar.build(this._page, "package-toolbar", {
          "Filter text": "string",
          Type: "multiSelect",
          Architecture: "multiSelect",
          License: "typeahead",
        });
      case "vulnerability":
        return await Toolbar.build(this._page, "vulnerability-toolbar", {
          "Filter text": "string",
          CVSS: "multiSelect",
          "Date published": "dateRange",
        });
      case "advisory":
        return await Toolbar.build(this._page, "advisory-toolbar", {
          "Filter text": "string",
          Revision: "dateRange",
          Label: "typeahead",
        });
      default:
        throw new Error(`Unknown category: ${this._category}`);
    }
  }

  async getTable() {
    if (!this._category) throw new Error("No category selected");

    switch (this._category) {
      case "sbom":
        return await Table.build(
          this._page,
          "sbom-table",
          [
            "Name",
            "Version",
            "Supplier",
            "Labels",
            "Created on",
            "Dependencies",
            "Vulnerabilities",
          ],
          ["Edit labels", "Download SBOM", "Download License Report", "Delete"],
        );
      case "package":
        return await Table.build(
          this._page,
          "Package table",
          [
            "Name",
            "Namespace",
            "Version",
            "Type",
            "Licenses",
            "Path",
            "Qualifiers",
            "Vulnerabilities",
          ],
          [],
        );
      case "vulnerability":
        return await Table.build(
          this._page,
          "Vulnerability table",
          ["ID", "Title", "CVSS", "Published", "SBOMs"],
          [],
        );
      case "advisory":
        return await Table.build(
          this._page,
          "advisory-table",
          [
            "ID",
            "Title",
            "Type",
            "Labels",
            "Revision",
            "Vulnerabilities",
            "Average severity",
          ],
          ["Edit labels", "Download advisory", "Delete"],
        );
      default:
        throw new Error(`Unknown category: ${this._category}`);
    }
  }

  async getPagination(top: boolean = true) {
    if (!this._category) throw new Error("No category selected");
    return await Pagination.build(
      this._page,
      `${this._category}-table-pagination-${top ? "top" : "bottom"}`,
    );
  }

  async typeInSearchBox(searchText: string) {
    const searchInput = this._page.getByPlaceholder(
      "Search for an SBOM, Package, Advisory, or Vulnerability",
    );
    await searchInput.click();
    await searchInput.fill(searchText);
    // Wait for debounce and autocomplete to potentially appear
    await this._page.waitForTimeout(600);
  }

  async autoFillIsNotVisible() {
    const menu = this._page.locator("ul[role='menu']");
    await expect(menu).not.toBeVisible();
  }

  async autoFillHasRelevantResults(searchText: string) {
    const menu = this._page.locator("ul[role='menu']");
    await expect(menu).toBeVisible();

    const menuItems = menu.locator("li[role='none']");
    const count = await menuItems.count();

    expect(count).toBeGreaterThan(0);

    // Check that at least one menu item contains the search text
    const searchTextLower = searchText.toLowerCase();
    let foundMatch = false;

    for (let i = 0; i < count; i++) {
      const item = menuItems.nth(i);
      const text = await item.textContent();
      if (text?.toLowerCase().includes(searchTextLower)) {
        foundMatch = true;
        break;
      }
    }

    expect(foundMatch).toBe(true);
  }

  async totalAutoFillResults(): Promise<number> {
    const menu = this._page.locator("ul[role='menu']");
    const menuItems = menu.locator("li[role='none']");
    return await menuItems.count();
  }

  async expectCategoriesWithinLimitByHref(limit: number) {
    const menu = this._page.locator("ul[role='menu']");
    const menuItems = menu.locator("li[role='none'] a");

    const categoryCount: Record<string, number> = {
      advisories: 0,
      packages: 0,
      sboms: 0,
      vulnerabilities: 0,
    };

    const count = await menuItems.count();

    for (let i = 0; i < count; i++) {
      const link = menuItems.nth(i);
      const href = await link.getAttribute("href");

      if (href?.includes("/advisories/")) {
        categoryCount.advisories++;
      } else if (href?.includes("/packages/")) {
        categoryCount.packages++;
      } else if (href?.includes("/sboms/")) {
        categoryCount.sboms++;
      } else if (href?.includes("/vulnerabilities/")) {
        categoryCount.vulnerabilities++;
      }
    }

    // Each category should have at most 'limit' items
    for (const [_category, count] of Object.entries(categoryCount)) {
      expect(count).toBeLessThanOrEqual(limit);
    }
  }
}
