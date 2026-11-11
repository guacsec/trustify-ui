import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { SbomDetailsPage } from "../../pages/sbom-details/SbomDetailsPage";
import { PackagesTab } from "../../pages/sbom-details/packages/PackagesTab";
import { VulnerabilitiesTab } from "../../pages/sbom-details/vulnerabilities/VulnerabilitiesTab";
import { PackageListPage } from "../../pages/package-list/PackageListPage";
import { VulnerabilitiesTab as PackageVulnerabilitiesTab } from "../../pages/package-details/vulnerabilities/VulnerabilitiesTab";
import { VulnerabilityDetailsPage } from "../../pages/vulnerability-details/VulnerabilityDetailsPage";
import { SbomsTab } from "../../pages/vulnerability-details/sboms/SbomsTab";
import { RemediationReportPage } from "../../pages/remediation-report/RemediationReportPage";

export const { Given, When, Then } = createBdd(test);

// A vendor-rebuild chip (".rhlw-" suffix) renders blue only when it comes from the
// recommend endpoint. For the single-backport-base spring packages used by this
// feature, that happens only when the installed version equals the advisory's
// backport base version ("5.3.18" -> "5.3.18.rhlw-00010") — at any other installed
// version the .rhlw- entry comes from the advisory fixed_versions and renders
// green, exactly like an upstream upgrade. NOTE: this rule does NOT generalize to
// packages with multiple backport bases (see the json-path cases in the API suite,
// where 2.7.0 recommends both 2.7.0.rhlw and 2.8.0.rhlw); such a fixture would need
// a different rule here. "Applied" (installed version already IS the vendor
// rebuild) is a filled blue chip.
const isVendorRecommendation = (
  chip: string,
  packageVersion: string,
): boolean =>
  chip.includes(".rhlw-") && chip.split(".rhlw-")[0] === packageVersion;

// Navigation steps mirror the @sbom-explorer definitions. playwright-bdd scopes
// step definitions per feature (@*) directory, so these must be declared here to
// be resolvable by this feature (same reason @vulnerability-explorer redeclares
// "User visits Vulnerability details Page of"). They are implemented purely via
// page objects.
When(
  "User visits SBOM details Page of {string}",
  async ({ page }, sbomName: string) => {
    await SbomDetailsPage.build(page, sbomName);
  },
);

Given(
  "User is on the Vulnerabilities tab with {string} rows per page for SBOM {string}",
  async ({ page }, rowsPerPage: string, sbomName: string) => {
    const vulnerabilitiesTab = await VulnerabilitiesTab.build(page, sbomName);
    const pagination = await vulnerabilitiesTab.getPagination(true);
    await pagination.selectItemsPerPage(
      Number(rowsPerPage) as 10 | 20 | 50 | 100,
    );
  },
);

Given(
  "User visits Vulnerability details Page of {string}",
  async ({ page }, vulnerabilityId: string) => {
    await VulnerabilityDetailsPage.build(page, vulnerabilityId);
  },
);

Then(
  "The Packages tab shows the {string} column",
  async ({ page }, columnName: string) => {
    const packagesTab = await PackagesTab.fromCurrentPage(page);
    const table = await packagesTab.getTable();
    await expect(table).toHaveColumnHeader(
      columnName as (typeof table._columns)[number],
    );
  },
);

Then(
  "The Packages tab lists package {string} version {string}",
  async ({ page }, packageName: string, packageVersion: string) => {
    const packagesTab = await PackagesTab.fromCurrentPage(page);
    const table = await packagesTab.getTable();
    const rows = await table.getRowsByCellValue(
      {
        Name: packageName,
        Version: packageVersion,
      },
      true,
    );
    await expect(rows.first()).toBeVisible();
  },
);

Then(
  "The Vulnerabilities tab shows the {string} column",
  async ({ page }, columnName: string) => {
    const vulnerabilitiesTab = await VulnerabilitiesTab.fromCurrentPage(page);
    const table = await vulnerabilitiesTab.getTable();
    await expect(table).toHaveColumnHeader(
      columnName as (typeof table._columns)[number],
    );
  },
);

Then(
  "Expanding vulnerability {string} shows remediations {string} for package {string} version {string}",
  async (
    { page },
    vulnerabilityId: string,
    remediationChips: string,
    packageName: string,
    packageVersion: string,
  ) => {
    const vulnerabilitiesTab = await VulnerabilitiesTab.fromCurrentPage(page);
    const remediationChipLabels =
      await vulnerabilitiesTab.getAffectedDependencyRemediations(
        vulnerabilityId,
        packageName,
      );
    const expectedChips = remediationChips
      .split(",")
      .map((chip) => chip.trim());

    // The remediation column must contain exactly the described versions — no more,
    // no less — so an unexpected recommendation (e.g. a vendor backport offered for a
    // CVE it does not fix) fails the assertion.
    await expect(remediationChipLabels).toHaveCount(expectedChips.length);
    for (const chip of expectedChips) {
      await expect(
        remediationChipLabels.getByText(chip, { exact: true }),
      ).toBeVisible();
      const label = remediationChipLabels.filter({ hasText: chip });
      await expect(label).toHaveClass(
        chip === "Applied" || isVendorRecommendation(chip, packageVersion)
          ? /pf-m-blue/
          : /pf-m-green/,
      );
      if (chip !== "Applied") await expect(label).toHaveClass(/pf-m-outline/);
    }
  },
);

When(
  "User visits the Package list filtered by {string}",
  async ({ page }, packageName: string) => {
    const packageListPage = await PackageListPage.build(page);
    const toolbar = await packageListPage.getToolbar();
    await toolbar.applyFilter({ "Filter text": packageName });
  },
);

Then(
  "The Package list shows the {string} column",
  async ({ page }, columnName: string) => {
    const packageListPage = await PackageListPage.fromCurrentPage(page);
    const table = await packageListPage.getTable();
    await expect(table).toHaveColumnHeader(
      columnName as (typeof table._columns)[number],
    );
  },
);

Then(
  "The Package list lists package {string} version {string}",
  async ({ page }, packageName: string, packageVersion: string) => {
    const packageListPage = await PackageListPage.fromCurrentPage(page);
    const table = await packageListPage.getTable();
    const rows = await table.getRowsByCellValue(
      {
        Name: packageName,
        Version: packageVersion,
      },
      true,
    );
    await expect(rows.first()).toBeVisible();
  },
);

Then(
  "The SBOM {string} is listed as {string} under the vulnerability",
  async ({ page }, sbomName: string, status: string) => {
    const sbomsTab = await SbomsTab.fromCurrentPage(page);
    const table = await sbomsTab.getTable();
    const rows = await table.getRowsByCellValue({
      Name: sbomName,
      Status: status,
    });
    await expect(rows.first()).toBeVisible();
  },
);

When(
  "User visits the Vulnerabilities tab of package {string} version {string}",
  async ({ page }, packageName: string, packageVersion: string) => {
    const vulnerabilitiesTab = await PackageVulnerabilitiesTab.build(page, {
      Name: packageName,
      Version: packageVersion,
    });
    const pagination = await vulnerabilitiesTab.getPagination(true);
    await pagination.selectItemsPerPage(100);
  },
);

Then(
  "The package Vulnerabilities tab shows the {string} column",
  async ({ page }, columnName: string) => {
    const vulnerabilitiesTab =
      await PackageVulnerabilitiesTab.fromCurrentPage(page);
    const table = await vulnerabilitiesTab.getTable();
    await expect(table).toHaveColumnHeader(
      columnName as (typeof table._columns)[number],
    );
  },
);

Then(
  "The package Vulnerabilities tab shows per-CVE remediations {string} for version {string}",
  async ({ page }, perCveRemediations: string, packageVersion: string) => {
    const vulnerabilitiesTab =
      await PackageVulnerabilitiesTab.fromCurrentPage(page);

    // Each package is validated in a single step. The packed parameter lists every
    // affected CVE and its exact remediation set as "CVE=chip1,chip2;CVE2=chipA".
    // Asserting the exact chip set per CVE row guarantees the vendor backport /
    // "Applied" state shows ONLY on the CVEs it fixes and never leaks onto the rest.
    // Chip colors follow the same rule as the SBOM view: blue only for "Applied" or
    // a vendor rebuild recommended at the installed version (see
    // isVendorRecommendation), green for every other fixed version.
    const entries = perCveRemediations
      .split(";")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);

    for (const entry of entries) {
      const [vulnerabilityId, chipList] = entry.split("=");
      const expectedChips = chipList.split(",").map((chip) => chip.trim());
      const remediationLabels = await vulnerabilitiesTab.getRemediationLabels(
        vulnerabilityId.trim(),
      );

      await expect(remediationLabels).toHaveCount(expectedChips.length);
      for (const chip of expectedChips) {
        await expect(
          remediationLabels.getByText(chip, { exact: true }),
        ).toBeVisible();
        const label = remediationLabels.filter({ hasText: chip });
        await expect(label).toHaveClass(
          chip === "Applied" || isVendorRecommendation(chip, packageVersion)
            ? /pf-m-blue/
            : /pf-m-green/,
        );
        if (chip !== "Applied") await expect(label).toHaveClass(/pf-m-outline/);
      }
    }
  },
);

When(
  "User navigates to remediation report for SBOM {string}",
  async ({ page }, sbomName: string) => {
    await RemediationReportPage.build(page, [sbomName]);
  },
);

When(
  "User navigates to remediation report for SBOMs {string}",
  async ({ page }, sbomNames: string) => {
    await RemediationReportPage.build(
      page,
      sbomNames.split(",").map((name) => name.trim()),
    );
  },
);

Then(
  "The report shows {string} SBOM with remediations out of {string} total",
  async ({ page }, sbomsWithRemediations: string, total: string) => {
    const reportPage = await RemediationReportPage.fromCurrentPage(page);
    const summary = await reportPage.getImpactSummary();
    await expect(summary.sbomsWith).toBe(parseInt(sbomsWithRemediations, 10));
    await expect(summary.total).toBe(parseInt(total, 10));
  },
);

Then(
  "The report shows {string} addressable packages",
  async ({ page }, addressablePackages: string) => {
    const reportPage = await RemediationReportPage.fromCurrentPage(page);
    const summary = await reportPage.getImpactSummary();
    await expect(summary.addressablePackages).toBe(
      parseInt(addressablePackages, 10),
    );
  },
);

Then(
  "The report shows {string} percent coverage",
  async ({ page }, coverage: string) => {
    const reportPage = await RemediationReportPage.fromCurrentPage(page);
    const summary = await reportPage.getImpactSummary();
    await expect(summary.coverage).toBe(parseInt(coverage, 10));
  },
);

Then(
  "The packages table has {string} rows",
  async ({ page }, rowCount: string) => {
    const reportPage = await RemediationReportPage.fromCurrentPage(page);
    const expectedCount = parseInt(rowCount, 10);

    if (expectedCount === 0) {
      await reportPage.expectNoAddressablePackages();
    } else {
      const table = await reportPage.getPackagesTable();
      await expect(table).toHaveNumberOfRows({ equal: expectedCount });
    }
  },
);

Then(
  "The packages table shows package {string} version {string} recommended {string} addressing {string} found in {string}",
  async (
    { page },
    packageName: string,
    currentVersion: string,
    recommendedVersion: string,
    cves: string,
    foundIn: string,
  ) => {
    if (!packageName) return;

    const reportPage = await RemediationReportPage.fromCurrentPage(page);
    const row = await reportPage.getPackageRow(packageName, currentVersion);

    await expect(
      reportPage.getCellLabelTexts(row, "Recommended version"),
    ).toHaveText([recommendedVersion]);

    const cveList = cves.split(",").map((c) => c.trim());
    await expect
      .poll(async () =>
        (
          await reportPage
            .getCellLabelTexts(row, "Vulnerabilities addressed")
            .allTextContents()
        ).sort(),
      )
      .toEqual(cveList.sort());

    await expect
      .poll(async () =>
        (
          await reportPage.getCellLabelTexts(row, "Found in").allTextContents()
        ).sort(),
      )
      .toEqual(
        foundIn
          .split(",")
          .map((name) => name.trim())
          .sort(),
      );
  },
);

Then(
  "The Vendor Remediation Alert is {string}",
  async ({ page }, alertStatus: string) => {
    const reportPage = await RemediationReportPage.fromCurrentPage(page);
    let alertCont = false;
    if (alertStatus == "Visible") {
      alertCont = true;
    }
    expect(await reportPage.hasVendorRemediationsAlert()).toBe(alertCont);
  },
);
