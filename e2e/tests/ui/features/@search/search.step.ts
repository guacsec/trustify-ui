import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { SearchPage, Tabs } from "../../pages/search-page/SearchPage";
import { SearchPageTabs } from "../../pages/SearchPageTabs";

export const { Given, When, Then } = createBdd();

let Page!: SearchPage;
// /**
//  * This function returns table identifier and column, which contains link to the details page
//  * @param type Catogory of the data to get the table identifier and column
//  */
// function getTableInfo(type: string): [string, string] {
//   switch (type) {
//     case "SBOMs":
//     case "SBOM":
//       return ["sbom-table", "Name"];
//     case "Advisories":
//     case "Advisory":
//       return ["advisory-table", "ID"];
//     case "Vulnerabilities":
//     case "CVE":
//       return ["Vulnerability table", "ID"];
//     case "Packages":
//     case "Package":
//       return ["Package table", "Name"];
//     default:
//       throw new Error(`Unknown type: ${type}`);
//   }
// }

// function getPaginationId(type: string): string {
//   switch (type) {
//     case "Vulnerabilities":
//       return "vulnerability-table-pagination-top";
//     case "Advisories":
//       return "advisory-table-pagination-top";
//     case "Packages":
//       return "package-table-pagination-top";
//     case "SBOMs":
//       return "sbom-table-pagination-top";
//     default:
//       throw new Error(`Unknown type: ${type}`);
//   }
// }

// function getColumns(type: string): string[] {
//   switch (type) {
//     case "Vulnerabilities":
//       return ["ID", "CVSS", "Date published"];
//     case "Advisories":
//       return ["ID", "Revision"];
//     case "Packages":
//       return ["Name", "Namespace", "Version"];
//     case "SBOMs":
//       return ["Name", "Created on"];
//     default:
//       throw new Error(`Unknown type: ${type}`);
//   }
// }

Given("User is on the Search page", async ({ page }) => {
  Page = await SearchPage.build(page);
  await page.waitForLoadState("networkidle");
});

Then(
  "Download link should be available for the {string} list",
  async ({ page }, type: string) => {
    const table = new ToolbarTable(page, getTableInfo(type)[0]);
    await table.verifyDownloadLink(type);
  },
);

When(
  "user starts typing a {string} in the search bar",
  async ({ page }, searchText: string) => {
    const searchPage = new SearchPage(page);
    await searchPage.typeInSearchBox(searchText);
  },
);

Then("The autofill drop down should not show any values", async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.autoFillIsNotVisible();
});

When(
  "user types a {string} in the search bar",
  async ({ page }, searchText: string) => {
    const searchPage = new SearchPage(page);
    await searchPage.typeInSearchBox(searchText);
  },
);

When("user presses Enter", async ({ page }) => {
  await page.keyboard.press("Enter");
});

Then(
  "the {string} list should display the specific {string}",
  async ({ page }, type: string, name: string) => {
    const tabs = new Tabs(page);
    await tabs.verifyTabIsSelected(type);
    const info = getTableInfo(type);
    const table = new ToolbarTable(page, info[0]);
    await table.verifyColumnContainsText(info[1], name);
  },
);

Then(
  "the list should be limited to {int} items or less",
  async ({ page }, count: number) => {
    const table = new ToolbarTable(page, "sbom-table");
    await table.verifyTableHasUpToRows(count);
  },
);

Then(
  "user clicks on the {string} {string} link",
  async ({ page }, arg: string, type: string) => {
    const info = getTableInfo(type);
    const table = new ToolbarTable(page, info[0]);
    await table.openDetailsPage(arg, info[1]);
  },
);

Then(
  "the user should be navigated to the specific {string} page",
  async ({ page }, arg: string) => {
    const detailsPage = new DetailsPage(page);
    await detailsPage.verifyPageHeader(arg);
  },
);

Then(
  "the user should be able to filter {string}",
  async ({ page }, arg: string) => {
    const table = new ToolbarTable(page, getTableInfo(arg)[0]);
    if (arg === "SBOMs") {
      await table.filterByDate("12/22/2025", "12/22/2025");
      await table.verifyColumnDoesNotContainText("Name", "quarkus-bom");
      await table.clearFilter();
      await table.verifyColumnContainsText("Name", "quarkus-bom");
    } else if (arg === "Vulnerabilities") {
      await page.getByLabel("Critical").click();
      await table.verifyColumnDoesNotContainText("ID", "CVE-2022-45787");
      await table.clearFilter();
      await table.verifyColumnContainsText("ID", "CVE-2022-45787");
    } else if (arg === "Packages") {
      await page.getByLabel("OCI").click();
      await table.verifyColumnDoesNotContainText("Name", "quarkus");
      await table.clearFilter();
      await table.verifyColumnContainsText("Name", "quarkus");
    } else if (arg === "Advisories") {
      await table.filterByDate("12/22/2025", "12/22/2025");
      await table.verifyColumnDoesNotContainText("ID", "CVE-2022-45787");
      await table.clearFilter();
      await table.verifyColumnContainsText("ID", "CVE-2022-45787");
    }
  },
);

Then(
  "the {string} list should have specific filter set",
  async ({ page }, arg: string) => {
    if (arg === "Vulnerabilities") {
      await expect(page.locator("h4").getByText("CVSS")).toBeVisible();
      await expect(page.locator("h4").getByText("Created on")).toBeVisible();
      await expect(
        page.locator('input[aria-label="Interval start"]'),
      ).toBeVisible();
      await expect(
        page.locator('input[aria-label="Interval end"]'),
      ).toBeVisible();
    } else if (arg === "Advisories") {
      await expect(page.locator("h4").getByText("Revision")).toBeVisible();
      await expect(
        page.locator('input[aria-label="Interval start"]'),
      ).toBeVisible();
      await expect(
        page.locator('input[aria-label="Interval end"]'),
      ).toBeVisible();
    } else if (arg === "Packages") {
      await expect(page.getByRole("heading", { name: "Type" })).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Architecture" }),
      ).toBeVisible();
    } else if (arg === "SBOMs") {
      await expect(page.getByText("Created onFrom To")).toBeVisible();
    }
  },
);

Then("the {string} list should be sortable", async ({ page }, arg: string) => {
  var columns: string[] = getColumns(arg);
  var id: string = getPaginationId(arg);

  const table = new ToolbarTable(page, getTableInfo(arg)[0]);
  await table.verifySorting(`xpath=//div[@id="${id}"]`, columns);
});

Then(
  "the {string} list should be limited to {int} items",
  async ({ page }, type: string, count: number) => {
    const info = getTableInfo(type);
    const table = new ToolbarTable(page, info[0]);
    const tableTopPagination = `xpath=//div[@id="${getPaginationId(type)}"]`;
    await table.selectPerPage(tableTopPagination, "10 per page");
    await table.verifyTableHasUpToRows(count);
  },
);

Then(
  "the user should be able to switch to next {string} items",
  async ({ page }, arg: string) => {
    var id: string = getPaginationId(arg);
    const info = getTableInfo(arg);
    const table = new ToolbarTable(page, info[0]);
    await table.verifyPagination(`xpath=//div[@id="${id}"]`);
  },
);

Then(
  "the user should be able to increase pagination for the {string}",
  async ({ page }, arg: string) => {
    const info = getTableInfo(arg);
    const table = new ToolbarTable(page, info[0]);
    var id: string = getPaginationId(arg);
    const tableTopPagination = `xpath=//div[@id="${id}"]`;
    await table.verifyPagination(`xpath=//div[@id="${id}"]`);
    await table.goToFirstPage(tableTopPagination);
    await table.selectPerPage(tableTopPagination, "20 per page");
    await table.goToFirstPage(tableTopPagination);
    await table.verifyTableHasUpToRows(20);
  },
);

Then(
  "First column on the search results should have the link to {string} explorer pages",
  async ({ page }, arg: string) => {
    const info = getTableInfo(arg);
    const table = new ToolbarTable(page, info[0]);
    await table.verifyColumnContainsLink(info[1], arg);
  },
);

Then(
  "a total number of {int} {string} should be visible in the tab",
  async ({ page }, count: number, arg: string) => {
    await Page.switchTo(arg as Tabs);
    const tab = await SearchPageTabs.build(page, arg);
    await tab.verifyTabHasAtLeastResults(arg, count);
  },
);

Then(
  "the autofill dropdown should display items matching the {string}",
  async ({ page }, arg: string) => {
    const searchPage = new SearchPage(page);
    await searchPage.autoFillHasRelevantResults(arg);
  },
);

Then(
  "the results should be limited to {int} suggestions",
  async ({ page }, arg: number) => {
    const searchPage = new SearchPage(page);
    expect(await searchPage.totalAutoFillResults()).toBeLessThanOrEqual(
      arg * 4,
    );
    await searchPage.expectCategoriesWithinLimitByHref(arg);
  },
);
