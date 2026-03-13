import { expect, type Locator, type Page } from "@playwright/test";

export class GroupFormModal {
  private readonly _page: Page;
  readonly _dialog: Locator;

  private constructor(page: Page, dialog: Locator) {
    this._page = page;
    this._dialog = dialog;
  }

  static async build(page: Page, mode: "Create group" | "Edit group") {
    const dialog = page.getByRole("dialog", { name: mode });
    await expect(dialog).toBeVisible();
    return new GroupFormModal(page, dialog);
  }

  async fillName(name: string) {
    await this._dialog.getByRole("textbox", { name: "Group name" }).fill(name);
  }

  async clearAndFillName(name: string) {
    const input = this._dialog.getByRole("textbox", { name: "Group name" });
    await input.clear();
    await input.fill(name);
  }

  async selectIsProduct(isProduct: boolean) {
    await this._dialog
      .getByRole("radio", { name: isProduct ? "Yes" : "No" })
      .click();
  }

  async fillDescription(description: string) {
    await this._dialog
      .getByRole("textbox", { name: "Description" })
      .fill(description);
  }

  async clearAndFillDescription(description: string) {
    const input = this._dialog.getByRole("textbox", { name: "Description" });
    await input.clear();
    await input.fill(description);
  }

  async expandAdvanced() {
    const advancedButton = this._dialog.getByRole("button", {
      name: "Advanced",
    });
    const isExpanded = await advancedButton.getAttribute("aria-expanded");
    if (isExpanded !== "true") {
      await advancedButton.click();
    }
  }

  async addLabel(label: string) {
    await this.expandAdvanced();
    const combobox = this._dialog.locator(
      "input[aria-label='labels-select-toggle']",
    );
    await combobox.fill(label);
    await this._page.keyboard.press("Enter");
  }

  async selectParentGroup(name: string) {
    await this._dialog
      .getByRole("button", { name: /select parent group/i })
      .click();
    await this._dialog.getByRole("menuitem", { name }).click();
  }

  async clearParentGroup() {
    await this._dialog.getByLabel("Clear selection").click();
  }

  async submit() {
    const submitButton = this._dialog.getByRole("button", { name: "submit" });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(this._dialog).not.toBeVisible();
  }

  async clickCancel() {
    await this._dialog.getByRole("button", { name: "cancel" }).click();
    await expect(this._dialog).not.toBeVisible();
  }
}
