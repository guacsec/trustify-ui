import { expect, Page } from "@playwright/test";

export class Tabs{
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectTab(tabName: string) {
    const tab = this.page.locator("button[role='tab']", { hasText: tabName });
    expect(tab).toBeVisible({ timeout: 60000 });
    tab.click();
  }

  async verifyTabIsSelected(tabName: string) {
    const tab = this.page.locator("button[role='tab']", { hasText: tabName });
    await expect(tab).toHaveAttribute("aria-selected", "true");
  }

  async verifyTabIsVisible(tabName: string) {
    const tab = this.page.locator("button[role='tab']", { hasText: tabName });
    await expect(tab).toBeVisible();
  }

  async verifyTabIsNotVisible(tabName: string) {
    const tab = this.page.locator("button[role='tab']", { hasText: tabName });
    await expect(tab).toHaveCount(0);
  }

  async verifyTabHasAtLeastResults(tabName: string, minCount: number) {
    const tab = this.page.locator("button[role='tab']", { hasText: tabName });
    const badge = tab.locator(".pf-v6-c-badge");

    // Wait until the badge has some text
    await expect(badge).toHaveText(/[\d]/,{timeout: 60000});

    const countText = await badge.textContent();

    // Remove anything that isn't a digit
    const match = countText?.match(/\d+/);
    if (!match) {
      throw new Error(`Could not parse badge count for tab "${tabName}": got "${countText}"`);
    }

    const count = parseInt(match[0], 10);
    expect(count).toBeGreaterThanOrEqual(minCount);
  }
}
