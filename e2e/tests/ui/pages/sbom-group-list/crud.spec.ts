// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { SbomGroupListPage } from "./SbomGroupListPage";

const filterByGroupName = async (
  listPage: SbomGroupListPage,
  groupName: string,
) => {
  const toolbar = await listPage.getToolbar();
  await toolbar.applyFilter({ Filter: groupName });
};

test.describe("Create", { tag: ["@tier1", "@crud"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Create Group", async ({ page }) => {
    const groupName = `test-group-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    // Create group
    const modal = await listPage.toolbarOpenCreateGroupModal();
    await modal.fillName(groupName);
    await modal.submit();

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

    // Create group1
    const modal1 = await listPage.toolbarOpenCreateGroupModal();
    await modal1.fillName(groupName);
    await modal1.submit();

    await filterByGroupName(listPage, groupName);
    await expect(
      page.getByRole("treegrid").getByRole("link", { name: groupName }),
    ).toBeVisible();

    // Create group2
    const modal2 = await listPage.toolbarOpenCreateGroupModal();
    await modal2.fillName(groupName);

    // Verify error message
    await expect(
      modal2._dialog.locator(".pf-v6-c-helper-text__item.pf-m-error"),
    ).toContainText(`${groupName} already exists in group`);

    // Verify submit button
    const submitButton = modal2._dialog.getByRole("button", { name: "submit" });
    await expect(submitButton).not.toBeEnabled();
  });

  test("Create Group with same name inside child node", async ({ page }) => {
    const parentName = `test-parent-${Date.now()}`;
    const childName = `test-child-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    // Create parent group
    const parentModal = await listPage.toolbarOpenCreateGroupModal();
    await parentModal.fillName(parentName);
    await parentModal.submit();

    // Create first child under parent
    const child1Modal = await listPage.toolbarOpenCreateGroupModal();
    await child1Modal.fillName(childName);
    await child1Modal.selectParentGroup(parentName);
    await child1Modal.submit();

    // Attempt to create second child with same name under same parent
    const child2Modal = await listPage.toolbarOpenCreateGroupModal();
    await child2Modal.fillName(childName);
    await child2Modal.selectParentGroup(parentName);

    // Verify error message
    await expect(
      child2Modal._dialog.locator(".pf-v6-c-helper-text__item.pf-m-error"),
    ).toContainText(`${childName} already exists in group`);

    // Verify submit button is disabled
    const submitButton = child2Modal._dialog.getByRole("button", {
      name: "submit",
    });
    await expect(submitButton).not.toBeEnabled();
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

    // Create group first
    const createModal = await listPage.toolbarOpenCreateGroupModal();
    await createModal.fillName(groupName);
    await createModal.submit();

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

    // Create two root-level groups
    const modalA = await listPage.toolbarOpenCreateGroupModal();
    await modalA.fillName(groupA);
    await modalA.submit();

    const modalB = await listPage.toolbarOpenCreateGroupModal();
    await modalB.fillName(groupB);
    await modalB.submit();

    // Filter to groupA and open edit
    await filterByGroupName(listPage, groupA);
    const editModal = await listPage.tableClickAction("Edit", 0);
    await editModal.clearAndFillName(groupB);

    // Verify error
    await expect(
      editModal._dialog.locator(".pf-v6-c-helper-text__item.pf-m-error"),
    ).toContainText(`${groupB} already exists in group`);

    const submitButton = editModal._dialog.getByRole("button", {
      name: "submit",
    });
    await expect(submitButton).not.toBeEnabled();
  });

  test("Edit Group with same name inside child node", async ({ page }) => {
    const parentName = `test-parent-${Date.now()}`;
    const childA = `test-childA-${Date.now()}`;
    const childB = `test-childB-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    // Create parent
    const parentModal = await listPage.toolbarOpenCreateGroupModal();
    await parentModal.fillName(parentName);
    await parentModal.submit();

    // Create childA and childB under parent
    const modalA = await listPage.toolbarOpenCreateGroupModal();
    await modalA.fillName(childA);
    await modalA.selectParentGroup(parentName);
    await modalA.submit();

    const modalB = await listPage.toolbarOpenCreateGroupModal();
    await modalB.fillName(childB);
    await modalB.selectParentGroup(parentName);
    await modalB.submit();

    // Filter by parent name to isolate the parent row
    await filterByGroupName(listPage, parentName);

    // Expand the parent to show children
    const treegrid = page.getByRole("treegrid");
    await treegrid.getByRole("button", { name: /expand row/i }).click();

    // Wait for children to load, then edit childA (kebab index 1)
    await expect(treegrid.getByRole("link", { name: childA })).toBeVisible();
    const editModal = await listPage.tableClickAction("Edit", 1);
    await editModal.clearAndFillName(childB);

    // Verify error
    await expect(
      editModal._dialog.locator(".pf-v6-c-helper-text__item.pf-m-error"),
    ).toContainText(`${childB} already exists in group`);

    const submitButton = editModal._dialog.getByRole("button", {
      name: "submit",
    });
    await expect(submitButton).not.toBeEnabled();
  });

  test("Edit Group - clear parent causes duplicate at root level", async ({
    page,
  }) => {
    const sameName = `test-same-${Date.now()}`;
    const parentName = `test-parent-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    // Create root-level group with sameName
    const rootModal = await listPage.toolbarOpenCreateGroupModal();
    await rootModal.fillName(sameName);
    await rootModal.submit();

    // Create parent group
    const parentModal = await listPage.toolbarOpenCreateGroupModal();
    await parentModal.fillName(parentName);
    await parentModal.submit();

    // Create child under parent with sameName
    const childModal = await listPage.toolbarOpenCreateGroupModal();
    await childModal.fillName(sameName);
    await childModal.selectParentGroup(parentName);
    await childModal.submit();

    // Filter by parent, expand it, edit the child (kebab index 1)
    await filterByGroupName(listPage, parentName);
    const treegrid = page.getByRole("treegrid");
    await treegrid.getByRole("button", { name: /expand row/i }).click();
    await expect(treegrid.getByRole("link", { name: sameName })).toBeVisible();
    const editModal = await listPage.tableClickAction("Edit", 1);

    // Clear the parent group selection → child moves to root level
    await editModal.clearParentGroup();

    // Verify duplicate-name error (root already has sameName)
    await expect(
      editModal._dialog.locator(".pf-v6-c-helper-text__item.pf-m-error"),
    ).toContainText(`${sameName} already exists in group`);

    const submitButton = editModal._dialog.getByRole("button", {
      name: "submit",
    });
    await expect(submitButton).not.toBeEnabled();
  });
});

test.describe("Delete", { tag: ["@tier1", "@crud"] }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Delete Group", async ({ page }) => {
    const groupName = `test-delete-${Date.now()}`;
    const listPage = await SbomGroupListPage.build(page);

    // Create group first
    const createModal = await listPage.toolbarOpenCreateGroupModal();
    await createModal.fillName(groupName);
    await createModal.submit();

    // Filter to isolate the created group
    await filterByGroupName(listPage, groupName);

    // Delete group via kebab on the filtered row 0
    const deleteModal = await listPage.tableClickAction("Delete", 0);
    const heading = deleteModal.getDeletionConfirmDialogHeading();
    await expect(heading).toContainText("Permanently delete Group?");
    await deleteModal.clickConfirm();

    // Verify group is removed
    await expect(
      page.getByRole("treegrid").getByRole("link", { name: groupName }),
    ).not.toBeVisible();
  });
});
