import { createBdd } from "playwright-bdd";

import { test } from "../fixtures";

import { expect } from "../assertions";
import { Navigation } from "../pages/Navigation";

export const { Given, When, Then } = createBdd(test);

When("User navigates to {string} page", async ({ page }, pageName: string) => {
  const navigation = await Navigation.build(page);
  await navigation.goToSidebar(
    pageName as Parameters<Navigation["goToSidebar"]>[0],
  );
});

When("User clicks on {string} tab", async ({ page }, tabName: string) => {
  const tab = page.getByRole("tab", { name: tabName });
  await tab.click();
});

Then(
  "the page title should contain {string}",
  async ({ page }, expectedText: string) => {
    await expect.poll(async () => page.title()).toContain(expectedText);
  },
);
