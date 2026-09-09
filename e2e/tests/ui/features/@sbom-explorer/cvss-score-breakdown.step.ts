import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { VulnerabilitiesTab } from "../../pages/sbom-details/vulnerabilities/VulnerabilitiesTab";
import { CvssBreakdownPopover } from "../../pages/sbom-details/vulnerabilities/CvssBreakdownPopover";

export const { Given, When, Then } = createBdd(test);

When(
  "User clicks the Sources button for vulnerability {string}",
  async ({ page }, vulnerabilityID: string) => {
    const vulnTab = await VulnerabilitiesTab.fromCurrentPage(page);
    await vulnTab.clickSourcesButton(vulnerabilityID);
  },
);

Then("The CVSS Score Breakdown popover is visible", async ({ page }) => {
  const popover = await CvssBreakdownPopover.fromCurrentPage(page);
  await expect(popover.getPopover()).toBeVisible();
  await expect(
    popover.getPopover().getByText("CVSS Score Breakdown"),
  ).toBeVisible();
});

Then(
  "The CVSS Score Breakdown popover shows highest severity {string} with score {string}",
  async ({ page }, severity: string, score: string) => {
    const popover = await CvssBreakdownPopover.fromCurrentPage(page);
    const highestScoreRow = popover.getHighestScoreRow();
    await expect(highestScoreRow).toBeVisible();
    await expect(
      highestScoreRow.getByText(severity, { exact: true }),
    ).toBeVisible();
    await expect(highestScoreRow.getByText(`(${score})`)).toBeVisible();
  },
);

Then(
  "The CVSS Score Breakdown table has {int} rows",
  async ({ page }, expectedRows: number) => {
    const popover = await CvssBreakdownPopover.fromCurrentPage(page);
    await expect(popover.getTable()).toBeVisible();
    await expect(popover.getRows()).toHaveCount(expectedRows);
  },
);

Then(
  "The breakdown table contains a row with score {string} severity {string} version {string}",
  async ({ page }, score: string, severity: string, version: string) => {
    const popover = await CvssBreakdownPopover.fromCurrentPage(page);
    const row = popover.getRowBySeverityAndScore(severity, score);
    await expect(row).toBeVisible();
    await expect(popover.getVersionCell(row)).toHaveText(version);
  },
);
