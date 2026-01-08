import { createBdd } from "playwright-bdd";
import { expect } from "playwright/test";
import { ToolbarTable } from "../../helpers/ToolbarTable";
import { SearchPage } from "../../helpers/SearchPage";
import { AdvisoryListPage } from "../../pages/advisory-list/AdvisoryListPage";
import { test } from "../../fixtures";
import { ConfirmDialog } from "../../helpers/ConfirmDialog";
import { DetailsPage } from "../../helpers/DetailsPage";

export const { Given, When, Then } = createBdd(test);

const VULN_TABLE_NAME = "vulnerability table";

Given(
  "User visits Advisory details Page of {string}",
  async ({ page }, advisoryID) => {
    const searchPage = new SearchPage(page, "Advisories");
    await searchPage.dedicatedSearch(advisoryID);
    await page.getByRole("link", { name: advisoryID, exact: true }).click();
  },
);

Given(
  "User visits Advisory details Page of {string} with type {string}",
  async ({ page }, advisoryName, advisoryType) => {
    const searchPage = new SearchPage(page, "Advisories");
    await searchPage.dedicatedSearch(advisoryName);
    const advisory = `xpath=//tr[contains(.,'${advisoryName}') and contains(.,'${advisoryType}')]/td/a`;
    await page.locator(advisory).click();
  },
);

// Advisory Search
When(
  "User searches for an advisory named {string} in the general search bar",
  async ({ page }, item) => {
    const searchPage = new SearchPage(page, "Dashboard");
    await searchPage.generalSearch("Advisories", item);
  },
);

When(
  "User searches for {string} in the dedicated search bar",
  async ({ page }, advisoryID) => {
    const searchPage = new SearchPage(page, "Advisories");
    await searchPage.dedicatedSearch(advisoryID);
  },
);

Then(
  "The advisory {string} shows in the results",
  async ({ page }, advisoryID) => {
    await expect(
      page.getByRole("gridcell").filter({ hasText: advisoryID }),
    ).toBeVisible();
  },
);

// Advisory Explorer
Then(
  "The vulnerabilities table is sorted by {string}",
  async ({ page }, columnName) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.verifyTableIsSortedBy(columnName);
  },
);

Then(
  "The vulnerabilities table total results is {int}",
  async ({ page }, totalResults) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.verifyPaginationHasTotalResults(totalResults);
  },
);

Then(
  "The {string} column of the vulnerability table contains {string}",
  async ({ page }, columnName, expectedValue) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.verifyColumnContainsText(columnName, expectedValue);
  },
);

// Advisory Explorer / Vulenrabilities

Then(
  "User navigates to the Vulnerabilities tab on the Advisory Overview page",
  async ({ page }) => {
    await page.getByRole("tab", { name: "Vulnerabilities" }).click();
  },
);

Then(
  "A list of all active vulnerabilites tied to the advisory should display",
  async ({ page }) => {
    const totalItemsLocator = page
      .locator(
        "#vulnerability-table-pagination-top .pf-v6-c-pagination__page-menu",
      )
      .first();

    await expect(totalItemsLocator).toBeVisible();

    const totalText = await totalItemsLocator.textContent();
    const match = totalText?.match(/of\s+(\d+)/);
    expect(match, "unable to parse pagination total").not.toBeNull();

    // biome-ignore lint/style/noNonNullAssertion: allowed
    const total = Number(match![1]);
    expect(total).toBeGreaterThan(0);
  },
);

Then(
  "The {string} information should be visible for each vulnerability",
  async ({ page }, headers: string) => {
    const headersArr = headers
      .split(`,`)
      .map((column: string) => column.trim());
    for (const label of headersArr) {
      const header = page.getByRole("columnheader", { name: label });
      if (await header.count()) {
        await expect(header).toBeVisible();
      } else {
        await expect(page.getByRole("button", { name: label })).toBeVisible();
      }
    }
  },
);

Then(
  "The vulnerabilities should be sorted by ID by default",
  async ({ page }) => {
    const toolbarTable = new ToolbarTable(page, VULN_TABLE_NAME);
    await toolbarTable.verifyTableIsSortedBy("ID");
  },
);

Then(
  "User visits Vulnerability details Page of {string} by clicking it",
  async ({ page }, vulnerabilityID) => {
    const link = page.getByRole("link", { name: vulnerabilityID });

    await Promise.all([
      page.waitForURL(new RegExp(`/vulnerabilities/${vulnerabilityID}$`)),
      link.click(),
    ]);

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: new RegExp(`^${vulnerabilityID}\\s*$`),
      }),
    ).toBeVisible();
  },
);

When(
  "User Selects Delete option from the toggle option from Advisory List Page",
  async ({ page }) => {
    const firstRow = page.locator("table tbody tr").first();
    const kebabToggle = firstRow.getByRole("button", { name: "Kebab toggle" });
    await kebabToggle.click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
  },
);

When(
  "User Clicks on Actions button and Selects Delete option from the drop down",
  async ({ page }) => {
    const details = new DetailsPage(page);
    await details.clickOnPageAction("Delete");
  },
);

When(
  "User select Delete button from the Permanently delete Advisory model window",
  async ({ page }) => {
    const dialog = await ConfirmDialog.build(page);
    await dialog.verifyTitle("Permanently delete");
    await dialog.clickConfirm();
  },
);

Then(
  "The {string} should not be present on Advisory list page as it is deleted",
  async ({ page }, advisoryID: string) => {
    const list = await AdvisoryListPage.build(page);
    const toolbar = await list.getToolbar();
    const table = await list.getTable();

    await toolbar.applyFilter({ "Filter text": advisoryID });
    await table.waitUntilDataIsLoaded();
    await expect(
      page.locator(
        "table[aria-label='advisory-table'] tbody[aria-label='Table empty']",
      ),
    ).toBeVisible();
  },
);

Then("Application Navigates to Advisory list page", async ({ page }) => {
  await expect(
    page.getByRole("heading", { level: 1, name: "Advisories" }),
  ).toBeVisible();
});

Then("The Advisory deleted message is displayed", async ({ page }) => {
  const alertHeading = page.getByRole("heading", { level: 4 }).filter({
    hasText: /The Advisory .+ was deleted/,
  });
  await expect(alertHeading).toBeVisible({ timeout: 10000 });
});
