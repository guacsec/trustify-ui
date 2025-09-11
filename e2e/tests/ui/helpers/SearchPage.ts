import { expect, type Page } from "@playwright/test";
import { DetailsPage } from "./DetailsPage";

export class SearchPage {
  page: Page;
  menu: string;

  constructor(page: Page, menu: string) {
    this.page = page;
    this.menu = menu;
  }

  /**
   * Searches for an item from the Search view
   * @param type Type of item to search for, corresponds with the tabs in the Search view (SBOMs, Packages, Vulnerabilities, Advisories)
   * @param data Search data to filter
   */
  async generalSearch(type: string, data: string) {
    await this.page.goto("/");
    await this.page.getByRole("link", { name: "Search" }).click();
    const detailsPage = new DetailsPage(this.page);
    await detailsPage.waitForData();
    await detailsPage.verifyDataAvailable();
    await this.page
      .getByPlaceholder(
        "Search for an SBOM, Package, Advisory, or Vulnerability",
      )
      .click();
    await this.page
      .getByPlaceholder(
        "Search for an SBOM, Package, Advisory, or Vulnerability",
      )
      .fill(data);
    await this.page
      .getByPlaceholder(
        "Search for an SBOM, Package, Advisory, or Vulnerability",
      )
      .press("Enter");
    await detailsPage.selectTab(type);
  }

  /**
   * Navigates to given menu option and filters data
   * @deprecated
   * @param menu Option from Vertical navigation menu
   * @param data Search data to filter
   */
  async dedicatedSearch(data: string) {
    await this.page.goto("/");
    await this.page.getByRole("link", { name: `${this.menu}` }).click();
    const detailsPage = new DetailsPage(this.page);
    await detailsPage.waitForData();
    await detailsPage.verifyDataAvailable();
    await this.page.getByPlaceholder("Search").click();
    await this.page.getByPlaceholder("Search").fill(data);
    await this.page.getByPlaceholder("Search").press("Enter");
    await detailsPage.verifyDataAvailable();
  }

  async clickOnPageAction(actionName: string) {
    await this.page.getByRole("button", { name: "Actions" }).click();
    await this.page.getByRole("menuitem", { name: actionName }).click();
  }

  async verifyPageHeader(header: string) {
    await expect(this.page.getByRole("heading")).toContainText(header);
  }

  async open() {
    await this.page.goto("/search");
  } 

  async typeInSearchBox(searchText: string) {
    await this.page.waitForLoadState("networkidle");
    const searchBox = this.page.locator("#autocomplete-search").locator('[aria-label="Search input"]');
    await expect(searchBox).toBeVisible();
    await searchBox.click();
    await this.page.keyboard.type(searchText);
  }

  async autoFillIsVisible() {
    await expect(this.page.locator("#autocomplete-search").locator(".pf-v6-c-menu")).toBeVisible();
  }

  async autoFillIsNotVisible() {
    await expect(this.page.locator("#autocomplete-search").locator(".pf-v6-c-menu")).toBeHidden({timeout: 30000});
  }

  async autoFillHasRelevantResults(searchText: string) {
    const results = this.page.locator("#autocomplete-search").locator(".pf-v6-c-menu").locator("li").filter({ hasText: new RegExp(searchText, 'i') });
    for (const result of await results.all()) {
      await expect(result).toBeVisible();
    }
  }

  async totalAutoFillResults(): Promise<number> {
    // wait for the dropdown items to be attached
    await this.page.waitForSelector('#autocomplete-search .pf-v6-c-menu li', {
      state: 'attached',
      timeout: 10000, // increase if needed
    });

    const results = this.page
      .locator('#autocomplete-search .pf-v6-c-menu li');

    return await results.count();
  }

  async autoFillCategoryCountsByHref(): Promise<Record<string, number>> {
    const results = this.page.locator('#autocomplete-search .pf-v6-c-menu a[href]');
    await results.first().waitFor({ state: 'visible' });

    const categories: Record<string, number> = {
      Vulnerability: 0,
      SBOM: 0,
      Advisory: 0,
      Package: 0,
    };

    const items = await results.elementHandles();
    for (const item of items) {
      const href = await item.getAttribute('href');
      if (!href) continue;

      if (href.startsWith('/vulnerabilities')) categories.Vulnerability++;
      else if (href.startsWith('/sboms')) categories.SBOM++;
      else if (href.startsWith('/advisories')) categories.Advisory++;
      else if (href.startsWith('/packages')) categories.Package++;
    }

    return categories;
  }

  async expectCategoriesWithinLimitByHref(maxCount = 5) {
    const counts = await this.autoFillCategoryCountsByHref();
    for (const [category, count] of Object.entries(counts)) {
      expect(count, `${category} count`).toBeGreaterThanOrEqual(0);
      expect(count, `${category} count`).toBeLessThanOrEqual(maxCount);
    }
  }
}
