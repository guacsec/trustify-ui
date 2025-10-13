import { expect, type Locator, type Page } from "@playwright/test";
import { resolveAssetPath } from "../Helpers";

export class SbomScanPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    return new SbomScanPage(page);
  }

  get heading(): Locator {
    return this._page.getByRole("heading", { level: 1 });
  }

  get browseFilesButton(): Locator {
    return this._page.getByRole("button", { name: "Browse Files" });
  }

  get actionsButton(): Locator {
    return this._page.getByRole("button", { name: "Actions" });
  }

  get headerDescription(): Locator {
    return this._page.getByText("This is a temporary vulnerability report.");
  }

  get filterDropdown(): Locator {
    return this._page.getByLabel("filtered-by");
  }

  async errorVulnerabilitiesHeading(header: string) {
    await this._page.getByRole("heading", { name: header }).isVisible();
  }

  async errorVulnerabilitiesBody(body: string) {
    await this._page.getByText(body).isVisible();
  }

  async uploadFileFromDialog(filePath: string, fileName: string) {
    const relativePath = resolveAssetPath(filePath, fileName);
    const fileChooserPromise = this._page.waitForEvent("filechooser");
    await this.browseFilesButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(relativePath);
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
