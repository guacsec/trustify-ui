import { createBdd } from "playwright-bdd";

import { test } from "../fixtures";

import { expect } from "../assertions";

export const { Given, When, Then } = createBdd(test);

// Common navigation steps
When("User navigates to Search results page", async ({ page }) => {
  // Navigate to the search page
  await page.goto("/search");
  await page.waitForLoadState("networkidle");
});

When("User navigates to {string} page", async ({ page }, pageName: string) => {
  // Navigate to different pages based on name
  const pageRoutes: Record<string, string> = {
    SBOMs: "/sboms",
    Advisories: "/advisories",
    Vulnerabilities: "/vulnerabilities",
    Packages: "/packages",
    Importers: "/importers",
  };
  const route = pageRoutes[pageName];
  if (!route) {
    throw new Error(`Unknown page: ${pageName}`);
  }
  await page.goto(route);
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

// Common verification steps
// TC-3370: Page title verification
Then(
  "the page title should contain {string}",
  async ({ page }, expectedText: string) => {
    // Wait for the title to contain the expected text (condition-based, no fixed timeout)
    await expect.poll(async () => page.title()).toContain(expectedText);
  },
);
