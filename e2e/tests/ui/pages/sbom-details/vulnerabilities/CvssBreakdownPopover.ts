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

  getPopover() {
    return this._popover;
  }

  getTable() {
    return this._table;
  }

  getHighestScoreRow() {
    return this._popover.locator(':has(> :text-is("Highest score:"))');
  }

  getRows() {
    return this._table.locator("tbody tr");
  }

  getVersionCell(row: Locator) {
    return row.locator('td[data-label="Version"]');
  }

  getRowBySeverityAndScore(severity: string, score: string) {
    return this._table
      .locator("tbody tr")
      .filter({
        has: this._page.locator('td[data-label="Severity"]', {
          hasText: severity,
        }),
      })
      .filter({
        has: this._page.locator('td[data-label="Score"]', {
          hasText: score,
        }),
      });
  }
}
