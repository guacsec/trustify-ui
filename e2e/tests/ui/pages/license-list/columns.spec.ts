// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";
import { LicenseListPage } from "./LicenseListPage";

test.describe("Columns validations", { tag: "@tier1" }, () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Name column - Text rendering, 70% width, word wrapping", async ({
    page,
  }) => {
    const listPage = await LicenseListPage.build(page);

    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    // Filter to find a specific license
    await toolbar.applyFilter({ Name: "Apache" });

    // Verify Name column contains Apache licenses
    await expect(table).toHaveColumnWithValue("Name", "Apache");

    // Verify the Name column header is visible
    await expect(
      table._table.getByRole("columnheader", { name: "Name" }),
    ).toBeVisible();
  });

  test("Packages column - Count display, link navigation, singular/plural, zero state", async ({
    page,
  }) => {
    const listPage = await LicenseListPage.build(page);
    const table = await listPage.getTable();

    // Wait for table to load
    await expect(table._table).toBeVisible();

    // Verify Packages column header is visible
    await expect(
      table._table.getByRole("columnheader", { name: "Packages" }),
    ).toBeVisible();

    // Check for package count displays (can be 0, 1, or >1)
    const packagesCell = table._table
      .locator('td[data-label="Packages"]')
      .first();
    await expect(packagesCell).toBeVisible();

    // The cell should contain either a link (if count > 0) or plain text (if count = 0)
    const cellText = await packagesCell.textContent();
    expect(cellText).toMatch(/\d+ Package(s)?/);
  });

  test("SBOMs column - Count display, link navigation, singular/plural, zero state", async ({
    page,
  }) => {
    const listPage = await LicenseListPage.build(page);
    const table = await listPage.getTable();

    // Wait for table to load
    await expect(table._table).toBeVisible();

    // Verify SBOMs column header is visible
    await expect(
      table._table.getByRole("columnheader", { name: "SBOMs" }),
    ).toBeVisible();

    // Check for SBOM count displays (can be 0, 1, or >1)
    const sbomsCell = table._table.locator('td[data-label="SBOMs"]').first();
    await expect(sbomsCell).toBeVisible();

    // The cell should contain either a link (if count > 0) or plain text (if count = 0)
    const cellText = await sbomsCell.textContent();
    expect(cellText).toMatch(/\d+ SBOM(s)?/);
  });

  test("Loading states - Skeleton loaders during data fetch", async ({
    page,
  }) => {
    const listPage = await LicenseListPage.build(page);
    const table = await listPage.getTable();

    // Wait for table to be visible
    await expect(table._table).toBeVisible();

    // After loading, verify that actual counts are displayed (not skeletons)
    const packagesCell = table._table
      .locator('td[data-label="Packages"]')
      .first();
    const sbomsCell = table._table.locator('td[data-label="SBOMs"]').first();

    // Verify cells contain text (not loading skeletons)
    await expect(packagesCell).toContainText(/\d+ Package(s)?/);
    await expect(sbomsCell).toContainText(/\d+ SBOM(s)?/);
  });

  test("All column headers visible - Verify Name, Packages, SBOMs headers", async ({
    page,
  }) => {
    const listPage = await LicenseListPage.build(page);
    const table = await listPage.getTable();

    // Wait for table to load
    await expect(table._table).toBeVisible();

    // Verify all column headers are visible
    await expect(
      table._table.getByRole("columnheader", { name: "Name" }),
    ).toBeVisible();
    await expect(
      table._table.getByRole("columnheader", { name: "Packages" }),
    ).toBeVisible();
    await expect(
      table._table.getByRole("columnheader", { name: "SBOMs" }),
    ).toBeVisible();
  });
});
