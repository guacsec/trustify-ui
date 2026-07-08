import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

export const { Given, When, Then } = createBdd(test);

// Related to bug TC-3370: Page title verification
Then(
  "the page title should contain {string}",
  async ({ page }, expectedText: string) => {
    // Wait a bit for title to update
    await page.waitForTimeout(500);
    const pageTitle = await page.title();
    await expect(pageTitle).toContain(expectedText);
  },
);

When("User navigates to Search results page", async ({ page }) => {
  // Navigate to the search page
  await page.goto("/search");
  await page.waitForLoadState("networkidle");
});

When("Clicks on Advisories tab", async ({ page }) => {
  // Click on the Advisories tab
  const advisoriesTab = page.getByRole("tab", { name: "Advisories" });
  await advisoriesTab.click();
  await page.waitForLoadState("networkidle");
});

When("User clicks on {string} tab", async ({ page }, tabName: string) => {
  // Click on the specified tab (SBOMs, CVEs, Packages, etc.)
  const tab = page.getByRole("tab", { name: tabName });
  await tab.click();
  await page.waitForLoadState("networkidle");
});
