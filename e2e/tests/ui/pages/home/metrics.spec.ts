import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";

import { HomePage } from "./HomePage";

test.describe("Home - Portfolio Metrics Section", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("should render the Metrics section card", async ({ page }) => {
    const homePage = await HomePage.build(page);

    await expect(homePage.getMetricsSection()).toBeVisible();
  });

  test("should display metric labels", async ({ page }) => {
    const homePage = await HomePage.build(page);
    const section = homePage.getMetricsSection();

    await expect(section.getByText("Total SBOMs")).toBeVisible();
    await expect(section.getByText("Total Advisories")).toBeVisible();
    await expect(section.getByText("Last SBOM ingested")).toBeVisible();
    await expect(section.getByText("Last Advisory ingested")).toBeVisible();
  });

  test("should display non-zero SBOM count", async ({ page }) => {
    const homePage = await HomePage.build(page);
    const sbomsValue = homePage.getTotalSbomsValue();

    await expect(sbomsValue).toBeVisible();
    const text = await sbomsValue.textContent();
    const count = Number(text?.trim());
    expect(count).toBeGreaterThan(0);
  });

  test("should display non-zero advisory count", async ({ page }) => {
    const homePage = await HomePage.build(page);
    const advisoriesValue = homePage.getTotalAdvisoriesValue();

    await expect(advisoriesValue).toBeVisible();
    const text = await advisoriesValue.textContent();
    const count = Number(text?.trim());
    expect(count).toBeGreaterThan(0);
  });

  test("should display latest SBOM name as a link", async ({ page }) => {
    const homePage = await HomePage.build(page);
    const sbomLink = homePage.getLatestSbomLink();

    await expect(sbomLink).toBeVisible();
    await expect(sbomLink).toHaveAttribute("href", /\/sboms\//);
  });

  test("should display latest advisory document ID as a link", async ({
    page,
  }) => {
    const homePage = await HomePage.build(page);
    const advisoryLink = homePage.getLatestAdvisoryLink();

    await expect(advisoryLink).toBeVisible();
    await expect(advisoryLink).toHaveAttribute("href", /\/advisories\//);
  });

  test("should navigate to SBOM details when clicking latest SBOM link", async ({
    page,
  }) => {
    const homePage = await HomePage.build(page);

    await homePage.getLatestSbomLink().click();

    await expect(page).toHaveURL(/\/sboms\//);
  });

  test("should navigate to advisory details when clicking latest advisory link", async ({
    page,
  }) => {
    const homePage = await HomePage.build(page);

    await homePage.getLatestAdvisoryLink().click();

    await expect(page).toHaveURL(/\/advisories\//);
  });
});
