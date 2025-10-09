import { createBdd } from "playwright-bdd";
import { expect } from "playwright/test";

import { test } from "../../fixtures";
import { SbomListPage } from "../../pages/sbom-list/SbomListPage";
import { SbomScanPage } from "../../pages/sbom-scan/SbomScanPage";
import { ToolbarTable } from "../../helpers/ToolbarTable";
import {
  clickAndVerifyDownload,
  verifyCommaDelimitedValues,
} from "../../pages/Helpers";

export const { Given, When, Then } = createBdd(test);

When("User Navigates to SBOMs List page", async ({ page }) => {
  await SbomListPage.build(page);
});

When("User Clicks Generate Vulnerability Button", async ({ page }) => {
  // The toolbar button label comes from client/src/app/pages/sbom-list/sbom-toolbar.tsx
  await page
    .getByRole("button", { name: "Generate vulnerability report" })
    .click();
});

Then(
  "The Application should navigate to Generate Vulnerability Report screen",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/sboms\/scan$/);
    await expect(
      page.locator(
        `xpath=//h1[contains(text(),'Generate vulnerability report')]`,
      ),
    ).toBeVisible();
  },
);

Then(
  "The Page should contain Browse files option and instruction to Drag and drop files",
  async ({ page }) => {
    // From UploadFileForAnalysis.tsx browseButtonText="Browse Files" and titleText="Drag and drop files here"
    await expect(
      page.getByRole("button", { name: "Browse Files" }),
    ).toBeVisible();
    await expect(page.getByText("Drag and drop files here")).toBeVisible();
  },
);

Given(
  "User Navigated to Generate Vulnerability Report screen",
  async ({ page }) => {
    // Direct navigation via sidebar to SBOMs then click action button
    await SbomListPage.build(page);
    await page
      .getByRole("button", { name: "Generate vulnerability report" })
      .click();
    await expect(page).toHaveURL(/\/sboms\/scan$/);
  },
);

When("User Clicks on Browse files Button", async ({ page }) => {
  await page.getByRole("button", { name: "Browse Files" }).click();
});

When(
  "User Selects SBOM {string} from {string} on the file explorer dialog window",
  async ({ page }, fileName: string, filePath: string) => {
    const scanPage = await SbomScanPage.build(page);
    await scanPage.uploadFileFromDialog(filePath, fileName);
  },
);

Then(
  "The Page should have a spinner with {string} message and {string} option while processing the SBOM",
  async ({ page }, header: string, cancelLabel: string) => {
    const scanPage = await SbomScanPage.build(page);
    await scanPage.expectProcessingSpinner(header, cancelLabel);
  },
);

Then(
  "On the successful report generation the Application should render Vulnerability Report for the SBOM",
  async ({ page }) => {
    const scanPage = await SbomScanPage.build(page);
    await scanPage.verifyReportHeaderAndText();
  },
);

Then(
  "The Vulnerabilities list should be filtered by 'Affected' status by default",
  async ({ page }) => {
    const defaultFilter = page.locator(
      `xpath=//span[contains(@class,'label-group') and (.='Status')]/following-sibling::ul/li/span[contains(.,'Affected')]`,
    );
    await expect(defaultFilter).toBeVisible();
  },
);

Then(
  "Filtering drop down should be visible with drop down values {string}",
  async ({ page }, filterOptions: string) => {
    const scanPage = await SbomScanPage.build(page);
    await scanPage.verifyDefaultFilterAndControls(filterOptions);
  },
);

Then("Clear filters option should be visible and enabled", async ({ page }) => {
  await expect(page.getByText("Clear all filters")).toBeVisible();
});

Then(
  "Tooltip on the {string} column should display {string}",
  async ({ page }, column: string, tooltipMessage: string) => {
    const scanPage = await SbomScanPage.build(page);
    await scanPage.verifyTooltips(column, tooltipMessage);
  },
);

Then(
  '"Actions" button should be visible with dropdown options {string}',
  async ({ page }, actionsOptions: string) => {
    const scanPage = await SbomScanPage.build(page);
    await expect(scanPage.actionsButton).toBeVisible();
    await scanPage.verifyActionsDropdown(actionsOptions);
  },
);

Then(
  'The title should be Vulnerability report with text "This is a temporary vulnerability report"',
  async ({ page }) => {
    const scanPage = await SbomScanPage.build(page);
    await scanPage.verifyReportHeaderAndText();
  },
);

Then(
  "{string} button should be displayed",
  async ({ page }, buttonName: string) => {
    await expect(page.getByRole("button", { name: buttonName })).toBeVisible();
  },
);

When("User Clicks on {string} button", async ({ page }, buttonName: string) => {
  await page.getByRole("button", { name: buttonName }).click();
});

When("User Clicks on {string} link", async ({ page }, cancelLabel: string) => {
  const scanPage = await SbomScanPage.build(page);
  await scanPage.clickCancelProcessing(cancelLabel);
});

Then(
  "Application navigates to Generate Vulnerability Report screen",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/sboms\/scan$/);
    await expect(
      page.locator(
        `xpath=//h1[contains(text(),'Generate vulnerability report')]`,
      ),
    ).toBeVisible();
  },
);

Then("{string} message should be displayed", async ({ page }, body: string) => {
  const scanPage = await SbomScanPage.build(page);
  await scanPage.errorVulnerabilitiesBody(body);
});

Then(
  "{string} header should be displayed",
  async ({ page }, header: string) => {
    const scanPage = await SbomScanPage.build(page);
    scanPage.errorVulnerabilitiesHeading(header);
  },
);

Then(
  "The Vulnerabilities on the Vulnerability ID column should match with {string}",
  async ({ page }, vulnerabilitiesCsv: string) => {
    const scanPage = await SbomScanPage.build(page);
    const parentElem = `xpath=//div[@id="vulnerability-table-pagination-top"]`;
    const toolbarTable = new ToolbarTable(page, "Vulnerability table");
    await toolbarTable.selectPerPage(parentElem, "100 per page");
    await toolbarTable.waitForTableContent();

    const expectedIds = vulnerabilitiesCsv
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    const collectedIds: string[] = [];

    // Collect IDs from current page using the reusable method
    const collectPage = async () => {
      const table = page.locator('table[aria-label="Vulnerability table"]');
      const cells = table.locator('td[data-label="Vulnerability ID"]');
      const count = await cells.count();
      for (let i = 0; i < count; i++) {
        const txt = (await cells.nth(i).textContent())?.trim();
        if (txt) collectedIds.push(txt);
      }
    };

    const nextButton = page.locator(parentElem).getByLabel("Go to next page");

    await toolbarTable.goToFirstPage(parentElem);
    await collectPage();

    // Move through all pages to collect all IDs
    while (await nextButton.isEnabled()) {
      await nextButton.click();
      await toolbarTable.waitForTableContent();
      await collectPage();
    }

    // Use the reusable method to verify expected IDs against collected IDs
    // Create a temporary page locator to hold the collected IDs for verification
    const allCollectedIdsAsCsv = collectedIds.join(",");

    // Verify each expected ID is present at least once
    for (const id of expectedIds) {
      await expect
        .soft(collectedIds, `Missing expected id: ${id}`)
        .toContain(id);
    }
  },
);

When(
  "User Applies {string} filter with {string} on the Vulnerability Report",
  async ({ page }, filter: string, value: string) => {
    // Click the filter dropdown and select the filter type
    await page.getByLabel("filtered-by").click();
    await page.getByRole("menuitem", { name: filter }).click();

    const toolbarTable = new ToolbarTable(page, "Vulnerability table");

    // For multi-select filters (Severity, Importer), select the value
    // For text filters (Vulnerability ID), this step only selects the filter type
    // and a subsequent step handles the text entry
    if (filter.toLowerCase() !== "vulnerability id") {
      // For multi-select filters: type in the search box and click the option
      const inputText = page.locator("input[aria-label='Type to filter']");
      await inputText.clear();
      await inputText.fill(value);

      const dropdownOption = page.getByRole("menuitem", { name: value });
      await expect(dropdownOption).toBeVisible();
      await dropdownOption.click();

      await toolbarTable.waitForTableContent();
    }
  },
);

When(
  "User Enters {string} in the Vulnerability ID Textbox",
  async ({ page }, value: string) => {
    const input = page.getByPlaceholder("Search by Vulnerability ID");
    await input.fill(value);
    await input.press("Enter");
    const toolbarTable = new ToolbarTable(page, "Vulnerability table");
    await toolbarTable.waitForTableContent();
    await expect(
      page.locator(
        `xpath=//span[contains(@class,'label-group') and (.='Vulnerability ID')]/following-sibling::ul/li/span[contains(.,'${value}')]`,
      ),
    ).toBeVisible();
  },
);

Then(
  "The {string} column of the {string} should match with {string}",
  async ({ page }, column: string, vulnerability: string, expected: string) => {
    const scanPage = await SbomScanPage.build(page);
    const row = scanPage.getVulnerabilityRow(vulnerability);
    const cell = row.locator(`td[data-label="${column}"]`);
    await expect(cell).toContainText(expected);
  },
);

Then(
  "The Severity column of the {string} should match with {string}",
  async ({ page }, vulnerability: string, expected: string) => {
    const scanPage = await SbomScanPage.build(page);
    const row = scanPage.getVulnerabilityRow(vulnerability);
    const cell = row.locator('td[data-label="Severity"]');

    // Use the reusable helper for comma-delimited severity values
    const result = await verifyCommaDelimitedValues(
      cell,
      expected,
      'xpath=//ul[@aria-label="Label group category"]//li',
    );
    console.log("debug cellText:", result);
  },
);

When(
  "User Clicks on More option if visible on Severity column of the {string}",
  async ({ page }, vulnerability: string) => {
    const scanPage = await SbomScanPage.build(page);
    const row = scanPage.getVulnerabilityRow(vulnerability);
    const moreButton = row
      .locator('td[data-label="Severity"]')
      .getByRole("button", { name: "More" });
    if (await moreButton.isVisible()) {
      await moreButton.click();
    }
  },
);

When(
  "User Clicks on Affected package count button of the {string}",
  async ({ page }, vulnerability: string) => {
    const scanPage = await SbomScanPage.build(page);
    const row = scanPage.getVulnerabilityRow(vulnerability);
    const affectedPackagesCell = row.locator(
      'td[data-label="Affected packages"]',
    );
    const expandButton = affectedPackagesCell.getByRole("button");
    await expandButton.click();
  },
);

Then("Affected Package table should expand", async ({ page }) => {
  // Wait for the expanded content to appear
  await page.waitForTimeout(500);
  // Look for the nested grid with column headers Type, Namespace, etc.
  // The expanded table has columnheader elements
  const typeHeader = page.locator('role=columnheader[name="Type"]');
  await expect(typeHeader).toBeVisible();
});

Then(
  "The {string} column of the {string} affected package should match with {string}",
  async ({ page }, column: string, vulnerability: string, expected: string) => {
    const scanPage = await SbomScanPage.build(page);

    // Find the nested grid by looking for a grid that has "Type" as a columnheader
    // (only the nested affected packages grid has this, not the main vulnerability table)
    const nestedGrid = page
      .locator("role=grid")
      .filter({ has: page.locator('role=columnheader[name="Type"]') });

    // Dynamically find the column index from the headers
    const headerRow = nestedGrid
      .locator("role=rowgroup")
      .first()
      .locator("role=row");
    const headers = headerRow.locator("role=columnheader");
    const headerCount = await headers.count();

    let columnIndex = -1;
    for (let i = 0; i < headerCount; i++) {
      const headerText = await headers.nth(i).textContent();
      if (headerText?.trim() === column) {
        columnIndex = i;
        break;
      }
    }

    if (columnIndex === -1) {
      throw new Error(
        `Column "${column}" not found in affected packages table`,
      );
    }

    // Get the first data row from the nested grid's body
    const dataRow = nestedGrid
      .locator("role=rowgroup")
      .last()
      .locator("role=row")
      .first();

    // Get the cell at the column index
    const cell = dataRow.locator("role=gridcell").nth(columnIndex);

    // Special handling for Qualifiers column - qualifiers are rendered as separate elements
    if (column === "Qualifiers") {
      // Use the reusable helper for comma-delimited values
      await verifyCommaDelimitedValues(cell, expected, "xpath=//td/span");
    } else {
      // For other columns, check if expected is empty string (for empty columns)
      if (expected === "") {
        const cellText = await cell.textContent();
        await expect(cellText?.trim() || "").toBe("");
      } else {
        await expect(cell).toContainText(expected);
      }
    }
  },
);

Then(
  "The {string} dropdown should have options {string} and {string}",
  async ({ page }, dropdownName: string, option1: string, option2: string) => {
    // The dropdown should already be open from the previous step
    await expect(page.getByRole("menuitem", { name: option1 })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: option2 })).toBeVisible();
  },
);

When(
  "User Clicks on {string} option from the {string} dropdown",
  async ({ page }, optionName: string, dropdownName: string) => {
    // Just click for non-download actions
    await page.getByRole("menuitem", { name: optionName }).click();
  },
);

When(
  "User Downloads CSV with default filename {string} by clicking on {string} option",
  async (
    { page },
    fileName: string,
    optionName: string,
    dropdownName: string,
  ) => {
    // Use the reusable helper for click + download verification
    await clickAndVerifyDownload(
      page,
      () => page.getByRole("menuitem", { name: optionName }).click(),
      ".csv",
      fileName,
    );
  },
);

Then(
  "A modal window should open with {string} message",
  async ({ page }, message: string) => {
    // Wait for modal dialog to appear
    await page.waitForTimeout(500);
    // Check for modal with the message
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal.getByText(message)).toBeVisible();
  },
);

When(
  "User Clicks on {string} button from the modal window",
  async ({ page }, buttonName: string) => {
    const modal = page.locator('[role="dialog"]');
    // Just click for non-download actions
    await modal.getByRole("button", { name: buttonName }).click();
  },
);

When(
  "User Downloads CSV with default filename {string} and Leaves by clicking on {string} button from the modal window",
  async ({ page }, fileName: string, buttonName: string) => {
    const modal = page.locator('[role="dialog"]');
    // Use the reusable helper for click + download verification
    await clickAndVerifyDownload(
      page,
      () => modal.getByRole("button", { name: buttonName }).click(),
      ".csv",
      fileName,
    );
  },
);

Then(
  "Application navigates to Vulnerability Explorer screen of {string}",
  async ({ page }, vulnerabilityId: string) => {
    // Wait for navigation to vulnerability details page
    await expect(page).toHaveURL(
      new RegExp(`/vulnerabilities/${vulnerabilityId}`),
    );
  },
);

Then(
  "Application should remain on the Generate Vulnerability Report screen",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/sboms\/scan$/);
    // After canceling the modal, we're still viewing the vulnerability report (not the generate screen)
    const scanPage = await SbomScanPage.build(page);
    await expect(scanPage.headingReport).toBeVisible();
  },
);

When(
  "User Clicks on {string} from the Vulnerability ID column",
  async ({ page }, vulnerabilityId: string) => {
    const scanPage = await SbomScanPage.build(page);
    const row = scanPage.getVulnerabilityRow(vulnerabilityId);
    const link = row
      .locator('td[data-label="Vulnerability ID"]')
      .getByRole("link");
    await link.click();
  },
);

When("User clicks on Clear filters option", async ({ page }) => {
  await page.getByText("Clear all filters").click();
  const toolbarTable = new ToolbarTable(page, "Vulnerability table");
  await toolbarTable.waitForTableContent();
});

Then(
  "Applied {string} should be visible with {string} on the filter bar",
  async ({ page }, filter: string, value: string) => {
    // Verify the filter chip is visible with the correct label
    const filterChip = page.locator(
      `xpath=//span[contains(@class,'label-group') and (.='${filter}')]/following-sibling::ul/li/span[contains(.,'${value}')]`,
    );
    await expect(filterChip).toBeVisible();
  },
);

Then(
  "The {string} of the {string} should match with {string}",
  async (
    { page },
    columnName: string,
    vulnerability: string,
    expected: string,
  ) => {
    const scanPage = await SbomScanPage.build(page);
    const row = scanPage.getVulnerabilityRow(vulnerability);
    const cell = row.locator(`td[data-label="${columnName}"]`);

    // Special handling for Severity column which has multiple severity values
    if (columnName === "Severity") {
      // Use the reusable helper for comma-delimited severity values
      await verifyCommaDelimitedValues(
        cell,
        expected,
        'xpath=//ul[@aria-label="Label group category"]//li',
      );
    } else {
      await expect(cell).toContainText(expected);
    }
  },
);

Then("Pagination of Vulnerability list works", async ({ page }) => {
  const parentElem = `xpath=//div[@id="vulnerability-table-pagination-top"]`;
  const toolbarTable = new ToolbarTable(page, "Vulnerability table");
  await toolbarTable.verifyPagination(parentElem);
});

Then(
  "Sorting of {string} Columns Works",
  async ({ page }, columnHeaders: string) => {
    const headers = columnHeaders
      .split(",")
      .map((column: string) => column.trim());
    const toolbarTable = new ToolbarTable(page, "Vulnerability table");
    const vulnTableTopPagination = `xpath=//div[@id="vulnerability-table-pagination-top"]`;
    await toolbarTable.verifySorting(vulnTableTopPagination, headers);
  },
);
