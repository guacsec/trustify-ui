import { expect, type Locator, type Page } from "@playwright/test";

export class DeletionConfirmDialog {
  _deleteConfirmationDialog: Locator;

  private constructor(_deleteConfirmationDialog: Locator) {
    this._deleteConfirmationDialog = _deleteConfirmationDialog;
  }

  static async build(page: Page, dialogAriaLabel: string) {
    const dialog = page.locator(`div[aria-label="${dialogAriaLabel}"]`);
    await expect(dialog).toBeVisible();
    return new DeletionConfirmDialog(dialog);
  }

  getDeletionConfirmDialogHeading() {
    return this._deleteConfirmationDialog.getByRole("heading", { level: 1 });
  }

  async clickConfirm() {
    const confirmBtn = this._deleteConfirmationDialog.getByRole("button", {
      name: "confirm",
    });
    await expect(confirmBtn).toBeVisible();
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();
  }
}
