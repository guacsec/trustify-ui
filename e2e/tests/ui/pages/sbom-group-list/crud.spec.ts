// @ts-check

import type { Page } from "@playwright/test";

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import type { GroupFormModal } from "./GroupFormModal";
import { SbomGroupListPage } from "./SbomGroupListPage";

const filterByGroupName = async (
  listPage: SbomGroupListPage,
  groupName: string,
) => {
  const toolbar = await listPage.getToolbar();
  await toolbar.applyFilter({ Filter: groupName });
};

const createGroup = async (
  listPage: SbomGroupListPage,
  name: string,
  options?: { parentGroup?: string },
) => {
  const modal = await listPage.toolbarOpenCreateGroupModal();
  await modal.fillName(name);
  if (options?.parentGroup) {
    await modal.selectParentGroup(options.parentGroup);
  }
  await modal.submit();
};

const expectDuplicateNameError = async (
  modal: GroupFormModal,
  name: string,
) => {
  await expect(
    modal._dialog.locator(".pf-v6-c-helper-text__item.pf-m-error"),
  ).toContainText(`${name} already exists in group`);
  const submitButton = modal._dialog.getByRole("button", { name: "submit" });
  await expect(submitButton).not.toBeEnabled();
};

const expandParentAndEditChild = async (
  page: Page,
  listPage: SbomGroupListPage,
  parentName: string,
  childName: string,
) => {
  await filterByGroupName(listPage, parentName);
  const treegrid = page.getByRole("treegrid");
  await treegrid.getByRole("button", { name: /expand row/i }).click();
  await expect(treegrid.getByRole("link", { name: childName })).toBeVisible();
  return await listPage.tableClickAction("Edit", 1);
};

test.describe("Create", { tag: ["@tier1", "@crud"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Create Group", async ({ page }) => {
    const groupName = `test-group-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, groupName);

    // Verify group appears in table
    await filterByGroupName(listPage, groupName);
    await expect(
      page.getByRole("treegrid").getByRole("link", { name: groupName }),
    ).toBeVisible();
  });

  test("Create Group with description", async ({ page }) => {
    const groupName = `test-desc-${Date.now()}`;
    const description = "A test group description";
    const listPage = await SbomGroupListPage.build(page);

    // Create group with description
    const modal = await listPage.toolbarOpenCreateGroupModal();
    await modal.fillName(groupName);
    await modal.fillDescription(description);
    await modal.submit();

    // Verify group and description
    await filterByGroupName(listPage, groupName);
    await expect(
      page.getByRole("treegrid").getByRole("link", { name: groupName }),
    ).toBeVisible();
    await expect(
      page.getByRole("treegrid").locator("p", { hasText: description }),
    ).toBeVisible();
  });

  test("Create Group with labels", async ({ page }) => {
    const groupName = `test-labels-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    // Create group with labels
    const modal = await listPage.toolbarOpenCreateGroupModal();
    await modal.fillName(groupName);
    await modal.addLabel("env=test");
    await modal.addLabel("team=qa");
    await modal.addLabel("tag");
    await modal.submit();

    // Verify labels
    await filterByGroupName(listPage, groupName);
    const treegrid = page.getByRole("treegrid");
    await expect(
      treegrid.locator(".pf-v6-c-label", { hasText: "env=test" }),
    ).toBeVisible();
    await expect(
      treegrid.locator(".pf-v6-c-label", { hasText: "team=qa" }),
    ).toBeVisible();
  });

  test("Create Group as product", async ({ page }) => {
    const groupName = `test-product-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    // Create group as product
    const modal = await listPage.toolbarOpenCreateGroupModal();
    await modal.fillName(groupName);
    await modal.selectIsProduct(true);
    await modal.submit();

    // Verify product label badge in treegrid (filter first to isolate)
    await filterByGroupName(listPage, groupName);
    const treegrid = page.getByRole("treegrid");
    await expect(
      treegrid.locator(".pf-v6-c-label", { hasText: "Product" }),
    ).toBeVisible();
  });

  test("Create Group with same name", async ({ page }) => {
    const groupName = `test-group-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, groupName);

    await filterByGroupName(listPage, groupName);
    await expect(
      page.getByRole("treegrid").getByRole("link", { name: groupName }),
    ).toBeVisible();

    // Attempt to create duplicate
    const modal2 = await listPage.toolbarOpenCreateGroupModal();
    await modal2.fillName(groupName);
    await expectDuplicateNameError(modal2, groupName);
  });

  test("Create Group with same name inside child node", async ({ page }) => {
    const parentName = `test-parent-${Date.now()}`;
    const childName = `test-child-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, parentName);
    await createGroup(listPage, childName, { parentGroup: parentName });

    // Attempt to create duplicate child under same parent
    const child2Modal = await listPage.toolbarOpenCreateGroupModal();
    await child2Modal.fillName(childName);
    await child2Modal.selectParentGroup(parentName);
    await expectDuplicateNameError(child2Modal, childName);
  });
});

test.describe("Edit", { tag: ["@tier1", "@crud"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Edit Group", async ({ page }) => {
    const groupName = `test-edit-${Date.now()}`;
    const updatedName = `test-edited-${Date.now()}`;
    const updatedDescription = "Updated description";
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, groupName);

    // Filter to isolate the created group
    await filterByGroupName(listPage, groupName);

    // Edit group via kebab on filtered row 0
    const editModal = await listPage.tableClickAction("Edit", 0);
    await editModal.clearAndFillName(updatedName);
    await editModal.clearAndFillDescription(updatedDescription);
    await editModal.submit();

    // Clear old filter and verify updated values (filter by new name)
    await filterByGroupName(listPage, updatedName);
    const treegrid = page.getByRole("treegrid");
    await expect(
      treegrid.locator("p", { hasText: updatedDescription }),
    ).toBeVisible();
  });

  test("Edit Group with same name at root level", async ({ page }) => {
    const groupA = `test-editA-${Date.now()}`;
    const groupB = `test-editB-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, groupA);
    await createGroup(listPage, groupB);

    // Filter to groupA and open edit
    await filterByGroupName(listPage, groupA);
    const editModal = await listPage.tableClickAction("Edit", 0);
    await editModal.clearAndFillName(groupB);
    await expectDuplicateNameError(editModal, groupB);
  });

  test("Edit Group with same name inside child node", async ({ page }) => {
    const parentName = `test-parent-${Date.now()}`;
    const childA = `test-childA-${Date.now()}`;
    const childB = `test-childB-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, parentName);
    await createGroup(listPage, childA, { parentGroup: parentName });
    await createGroup(listPage, childB, { parentGroup: parentName });

    // Expand parent, edit childA to childB's name
    const editModal = await expandParentAndEditChild(
      page,
      listPage,
      parentName,
      childA,
    );
    await editModal.clearAndFillName(childB);
    await expectDuplicateNameError(editModal, childB);
  });

  test("Edit Group - clear parent causes duplicate at root level", async ({
    page,
  }) => {
    const sameName = `test-same-${Date.now()}`;
    const parentName = `test-parent-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, sameName);
    await createGroup(listPage, parentName);
    await createGroup(listPage, sameName, { parentGroup: parentName });

    // Expand parent, edit the child
    const editModal = await expandParentAndEditChild(
      page,
      listPage,
      parentName,
      sameName,
    );

    // Clear the parent group selection → child moves to root level
    await editModal.clearParentGroup();
    await expectDuplicateNameError(editModal, sameName);
  });
});

test.describe("Delete", { tag: ["@tier1", "@crud"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Delete Group", async ({ page }) => {
    const groupName = `test-delete-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    await createGroup(listPage, groupName);

    // Filter to isolate the created group
    await filterByGroupName(listPage, groupName);

    // Delete group via kebab on the filtered row 0
    const deleteModal = await listPage.tableClickAction("Delete", 0);
    await expect(deleteModal).toHaveDialogTitle("Permanently delete Group?");
    await deleteModal.clickConfirm();

    // Verify group is removed
    await expect(
      page.getByRole("treegrid").getByRole("link", { name: groupName }),
    ).not.toBeVisible();
  });
});
