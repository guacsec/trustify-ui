import type { Page } from "@playwright/test";

import { Navigation } from "../Navigation";
import { Pagination } from "../Pagination";
import { Table } from "../Table";
import { Toolbar } from "../Toolbar";
import { GroupFormModal } from "./GroupFormModal";
import { DeletionConfirmDialog } from "../ConfirmDialog";

type TableActionReturnMap = {
  Edit: GroupFormModal;
  Delete: DeletionConfirmDialog;
};

export class SbomGroupListPage {
  private readonly _page: Page;

  private constructor(page: Page) {
    this._page = page;
  }

  static async build(page: Page) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("Groups");
    return new SbomGroupListPage(page);
  }

  static async fromCurrentPage(page: Page) {
    return new SbomGroupListPage(page);
  }

  async getToolbar() {
    return await Toolbar.build(this._page, "sbom-groups-toolbar", {
      Filter: "string",
    });
  }

  async getPagination(top: boolean = true) {
    return await Pagination.build(
      this._page,
      `sbom-groups-table-pagination-${top ? "top" : "bottom"}`,
    );
  }

  async toolbarOpenCreateGroupModal() {
    await this._page.getByRole("button", { name: "Create group" }).click();
    return await GroupFormModal.build(this._page, "Create group");
  }  

  async tableClickAction<T extends keyof TableActionReturnMap>(
    actionName: T,
    rowIndex: number,
  ) {
    await this._page
      .getByRole("treegrid")
      .locator('button[aria-label="Kebab toggle"]')
      .nth(rowIndex)
      .click();
    await this._page.getByRole("menuitem", { name: actionName }).click();

    switch (actionName) {
      case "Edit":
        return (await GroupFormModal.build(
          this._page,
          "Edit group",
        )) as TableActionReturnMap[T];
      case "Delete":
        return (await DeletionConfirmDialog.build(
          this._page,
          "Confirm dialog",
        )) as TableActionReturnMap[T];
    }
  }
}
