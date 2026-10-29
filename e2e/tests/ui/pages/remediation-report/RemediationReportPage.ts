import type { Locator, Page } from "@playwright/test";

import { expect } from "../../assertions";

import { SbomListPage } from "../sbom-list/SbomListPage";
import { Table } from "../Table";

export class RemediationReportPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page, sbomNames: string[]) {
    const sbomListPage = await SbomListPage.build(page);
    await sbomListPage.selectSbomsByName(sbomNames);
    await sbomListPage.clickRemediationReport();
    return new RemediationReportPage(page);
  }

  static async fromCurrentPage(page: Page) {
    return new RemediationReportPage(page);
  }

  async getImpactSummary() {
    const card = this._page.locator('div[class*="rr-report__impact-grid"]');
    await expect(card).toBeVisible();

    const sbomsWithText = await card
      .locator(
        'div[class*="rr-report__stat"]:has-text("SBOMs with remediations")',
      )
      .locator('div[class*="rr-report__stat-value"]')
      .innerText();
    const [sbomsWith, total] = sbomsWithText
      .split("/")
      .map((s) => parseInt(s.trim(), 10));

    const addressablePackagesText = await card
      .locator('div[class*="rr-report__stat"]:has-text("Addressable packages")')
      .locator('div[class*="rr-report__stat-value"]')
      .innerText();
    const addressablePackages = parseInt(addressablePackagesText.trim(), 10);

    const progressBar = this._page.locator(
      'div[aria-label="Percent of selected SBOMs with remediations"]',
    );
    const coverageText = await progressBar.getAttribute("aria-valuenow");
    const coverage = coverageText ? parseInt(coverageText, 10) : 0;

    return { sbomsWith, total, addressablePackages, coverage };
  }

  async hasVendorRemediationsAlert(): Promise<boolean> {
    const alert = this._page.locator(
      'div.pf-v6-c-alert:has-text("remediations available")',
    );
    return await alert.isVisible();
  }

  async getPackagesTable() {
    return await Table.build(
      this._page,
      "Packages with remediations",
      [
        "Package",
        "Version",
        "Recommended version",
        "Vulnerabilities addressed",
        "Found in",
      ],
      [],
    );
  }

  /**
   * Returns the visible row in the packages table for the given package/version.
   * The page object owns the selectors; callers assert on the returned locators.
   */
  async getPackageRow(packageName: string, version: string): Promise<Locator> {
    const table = await this.getPackagesTable();
    const rows = await table.getRowsByCellValue(
      { Package: packageName, Version: version },
      true,
    );
    const row = rows.first();
    await expect(row).toBeVisible();
    return row;
  }

  /**
   * Returns the label chip texts rendered in the given column of a packages-table
   * row. Returns a locator (not a snapshot) so callers can poll for async rendering.
   */
  getCellLabelTexts(row: Locator, columnLabel: string): Locator {
    return row
      .locator(`td[data-label="${columnLabel}"]`)
      .locator(".pf-v6-c-label__text");
  }

  async expectNoAddressablePackages() {
    await expect(
      this._page.getByText(
        "None of the selected SBOMs have remediations available.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      this._page.locator('table[aria-label="SBOMs with remediations"]'),
    ).toHaveCount(0);
    // PatternFly renders the package table as role=grid because its columns
    // are sortable, so scope by the stable aria-label instead of role=table.
    const table = this._page.locator(
      'table[aria-label="Packages with remediations"]',
    );
    await expect(
      table.getByRole("heading", { name: "No data available", exact: true }),
    ).toBeVisible();
    await expect(table.locator('td[data-label="Package"]')).toHaveCount(0);
    // The report renders a "remediations available" alert unconditionally, so
    // this must be matched by class/text rather than role: a custom-variant
    // PatternFly alert has no role="alert".
    expect(await this.hasVendorRemediationsAlert()).toBe(false);
  }
}
