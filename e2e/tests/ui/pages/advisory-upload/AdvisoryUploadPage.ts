import type { Page } from "@playwright/test";
import { FileUpload } from "../FileUpload";

export class AdvisoryUploadPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async buildFromBrowserPath(page: Page) {
    await page.goto("/advisories/upload");
    return new AdvisoryUploadPage(page);
  }

  async getFileUploader() {
    return await FileUpload.build(this._page, "advisory-uploader");
  }
}
