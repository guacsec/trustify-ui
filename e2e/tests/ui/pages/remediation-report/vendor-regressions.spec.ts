import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { login } from "../../helpers/Auth";

import { VulnerabilitiesTab as PackageVulnerabilitiesTab } from "../package-details/vulnerabilities/VulnerabilitiesTab";
import { PackagesTab } from "../sbom-details/packages/PackagesTab";

// Capability tests intentionally control only the feature probe. All list data
// and navigation still use the running application and UI fixture dataset.
test.describe(
  "Vendor remediation regressions",
  { tag: "@vendor-remediation" },
  () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
    });

    for (const { version, fix } of [
      { version: "1.0-1.el8", fix: "1.0-2.el8" },
      { version: "1.0-1.el9", fix: "1.0-9.el9" },
    ]) {
      test(`TC-6610: RPM ${version} fixes stay within the product stream`, async ({
        page,
      }) => {
        const tab = await PackageVulnerabilitiesTab.build(page, {
          Name: "remediation-stream-test",
          Version: version,
        });
        await expect(
          await tab.getRemediationLabelTexts("CVE-2026-99910"),
        ).toHaveText([fix]);
      });
    }

    for (const { scenario, version, count } of [
      { scenario: "scenario2", version: "5.3.18", count: 4 },
      { scenario: "scenario6", version: "5.3.18.rhlw-00010", count: 4 },
    ]) {
      test(`TC-6486 TC-6489: Packages remediation count for ${scenario}`, async ({
        page,
      }) => {
        const tab = await PackagesTab.build(
          page,
          `springmvc-cve-2023-20860-${scenario}`,
        );
        await expect(
          await tab.getRemediationCountCell("spring-webmvc", version),
        ).toHaveText(`${count} Remediations`);
      });
    }
  },
);
