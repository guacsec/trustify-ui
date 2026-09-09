import type { Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    return new HomePage(page);
  }

  static async fromCurrentPage(page: Page) {
    return new HomePage(page);
  }

  // --- Section accessors ---

  getGetStartedSection(): Locator {
    return this._page.getByTestId("home-get-started-section");
  }

  getMetricsSection(): Locator {
    return this._page.getByTestId("home-metrics-section");
  }

  getAttentionSection(): Locator {
    return this._page.getByTestId("home-attention-section");
  }

  // --- GetStartedSection helpers ---

  getActionButton(label: string): Locator {
    return this.getGetStartedSection().getByRole("button", { name: label });
  }

  getActionCardTitle(title: string): Locator {
    return this.getGetStartedSection().getByRole("heading", { name: title });
  }

  getActionCard(index: number): Locator {
    return this._page.getByTestId(`home-get-started-action-${index}`);
  }

  // --- PortfolioMetricsSection helpers ---

  getTotalSbomsValue(): Locator {
    return this._page.getByTestId("home-metrics-total-sboms");
  }

  getTotalAdvisoriesValue(): Locator {
    return this._page.getByTestId("home-metrics-total-advisories");
  }

  getLatestSbomLink(): Locator {
    return this.getMetricsSection()
      .locator("dt", { hasText: "Last SBOM ingested" })
      .locator("..")
      .getByRole("link");
  }

  getLatestAdvisoryLink(): Locator {
    return this.getMetricsSection()
      .locator("dt", { hasText: "Last Advisory ingested" })
      .locator("..")
      .getByRole("link");
  }

  // --- VulnerabilityAttentionSection helpers ---

  getAttentionItem(index: number): Locator {
    return this._page.getByTestId(`home-attention-item-${index}`);
  }

  getAttentionSeverity(index: number): Locator {
    return this._page.getByTestId(`home-attention-severity-${index}`);
  }

  getAttentionCveId(index: number): Locator {
    return this._page.getByTestId(`home-attention-id-${index}`);
  }

  getAttentionEmptyState(): Locator {
    return this._page.getByTestId("home-attention-empty");
  }

  getAttentionCveLink(cveId: string): Locator {
    return this.getAttentionSection().getByRole("link", { name: cveId });
  }

  getViewVulnerabilityLink(index: number): Locator {
    return this.getAttentionItem(index).getByRole("link", {
      name: /View vulnerability/i,
    });
  }
}
