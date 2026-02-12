import { expect, type Locator, type Page } from "@playwright/test";

export class SearchPageTabs {
  private readonly _page: Page;
  _tab: Locator;

  private constructor(page: Page, tab: Locator) {
    this._page = page;
    this._tab = tab;
  }

  /**
   * @param page
   * @param tabAriaLabel the unique aria-label that corresponds to the DOM element that contains the Table. E.g. <table aria-label="identifier"></table>
   * @returns a new instance of a Toolbar
   */
  static async build(page: Page, tabType: string) {
    const tab = page.locator("button[role='tab']", { hasText: tabType });
    await expect(tab).toBeVisible();

    const result = new SearchPageTabs(page, tab);
    return result;
  }

  async clickTab(tabName: string) {
    const tab = this._page.locator("button[role='tab']", { hasText: tabName });
    await expect(tab).toBeVisible();
    await tab.click();
  }

  async verifyTabHasAtLeastResults(tabName: string, minCount: number) {
    const tab = this._page.locator("button[role='tab']", { hasText: tabName });
    const badge = tab.locator(".pf-v6-c-badge");

    // Wait until the badge has some text
    await expect(badge).toHaveText(/[\d]/, { timeout: 60000 });

    const countText = await badge.textContent();

    // Remove anything that isn't a digit
    const match = countText?.match(/\d+/);
    if (!match) {
      throw new Error(
        `Could not parse badge count for tab "${tabName}": got "${countText}"`,
      );
    }

    const count = parseInt(match[0], 10);
    expect(count).toBeGreaterThanOrEqual(minCount);
  }
}
