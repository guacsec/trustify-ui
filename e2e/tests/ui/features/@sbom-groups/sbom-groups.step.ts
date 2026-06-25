import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { ToolbarTable } from "../../helpers/ToolbarTable";

import { SbomGroupListPage } from "../../pages/sbom-group-list/SbomGroupListPage";
import { GroupFormModal } from "../../pages/sbom-group-list/GroupFormModal";
import { SbomListPage } from "../../pages/sbom-list/SbomListPage";
import { Navigation } from "../../pages/Navigation";

export const { Given, When, Then } = createBdd(test);

// Navigation - works for both Given and When
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

// Table visibility and columns
Then("The SBOM Groups table is visible", async ({ page }) => {
  const table = page.getByRole("treegrid");
  await expect(table).toBeVisible();
});

Then("The SBOM Groups table shows group data", async ({ page }) => {
  // Verify the tree table is rendered
  const table = page.getByRole("treegrid", { name: "sbom-groups-table" });
  await expect(table).toBeVisible();

  // Verify that at least one data row is present (not showing empty state)
  const rows = table.getByRole("row");
  await expect(rows.first()).toBeVisible();
});

// Create group
When("User clicks {string} button", async ({ page }, buttonName: string) => {
  await page.getByRole("button", { name: buttonName }).click();
});

// Store generated unique names for assertions
let generatedGroupName: string | null = null;
let generatedEditName: string | null = null;
let pickedSbomNames: string[] = [];

When("User fills group name with unique timestamp", async ({ page }) => {
  // Generate unique name with timestamp
  generatedGroupName = `TestGroup_${Date.now()}`;

  const modal = await GroupFormModal.build(page, "Create group");
  await modal.clearAndFillName(generatedGroupName);
});

When(
  "User fills group name with unique timestamp for edit",
  async ({ page }) => {
    // Generate unique name with timestamp for edit
    generatedEditName = `EditedGroup_${Date.now()}`;

    const modal = await GroupFormModal.build(page, "Edit group");
    await modal.clearAndFillName(generatedEditName);
  },
);

When(
  "User fills group description with {string}",
  async ({ page }, description: string) => {
    await page.getByLabel("Description").fill(description);
  },
);

When(
  "User fills group product status with {string}",
  async ({ page }, isProduct: string) => {
    // isProduct should be "Yes" or "No"
    const radio = page.getByRole("radio", { name: isProduct });
    await radio.click();
    // Wait for the radio to be checked to ensure the form state updates
    await expect(radio).toBeChecked();
  },
);

When("User submits the group form", async ({ page }) => {
  // Button has aria-label="submit" regardless of Create/Edit mode
  const submitButton = page.getByRole("button", { name: "submit" });

  // Wait for the button to be enabled before clicking
  await expect(submitButton).toBeEnabled();
  await submitButton.click();
});

Then("The group creation is successful", async ({ page }) => {
  // Verify success notification appears (uses generatedGroupName from context)
  if (!generatedGroupName) {
    throw new Error("No generated group name found - step order issue");
  }
  const successMessage = page.getByText(`Group ${generatedGroupName} created`);
  await expect(successMessage).toBeVisible();
});

Then(
  "The SBOM Groups table contains {string}",
  async ({ page }, groupName: string) => {
    const row = page.getByRole("row", { name: new RegExp(groupName) });
    await expect(row).toBeVisible();
  },
);

// Edit group
Given("A group {string} exists", async ({ page }, groupName: string) => {
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.applyFilter({ Filter: groupName });

  const row = page.getByRole("row", { name: new RegExp(groupName) });
  const rowCount = await row.count();

  if (rowCount === 0) {
    // Create the group if it doesn't exist
    await page.getByRole("button", { name: "Create group" }).click();
    const modal = await GroupFormModal.build(page, "Create group");
    await modal.clearAndFillName(groupName);
    await modal.fillDescription(`Test description for ${groupName}`);
    await modal.selectIsProduct(false); // Default to "No" for test groups
    await modal.submit();
  }
});

Given(
  "A group {string} exists with {int} SBOMs",
  async ({ page }, groupName: string, sbomCount: number) => {
    // For now, just ensure the group exists
    // SBOM count verification will be done in assertions
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: groupName });

    const row = page.getByRole("row", { name: new RegExp(groupName) });
    const rowCount = await row.count();

    if (rowCount === 0) {
      await page.getByRole("button", { name: "Create group" }).click();
      const modal = await GroupFormModal.build(page, "Create group");
      await modal.clearAndFillName(groupName);
      await modal.fillDescription(`Group with ${sbomCount} SBOMs`);
      await modal.selectIsProduct(false); // Default to "No" for test groups
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

    const row = page.getByRole("row", { name: new RegExp(groupName) });
    const rowCount = await row.count();

    if (rowCount === 0) {
      await page.getByRole("button", { name: "Create group" }).click();
      const modal = await GroupFormModal.build(page, "Create group");
      await modal.clearAndFillName(groupName);
      await modal.fillDescription(description);
      await modal.selectIsProduct(false); // Default to "No" for test groups
      await modal.submit();
    }

    await toolbar.applyFilter({ Filter: "" });
  },
);

When(
  "User clicks kebab menu for group {string}",
  async ({ page }, groupName: string) => {
    const row = page.getByRole("row", { name: new RegExp(groupName) });
    const kebabButton = row.locator('button[aria-label="Kebab toggle"]');
    await kebabButton.click();
  },
);

When("User selects {string} action", async ({ page }, actionName: string) => {
  await page.getByRole("menuitem", { name: actionName }).click();
});

Then("The group edit is successful", async ({ page }) => {
  if (!generatedEditName) {
    throw new Error("No generated edit name found - step order issue");
  }
  const row = page.getByRole("row", { name: new RegExp(generatedEditName) });
  await expect(row).toBeVisible();
});

// Delete group
Then("The delete confirmation dialog is displayed", async ({ page }) => {
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
});

When("User confirms deletion", async ({ page }) => {
  // Button has aria-label="confirm" not "Delete"
  await page.getByRole("button", { name: "confirm", exact: true }).click();
});

When("User cancels deletion", async ({ page }) => {
  await page.getByRole("button", { name: "Cancel" }).click();
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
    const row = page.getByRole("row", { name: new RegExp(groupName, "i") });
    await expect(row).not.toBeVisible();
  },
);

// Group details
When("User clicks on group {string}", async ({ page }, groupName: string) => {
  const link = page.getByRole("link", { name: groupName, exact: true });
  await link.click();

  // Wait for group details page to load
  await page.getByText("Group details").waitFor();
  // Reload the page to ensure we get fresh data from the backend
  await page.reload();
  await page.getByText("Group details").waitFor();
});

Then("The group details page is displayed", async ({ page }) => {
  const breadcrumb = page.getByText("Group details");
  await expect(breadcrumb).toBeVisible();
});

Then(
  "The group description is {string}",
  async ({ page }, description: string) => {
    const descriptionElement = page
      .locator("p")
      .filter({ hasText: description });
    await expect(descriptionElement).toBeVisible();
  },
);

Then("The group shows {int} member SBOMs", async ({ page }, count: number) => {
  if (count === 0) {
    // Changed from /No SBOMs found|No results found/i to match actual UI
    const emptyState = page.getByRole("heading", { name: "No data available" });
    await expect(emptyState).toBeVisible();
  } else {
    const toolbarTable = new ToolbarTable(page, "SBOMs table");
    await toolbarTable.verifyPaginationHasTotalResults(count);
  }
});

Then("The empty state message is displayed", async ({ page }) => {
  // Use heading role to avoid strict mode violation
  const emptyState = page.getByRole("heading", { name: "No data available" });
  await expect(emptyState).toBeVisible();
});

// SBOM membership (via SBOM list page)
When(
  "User selects SBOM {string} for bulk action",
  async ({ page }, sbomName: string) => {
    const listPage = await SbomListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ "Filter text": sbomName });

    const row = page.getByRole("row", { name: new RegExp(sbomName) });
    const checkbox = row.getByRole("checkbox");
    await checkbox.click();
  },
);

When(
  "User picks {int} SBOMs from the list for bulk action",
  async ({ page }, count: number) => {
    const listPage = await SbomListPage.fromCurrentPage(page);
    const table = await listPage.getTable();
    await table.waitUntilDataIsLoaded();

    const nameColumn = table._table.locator('td[data-label="Name"]');
    const availableCount = await nameColumn.count();
    if (availableCount < count) {
      throw new Error(
        `Need ${count} SBOMs but only ${availableCount} available on the page`,
      );
    }

    pickedSbomNames = [];
    const rows = table._table.locator("tbody tr");
    for (let i = 0; i < availableCount && pickedSbomNames.length < count; i++) {
      const name = await nameColumn.nth(i).textContent();
      if (!name) {
        continue;
      }
      const trimmedName = name.trim();

      // Skip if this name conflicts with any already-picked name
      const hasConflict = pickedSbomNames.some(
        (picked) =>
          trimmedName.includes(picked) || picked.includes(trimmedName),
      );
      if (hasConflict) {
        continue;
      }

      pickedSbomNames.push(trimmedName);
      await rows.nth(i).getByRole("checkbox").click();
    }

    if (pickedSbomNames.length < count) {
      throw new Error(
        `Need ${count} non-conflicting SBOMs but only found ${pickedSbomNames.length} on the page`,
      );
    }
  },
);

When(
  "User selects group {string} in the modal",
  async ({ page }, groupName: string) => {
    // Wait for modal to be visible
    await page.getByRole("dialog").waitFor({ state: "visible" });

    // Click the select/dropdown to open options - try multiple possible selectors
    const selectByPlaceholder = page.getByPlaceholder("Select parent group");
    const selectByRole = page.getByRole("button", {
      name: /Select parent group|Select group/i,
    });

    // Try placeholder first, fall back to role
    const selectButton =
      (await selectByPlaceholder.count()) > 0
        ? selectByPlaceholder
        : selectByRole;
    await selectButton.click();

    // Select the group from dropdown - DrilldownSelect uses menuitem not option
    await page.getByRole("menuitem", { name: groupName }).click();
  },
);

When("User submits add to group form", async ({ page }) => {
  const dialog = page.getByRole("dialog");
  const submitButton = dialog.getByRole("button", { name: "submit" });
  await expect(submitButton).toBeEnabled();
  await submitButton.click();
  await expect(dialog).not.toBeVisible();
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
    const row = page.getByRole("row", { name: new RegExp(sbomName) });
    await expect(row).toBeVisible();
  },
);

Then(
  "The SBOM {string} is still visible in the group member list",
  async ({ page }, sbomName: string) => {
    const row = page.getByRole("row", { name: new RegExp(sbomName) });
    await expect(row).toBeVisible();
  },
);

Then(
  "The picked SBOMs are visible in the group member list",
  async ({ page }) => {
    if (pickedSbomNames.length === 0) {
      throw new Error("No SBOMs were picked - step order issue");
    }
    for (const sbomName of pickedSbomNames) {
      const row = page.getByRole("row", { name: new RegExp(sbomName) });
      await expect(row).toBeVisible();
    }
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
  const table = page.getByRole("treegrid", { name: "sbom-groups-table" });
  await expect(table).toBeVisible();

  const rows = table.getByRole("row");
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
    const rows = page.getByRole("row", { name: new RegExp(searchTerm, "i") });
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
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
When("User filters the created group by name", async ({ page }) => {
  if (!generatedGroupName) {
    throw new Error("No generated group name found - step order issue");
  }
  const listPage = await SbomGroupListPage.fromCurrentPage(page);
  const toolbar = await listPage.getToolbar();
  await toolbar.applyFilter({ Filter: generatedGroupName });
});

Then(
  "The {string} label badge is visible for the created group",
  async ({ page }, labelText: string) => {
    const treegrid = page.getByRole("treegrid", { name: "sbom-groups-table" });
    await expect(
      treegrid.locator(".pf-v6-c-label", { hasText: labelText }),
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
    let row = page.getByRole("row", { name: new RegExp(parentName) });
    if ((await row.count()) === 0) {
      await page.getByRole("button", { name: "Create group" }).click();
      const modal = await GroupFormModal.build(page, "Create group");
      await modal.clearAndFillName(parentName);
      await modal.fillDescription(`Parent group for ${childName}`);
      await modal.selectIsProduct(false);
      await modal.submit();
    }

    // Ensure child exists under parent
    await toolbar.applyFilter({ Filter: childName });
    row = page.getByRole("row", { name: new RegExp(childName) });
    if ((await row.count()) === 0) {
      await page.getByRole("button", { name: "Create group" }).click();
      const modal = await GroupFormModal.build(page, "Create group");
      await modal.clearAndFillName(childName);
      await modal.selectParentGroup(parentName);
      await modal.submit();
    }

    await toolbar.applyFilter({ Filter: "" });
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
    const row = page.getByRole("row", { name: new RegExp(groupName) });
    await expect(row).toBeVisible();
  },
);

When(
  "User expands the tree node for {string}",
  async ({ page }, groupName: string) => {
    const treegrid = page.getByRole("treegrid");
    const row = treegrid.getByRole("row", { name: new RegExp(groupName) });
    const expandButton = row.getByRole("button", { name: /expand row/i });
    await expandButton.click();
  },
);

Then(
  "The child group {string} is visible under {string}",
  async ({ page }, childName: string) => {
    const treegrid = page.getByRole("treegrid");
    await expect(treegrid.getByRole("link", { name: childName })).toBeVisible();
  },
);

When(
  "User collapses the tree node for {string}",
  async ({ page }, groupName: string) => {
    const treegrid = page.getByRole("treegrid");
    const row = treegrid.getByRole("row", { name: new RegExp(groupName) });
    const collapseButton = row.getByRole("button", { name: /collapse row/i });
    await collapseButton.click();
  },
);

Then(
  "The child group {string} is not visible",
  async ({ page }, childName: string) => {
    const treegrid = page.getByRole("treegrid");
    await expect(
      treegrid.getByRole("link", { name: childName }),
    ).not.toBeVisible();
  },
);

// Parent group selection in create
When("User fills group name with {string}", async ({ page }, name: string) => {
  const modal = page.getByRole("dialog");
  await modal.getByRole("textbox", { name: "Group name" }).clear();
  await modal.getByRole("textbox", { name: "Group name" }).fill(name);
});

When(
  "User selects parent group {string} in the form",
  async ({ page }, parentName: string) => {
    const modal = page.getByRole("dialog");
    await modal.getByRole("button", { name: /select parent group/i }).click();
    await modal.getByRole("menuitem", { name: parentName }).click();
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
    name: /error|not found|something went wrong/i,
  });
  await expect(errorHeading).toBeVisible({ timeout: 10000 });
});

// SBOM count in group list
Then(
  "The SBOM count is displayed for group {string}",
  async ({ page }, groupName: string) => {
    const row = page.getByRole("row", { name: new RegExp(groupName) });
    await expect(row).toBeVisible();
    await expect(row.locator("text=/\\d+ SBOMs?/")).toBeVisible();
  },
);

// Product badge on group detail page
Given(
  "A product group {string} exists",
  async ({ page }, groupName: string) => {
    const listPage = await SbomGroupListPage.fromCurrentPage(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ Filter: groupName });

    const row = page.getByRole("row", { name: new RegExp(groupName) });
    if ((await row.count()) === 0) {
      await page.getByRole("button", { name: "Create group" }).click();
      const modal = await GroupFormModal.build(page, "Create group");
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
  async ({ page }, badgeText: string) => {
    const label = page.locator(".pf-v6-c-label", { hasText: badgeText });
    await expect(label).toBeVisible();
  },
);

// Edit group to change/remove parent
When(
  "User clicks kebab menu for child group {string}",
  async ({ page }, childName: string) => {
    const treegrid = page.getByRole("treegrid");
    const childRow = treegrid.getByRole("row", {
      name: new RegExp(childName),
    });
    const kebabButton = childRow.locator('button[aria-label="Kebab toggle"]');
    await kebabButton.click();
  },
);

When("User clears parent group selection in the form", async ({ page }) => {
  const modal = page.getByRole("dialog");
  await modal.getByLabel("Clear selection").click();
});

Then(
  "The group {string} is visible as a root group",
  async ({ page }, groupName: string) => {
    const treegrid = page.getByRole("treegrid");
    const row = treegrid.getByRole("row", { name: new RegExp(groupName) });
    await expect(row).toBeVisible();
    // Root-level rows have aria-level=1
    await expect(row).toHaveAttribute("aria-level", "1");
  },
);

// Breadcrumb navigation
Then(
  "The breadcrumb shows {string} and {string}",
  async ({ page }, firstCrumb: string, secondCrumb: string) => {
    const breadcrumb = page.getByRole("navigation", { name: /breadcrumb/i });
    await expect(breadcrumb.getByText(firstCrumb)).toBeVisible();
    await expect(breadcrumb.getByText(secondCrumb)).toBeVisible();
  },
);

When(
  "User clicks the {string} breadcrumb link",
  async ({ page }, linkText: string) => {
    const breadcrumb = page.getByRole("navigation", { name: /breadcrumb/i });
    await breadcrumb.getByRole("link", { name: linkText }).click();
  },
);

// Sorting on group list
When("User clicks the name column header to sort", async ({ page }) => {
  const treegrid = page.getByRole("treegrid", { name: "sbom-groups-table" });
  const nameHeader = treegrid.getByRole("columnheader", { name: /name/i });
  await nameHeader.getByRole("button").click();
});

Then("The groups table is sorted by name ascending", async ({ page }) => {
  const treegrid = page.getByRole("treegrid", { name: "sbom-groups-table" });
  const nameHeader = treegrid.getByRole("columnheader", { name: /name/i });
  await expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
});

Then("The groups table is sorted by name descending", async ({ page }) => {
  const treegrid = page.getByRole("treegrid", { name: "sbom-groups-table" });
  const nameHeader = treegrid.getByRole("columnheader", { name: /name/i });
  await expect(nameHeader).toHaveAttribute("aria-sort", "descending");
});
