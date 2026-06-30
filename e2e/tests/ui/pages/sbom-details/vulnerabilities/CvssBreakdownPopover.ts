import type { Locator, Page } from "@playwright/test";

import { expect } from "../../../assertions";

export class CvssBreakdownPopover {
  private readonly _page: Page;
  private readonly _popover: Locator;
  private readonly _table: Locator;

  private constructor(page: Page, popover: Locator) {
    this._page = page;
    this._popover = popover;
    this._table = popover.locator(
      'table[aria-label="cvss-advisory-breakdown-table"]',
    );
  }

  static async fromCurrentPage(page: Page) {
    const popover = page.getByRole("dialog", {
      name: "CVSS Score Breakdown",
    });
    await expect(popover).toBeVisible();
    return new CvssBreakdownPopover(page, popover);
  }

  async verifyIsVisible() {
    await expect(this._popover).toBeVisible();
    await expect(this._popover.getByText("CVSS Score Breakdown")).toBeVisible();
  }

  async verifyHighestScore(severity: string, score: string) {
    const highestScoreRow = this._popover.locator(
      ':has(> :text-is("Highest score:"))',
    );
    await expect(highestScoreRow).toBeVisible();
    await expect(
      highestScoreRow.getByText(severity, { exact: true }),
    ).toBeVisible();
    await expect(highestScoreRow.getByText(`(${score})`)).toBeVisible();
  }

  async verifyRowCount(expectedRows: number) {
    await expect(this._table).toBeVisible();
    const rows = this._table.locator("tbody tr");
    await expect(rows).toHaveCount(expectedRows);
  }

  async verifyRowValues(score: string, severity: string, version: string) {
    await expect(this._table).toBeVisible();
    const row = this._table
      .locator("tbody tr")
      .filter({
        has: this._page.locator('td[data-label="Severity"]', {
          hasText: severity,
        }),
      })
      .filter({
        has: this._page.locator('td[data-label="Score"]', { hasText: score }),
      });
    await expect(row).toBeVisible();
    await expect(row.locator('td[data-label="Version"]')).toHaveText(version);
  }
}
