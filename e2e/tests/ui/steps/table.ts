import { createBdd } from "playwright-bdd";

import { test } from "../fixtures";

import { ToolbarTable } from "../helpers/ToolbarTable";

export const { Given, When, Then } = createBdd(test);

When("User clear all filters", async ({ page }) => {
  await page.getByText("Clear all filters").click();
});

// Generic step for verifying pagination on any table
Then(
  "Pagination of {string} table works",
  async ({ page }, tableName: string) => {
    const tableNameLowerCase = tableName.toLowerCase();
    const toolbarTable = new ToolbarTable(page, `${tableName} table`);
    const tableTopPagination = `xpath=//div[@id="${tableNameLowerCase}-table-pagination-top"]`;
    await toolbarTable.verifyPagination(tableTopPagination);
  },
);

// Generic step for verifying sorting on any table
Then(
  "Sorting of {string} table for {string} columns works",
  async ({ page }, tableName: string, columnHeaders: string) => {
    const tableNameLowerCase = tableName.toLowerCase();
    const headers = columnHeaders
      .split(`,`)
      .map((column: string) => column.trim());
    const toolbarTable = new ToolbarTable(page, `${tableName} table`);
    const tableTopPagination = `xpath=//div[@id="${tableNameLowerCase}-table-pagination-top"]`;
    await toolbarTable.verifySorting(tableTopPagination, headers);
  },
);
