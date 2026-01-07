import { expect, type Page } from "@playwright/test";

export class ConfirmDialog {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    const dialog = page.locator("#confirm-dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("dialog", { name: "Confirm dialog" })).toBeVisible();
    return new ConfirmDialog(page);
  }

  async verifyTitle(title: string) {
    await expect(this._page.locator("#confirm-dialog")).toContainText(title);
  }

  async clickConfirm() {
    const confirmBtn = this._page.locator("#confirm-dialog-button");
    await expect(confirmBtn).toBeVisible();
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();
  }
}
