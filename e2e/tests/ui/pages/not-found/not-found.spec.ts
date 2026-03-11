// @ts-check

import { expect } from "@playwright/test";

import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";

const NON_EXISTENT_UUID = "urn:uuid:00000000-0000-0000-0000-000000000000";

const expectNotFound = async (page: import("@playwright/test").Page) => {
  await expect(
    page.getByRole("heading", { name: "404: That page does not exist" }),
  ).toBeVisible();
  await expect(
    page.getByText("Another page might have the information you need."),
  ).toBeVisible();
};

test.describe("Not Found page", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Shows 404 page for undefined route", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expectNotFound(page);
  });

  test("Shows 404 page for non-existent advisory", async ({ page }) => {
    await page.goto(`/advisories/${NON_EXISTENT_UUID}`);
    await expectNotFound(page);
  });

  test("Shows 404 page for non-existent SBOM", async ({ page }) => {
    await page.goto(`/sboms/${NON_EXISTENT_UUID}`);
    await expectNotFound(page);
  });

  test("Shows 404 page for non-existent vulnerability", async ({ page }) => {
    await page.goto("/vulnerabilities/CVE-0000-00000");
    await expectNotFound(page);
  });

  // Enable this test when https://issues.redhat.com/browse/TC-3626 is fixed
  test.skip("Shows 404 page for non-existent package", async ({ page }) => {
    await page.goto(`/packages/${NON_EXISTENT_UUID}`);
    await expectNotFound(page);
  });
});
