import { expect, test } from "../fixtures";

import {
  bareUuid,
  expectPurlFixedVersions,
  expectRecommendations,
  expectRemediationChips,
  expectReportPackage,
  getRecommendReport,
  getSbomAdvisoryFixedPurls,
  getSbomIdByName,
  purlVersion,
  recommendationsEndpoint,
} from "../helpers/vendor-remediation";

const springExpression = {
  purl: "pkg:maven/org.springframework/spring-expression",
  vendor: "pkg:maven/org.springframework/spring-expression@5.3.18.rhlw-00010",
};

const jsonPath = {
  purl: "pkg:maven/com.jayway.jsonpath/json-path",
  vendor270: "pkg:maven/com.jayway.jsonpath/json-path@2.7.0.rhlw-00001",
  vendor280: "pkg:maven/com.jayway.jsonpath/json-path@2.8.0.rhlw-00001",
};

const springWebMVC = {
  purl: "pkg:maven/org.springframework/spring-webmvc",
  // Vendor rebuild version (not a full PURL) — matches the blue chip the UI renders.
  vendor: "5.3.18.rhlw-00010",
  sbomScenario1: "springmvc-cve-2023-20860-scenario1",
};

test.describe(
  "LW advisory-only recommendations",
  { tag: "@vendor-remediation-api" },
  () => {
    // TC-6808 TC-6887: an advisory-only package returns its same-base vendor
    // rebuild for any version up to the fix, and nothing above the fix.
    // PURL-only assertions are deliberate; see expectRecommendations.
    const springExpressionCases: [string, string[]][] = [
      ["5.3.17", []], // below the base → vendor rebuild
      ["5.3.18", [springExpression.vendor]], // base → Applied
      ["5.3.18.rhlw-00010", [springExpression.vendor]], // vendor → Applied
      ["5.3.19", []], // above the fix → no recommendation
    ];

    for (const [version, expected] of springExpressionCases) {
      test(`TC-6808 TC-6887: spring-expression ${version}`, async ({
        axios,
      }) => {
        const purl = `${springExpression.purl}@${version}`;
        await expectRecommendations(axios, [purl], { [purl]: expected });
      });
    }

    // TC-6908: two advisories fix the same package in different streams.
    // Everything at or below a fix is recommended; above all fixes is empty.
    const jsonPathCases: [string, string[]][] = [
      ["2.6.9", []], // below both
      ["2.7.0", [jsonPath.vendor270, jsonPath.vendor280]], // 2.7 applied, 2.8 recommended
      ["2.7.1", []], // between → only the higher fix
      ["2.8.0", [jsonPath.vendor280]], // applied
      ["2.9.0", []], // above both
    ];

    for (const [version, expected] of jsonPathCases) {
      test(`TC-6908: json-path ${version}`, async ({ axios }) => {
        const purl = `${jsonPath.purl}@${version}`;
        await expectRecommendations(axios, [purl], { [purl]: expected });
      });
    }

    // TC-6887: an intermediate vendor rebuild still resolves to the final one.
    test("TC-6887: intermediate vendor rebuild", async ({ axios }) => {
      const purl = `${springExpression.purl}@5.3.18.rhlw-00000`;
      await expectRecommendations(axios, [purl], {
        [purl]: [springExpression.vendor],
      });
    });

    // TC-6908: duplicate and qualified inputs are not collapsed away.
    test("TC-6908: duplicate and qualified inputs", async ({ axios }) => {
      const purl = `${springExpression.purl}@5.3.18`;
      const qualified = `${purl}?type=jar`;

      await expectRecommendations(axios, [purl, purl, qualified], {
        [purl]: [springExpression.vendor],
        [qualified]: [springExpression.vendor],
      });
    });

    // The packages from Advisory and SBOM + Advisory being validated
    test("batch keeps each package's recommendations separate", async ({
      axios,
    }) => {
      const expression = `${springExpression.purl}@5.3.18`;
      const webMVC = `${springWebMVC.purl}@5.3.18`;

      await expectRecommendations(
        axios,
        [expression, webMVC],
        {
          [expression]: [springExpression.vendor],
          [webMVC]: [`${springWebMVC.purl}@${springWebMVC.vendor}`],
        },
        {
          [expression]: {
            "CVE-2023-20861": "Fixed",
            "CVE-2024-38808": "Fixed",
            "CVE-2023-20863": "Fixed",
          },
          [webMVC]: {
            "CVE-2023-20860": "Fixed",
            "CVE-2024-38816": "Fixed",
            "CVE-2025-41242": "Affected",
            "CVE-2024-38819": "Affected",
          },
        },
      );
    });

    // TC-6604 TC-6667: the recommendation does not stop at the vendor PURL — it
    // carries the per-CVE status the UI filters on before showing a vendor chip.
    // Only one spring-expression advisory exists, so pinning its CVE is safe.
    test("TC-6604 TC-6667: recommendation carries the fixed CVE status", async ({
      axios,
    }) => {
      const purl = `${springExpression.purl}@5.3.18`;
      await expectRecommendations(
        axios,
        [purl],
        { [purl]: [springExpression.vendor] },
        {
          [purl]: {
            "CVE-2023-20861": "Fixed",
            "CVE-2024-38808": "Fixed",
            "CVE-2023-20863": "Fixed",
          },
        },
      );
    });

    // TC-6887: cross-source parity (downgraded per plan). GET /api/v3/purl/{key}
    // returns 200 with a null body for the advisory-only spring-expression package
    // (it is not ingested as a qualified PURL), so it cannot anchor a live
    // fixed_versions membership check. We instead assert the recommend endpoint's
    // vendor rebuild version equals the pinned expected rebuild. Robust cross-source
    // agreement is covered by the D scenarios, where spring-webmvc carries data in
    // BOTH the recommend and purl-advisory endpoints.
    test("TC-6887: recommend vendor version matches the pinned rebuild", async ({
      axios,
    }) => {
      const purl = `${springExpression.purl}@5.3.18`;
      const response = await axios.post<{
        recommendations: Record<string, { package: string }[]>;
      }>(recommendationsEndpoint, { purls: [purl] });

      expect(response.status).toBe(200);
      const versions = (response.data.recommendations[purl] ?? []).map(
        (entry) => purlVersion(entry.package),
      );
      expect(versions).toContain(purlVersion(springExpression.vendor));
    });

    test("empty input has no recommendations", async ({ axios }) => {
      await expectRecommendations(axios, [], {});
    });

    test("versionless PURLs are omitted", async ({ axios }) => {
      await expectRecommendations(axios, [springExpression.purl], {});
    });

    test("invalid PURL is rejected", async ({ axios }) => {
      const response = await axios
        .post(recommendationsEndpoint, { purls: ["not_a_purl"] })
        .catch((error) => {
          // Transport failures must stay failures rather than become missing responses.
          if (!error.response) throw error;
          return error.response;
        });

      expect(response.status).toBe(400);
    });
  },
);

// Per-CVE fixed_versions for spring-webmvc@5.3.15, pinned to the UI feature file's
// `perCveRemediations` column (vendor-remediation.feature line 66) so the API and UI
// coverage stay in lock-step.
const springWebMVCFixedVersions: Record<string, string[]> = {
  "CVE-2022-22965": ["5.2.20.RELEASE", "5.3.18"],
  // vendor backport (5.3.18.rhlw-00010). The exact-set assertion proves both
  // advisories' fixed_versions are merged.
  "CVE-2023-20860": ["5.3.18.rhlw-00010", "5.3.26", "6.0.7"],
  "CVE-2024-38816": ["5.3.18.rhlw-00010", "6.1.13"],
  // Upstream-only CVE: the exact-set assertion guarantees no vendor (.rhlw-)
  // entry leaks onto a CVE the vendor backport does not address.
  "CVE-2024-38819": ["6.1.14"],
  "CVE-2025-41242": ["6.2.10"],
};

// org.json:json — an independent LW package ingested ONLY by the orgjson SBOMs added
// to this dataset. Unlike spring-webmvc it is NOT referenced by any UI feature file or
// spec, so these assertions never couple to the UI example tables (whose numbers the
// spring-webmvc cases are pinned to "in lock-step"). Two advisories (CVE-2022-45688 and
// CVE-2023-5072) fix the SAME backport base, so this exercises the multi-advisory merge
// onto one vendor rebuild — a shape the other fixtures do not cover.
const orgJson = {
  purl: "pkg:maven/org.json/json",
  baseVersion: "20220320",
  // Vendor rebuild shared by both advisories (full PURL version, not a short chip).
  vendorVersion: "20220320.0.0.rhlw-00003",
  baseSbom: "orgjson-20220320-base",
  // Companion SBOM that pins org.json:json at the vendor rebuild (the "Applied" state).
  appliedSbom: "orgjson-rhlw-applied",
};

// Both CVEs merge onto the one vendor rebuild. The CVE key set is closed here because
// org.json:json is a dedicated package carrying only these two advisories (verified
// absent elsewhere in the dataset), so unlike the shared spring-webmvc map we can also
// assert the exact set of CVEs in the SBOM-advisory test below.
const orgJsonFixedVersions: Record<string, string[]> = {
  "CVE-2022-45688": [orgJson.vendorVersion],
  "CVE-2023-5072": [orgJson.vendorVersion],
};

test.describe(
  "Vendor remediation fixed_versions",
  { tag: "@vendor-remediation-api" },
  () => {
    // package advisory fixed_versions via GET /api/v3/purl/{key} — the ACTUAL source
    // the UI reads to build the remediation chips.

    // TC-6603 TC-6604 TC-6667: A1 — the full 5-CVE fixed_versions map for a shared,
    // upstream package version. Each listed CVE's set is asserted exactly (so no
    // unexpected .rhlw- version leaks onto a CVE it does not fix); the collection of CVEs
    // is intentionally open-world (spring-webmvc is shared and the whole dataset is
    // ingested — see expectPurlFixedVersions).
    test("TC-6603 TC-6604 TC-6667: spring-webmvc@5.3.15 per-CVE fixed_versions", async ({
      axios,
    }) => {
      await expectPurlFixedVersions(
        axios,
        `${springWebMVC.purl}@5.3.15`,
        springWebMVCFixedVersions,
      );
    });

    // SBOM advisory endpoint GET /api/v3/sbom/{id}/advisory — drives the remediation
    // COUNT on the collapsed CVE row (fixedPurlsByCve), NOT the chips.

    // TC-6486 TC-6489: for a dedicated single-package SBOM the set of CVEs with a
    // fixed_version is closed by the SBOM's contents, so the exact CVE key set is safe to
    // assert; each maps to the one affected PURL.
    test("TC-6486 TC-6489: scenario1 SBOM advisory maps fixed CVEs to the affected PURL", async ({
      axios,
    }) => {
      const sbomId = await getSbomIdByName(axios, springWebMVC.sbomScenario1);
      const fixedPurlsByCve = await getSbomAdvisoryFixedPurls(axios, sbomId);
      const affectedPurl = `${springWebMVC.purl}@5.3.15`;

      expect([...fixedPurlsByCve.keys()].sort()).toEqual(
        Object.keys(springWebMVCFixedVersions).sort(),
      );
      for (const [cve, purls] of fixedPurlsByCve) {
        expect([...purls], cve).toEqual([affectedPurl]);
      }
    });

    // Cross-source "Remediations chips" formula — the key validation. Computes the
    // chips exactly as the UI does from live recommend + purl-advisory responses. Each
    // listed CVE's chip set is matched exactly; the collection of CVEs is open-world.

    // TC-6486 TC-6489 TC-6603: D1 — spring-webmvc@5.3.15 (UI feature line 66). Vendor
    // backport + upstream upgrade chips per CVE.
    test("TC-6486 TC-6489 TC-6603: spring-webmvc@5.3.15 remediation chips", async ({
      axios,
    }) => {
      await expectRemediationChips(
        axios,
        `${springWebMVC.purl}@5.3.15`,
        springWebMVCFixedVersions,
      );
    });

    // TC-6603 TC-6667: D2 — spring-webmvc@<vendor rebuild> (UI feature line 71). The
    // "Applied" short-circuit replaces all chips for CVEs the current version already
    // fixes, while unaddressed CVEs still show their upstream upgrade chip.
    test("TC-6603 TC-6667: spring-webmvc vendor rebuild shows Applied per fixed CVE", async ({
      axios,
    }) => {
      await expectRemediationChips(
        axios,
        `${springWebMVC.purl}@${springWebMVC.vendor}`,
        {
          "CVE-2023-20860": "Applied",
          "CVE-2024-38816": "Applied",
          "CVE-2024-38819": ["6.1.14"],
          "CVE-2025-41242": ["6.2.10"],
        },
      );
    });

    // Independent (UI-decoupled) package coverage — org.json:json. Mirrors the
    // spring-webmvc A1/D1/D2 + SBOM-advisory assertions on a package that no UI feature
    // file references, and adds the multi-advisory-merge shape (two CVEs → one rebuild).

    // A1' — both advisories' fixed_versions merge onto the single vendor rebuild via
    // GET /api/v3/purl/{key} (the source the UI reads to build chips).
    test("org.json:json@20220320 per-CVE fixed_versions", async ({ axios }) => {
      await expectPurlFixedVersions(
        axios,
        `${orgJson.purl}@${orgJson.baseVersion}`,
        orgJsonFixedVersions,
      );
    });

    // D1' — remediation chips at the base version: both CVEs surface the vendor rebuild
    // chip (recommend vendor version ∪ purl-advisory fixed_versions collapse to the one
    // rebuild).
    test("org.json:json@20220320 remediation chips", async ({ axios }) => {
      await expectRemediationChips(
        axios,
        `${orgJson.purl}@${orgJson.baseVersion}`,
        orgJsonFixedVersions,
      );
    });

    // D2' — remediation chips at the vendor rebuild: the "Applied" short-circuit replaces
    // the chip for every CVE the current version already fixes.
    test("org.json:json vendor rebuild shows Applied per fixed CVE", async ({
      axios,
    }) => {
      await expectRemediationChips(
        axios,
        `${orgJson.purl}@${orgJson.vendorVersion}`,
        {
          "CVE-2022-45688": "Applied",
          "CVE-2023-5072": "Applied",
        },
      );
    });

    // SBOM advisory endpoint for the dedicated single-package SBOM. Because org.json:json
    // carries only these two advisories, the exact CVE key set is closed (stronger than
    // the open-world spring-webmvc case); each maps to the one affected PURL.
    test("orgjson base SBOM advisory maps fixed CVEs to the affected PURL", async ({
      axios,
    }) => {
      const sbomId = await getSbomIdByName(axios, orgJson.baseSbom);
      const fixedPurlsByCve = await getSbomAdvisoryFixedPurls(axios, sbomId);
      const affectedPurl = `${orgJson.purl}@${orgJson.baseVersion}`;

      expect([...fixedPurlsByCve.keys()].sort()).toEqual(
        Object.keys(orgJsonFixedVersions).sort(),
      );
      for (const [cve, purls] of fixedPurlsByCve) {
        expect([...purls], cve).toEqual([affectedPurl]);
      }
    });

    // TC-6486: E1 — unknown SBOM id. GET /api/v3/sbom/{id}/advisory documents a 404 for a
    // missing SBOM (contract-backed).
    test("TC-6486: unknown SBOM advisory request returns 404", async ({
      axios,
    }) => {
      const response = await axios
        .get(
          "/api/v3/sbom/urn:uuid:00000000-0000-0000-0000-000000000000/advisory",
        )
        .catch((error) => {
          if (!error.response) throw error;
          return error.response;
        });

      expect(response.status).toBe(404);
    });

    // TC-6603: E2 — absent but valid PURL. SPEC GAP: GET /api/v3/purl/{key} documents
    // ONLY a 200 PurlDetails response with a non-nullable `advisories` array, but the
    // backend returns 200 with a `null` body for a well-formed-but-unknown PURL. We pin
    // the actual behavior and flag the contract violation (the spec should either
    // document a nullable body / 404, or return `{ advisories: [] }`). A valid-but-absent
    // PURL is used so this exercises a missing record, not an invalid-key parse error.
    test("TC-6603: absent PURL returns 200 with a null body (spec gap)", async ({
      axios,
    }) => {
      const response = await axios.get(
        `/api/v3/purl/${encodeURIComponent("pkg:maven/org.example/definitely-not-ingested@9.9.9")}`,
      );

      expect(response.status).toBe(200);
      expect(response.data).toBeNull();
    });
  },
);

// POST /api/v3/purl/recommend/report — the aggregated vendor-recommendation report
// the "Remediation report" page is built from. Unlike the recommend endpoint (which
// takes PURLs), this endpoint takes SBOM ids, so every test first resolves the SBOM
// UUID by name via getSbomIdByName and feeds it as the request payload.
//
// The report is intentionally narrow: a package is "addressable" only at the two
// versions the UI documents (vendor-remediation.feature lines 85-93) —
//   * the upstream base version          -> recommend the vendor LW rebuild
//   * the vendor LW rebuild version      -> "Applied" (recommended_purl === purl)
// Any other installed version yields no recommendation. The report carries only the
// addressed CVEs per package (Fixed/NotAffected), not the recommend endpoint's full
// per-CVE list.
test.describe(
  "Vendor remediation report",
  { tag: "@vendor-remediation-api" },
  () => {
    // Base-version -> recommend the vendor LW rebuild. org.json:json is a dedicated,
    // UI-decoupled single-package SBOM, so the whole report (impact summary + the one
    // package row + its exact CVE set) can be asserted in a closed-world way.
    test("report recommends the vendor LW rebuild for a base-version SBOM", async ({
      axios,
    }) => {
      const sbomId = await getSbomIdByName(axios, orgJson.baseSbom);
      const report = await getRecommendReport(axios, [sbomId]);

      expect(report.impact_summary.sboms_with_recommendations).toBe(1);
      expect(report.impact_summary.addressable_packages).toBe(1);

      expect(report.sboms).toHaveLength(1);
      const sbom = report.sboms[0];
      expect(bareUuid(sbom.id)).toBe(bareUuid(sbomId));
      expect(sbom.name).toBe(orgJson.baseSbom);
      expect(sbom.addressable_packages).toBe(1);
      expect(sbom.vulnerability_count).toBe(
        Object.keys(orgJsonFixedVersions).length,
      );

      expect(report.packages).toHaveLength(1);
      const pkg = expectReportPackage(
        report,
        `${orgJson.purl}@${orgJson.baseVersion}`,
      );
      // Not yet applied: the recommended rebuild differs from the installed PURL.
      expect(pkg.recommended_purl).toBe(
        `${orgJson.purl}@${orgJson.vendorVersion}`,
      );
      expect(pkg.recommended_purl).not.toBe(pkg.purl);
      expect(pkg.found_in.map(bareUuid)).toEqual([bareUuid(sbomId)]);
      expect([...pkg.vulnerabilities].sort()).toEqual(
        Object.keys(orgJsonFixedVersions).sort(),
      );
    });

    // Vendor LW version -> "Applied". The UI renders "Applied" when
    // recommended_purl === purl (remediation-report.tsx), so that equality is the
    // contract this asserts on the companion rhlw-applied SBOM.
    test("report marks the vendor LW version as Applied", async ({ axios }) => {
      const sbomId = await getSbomIdByName(axios, orgJson.appliedSbom);
      const report = await getRecommendReport(axios, [sbomId]);

      expect(report.impact_summary.sboms_with_recommendations).toBe(1);
      expect(report.impact_summary.addressable_packages).toBe(1);

      expect(report.packages).toHaveLength(1);
      const pkg = expectReportPackage(
        report,
        `${orgJson.purl}@${orgJson.vendorVersion}`,
      );
      // Applied: the recommended rebuild is the installed PURL itself.
      expect(pkg.recommended_purl).toBe(pkg.purl);
      expect(pkg.found_in.map(bareUuid)).toEqual([bareUuid(sbomId)]);
      expect([...pkg.vulnerabilities].sort()).toEqual(
        Object.keys(orgJsonFixedVersions).sort(),
      );
    });

    // TC-6487 TC-6663 TC-6872: spring-webmvc base version (feature file line 86).
    // Pinned to the UI example table so the API and UI report coverage stay in lock-step.
    test("TC-6487 TC-6663 TC-6872: base-version scenario recommends the vendor rebuild", async ({
      axios,
    }) => {
      const sbomName = "springmvc-cve-2023-20860-scenario2";
      const sbomId = await getSbomIdByName(axios, sbomName);
      const report = await getRecommendReport(axios, [sbomId]);

      expect(report.impact_summary.sboms_with_recommendations).toBe(1);
      expect(report.impact_summary.addressable_packages).toBe(1);

      expect(report.packages).toHaveLength(1);
      const pkg = expectReportPackage(report, `${springWebMVC.purl}@5.3.18`);
      expect(pkg.recommended_purl).toBe(
        `${springWebMVC.purl}@5.3.18.rhlw-00010`,
      );
      expect(pkg.found_in.map(bareUuid)).toEqual([bareUuid(sbomId)]);
      expect([...pkg.vulnerabilities].sort()).toEqual(
        ["CVE-2023-20860", "CVE-2024-38816"].sort(),
      );
    });

    // TC-6487 TC-6663 TC-6872: spring-webmvc vendor rebuild version (feature file
    // line 92) — the "Applied" row in the UI example table.
    test("TC-6487 TC-6663 TC-6872: vendor-version scenario reports Applied", async ({
      axios,
    }) => {
      const sbomName = "springmvc-cve-2023-20860-scenario6";
      const sbomId = await getSbomIdByName(axios, sbomName);
      const report = await getRecommendReport(axios, [sbomId]);

      expect(report.impact_summary.addressable_packages).toBe(1);

      expect(report.packages).toHaveLength(1);
      const pkg = expectReportPackage(
        report,
        `${springWebMVC.purl}@5.3.18.rhlw-00010`,
      );
      expect(pkg.recommended_purl).toBe(pkg.purl); // Applied
      expect([...pkg.vulnerabilities].sort()).toEqual(
        ["CVE-2023-20860", "CVE-2024-38816"].sort(),
      );
    });

    // Every other installed version (below the base, between fixes, or above all
    // fixes) is outside the base/LW window, so the report has nothing to recommend.
    // Versions annotated from vendor-remediation.feature lines 87-93.
    const noRecommendationScenarios: [string, string][] = [
      ["springmvc-cve-2023-20860-scenario1", "5.3.15"], // below the base
      ["springmvc-cve-2023-20860-scenario3", "5.3.22"], // above the vendor base
      ["springmvc-cve-2023-20860-scenario4", "5.2.22"], // older minor line
      ["springmvc-cve-2023-20860-scenario5", "5.3.27"], // above the fix
      ["springmvc-cve-2023-20860-scenario5a", "6.0.8"], // newer major line
      ["springmvc-cve-2023-20860-scenario7", "5.3.15"], // below the base (2-package SBOM)
    ];

    for (const [sbomName, version] of noRecommendationScenarios) {
      test(`report has no recommendation for ${version} (${sbomName})`, async ({
        axios,
      }) => {
        const sbomId = await getSbomIdByName(axios, sbomName);
        const report = await getRecommendReport(axios, [sbomId]);

        expect(report.impact_summary.sboms_with_recommendations).toBe(0);
        expect(report.impact_summary.addressable_packages).toBe(0);
        expect(report.packages).toEqual([]);

        // The requested SBOM is still echoed back, with zeroed counts.
        expect(report.sboms).toHaveLength(1);
        expect(bareUuid(report.sboms[0].id)).toBe(bareUuid(sbomId));
        expect(report.sboms[0].addressable_packages).toBe(0);
        expect(report.sboms[0].vulnerability_count).toBe(0);
      });
    }

    // A batch of SBOM ids aggregates: the impact summary sums distinct upstream
    // packages across SBOMs, and each per-SBOM entry keeps its own counts. The base
    // (@5.3.18) and the applied (@5.3.18.rhlw-00010) versions are two distinct
    // upstream PURLs, so both count toward addressable_packages.
    test("report aggregates impact across a batch of SBOMs", async ({
      axios,
    }) => {
      const baseId = await getSbomIdByName(
        axios,
        "springmvc-cve-2023-20860-scenario2",
      );
      const appliedId = await getSbomIdByName(
        axios,
        "springmvc-cve-2023-20860-scenario6",
      );
      const report = await getRecommendReport(axios, [baseId, appliedId]);

      expect(report.impact_summary.sboms_with_recommendations).toBe(2);
      expect(report.impact_summary.addressable_packages).toBe(2);

      expect(report.sboms).toHaveLength(2);
      for (const sbom of report.sboms) {
        expect(sbom.addressable_packages, sbom.name).toBe(1);
      }

      expect(report.packages.map((pkg) => pkg.purl).sort()).toEqual(
        [
          `${springWebMVC.purl}@5.3.18`,
          `${springWebMVC.purl}@5.3.18.rhlw-00010`,
        ].sort(),
      );
      // Each addressable package is traced back to exactly its own SBOM.
      const base = expectReportPackage(report, `${springWebMVC.purl}@5.3.18`);
      const applied = expectReportPackage(
        report,
        `${springWebMVC.purl}@5.3.18.rhlw-00010`,
      );
      expect(base.found_in.map(bareUuid)).toEqual([bareUuid(baseId)]);
      expect(applied.found_in.map(bareUuid)).toEqual([bareUuid(appliedId)]);
    });

    // Degenerate input: an empty SBOM set yields an empty report rather than an error
    // (mirrors the recommend endpoint's "empty input has no recommendations").
    test("report for an empty SBOM set is empty", async ({ axios }) => {
      const report = await getRecommendReport(axios, []);

      expect(report.impact_summary.sboms_with_recommendations).toBe(0);
      expect(report.impact_summary.addressable_packages).toBe(0);
      expect(report.sboms).toEqual([]);
      expect(report.packages).toEqual([]);
    });

    // A well-formed but unknown SBOM id contributes nothing to the report. The id used
    // is a valid UUID that no ingested SBOM carries, so this exercises a missing record
    // rather than a malformed-id parse error.
    test("report ignores an unknown SBOM id", async ({ axios }) => {
      const report = await getRecommendReport(axios, [
        "00000000-0000-0000-0000-000000000000",
      ]);

      expect(report.impact_summary.sboms_with_recommendations).toBe(0);
      expect(report.impact_summary.addressable_packages).toBe(0);
      expect(report.packages).toEqual([]);
    });
  },
);
