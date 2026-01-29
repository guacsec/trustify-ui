import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { DetailsPage } from "../../helpers/DetailsPage";
import { ToolbarTable } from "../../helpers/ToolbarTable";

import { VulnerabilitiesTab } from "../../pages/sbom-details/vulnerabilities/VulnerabilitiesTab";
import { VulnerabilityDetailsPage } from "../../pages/vulnerability-details/VulnerabilityDetailsPage";
import { SbomsTab } from "../../pages/vulnerability-details/sboms/SbomsTab";
import { PackageDetailsPage } from "../../pages/package-details/PackageDetailsPage";
import { VulnerabilitiesTab as PackageVulnerabilitiesTab } from "../../pages/package-details/vulnerabilities/VulnerabilitiesTab";
import { SbomsTab as PackageSbomsTab } from "../../pages/package-details/sboms/SbomsTab";
import { DeletionConfirmDialog } from "../../pages/ConfirmDialog";
import { SbomListPage } from "../../pages/sbom-list/SbomListPage";
import { SbomDetailsPage } from "../../pages/sbom-details/SbomDetailsPage";

export const { Given, When, Then } = createBdd(test);

const PACKAGE_TABLE_NAME = "Package table";
const VULN_TABLE_NAME = "Vulnerability table";

When(
  "User visits SBOM details Page of {string}",
  async ({ page }, sbomName: string) => {
    // Click the SBOM link from the list page
    const link = page.getByRole("link", { name: sbomName, exact: true });
    await link.click();
    // Wait for details page to load and verify
    const sbomDetailsPage = await SbomDetailsPage.fromCurrentPage(
      page,
      sbomName,
    );
    await sbomDetailsPage._layout.verifyPageHeader(sbomName);
  },
);

Then("{string} is visible", async ({ page }, fieldName: string) => {
  const field = page.locator(`[aria-label="${fieldName}"]`);
  await expect(field).toBeVisible();
});

Then(
  "The Package table is sorted by {string}",
  async ({ page }, columnName: string) => {
    const toolbarTable = new ToolbarTable(page, PACKAGE_TABLE_NAME);
    await toolbarTable.verifyTableIsSortedBy(columnName);
  },
);

Then("Search by FilterText {string}", async ({ page }, filterText: string) => {
  const toolbarTable = new ToolbarTable(page, PACKAGE_TABLE_NAME);
  await toolbarTable.filterByText(filterText);
});

Then(
  "The Package table total results is {int}",
  async ({ page }, totalResults: number) => {
    const toolbarTable = new ToolbarTable(page, PACKAGE_TABLE_NAME);
    await toolbarTable.verifyPaginationHasTotalResults(totalResults);
  },
);

Then(
  "The Package table total results is greather than {int}",
  async ({ page }, totalResults: number) => {
    const toolbarTable = new ToolbarTable(page, PACKAGE_TABLE_NAME);
    await toolbarTable.verifyPaginationHasTotalResultsGreatherThan(
      totalResults,
    );
  },
);

Then(
  "The {string} column of the Package table table contains {string}",
  async ({ page }, columnName: string, expectedValue: string) => {
    const toolbarTable = new ToolbarTable(page, PACKAGE_TABLE_NAME);
    await toolbarTable.verifyColumnContainsText(columnName, expectedValue);
  },
);

When("User Clicks on Vulnerabilities Tab Action", async ({ page }) => {
  const tabActionButton = page.getByLabel("Tab action");
  await tabActionButton.click();
});

Then("Vulnerability Popup menu appears with message", async ({ page }) => {
  const popupMessage = page.getByText("Any found vulnerabilities");
  await expect(popupMessage).toBeVisible();
  await page.getByLabel("Close").click();
});

Then(
  "Vulnerability Risk Profile circle should be visible",
  async ({ page }) => {
    await page.locator(`xpath=//div[contains(@class, 'chart')]`).isVisible();
  },
);

Then(
  "Vulnerability Risk Profile shows summary of vulnerabilities",
  async ({ page }) => {
    const detailsPage = new DetailsPage(page);
    await detailsPage.verifyVulnerabilityPanelcount();
  },
);

Then(
  "SBOM Name {string} should be visible inside the tab",
  async ({ page }, sbomName) => {
    const panelSbomName = await page.locator(
      `xpath=//section[@id='refVulnerabilitiesSection']//dt[contains(.,'Name')]/following-sibling::dd`,
    );
    await panelSbomName.isVisible();
    await expect(await panelSbomName.textContent()).toEqual(sbomName);
  },
);

Then("SBOM Version should be visible inside the tab", async ({ page }) => {
  const panelSBOMVersion = await page.locator(
    `xpath=//section[@id='refVulnerabilitiesSection']//dt[contains(.,'Version')]/following-sibling::dd`,
  );
  await panelSBOMVersion.isVisible();
});

Then(
  "SBOM Creation date should be visible inside the tab",
  async ({ page }) => {
<<<<<<< HEAD
    const panelSBOMVersion = await page.locator(
      `xpath=//section[@id='refVulnerabilitiesSection']//dt[contains(.,'Creation date')]/following-sibling::dd`,
=======
    const panelSBOMCreationDate = await page.locator(
      `xpath=//section[@id='vulnerabilities-tab-section']//dt[contains(.,'Creation date')]/following-sibling::dd`,
>>>>>>> 7a128d7 (chore: Optimize and clean up existing tests and step definitions (#902))
    );
    await panelSBOMCreationDate.isVisible();
  },
);

Then(
  "List of related Vulnerabilities should be sorted by {string} in ascending order",
  async ({ page }, columnName: string) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.verifyTableIsSortedBy(columnName, true);
  },
);

Then(
  "List of Vulnerabilities has column {string}",
  async ({ page }, columnHeader: string) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.verifyTableHeaderContains(columnHeader);
  },
);

Then(
  "Table column {string} is not sortable",
  async ({ page }, columnHeader: string) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.verifyColumnIsNotSortable(columnHeader);
  },
);

When(
  "User Adds Labels {string} to {string} SBOM from Explorer Page",
  async ({ page }, labelList: string, _sbomName: string) => {
    const detailsPage = new DetailsPage(page);
    await detailsPage.editLabelsDetailsPage();
    const labelsToAdd =
      labelList === "RANDOM_LABELS" ? detailsPage.generateLabels() : labelList;
    await detailsPage.addLabels(labelsToAdd);
    // biome-ignore lint/suspicious/noExplicitAny: allowed
    (page as any).testContext = {
      // biome-ignore lint/suspicious/noExplicitAny: allowed
      ...(page as any).testContext,
      generatedLabels: labelsToAdd,
    };
  },
);

Then(
  "The Label list {string} added to the SBOM {string} on Explorer Page",
  async ({ page }, labelList: string, sbomName: string) => {
    const detailsPage = new DetailsPage(page);
    await detailsPage.selectTab("Info");
    const infoSection = page.locator("#info-tab-section");
    // Use stored generated labels if placeholder was used
    const labelsToVerify =
      labelList === "RANDOM_LABELS"
        ? // biome-ignore lint/suspicious/noExplicitAny: allowed
          (page as any).testContext?.generatedLabels || labelList
        : labelList;
    await detailsPage.verifyLabels(labelsToVerify, sbomName, infoSection);
  },
);

When(
  "User select Delete button from the Permanently delete SBOM model window",
  async ({ page }) => {
    const dialog = await DeletionConfirmDialog.build(page, "Confirm dialog");
    await expect(dialog).toHaveTitle("Warning alert:Permanently delete SBOM?");
    await dialog.clickConfirm();
  },
);

When(
  "User Deletes {string} using the toggle option from SBOM List Page",
  async ({ page }, sbomName: string) => {
    const listPage = await SbomListPage.build(page);
    const toolbar = await listPage.getToolbar();
    await toolbar.applyFilter({ "Filter text": sbomName });
    const table = await listPage.getTable();
    const rowToDelete = 0;
    await table.clickAction("Delete", rowToDelete);
  },
);

Then("Application Navigates to SBOM list page", async ({ page }) => {
  const heading = page.getByRole("heading", { level: 1, name: "SBOMs" });
  await expect(heading).toBeVisible();
});

Then(
  "The {string} should not be present on SBOM list page as it is deleted",
  async ({ page }, sbomName: string) => {
    const list = await SbomListPage.build(page);
    const toolbar = await list.getToolbar();
    const table = await list.getTable();
    await toolbar.applyFilter({ "Filter text": sbomName });
    await expect(table).toHaveEmptyState();
  },
);

Then("The SBOM deleted message is displayed", async ({ page }) => {
  // PatternFly toast alerts render the title as a heading inside AlertGroup
  const alertHeading = page.getByRole("heading", { level: 4 }).filter({
    hasText: /The SBOM .+ was deleted/,
  });
  await expect(alertHeading).toBeVisible({ timeout: 10000 });
});

Given(
  "User is on the Vulnerabilities tab with {string} rows per page for SBOM {string}",
  async ({ page }, rowsPerPage: string, sbomName: string) => {
    const vulnerabilitiesTab = await VulnerabilitiesTab.build(page, sbomName);
    const pagination = await vulnerabilitiesTab.getPagination(true);
    await pagination.selectItemsPerPage(
      Number(rowsPerPage) as 10 | 20 | 50 | 100,
    );
  },
);

When(
  "User clicks on the vulnerability row with ID {string}",
  async ({ page }, vulnerabilityID: string) => {
    const vulnerabilityLink = page.getByRole("link", {
      name: vulnerabilityID,
      exact: true,
    });
    await vulnerabilityLink.click();
  },
);

Then(
  "The Application navigates to the Vulnerability details Page of {string}",
  async ({ page }, vulnerabilityID: string) => {
    const vulnDetailsPage = await VulnerabilityDetailsPage.fromCurrentPage(
      page,
      vulnerabilityID,
    );
    await vulnDetailsPage._layout.verifyPageHeader(vulnerabilityID);
  },
);

Then(
  "The Related SBOMs tab loaded with SBOM {string} with status {string}",
  async ({ page }, sbomName: string, status: string) => {
    const sbomsTab = await SbomsTab.fromCurrentPage(page);
    const table = await sbomsTab.getTable();
    await expect(table).toHaveColumnWithValue("Name", sbomName, 0);
    await expect(table).toHaveColumnWithValue("Status", status, 0);
  },
);

Then(
  "The vulnerability {string} does not show in the Vulnerabilities table",
  async ({ page }, vulnerabilityID: string) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.waitForTableContent();
    const vulnerabilityLink = page.getByRole("link", {
      name: vulnerabilityID,
      exact: true,
    });
    await expect(vulnerabilityLink).not.toBeVisible();
  },
);

// Shared step - navigates to vulnerability details page
// Also defined in @vulnerability-explorer/vulnerability-explorer.step.ts
Given(
  "User visits Vulnerability details Page of {string}",
  async ({ page }, vulnerabilityID: string) => {
    await VulnerabilityDetailsPage.build(page, vulnerabilityID);
  },
);

When(
  "User clicks on Affected dependencies count button of the {string}",
  async ({ page }, vulnerabilityID: string) => {
    const vulnerabilityTable = page.locator(
      `table[aria-label="Vulnerability table"]`,
    );
    const vulnerabilityRow = vulnerabilityTable.locator("tbody").filter({
      has: page.getByRole("link", { name: vulnerabilityID, exact: true }),
    });
    const affectedDepsButton = vulnerabilityRow
      .first()
      .locator('td[data-label="Affected dependencies"] button');
    await affectedDepsButton.click();
  },
);

When(
  "User clicks on the package name {string} link on the expanded table",
  async ({ page }, packageName: string) => {
    const vulnerabilityTable = page.locator(
      'table[aria-label="Vulnerability table"]',
    );
    const innerTable = vulnerabilityTable.locator(
      'td[data-label="Affected dependencies"] table',
    );
    const packageLink = innerTable.getByRole("link", {
      name: packageName,
      exact: true,
    });
    await packageLink.click();
  },
);

Then(
  "The Application navigates to the Package details Page of {string}",
  async ({ page }, packageName: string) => {
    const packageDetailsPage = await PackageDetailsPage.fromCurrentPage(
      page,
      packageName,
    );
    await packageDetailsPage._layout.verifyPageHeader(packageName);
  },
);

Then(
  "Vulnerability {string} visible under Vulnerabilities tab",
  async ({ page }, vulnerabilityID: string) => {
    const vulnTab = await PackageVulnerabilitiesTab.fromCurrentPage(page);
    const table = await vulnTab.getTable();
    await expect(table).toHaveColumnWithValue("ID", vulnerabilityID);
  },
);

Then(
  "The SBOMs using package tab loaded with SBOM {string}",
  async ({ page }, sbomName: string) => {
    const sbomsTab = await PackageSbomsTab.fromCurrentPage(page);
    const table = await sbomsTab.getTable();
    await expect(table).toHaveColumnWithValue("Name", sbomName, 0);
  },
);
