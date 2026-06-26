import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { ToolbarTable } from "../../helpers/ToolbarTable";

import { DeletionConfirmDialog } from "../../pages/ConfirmDialog";
import { Pagination } from "../../pages/Pagination";
import { Navigation } from "../../pages/Navigation";
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
  const navigation = await Navigation.build(page);
  await navigation.goToSidebar("All SBOMs");
});

When("User navigates back to SBOM Groups page", async ({ page }) => {
  const navigation = await Navigation.build(page);
  await navigation.goToSidebar("Groups");
});

Then("The SBOM Groups table is visible", async ({ page }) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  await listPage.getTable();
});

Then("The SBOM Groups table shows group data", async ({ page }) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const table = await listPage.getTable();
  await expect(table).toHaveNumberOfRows({ greaterThan: 0 });
});

// Generic button click — kept as-is (parameterized, semantic ARIA role query)
When("User clicks {string} button", async ({ page }, buttonName: string) => {
  await page.getByRole("button", { name: buttonName }).click();
});

// Create group
When(
  "User fills group name with unique timestamp",
  async ({ page, sbomGroupState }) => {
    sbomGroupState.generatedGroupName = `TestGroup_${Date.now()}`;
    const modal = await GroupFormModal.fromCurrentPage(page);
    await modal.clearAndFillName(sbomGroupState.generatedGroupName);
  },
);

When(
  "User fills group name with unique timestamp for edit",
  async ({ page, sbomGroupState }) => {
    sbomGroupState.generatedEditName = `EditedGroup_${Date.now()}`;
    const modal = await GroupFormModal.build(page, "Edit group");
    await modal.clearAndFillName(sbomGroupState.generatedEditName);
  },
);

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

Then("The group creation is successful", async ({ page, sbomGroupState }) => {
  if (!sbomGroupState.generatedGroupName) {
    throw new Error("No generated group name found - step order issue");
  }
  const successMessage = page.getByText(
    `Group ${sbomGroupState.generatedGroupName} created`,
  );
  await expect(successMessage).toBeVisible();
});

Then(
  "The SBOM Groups table contains {string}",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const table = await listPage.getTable();
    await expect(table).toHaveColumnWithValue("Name", groupName);
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
  }
});

Given(
  "A group {string} exists with {int} SBOMs",
  async ({ page }, groupName: string, _sbomCount: number) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: groupName });

    const row = listPage.getGroupRow(groupName);
    if ((await row.count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(groupName);
      await modal.fillDescription(`Group with ${_sbomCount} SBOMs`);
      await modal.selectIsProduct(false);
      await modal.submit();
    }

    await toolbar.applyFilter({ Filter: "" });
  },
);

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

    await toolbar.applyFilter({ Filter: "" });
  },
);

// Kebab and actions
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

Then("The group edit is successful", async ({ page, sbomGroupState }) => {
  if (!sbomGroupState.generatedEditName) {
    throw new Error("No generated edit name found - step order issue");
  }
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const table = await listPage.getTable();
  await expect(table).toHaveColumnWithValue(
    "Name",
    sbomGroupState.generatedEditName,
  );
});

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

// Group details
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

// SBOM membership (via SBOM list page)
When(
  "User selects SBOM {string} for bulk action",
  async ({ page }, sbomName: string) => {
    const listPage = await SbomListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ "Filter text": sbomName });

    const table = await listPage.getTable();
    const row = await table.getRowsByCellValue({ Name: sbomName });
    await row.getByRole("checkbox").click();
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
  "The SBOM {string} is still visible in the group member list",
  async ({ page }, sbomName: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const table = await detailPage.getMemberSbomsTable();
    await expect(table).toHaveColumnWithValue("Name", sbomName);
  },
);

When("User clears all filters on SBOM List page", async ({ page }) => {
  const listPage = await SbomListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.clearAllFilters();
});

// Filtering
When("User clears all filters on SBOM Groups page", async ({ page }) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.clearAllFilters();
});

Then("The SBOM Groups table shows all groups", async ({ page }) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const table = await listPage.getTable();
  await expect(table).toHaveNumberOfRows({ greaterThan: 0 });
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
    const table = await listPage.getTable();
    await expect(table).toHaveColumnWithValue("Name", searchTerm);
  },
);

When(
  "User searches for group {string}",
  async ({ page }, searchTerm: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: searchTerm });
  },
);

// Product label filtering
When(
  "User filters the created group by name",
  async ({ page, sbomGroupState }) => {
    if (!sbomGroupState.generatedGroupName) {
      throw new Error("No generated group name found - step order issue");
    }
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: sbomGroupState.generatedGroupName });
  },
);

Then(
  "The {string} label badge is visible for the created group",
  async ({ page, sbomGroupState }, labelText: string) => {
    if (!sbomGroupState.generatedGroupName) {
      throw new Error("No generated group name found - step order issue");
    }
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const badge = await listPage.hasLabelBadge(
      sbomGroupState.generatedGroupName,
      labelText,
    );
    await expect(badge).toBeVisible();
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
    }

    // Ensure child exists under parent
    await toolbar.applyFilter({ Filter: childName });
    if ((await listPage.getGroupRow(childName).count()) === 0) {
      const modal = await listPage.toolbarOpenCreateGroupModal();
      await modal.clearAndFillName(childName);
      await modal.selectParentGroup(parentName);
      await modal.submit();
    }

    await toolbar.clearAllFilters();
  },
);

When("User filters groups by name {string}", async ({ page }, name: string) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.applyFilter({ Filter: name });
});

Then(
  "The group {string} is visible in the table",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const table = await listPage.getTable();
    await expect(table).toHaveColumnWithValue("Name", groupName);
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
  async ({ page }, childName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const treegrid = listPage.getTreegrid();
    await expect(treegrid.getByRole("link", { name: childName })).toBeVisible();
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

// Parent group selection in create
When(
  "User fills group name with unique timestamp for child",
  async ({ page, sbomGroupState }) => {
    sbomGroupState.generatedChildName = `ChildGroup_${Date.now()}`;
    const modal = await GroupFormModal.fromCurrentPage(page);
    await modal.clearAndFillName(sbomGroupState.generatedChildName);
  },
);

Then(
  "The child group creation is successful",
  async ({ page, sbomGroupState }) => {
    if (!sbomGroupState.generatedChildName) {
      throw new Error("No generated child name found - step order issue");
    }
    const successMessage = page.getByText(
      `Group ${sbomGroupState.generatedChildName} created`,
    );
    await expect(successMessage).toBeVisible();
  },
);

When("User fills group name with {string}", async ({ page }, name: string) => {
  const modal = await GroupFormModal.fromCurrentPage(page);
  await modal.clearAndFillName(name);
});

When(
  "User selects parent group {string} in the form",
  async ({ page }, parentName: string) => {
    const modal = await GroupFormModal.fromCurrentPage(page);
    await modal.selectParentGroup(parentName);
  },
);

Then(
  "The group {string} creation notification is displayed",
  async ({ page }, groupName: string) => {
    const successMessage = page.getByText(`Group ${groupName} created`);
    await expect(successMessage).toBeVisible();
  },
);

// Invalid group ID handling
When("User navigates to group details with invalid ID", async ({ page }) => {
  await page.goto("/sbom-groups/invalid-group-id-12345");
});

Then("An error state is displayed for the invalid group", async ({ page }) => {
  const errorHeading = page.getByRole("heading", {
    name: /error|not found|something went wrong|does not exist|404/i,
  });
  await expect(errorHeading).toBeVisible({ timeout: 10000 });
});

// SBOM count in group list
Then(
  "The SBOM count is displayed for group {string}",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const countLocator = await listPage.hasSbomCount(groupName);
    await expect(countLocator).toBeVisible();
  },
);

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

    await toolbar.applyFilter({ Filter: "" });
  },
);

Then(
  "The {string} badge is visible on the detail page",
  async ({ page }, _badgeText: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const badge = detailPage.getProductBadge();
    await expect(badge).toBeVisible();
  },
);

// Items per page
When(
  "User sets items per page to {int} on SBOM Groups page",
  async ({ page }, perPage: number) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const pagination = await listPage.getPagination();
    await pagination.selectItemsPerPage(perPage as 10 | 20 | 50 | 100);
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
      const clearButton = modal._dialog.getByLabel("Clear selection");
      if ((await clearButton.count()) > 0) {
        await modal.clearParentGroup();
      }
      await modal.submit();
    }
  },
);

// Select parent in edit form
When(
  "User selects parent group {string} in the edit form",
  async ({ page }, parentName: string) => {
    const modal = await GroupFormModal.build(page, "Edit group");
    const clearButton = modal._dialog.getByLabel("Clear selection");
    if ((await clearButton.count()) > 0) {
      await modal.clearParentGroup();
    }
    await modal.selectParentGroup(parentName);
  },
);

// Edit group to change/remove parent
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

// Delete guard — disabled action in kebab menu
Then(
  "The {string} action is disabled in the kebab menu",
  async ({ page }, actionName: string) => {
    const menuItem = page.getByRole("menuitem", { name: actionName });
    await expect(menuItem).toBeVisible();
    const isDisabled = await menuItem.getAttribute("aria-disabled");
    expect(isDisabled).toBe("true");
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
  "The {string} label badge is visible on the detail page",
  async ({ page }, labelText: string) => {
    const detailPage = await SbomGroupDetailPage.fromCurrentPage(page);
    const badge = detailPage.getLabelBadge(labelText);
    await expect(badge).toBeVisible();
  },
);

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

// "An ingested SBOM {string} is available" — shared from tests/ui/steps/list-page.ts
// "The page title is {string}" — shared from @importer-explorer/importer-explorer.step.ts
