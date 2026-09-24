import { expect, type Locator, type Page } from "@playwright/test";

export class FileUpload {
  private readonly _page: Page;
  _uploader: Locator;

  private constructor(page: Page, uploader: Locator) {
    this._page = page;
    this._uploader = uploader;
  }

  static async build(page: Page, ariaLabel?: string) {
    const selector = ariaLabel
      ? `div.pf-v6-c-multiple-file-upload[aria-label="${ariaLabel}"]`
      : "div.pf-v6-c-multiple-file-upload";
    const locator = page.locator(selector);
    if (!ariaLabel) {
      await expect(locator).toHaveCount(1);
    }
    await expect(locator).toBeVisible();
    return new FileUpload(page, locator);
  }

  getUploadButton() {
    return this._uploader.getByRole("button", {
      name: "Upload",
      exact: true,
    });
  }

  async uploadFiles(filePaths: string[]) {
    const fileChooserPromise = this._page.waitForEvent("filechooser");
    await this.getUploadButton().click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePaths);
  }

  async getUploadStatusItem(fileName: string) {
    const item = this._page
      .locator(".pf-v6-c-multiple-file-upload__status-item")
      .filter({
        has: this._page
          .locator(".pf-v6-c-progress__description")
          .filter({ hasText: fileName }),
      });
    await expect(item).toBeVisible();

    return item;
  }
}
