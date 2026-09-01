// @ts-check

// NOTE: These imports are relative to e2e/tests/ui/pages/sbom-details/
// To run, copy this file to: e2e/tests/ui/pages/sbom-details/
import { expect } from "@playwright/test";

import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { SbomDetailsPage } from "./SbomDetailsPage";

test.describe("SBOM Details - Smoke tests", { tag: "@smoke" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Navigate to quarkus-bom and verify page header", async ({ page }) => {
    const detailsPage = await SbomDetailsPage.build(page, "quarkus-bom");

    await detailsPage._layout.verifyPageHeader("quarkus-bom");
  });

  test("Info tab is selected by default", async ({ page }) => {
    const detailsPage = await SbomDetailsPage.build(page, "quarkus-bom");

    await detailsPage._layout.verifyTabIsSelected("Info");
  });

  test("All expected tabs are visible", async ({ page }) => {
    const detailsPage = await SbomDetailsPage.build(page, "quarkus-bom");

    await detailsPage._layout.verifyTabIsVisible("Info");
    await detailsPage._layout.verifyTabIsVisible("Packages");
    await detailsPage._layout.verifyTabIsVisible("Vulnerabilities");
    await detailsPage._layout.verifyTabIsVisible("Models");
  });

  test("Can switch to Packages tab", async ({ page }) => {
    const detailsPage = await SbomDetailsPage.build(page, "quarkus-bom");

    await detailsPage._layout.selectTab("Packages");
    await detailsPage._layout.verifyTabIsSelected("Packages");

    // Verify packages table loads with data
    await expect(
      page.locator("table[aria-label='Package table']"),
    ).toBeVisible();
  });

  test("Can switch to Vulnerabilities tab", async ({ page }) => {
    const detailsPage = await SbomDetailsPage.build(page, "quarkus-bom");

    await detailsPage._layout.selectTab("Vulnerabilities");
    await detailsPage._layout.verifyTabIsSelected("Vulnerabilities");

    // Verify vulnerabilities table loads with data
    await expect(
      page.locator("table[aria-label='Vulnerability table']"),
    ).toBeVisible();
  });
});
