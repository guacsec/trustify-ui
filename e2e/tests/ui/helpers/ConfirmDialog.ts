import { expect, type Page } from "@playwright/test";

export class ConfirmDialog {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    const dialog = page.getByRole("dialog", { name: "Confirm dialog" });
    await expect(dialog).toBeVisible();
    return new ConfirmDialog(page);
  }

  async verifyTitle(title: string) {
    const dialog = this._page.getByRole("dialog", { name: "Confirm dialog" });
    await expect(dialog).toContainText(title);
  }

  async clickConfirm() {
    const confirmBtn = this._page.getByRole("button", { name: "confirm" });
    await expect(confirmBtn).toBeVisible();
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();
  }
}
