import { type Locator, type Page } from "@playwright/test";

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

  async getTable() {
    return await Table.build(
      this._page,
      "sbom-groups-table",
      ["Name"] as const,
      ["Edit", "Delete"] as const,
    );
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
      default: {
        const exhaustiveCheck: never = actionName;
        throw new Error(`Unhandled action: ${exhaustiveCheck}`);
      }
    }
  }

  getTreegrid(): Locator {
    return this._page.getByRole("treegrid");
  }

  getGroupRow(groupName: string): Locator {
    return this.getTreegrid()
      .getByRole("row")
      .filter({
        has: this._page.getByRole("link", { name: groupName, exact: true }),
      });
  }

  async expandTreeNode(groupName: string) {
    const row = this.getGroupRow(groupName);
    await row.getByRole("button", { name: /expand row/i }).click();
  }

  async collapseTreeNode(groupName: string) {
    const row = this.getGroupRow(groupName);
    await row.getByRole("button", { name: /collapse row/i }).click();
  }

  async isGroupExpandable(groupName: string): Promise<boolean> {
    const row = this.getGroupRow(groupName);
    const expandButton = row.getByRole("button", { name: /expand row/i });
    return (await expandButton.count()) > 0;
  }

  async clickGroupLink(groupName: string) {
    const link = this.getTreegrid().getByRole("link", {
      name: groupName,
      exact: true,
    });
    await link.click();
    await this._page.getByText("Group details").waitFor();
    await this._page.reload();
    await this._page.getByText("Group details").waitFor();
  }

  async openKebabForGroup(groupName: string) {
    const row = this.getGroupRow(groupName);
    await row.locator('button[aria-label="Kebab toggle"]').click();
  }

  async getGroupTreeLevel(groupName: string): Promise<number> {
    const row = this.getGroupRow(groupName);
    const level = await row.getAttribute("aria-level");
    return parseInt(level ?? "0", 10);
  }

  async isGroupRootLevel(groupName: string): Promise<boolean> {
    return (await this.getGroupTreeLevel(groupName)) === 1;
  }

  async hasLabelBadge(groupName: string, labelText: string): Promise<Locator> {
    const row = this.getGroupRow(groupName);
    return row.locator(".pf-v6-c-label", { hasText: labelText });
  }

  async hasSbomCount(groupName: string): Promise<Locator> {
    const row = this.getGroupRow(groupName);
    return row.locator("text=/\\d+ SBOMs?/");
  }
}
