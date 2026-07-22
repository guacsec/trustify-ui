import { expect, type Locator, type Page } from "@playwright/test";

export class AddToGroupModal {
  private readonly _page: Page;
  readonly _dialog: Locator;

  private constructor(page: Page, dialog: Locator) {
    this._page = page;
    this._dialog = dialog;
  }

  static async build(page: Page) {
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    return new AddToGroupModal(page, dialog);
  }

  async selectGroup(groupName: string) {
    const selectByPlaceholder = this._dialog.getByPlaceholder(
      "Select parent group",
    );
    const selectByRole = this._dialog.getByRole("button", {
      name: /Select parent group|Select group/i,
    });

    const selectButton =
      (await selectByPlaceholder.count()) > 0
        ? selectByPlaceholder
        : selectByRole;
    await selectButton.click();

    const searchInput = this._dialog.getByPlaceholder("Find by name");
    if ((await searchInput.count()) > 0) {
      await searchInput.fill(groupName);
    }

    await this._dialog.getByRole("menuitem", { name: groupName }).click();
  }

  async submit() {
    const submitButton = this._dialog.getByRole("button", { name: "submit" });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(this._dialog).not.toBeVisible();
  }
}
