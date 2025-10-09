import { expect, type Locator, type Page } from "@playwright/test";
import { verifyCommaDelimitedValues } from "../Helpers";

export class SbomScanPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    return new SbomScanPage(page);
  }

  get headingGenerate(): Locator {
    return this._page.getByRole("heading", {
      name: "Generate vulnerability report",
      level: 1,
    });
  }

  get headingReport(): Locator {
    return this._page.getByRole("heading", {
      name: "Vulnerability report",
      level: 1,
    });
  }

  get browseFilesButton(): Locator {
    return this._page.getByRole("button", { name: "Browse Files" });
  }

  get actionsButton(): Locator {
    return this._page.getByRole("button", { name: "Actions" });
  }

  async errorVulnerabilitiesHeading(header: string) {
    this._page.getByRole("heading", { name: header }).isVisible();
  }

  async errorVulnerabilitiesBody(body: string) {
    this._page.getByText(body).isVisible();
  }

  async assertOnScanPage() {
    await expect(this._page).toHaveURL(/\/sboms\/scan$/);
    await expect(this.headingGenerate).toBeVisible();
  }

  private resolveAssetPath(filePath: string, fileName: string): string {
    // Normalize leading slash coming from feature examples and ensure single slash join
    const normalizedPath = filePath.startsWith("/")
      ? filePath.slice(1)
      : filePath;
    const needsSlash = normalizedPath.endsWith("/") ? "" : "/";
    return `${normalizedPath}${needsSlash}${fileName}`;
  }

  async uploadFileFromDialog(filePath: string, fileName: string) {
    const relativePath = this.resolveAssetPath(filePath, fileName);
    const fileChooserPromise = this._page.waitForEvent("filechooser");
    await this.browseFilesButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(relativePath);
  }

  async verifyGenerateScreenElements() {
    await expect(this.browseFilesButton).toBeVisible();
    await expect(
      this._page.getByText("Drag and drop files here"),
    ).toBeVisible();
  }

  async verifyReportHeaderAndText() {
    await expect(this.headingReport).toBeVisible();
    await expect(
      this._page.getByText("This is a temporary vulnerability report."),
    ).toBeVisible();
  }

  async verifyDefaultFilterAndControls(filterOptions: string) {
    // Filter toolbar exists, Status and Importer options listed'
    const filters = filterOptions.split(",").map((filter) => filter.trim());
    await expect(this._page.getByLabel("filtered-by")).toBeVisible();
    await this._page.getByLabel("filtered-by").click();
    for (const filter of filters) {
      await expect(
        this._page.getByRole("menuitem", { name: filter }),
      ).toBeVisible();
    }
  }

  async verifyTooltips(column: string, tooltipMessage: string) {
    // The tooltip button is within the columnheader and has the tooltip text as its accessible name
    const columnHeader = this._page.getByRole("columnheader", {
      name: new RegExp(column),
    });
    const tooltipButton = columnHeader.getByRole("button", {
      name: tooltipMessage,
    });
    await tooltipButton.hover();
    // Wait a bit for potential tooltip to appear
    await this._page.waitForTimeout(500);
  }

  async verifyActionsDropdown(actionsOptions: string) {
    const actions = actionsOptions.split(",").map((action) => action.trim());
    await this.actionsButton.click();
    for (const action of actions) {
      await expect(
        this._page.getByRole("menuitem", { name: action }),
      ).toBeVisible();
    }
  }

  // Processing state and cancel
  async expectProcessingSpinner(headerText: string, cancelLabel: string) {
    await expect(this._page.getByText(headerText)).toBeVisible();
    await expect(
      this._page.getByRole("button", { name: cancelLabel }),
    ).toBeVisible();
  }

  async clickCancelProcessing(cancelLabel: string) {
    await this._page.getByRole("button", { name: cancelLabel }).click();
  }

  /**
   * Gets the vulnerability row from the vulnerability table by vulnerability ID
   * @param vulnerabilityId The vulnerability ID to search for (e.g., "CVE-2024-29025")
   * @returns The row locator
   */
  getVulnerabilityRow(vulnerabilityId: string): Locator {
    const table = this._page.locator('table[aria-label="Vulnerability table"]');
    return table.locator(
      `xpath=//td[@data-label="Vulnerability ID" and contains (.,"${vulnerabilityId}")]/parent::tr`,
    );
  }
}
