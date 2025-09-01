import { createBdd } from "playwright-bdd";
import { DetailsPage } from "../helpers/DetailsPage";

export const { Given, When, Then } = createBdd();

Then("The page title is {string}", async ({ page }, title) => {
  const pageWithTabs = new DetailsPage(page);
  await pageWithTabs.verifyPageHeader(title);
});

Then("The {string} button is visible", async ({ page }, buttonName) => {
  const detailsPage = new DetailsPage(page);
  await detailsPage.verifyButtonIsVisible(buttonName);
});

Then("The {string} panel is visible", async ({ page }, panelName) => {
  const detailsPage = new DetailsPage(page);
  await detailsPage.verifyPanelIsVisible(panelName);
});

Then("Tab {string} is selected", async ({ page }, tabName) => {
  const pageWithTabs = new DetailsPage(page);
  await pageWithTabs.verifyTabIsSelected(tabName);
});

Then("Tab {string} is visible", async ({ page }, tabName) => {
  const pageWithTabs = new DetailsPage(page);
  await pageWithTabs.verifyTabIsVisible(tabName);
});

Then("Tab {string} is not visible", async ({ page }, tabName) => {
  const pageWithTabs = new DetailsPage(page);
  await pageWithTabs.verifyTabIsNotVisible(tabName);
});

Then(
  "File with the name {string} is downloaded",
  async ({ page }, expectedFilename) => {
    const downloadPromise = page.waitForEvent("download");
    const download = await downloadPromise;
    const actualFilename = download.suggestedFilename();
    expect(actualFilename).toEqual(expectedFilename);
  }
);

When("User selects the Tab {string}", async ({ page }, tabName) => {
  const detailsPage = new DetailsPage(page);
  await detailsPage.selectTab(tabName);
});

When("User clicks the {string} button", async ({ page }, buttonName) => {
  const detailsPage = new DetailsPage(page);
  await detailsPage.clickOnPageButton(buttonName);
});
