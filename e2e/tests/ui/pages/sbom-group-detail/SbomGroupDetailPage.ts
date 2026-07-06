import { expect, type Locator, type Page } from "@playwright/test";

import { DetailsPageLayout } from "../DetailsPageLayout";
import { Pagination } from "../Pagination";
import { Toolbar } from "../Toolbar";
import { Table } from "../Table";

const SBOM_TABLE_COLUMNS = [
  "Name",
  "Version",
  "Supplier",
  "Labels",
  "Created on",
  "Dependencies",
  "Vulnerabilities",
] as const;

const SBOM_TABLE_ACTIONS = [
  "Edit labels",
  "Download SBOM",
  "Download License Report",
  "Delete",
] as const;

export class SbomGroupDetailPage {
  _layout: DetailsPageLayout;
  private readonly _page: Page;

  private constructor(page: Page, layout: DetailsPageLayout) {
    this._page = page;
    this._layout = layout;
  }

  static async fromCurrentPage(page: Page, groupName?: string) {
    const layout = await DetailsPageLayout.build(page);
    if (groupName) {
      await layout.verifyPageHeader(groupName);
    }
    return new SbomGroupDetailPage(page, layout);
  }

  getDescription(): Locator {
    return this._page.locator("p.pf-v6-c-content--p");
  }

  getProductBadge(): Locator {
    return this._page.locator(".pf-v6-c-label", { hasText: "Product" });
  }

  async getMemberSbomsTable() {
    return await Table.build(
      this._page,
      "sbom-table",
      SBOM_TABLE_COLUMNS,
      SBOM_TABLE_ACTIONS,
    );
  }

  async getToolbar() {
    return await Toolbar.build(this._page, "sbom-toolbar", {
      "Filter text": "string",
    } as const);
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `sbom-table-pagination-${top ? "top" : "bottom"}`,
    );
  }

  async hasEmptyState() {
    const emptyState = this._page.getByRole("heading", {
      name: "No data available",
    });
    await expect(emptyState).toBeVisible();
  }

  async verifyBreadcrumbContains(text: string) {
    await this._layout.verifyBreadcrumbContains(text);
  }

  async clickBreadcrumbLink(text: string) {
    await this._layout.clickBreadcrumbLink(text);
  }

  getLabelBadge(label: string): Locator {
    return this._page.locator(".pf-v6-c-label", { hasText: label });
  }
}
