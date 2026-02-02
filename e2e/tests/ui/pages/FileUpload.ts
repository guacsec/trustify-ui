import { expect, type Locator, type Page } from "@playwright/test";

export class FileUpload {
  private readonly _page: Page;
  _uploader: Locator;

  private constructor(page: Page, uploader: Locator) {
    this._page = page;
    this._uploader = uploader;
  }

  static async build(page: Page, ariaLabel: string) {
    const locator = page.locator(
      `div.pf-v6-c-multiple-file-upload[aria-label="${ariaLabel}"]`,
    );
    await expect(locator).toBeVisible();
    return new FileUpload(page, locator);
  }

  async uploadFiles(filePaths: string[]) {
    const fileChooserPromise = this._page.waitForEvent("filechooser");
    await this._uploader
      .getByRole("button", { name: "Upload", exact: true })
      .click();
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
