import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";

import { HomePage } from "./HomePage";

const EXPECTED_TOP_3 = [
  { identifier: "CVE-2026-18236", severity: /critical/i },
  { identifier: "CVE-2026-63223", severity: /critical/i },
  { identifier: "CVE-2026-18358", severity: /high/i },
] as const;

const EXCLUDED_CVE = "CVE-2026-63077";

test.describe(
  "Home - Vulnerability Attention Section",
  { tag: "@tier1" },
  () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
    });

    test("should render the Attention section card", async ({ page }) => {
      const homePage = await HomePage.build(page);

      await expect(homePage.getAttentionSection()).toBeVisible();
    });

    test("should display section heading", async ({ page }) => {
      const homePage = await HomePage.build(page);

      await expect(
        homePage.getAttentionSection().getByRole("heading", {
          name: /Highest vulnerabilities \(last 7 days\)/i,
        }),
      ).toBeVisible();
    });

    test("should display up to 3 vulnerability attention cards", async ({
      page,
    }) => {
      const homePage = await HomePage.build(page);

      for (let i = 0; i < 3; i++) {
        await expect(homePage.getAttentionItem(i)).toBeVisible();
      }

      await expect(homePage.getAttentionItem(3)).toHaveCount(0);
    });

    test("should display severity badges on attention cards", async ({
      page,
    }) => {
      const homePage = await HomePage.build(page);

      for (let i = 0; i < EXPECTED_TOP_3.length; i++) {
        const severity = homePage.getAttentionSeverity(i);
        await expect(severity).toBeVisible();
        await expect(severity).toContainText(EXPECTED_TOP_3[i].severity);
      }
    });

    test("should display CVE identifiers as links", async ({ page }) => {
      const homePage = await HomePage.build(page);

      for (const cve of EXPECTED_TOP_3) {
        const link = homePage.getAttentionCveLink(cve.identifier);
        await expect(link).toBeVisible();
      }
    });

    test('should display "View vulnerability" action link per card', async ({
      page,
    }) => {
      const homePage = await HomePage.build(page);

      for (let i = 0; i < 3; i++) {
        await expect(homePage.getViewVulnerabilityLink(i)).toBeVisible();
      }
    });

    test("should NOT display CVE-2026-63077 (outside 7-day window)", async ({
      page,
    }) => {
      const homePage = await HomePage.build(page);

      await expect(
        homePage.getAttentionCveLink(EXCLUDED_CVE),
      ).not.toBeVisible();
    });

    test("should display vulnerabilities sorted by CVSS score descending", async ({
      page,
    }) => {
      const homePage = await HomePage.build(page);

      for (let i = 0; i < EXPECTED_TOP_3.length; i++) {
        const cveIdLocator = homePage.getAttentionCveId(i);
        await expect(cveIdLocator).toContainText(EXPECTED_TOP_3[i].identifier);
      }
    });

    test("should navigate to vulnerability details when clicking a CVE link", async ({
      page,
    }) => {
      const homePage = await HomePage.build(page);
      const firstCve = EXPECTED_TOP_3[0];

      await homePage.getAttentionCveLink(firstCve.identifier).click();

      await expect(page).toHaveURL(
        new RegExp(`/vulnerabilities/${firstCve.identifier}`),
      );
    });
  },
);
