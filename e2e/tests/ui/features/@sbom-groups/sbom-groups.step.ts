import { createBdd } from "playwright-bdd";
import { expect } from "../../assertions";
import { test } from "../../fixtures";

import { ToolbarTable } from "../../helpers/ToolbarTable";

import { DeletionConfirmDialog } from "../../pages/ConfirmDialog";
import { Pagination } from "../../pages/Pagination";
import { SbomGroupDetailPage } from "../../pages/sbom-group-detail/SbomGroupDetailPage";
import { AddToGroupModal } from "../../pages/sbom-group-list/AddToGroupModal";
import { GroupFormModal } from "../../pages/sbom-group-list/GroupFormModal";
import { SbomGroupListPage } from "../../pages/sbom-group-list/SbomGroupListPage";
import { SbomListPage } from "../../pages/sbom-list/SbomListPage";

export const { Given, When, Then } = createBdd(test);

// Navigation
Given("User navigates to SBOM Groups page", async ({ page }) => {
  await SbomGroupListPage.build(page);
});

When("User navigates to SBOM list page", async ({ page }) => {
  await SbomListPage.build(page);
});

Then("The SBOM Groups table is visible", async ({ page }) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  await expect(listPage.getTreegrid()).toBeVisible();
});

// Generic button click — kept as-is (parameterized, semantic ARIA role query)
When("User clicks {string} button", async ({ page }, buttonName: string) => {
  await page.getByRole("button", { name: buttonName }).click();
});

// Fill group name (works for both create and edit modals)
When("User fills group name with {string}", async ({ page }, name: string) => {
  const modal = await GroupFormModal.fromCurrentPage(page);
  await modal.clearAndFillName(name);
});

When(
  "User fills group description with {string}",
  async ({ page }, description: string) => {
    const modal = await GroupFormModal.fromCurrentPage(page);
    await modal.fillDescription(description);
  },
);

When(
  "User fills group product status with {string}",
  async ({ page }, isProduct: string) => {
    const modal = await GroupFormModal.fromCurrentPage(page);
    await modal.selectIsProduct(isProduct === "Yes");
  },
);

When("User submits the group form", async ({ page }) => {
  const modal = await GroupFormModal.fromCurrentPage(page);
  await modal.submit();
});

Then(
  "Alert message {string} is displayed",
  async ({ page }, message: string) => {
    await expect(page.getByText(message)).toBeVisible();
  },
);

// Given setup steps — group existence with POM
Given("A group {string} exists", async ({ page }, groupName: string) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.applyFilter({ Filter: groupName });

  const row = listPage.getGroupRow(groupName);
  if ((await row.count()) === 0) {
    const modal = await listPage.toolbarOpenCreateGroupModal();
    await modal.clearAndFillName(groupName);
    await modal.fillDescription(`Test description for ${groupName}`);
    await modal.selectIsProduct(false);
    await modal.submit();
    await expect(listPage.getTreegrid()).toBeVisible();
  }

  await toolbar.clearAllFilters();
});

Given(
  "A group {string} exists with description {string}",
  async ({ page }, groupName: string, description: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: groupName });

    const row = listPage.getGroupRow(groupName);
    if ((await row.count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(groupName);
      await modal.fillDescription(description);
      await modal.selectIsProduct(false);
      await modal.submit();
    }

    await toolbar.clearAllFilters();
  },
);

When(
  "User clicks kebab menu for group {string}",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    await listPage.openKebabForGroup(groupName);
  },
);

// Generic menuitem click — kept as-is (semantic ARIA role query for short-lived dropdown)
When("User selects {string} action", async ({ page }, actionName: string) => {
  await page.getByRole("menuitem", { name: actionName }).click();
});

Then(
  "The group {string} is visible in the table",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    await expect(
      listPage.getTreegrid().getByRole("link", { name: groupName }),
    ).toBeVisible();
  },
);

// Delete group
Then("The delete confirmation dialog is displayed", async ({ page }) => {
  await DeletionConfirmDialog.build(page, "Confirm dialog");
});

When("User confirms deletion", async ({ page }) => {
  const dialog = await DeletionConfirmDialog.build(page, "Confirm dialog");
  await dialog.clickConfirm();
});

When("User cancels deletion", async ({ page }) => {
  const dialog = await DeletionConfirmDialog.build(page, "Confirm dialog");
  await dialog.clickCancel();
});

Then(
  "The group {string} is deleted successfully",
  async ({ page }, groupName: string) => {
    const successMessage = page.getByText(`The group ${groupName} was deleted`);
    await expect(successMessage).toBeVisible();
  },
);

Then(
  "The SBOM Groups table does not contain {string}",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const row = listPage.getGroupRow(groupName);
    await expect(row).not.toBeVisible();
  },
);

When("User clicks on group {string}", async ({ page }, groupName: string) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  await listPage.clickGroupLink(groupName);
});

Then("The group details page is displayed", async ({ page }) => {
  await SbomGroupDetailPage.fromCurrentPage(page);
});

Then(
  "The group description is {string}",
  async ({ page }, description: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const descriptionEl = detailPage.getDescription();
    await expect(descriptionEl).toContainText(description);
  },
);

Then("The group shows {int} member SBOMs", async ({ page }, count: number) => {
  if (count === 0) {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    await detailPage.hasEmptyState();
  } else {
    const toolbarTable = new ToolbarTable(page, "SBOMs table");
    await toolbarTable.verifyPaginationHasTotalResults(count);
  }
});

Then("The empty state message is displayed", async ({ page }) => {
  const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
  await detailPage.hasEmptyState();
});

When(
  "User sets items per page to {int} on SBOM List page",
  async ({ page }, rowsPerPage: number) => {
    const listPage = await SbomListPage.fromCurrentPage(page);
    const pagination = await listPage.getPagination();
    await pagination.selectItemsPerPage(rowsPerPage as 10 | 20 | 50 | 100);
  },
);

// SBOM membership (via SBOM list page)
When(
  "User selects SBOM {string} for bulk action",
  async ({ page }, sbomName: string) => {
    const listPage = await SbomListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ "Filter text": sbomName });

    const table = await listPage.getTable();
    const row = await table.getRowsByCellValue({ Name: sbomName });
    await row.first().getByRole("checkbox").click();
  },
);

When(
  "User selects group {string} in the modal",
  async ({ page }, groupName: string) => {
    const modal = await AddToGroupModal.build(page);
    await modal.selectGroup(groupName);
  },
);

When("User submits add to group form", async ({ page }) => {
  const modal = await AddToGroupModal.build(page);
  await modal.submit();
});

Then(
  "Success notification {string} is displayed",
  async ({ page }, sbomCount: string) => {
    await expect(
      page.getByRole("heading", {
        name: `Success alert: ${sbomCount} SBOM(s)`,
      }),
    ).toBeVisible();
  },
);

Then(
  "The SBOM {string} is visible in the group member list",
  async ({ page }, sbomName: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const table = await detailPage.getMemberSbomsTable();
    await expect(table).toHaveColumnWithValue("Name", sbomName);
  },
);

Then(
  "The Selected SBOMs are visible in the group member list",
  async ({ page, selectedSbomNames }) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const table = await detailPage.getMemberSbomsTable();
    for (const sbomName of selectedSbomNames) {
      await expect(table).toHaveColumnWithValue("Name", sbomName);
    }
  },
);

When("User clears all filters on SBOM List page", async ({ page }) => {
  const listPage = await SbomListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.clearAllFilters();
});

// Compound step: navigate to SBOM list, select two SBOMs, add them to a group,
// and assert the success notification. Encapsulates the repeated setup pattern
// used by multi-SBOM scenarios (pagination, sort, count verification, membership).
When(
  "User adds SBOMs {string} and {string} to group {string}",
  async ({ page }, sbom1: string, sbom2: string, groupName: string) => {
    const listPage = await SbomListPage.build(page);
    const pagination = await listPage.getPagination();
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();
    await toolbar.applyFilter({ "Filter text": sbom1 });
    const row1 = await table.getRowsByCellValue({ Name: sbom1 });
    await row1.first().getByRole("checkbox").click();
    await toolbar.clearAllFilters();
    await toolbar.applyFilter({ "Filter text": sbom2 });
    const row2 = await table.getRowsByCellValue({ Name: sbom2 });
    await row2.first().getByRole("checkbox").click();
    await toolbar.clearAllFilters();
    await pagination.selectItemsPerPage(100);
    await page.getByRole("button", { name: "Add to group" }).click();
    const modal = await AddToGroupModal.build(page);
    await modal.selectGroup(groupName);
    await modal.submit();
  },
);

When(
  "User adds multiple SBOMs to the group {string}",
  async ({ page, selectedSbomNames }, groupName: string) => {
    const listPage = await SbomListPage.build(page);
    const table = await listPage.getTable();
    const row1 = (await table.getRows()).nth(1);
    const row2 = (await table.getRows()).nth(2);

    const name1 = await row1.locator('td[data-label="Name"]').textContent();
    const name2 = await row2.locator('td[data-label="Name"]').textContent();
    if (name1) selectedSbomNames.push(name1.trim());
    if (name2) selectedSbomNames.push(name2.trim());

    await row1.getByRole("checkbox").click();
    await row2.getByRole("checkbox").click();
    await page.getByRole("button", { name: "Add to group" }).click();
    const modal = await AddToGroupModal.build(page);
    await modal.selectGroup(groupName);
    await modal.submit();
  },
);

// Filtering
When("User clears all filters on SBOM Groups page", async ({ page }) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.clearAllFilters();
});

Then("The SBOM Groups table shows all groups", async ({ page }) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const rows = listPage.getTreegrid().getByRole("row");
  await expect(rows.first()).toBeVisible();
});

When(
  "User applies filter {string} with value {string}",
  async ({ page }, filterName: string, filterValue: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ [filterName]: filterValue });
  },
);

Then(
  "The SBOM Groups table shows filtered results containing {string}",
  async ({ page }, searchTerm: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    await expect(
      listPage.getTreegrid().getByRole("link", { name: searchTerm }),
    ).toBeVisible();
  },
);

// Hierarchical tree display
Given(
  "A parent group {string} with child group {string} exists",
  async ({ page }, parentName: string, childName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();

    // Ensure parent exists
    await toolbar.applyFilter({ Filter: parentName });
    if ((await listPage.getGroupRow(parentName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(parentName);
      await modal.fillDescription(`Parent group for ${childName}`);
      await modal.selectIsProduct(false);
      await modal.submit();
      await expect(listPage.getTreegrid()).toBeVisible();
    }

    await toolbar.clearAllFilters();

    // Ensure child exists under parent
    await toolbar.applyFilter({ Filter: childName });
    if ((await listPage.getGroupRow(childName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(childName);
      await modal.selectParentGroup(parentName);
      await modal.selectIsProduct(false);
      await modal.submit();
      await expect(listPage.getTreegrid()).toBeVisible();
    }

    await toolbar.clearAllFilters();
  },
);

When(
  "User expands the tree node for {string}",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    await listPage.expandTreeNode(groupName);
  },
);

Then(
  "The child group {string} is visible under {string}",
  async ({ page }, childName: string, parentName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const treegrid = listPage.getTreegrid();
    await expect(treegrid.getByRole("link", { name: childName })).toBeVisible();
    const parentLevel = await listPage.getGroupTreeLevel(parentName);
    const childLevel = await listPage.getGroupTreeLevel(childName);
    expect(childLevel).toBe(parentLevel + 1);
  },
);

When(
  "User collapses the tree node for {string}",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    await listPage.collapseTreeNode(groupName);
  },
);

Then(
  "The child group {string} is not visible",
  async ({ page }, childName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const treegrid = listPage.getTreegrid();
    await expect(
      treegrid.getByRole("link", { name: childName }),
    ).not.toBeVisible();
  },
);

Then(
  "The group {string} is not expandable",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const isExpandable = await listPage.isGroupExpandable(groupName);
    expect(isExpandable).toBe(false);
  },
);

// Invalid group ID handling
When("User navigates to group details with invalid ID", async ({ page }) => {
  await page.goto("/sbom-groups/invalid-group-id-12345");
});

Then("An error state is displayed for the invalid group", async ({ page }) => {
  const errorHeading = page.getByText("404: That page does not exist");
  await expect(errorHeading).toBeVisible();
});

// Product badge on group detail page
Given(
  "A product group {string} exists",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: groupName });

    if ((await listPage.getGroupRow(groupName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(groupName);
      await modal.fillDescription(`Product group: ${groupName}`);
      await modal.selectIsProduct(true);
      await modal.submit();
    }

    await toolbar.clearAllFilters();
  },
);

Then(
  "The {string} badge is visible on the detail page",
  async ({ page }, badgeText: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const badge = detailPage.getLabelBadge(badgeText);
    await expect(badge).toBeVisible();
  },
);

// Items per page
When(
  "User sets items per page to {int} on SBOM Groups page",
  async ({ page }, rowsPerPage: number) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const pagination = await listPage.getPagination();
    await pagination.selectItemsPerPage(rowsPerPage as 10 | 20 | 50 | 100);
  },
);

// Standalone group (ensures no parent assigned)
Given(
  "A standalone group {string} exists",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: groupName });

    const row = listPage.getGroupRow(groupName);
    if ((await row.count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(groupName);
      await modal.fillDescription(`Test description for ${groupName}`);
      await modal.selectIsProduct(false);
      await modal.submit();
    } else {
      await listPage.openKebabForGroup(groupName);
      await page.getByRole("menuitem", { name: "Edit" }).click();
      const modal = await GroupFormModal.build(page, "Edit group");
      if (await modal.hasParentGroupSet()) {
        await modal.clearParentGroup();
        await modal.submit();
      } else {
        await modal.clickCancel();
      }
    }

    await toolbar.clearAllFilters();
  },
);

// Select parent in edit form
When(
  "User selects parent group {string} in the edit form",
  async ({ page }, parentName: string) => {
    const modal = await GroupFormModal.build(page, "Edit group");
    if (await modal.hasParentGroupSet()) {
      await modal.clearParentGroup();
    }
    await modal.selectParentGroup(parentName);
  },
);

// Edit group to change/remove parent
// Intentional readability alias for "User clicks kebab menu for group {string}" —
// same implementation, different wording for clarity in child-group contexts.
When(
  "User clicks kebab menu for child group {string}",
  async ({ page }, childName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    await listPage.openKebabForGroup(childName);
  },
);

When("User clears parent group selection in the form", async ({ page }) => {
  const modal = await GroupFormModal.build(page, "Edit group");
  await modal.clearParentGroup();
});

Then(
  "The group {string} is visible as a root group",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const isRoot = await listPage.isGroupRootLevel(groupName);
    expect(isRoot).toBe(true);
  },
);

// Breadcrumb navigation
Then(
  "The breadcrumb shows {string} and {string}",
  async ({ page }, firstCrumb: string, secondCrumb: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    await detailPage.verifyBreadcrumbContains(firstCrumb);
    await detailPage.verifyBreadcrumbContains(secondCrumb);
  },
);

When(
  "User clicks the {string} breadcrumb link",
  async ({ page }, linkText: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    await detailPage.clickBreadcrumbLink(linkText);
  },
);

// Pagination on group detail page
Then("The group detail SBOMs pagination is visible", async ({ page }) => {
  await Pagination.build(page, "sbom-table-pagination-top");
});

// Sorting on group detail page
When("User clicks the Name column header to sort SBOMs", async ({ page }) => {
  const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
  const table = await detailPage.getMemberSbomsTable();
  await table.clickSortBy("Name");
});

Then("The SBOMs table is sorted by Name ascending", async ({ page }) => {
  const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
  const table = await detailPage.getMemberSbomsTable();
  await expect(table).toBeSortedBy("Name", "ascending");
});

Then("The SBOMs table is sorted by Name descending", async ({ page }) => {
  const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
  const table = await detailPage.getMemberSbomsTable();
  await expect(table).toBeSortedBy("Name", "descending");
});

// Delete guard — dialog blocks deletion for groups with children
Then(
  "The delete guard dialog is displayed for group {string}",
  async ({ page }, groupName: string) => {
    const dialog = page.getByRole("dialog", { name: "Confirm dialog" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Cannot delete group");
    await expect(dialog).toContainText(groupName);
    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).not.toBeVisible();
  },
);

// Labels in group form
When(
  "User adds label {string} to the group form",
  async ({ page }, label: string) => {
    const modal = await GroupFormModal.fromCurrentPage(page);
    await modal.expandAdvanced();
    await modal.addLabel(label);
  },
);

// Setup: group with specific label
Given(
  "A group {string} with label {string} exists",
  async ({ page }, groupName: string, label: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: groupName });

    if ((await listPage.getGroupRow(groupName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(groupName);
      await modal.selectIsProduct(false);
      await modal.expandAdvanced();
      await modal.addLabel(label);
      await modal.submit();
    }

    await toolbar.clearAllFilters();
  },
);

// Label badge on detail page
Then(
  "The {string} label badge is not visible on the detail page",
  async ({ page }, labelText: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const badge = detailPage.getLabelBadge(labelText);
    await expect(badge).not.toBeVisible();
  },
);

Then("The Product badge is visible on the detail page", async ({ page }) => {
  const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
  const badge = detailPage.getLabelBadge("Product");
  await expect(badge).toBeVisible();
});

// Label badge for named group (not fixture-state)
Then(
  "The {string} label badge is visible for group {string}",
  async ({ page }, labelText: string, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const badge = await listPage.hasLabelBadge(groupName, labelText);
    await expect(badge).toBeVisible();
  },
);

Then(
  "The {string} label badge is not visible for group {string}",
  async ({ page }, labelText: string, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const badge = await listPage.hasLabelBadge(groupName, labelText);
    await expect(badge).not.toBeVisible();
  },
);

// Description visible in tree table row
Then(
  "The description {string} is visible for group {string}",
  async ({ page }, description: string, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const row = listPage.getGroupRow(groupName);
    await expect(row.getByText(description)).toBeVisible();
  },
);

// SBOM count — not displayed (empty group)
Then(
  "The SBOM count is not displayed for group {string}",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const countLocator = await listPage.hasSbomCount(groupName);
    await expect(countLocator).not.toBeVisible();
  },
);

// SBOM count — exact value match
Then(
  "The SBOM count for group {string} shows {string}",
  async ({ page }, groupName: string, expectedText: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const row = listPage.getGroupRow(groupName);
    await expect(row.getByText(expectedText, { exact: true })).toBeVisible();
  },
);

// 3-level hierarchy setup
Given(
  "A grandparent group {string} with parent group {string} and child group {string} exists",
  async (
    { page },
    grandparentName: string,
    parentName: string,
    childName: string,
  ) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();

    await toolbar.applyFilter({ Filter: grandparentName });
    if ((await listPage.getGroupRow(grandparentName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(grandparentName);
      await modal.fillDescription(`Grandparent group`);
      await modal.selectIsProduct(false);
      await modal.submit();
      await expect(listPage.getTreegrid()).toBeVisible();
    }

    await toolbar.clearAllFilters();

    await toolbar.applyFilter({ Filter: parentName });
    if ((await listPage.getGroupRow(parentName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(parentName);
      await modal.selectParentGroup(grandparentName);
      await modal.selectIsProduct(false);
      await modal.submit();
      await expect(listPage.getTreegrid()).toBeVisible();
    }

    await toolbar.clearAllFilters();

    await toolbar.applyFilter({ Filter: childName });
    if ((await listPage.getGroupRow(childName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(childName);
      await modal.selectParentGroup(parentName);
      await modal.selectIsProduct(false);
      await modal.submit();
      await expect(listPage.getTreegrid()).toBeVisible();
    }

    await toolbar.clearAllFilters();
  },
);

// Tree level assertion
Then(
  "The group {string} is at tree level {int}",
  async ({ page }, groupName: string, expectedLevel: number) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const actualLevel = await listPage.getGroupTreeLevel(groupName);
    expect(actualLevel).toBe(expectedLevel);
  },
);

// Form validation — danger notification
Then(
  "A danger notification {string} is displayed",
  async ({ page }, message: string) => {
    await expect(
      page.getByRole("heading", {
        name: new RegExp(`Danger alert:.*${message}`),
      }),
    ).toBeVisible();
  },
);

// Form validation — inline error (PatternFly FormHelperText)
Then(
  "The form validation error {string} is displayed",
  async ({ page }, errorText: string) => {
    const errorItem = page.locator(".pf-v6-c-helper-text__item.pf-m-error");
    await expect(errorItem.filter({ hasText: errorText })).toBeVisible();
  },
);

// Label validation error
Then(
  "The label validation error {string} is displayed",
  async ({ page }, errorText: string) => {
    await expect(page.getByText(errorText)).toBeVisible();
  },
);

// Cancel group form (create or edit)
When("User cancels the group form", async ({ page }) => {
  const modal = await GroupFormModal.fromCurrentPage(page);
  await modal.clickCancel();
});

// Filter SBOMs on group detail page
When(
  "User filters SBOMs by name {string} on the detail page",
  async ({ page }, sbomName: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const toolbar = await detailPage.getToolbar();
    await toolbar.applyFilter({ "Filter text": sbomName });
  },
);

// "An ingested SBOM {string} is available" — shared from tests/ui/steps/list-page.ts
// "The page title is {string}" — shared from @importer-explorer/importer-explorer.step.ts
