import { createBdd } from "playwright-bdd";
import { ToolbarTable } from "../helpers/ToolbarTable";

export const { Given, When, Then } = createBdd();

When("User clear all filters", async ({ page }) => {
  await page.getByText("Clear all filters").click();
});

Then("Pagination of {string} table works", async ({ page }, table: string) => {
  const tableLowerCase = table.charAt(0).toLowerCase() + table.slice(1);
  const toolbarTable = new ToolbarTable(page, `${table} table`);
  const vulnTableTopPagination = `xpath=//div[@id="${tableLowerCase}-table-pagination-top"]`;
  await toolbarTable.verifyPagination(vulnTableTopPagination);
});

Then(
  "Sorting of {string} Columns Works",
  async ({ page }, columnHeaders: string) => {
    const headers = columnHeaders
      .split(`,`)
      .map((column: string) => column.trim());
    const toolbarTable = new ToolbarTable(page, "Vulnerability table");
    const vulnTableTopPagination = `xpath=//div[@id="vulnerability-table-pagination-top"]`;
    await toolbarTable.verifySorting(vulnTableTopPagination, headers);
  },
);
