import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { VulnerabilitiesTab } from "../../pages/sbom-details/vulnerabilities/VulnerabilitiesTab";
import { CvssBreakdownPopover } from "../../pages/sbom-details/vulnerabilities/CvssBreakdownPopover";

export const { Given, When, Then } = createBdd(test);

When(
  "User clicks the Sources button for vulnerability {string}",
  async ({ page }, vulnerabilityID) => {
    const vulnTab = await VulnerabilitiesTab.fromCurrentPage(page);
    await vulnTab.clickSourcesButton(vulnerabilityID);
  },
);

Then("The CVSS Score Breakdown popover is visible", async ({ page }) => {
  const popover = await CvssBreakdownPopover.fromCurrentPage(page);
  await popover.verifyIsVisible();
});

Then(
  "The CVSS Score Breakdown popover shows highest severity {string} with score {string}",
  async ({ page }, severity, score) => {
    const popover = await CvssBreakdownPopover.fromCurrentPage(page);
    await popover.verifyHighestScore(severity, score);
  },
);

Then(
  "The CVSS Score Breakdown table has {int} rows",
  async ({ page }, expectedRows) => {
    const popover = await CvssBreakdownPopover.fromCurrentPage(page);
    await popover.verifyRowCount(expectedRows);
  },
);

Then(
  "The breakdown table contains a row with score {string} severity {string} version {string}",
  async ({ page }, score, severity, version) => {
    const popover = await CvssBreakdownPopover.fromCurrentPage(page);
    await popover.verifyRowValues(score, severity, version);
  },
);
