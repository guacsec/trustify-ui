import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";

import { HomePage } from "./HomePage";

test.describe("Home - Get Started Section", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("should render the Get Started section card", async ({ page }) => {
    const homePage = await HomePage.build(page);

    await expect(homePage.getGetStartedSection()).toBeVisible();
  });

  test("should display section heading", async ({ page }) => {
    const homePage = await HomePage.build(page);

    await expect(
      homePage.getGetStartedSection().getByRole("heading", { level: 2 }),
    ).toBeVisible();
  });

  test('should display "Upload SBOM" action button', async ({ page }) => {
    const homePage = await HomePage.build(page);

    await expect(homePage.getActionButton("Upload SBOM")).toBeVisible();
  });

  test('should display "Generate vulnerability report" action button', async ({
    page,
  }) => {
    const homePage = await HomePage.build(page);

    await expect(
      homePage.getActionButton("Generate vulnerability report"),
    ).toBeVisible();
  });

  test("should display action card titles", async ({ page }) => {
    const homePage = await HomePage.build(page);

    await expect(homePage.getActionCardTitle("Upload an SBOM")).toBeVisible();
    await expect(
      homePage.getActionCardTitle("Generate vulnerability report"),
    ).toBeVisible();
  });

  test("should display indexed action card locators", async ({ page }) => {
    const homePage = await HomePage.build(page);

    await expect(homePage.getActionCard(0)).toBeVisible();
    await expect(homePage.getActionCard(1)).toBeVisible();
  });

  test('should navigate to SBOM upload page when clicking "Upload SBOM"', async ({
    page,
  }) => {
    const homePage = await HomePage.build(page);

    await homePage.getActionButton("Upload SBOM").click();

    await expect(page).toHaveURL(/\/sboms\/upload/);
  });

  test('should navigate to SBOM scan page when clicking "Generate vulnerability report"', async ({
    page,
  }) => {
    const homePage = await HomePage.build(page);

    await homePage.getActionButton("Generate vulnerability report").click();

    await expect(page).toHaveURL(/\/sboms\/scan/);
  });
});
