import type { Page } from "@playwright/test";
import { FileUpload } from "../FileUpload";

export class SBOMUploadPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async buildFromBrowserPath(page: Page) {
    await page.goto("/sboms/upload");
    return new SBOMUploadPage(page);
  }

  async getFileUploader() {
    return await FileUpload.build(this._page, "sbom-uploader");
  }
}
