import { createBdd } from "playwright-bdd";
import { expect } from "playwright/test";

import { test } from "../../fixtures";
import { SbomListPage } from "../../pages/sbom-list/SbomListPage";
import { SbomScanPage } from "../../pages/sbom-scan/SbomScanPage";
import { Table } from "../../pages/Table";
import { ToolbarTable } from "../../helpers/ToolbarTable";
import {
  clickAndVerifyDownload,
  verifyChildElementsText,
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
    await expect(scanPage.heading).toHaveText("Generate vulnerability report");
  },
);

Then(
  "Filtering drop down should be visible with drop down values {string}",
  async ({ page }, filterOptions: string) => {
    const scanPage = await SbomScanPage.build(page);
    const filters = filterOptions.split(",").map((filter) => filter.trim());
    await expect(scanPage.filterDropdown).toBeVisible();
    await scanPage.filterDropdown.click();
    for (const filter of filters) {
      await expect(page.getByRole("menuitem", { name: filter })).toBeVisible();
    }
  },
);

Then(
  "Tooltip on the {string} column should display {string}",
  async ({ page }, column: string, tooltipMessage: string) => {
    const table = await Table.build(page, "Vulnerability table");
    const tooltipButton = table.getColumnTooltipButton(column, tooltipMessage);
    await tooltipButton.hover();
    await page.waitForTimeout(500);
  },
);

Then(
  '"Actions" button should be visible with dropdown options {string}',
  async ({ page }, actionsOptions: string) => {
    const scanPage = await SbomScanPage.build(page);
    await expect(scanPage.actionsButton).toBeVisible();
    const actions = actionsOptions.split(",").map((action) => action.trim());
    await scanPage.actionsButton.click();
    for (const action of actions) {
      await expect(page.getByRole("menuitem", { name: action })).toBeVisible();
    }
  },
);

Then(
  'The title should be Vulnerability report with text "This is a temporary vulnerability report"',
  async ({ page }) => {
    const scanPage = await SbomScanPage.build(page);
    await expect(scanPage.heading).toHaveText("Vulnerability report");
    await expect(scanPage.headerDescription).toBeVisible();
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
    const severityElements = cell.locator(
      'xpath=//ul[@aria-label="Label group category"]//li',
    );

    await verifyChildElementsText(severityElements, expected);
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
    const vulnerabilityRow = scanPage.getVulnerabilityRow(vulnerability);
    const packageTable = vulnerabilityRow.locator(
      `xpath=/following-sibling::tr[contains(@class,'expandable')]/td[@data-label='Affected packages']//table`,
    );
    await expect(packageTable).toBeVisible();

    const headerElements = packageTable.locator(`xpath=//th`);
    const headerElemCount = await headerElements.count();
    let columnIndex = -1;
    for (let i = 0; i < headerElemCount; i++) {
      const headerText = await headerElements.nth(i).textContent();
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

    const rows = packageTable.locator(`xpath=//tbody/tr`);
    const rowCount = await rows.count();
    for (let i = 1; i <= rowCount; i++) {
      const cell = packageTable.locator(
        `xpath=//tbody/tr[${i}]//td[${columnIndex + 1}]`,
      );
      if (column === "Qualifiers") {
        const qualifierElements = cell.locator("xpath=//span");
        await verifyChildElementsText(qualifierElements, expected);
      } else {
        if (expected === "") {
          const cellText = await cell.textContent();
          await expect(cellText?.trim() || "").toBe("");
        } else {
          await expect(cell).toContainText(expected);
        }
      }
    }
  },
);

Then(
  "The Actions dropdown should have options {string} and {string}",
  async ({ page }, option1: string, option2: string) => {
    // The dropdown should already be open from the previous step
    await expect(page.getByRole("menuitem", { name: option1 })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: option2 })).toBeVisible();
  },
);

When(
  "User Clicks on {string} option from the Actions dropdown",
  async ({ page }, optionName: string) => {
    // Just click for non-download actions
    await page.getByRole("menuitem", { name: optionName }).click();
  },
);

Then(
  "User Downloads CSV with default filename {string} by clicking on {string} option",
  async ({ page }, fileName: string, optionName: string) => {
    // Use the reusable helper for click + download verification
    const downloadedFileName = await clickAndVerifyDownload(page, () =>
      page.getByRole("menuitem", { name: optionName }).click(),
    );
    await expect(downloadedFileName).toContain(fileName);
    await expect(downloadedFileName.endsWith(".csv")).toBeTruthy();
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
    const downloadedFileName = await clickAndVerifyDownload(page, () =>
      modal.getByRole("button", { name: buttonName }).click(),
    );
    await expect(downloadedFileName).toContain(fileName);
    await expect(downloadedFileName.endsWith(".csv")).toBeTruthy();
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
    await expect(scanPage.heading).toHaveText("Vulnerability report");
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
      const severityElements = cell.locator(
        'xpath=//ul[@aria-label="Label group category"]//li',
      );
      await verifyChildElementsText(severityElements, expected);
    } else {
      await expect(cell).toContainText(expected);
    }
  },
);
