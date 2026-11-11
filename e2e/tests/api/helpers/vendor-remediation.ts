import { expect } from "../fixtures";

import type { AxiosInstance } from "axios";

export const recommendationsEndpoint = "/api/v3/purl/recommend";
export const recommendReportEndpoint = "/api/v3/purl/recommend/report";

export type RecommendVulnerability = {
  id: string;
  status: string | null;
  remediations: unknown[];
};

export type Recommendation = {
  package: string;
  vulnerabilities: RecommendVulnerability[];
};

/** `RecommendReportPackage` — a deduplicated package entry in the report. */
export type RecommendReportPackage = {
  /** Upstream package PURL (type+namespace+name+version, no qualifiers). */
  purl: string;
  /** Recommended vendor-rebuilt PURL. Equal to `purl` when already "Applied". */
  recommended_purl: string;
  /** CVE identifiers the recommendation addresses. */
  vulnerabilities: string[];
  /** Bare UUIDs of the SBOMs that contain this upstream package. */
  found_in: string[];
  advisory_id?: string | null;
};

/** `RecommendReportSbom` — per-SBOM breakdown in the report. */
export type RecommendReportSbom = {
  id: string;
  name: string;
  addressable_packages: number;
  vulnerability_count: number;
};

/** `RecommendReportResponse` — aggregated report for a set of SBOMs. */
export type RecommendReportResponse = {
  impact_summary: {
    sboms_with_recommendations: number;
    addressable_packages: number;
  };
  sboms: RecommendReportSbom[];
  packages: RecommendReportPackage[];
};

/**
 * Strip the `urn:uuid:` prefix. `GET /api/v3/sbom` returns ids in the
 * `urn:uuid:<uuid>` form, while `POST /api/v3/purl/recommend/report` echoes back
 * (and its `found_in` lists) the bare `<uuid>`. Normalizing both ends lets ids
 * compare equal regardless of which endpoint produced them.
 */
export function bareUuid(id: string): string {
  return id.replace(/^urn:uuid:/, "");
}

/**
 * POST `/api/v3/purl/recommend/report` for a set of SBOM ids and return the parsed
 * report. Ids are normalized to the bare-uuid form the `RecommendReportRequest`
 * schema documents (`format: uuid`), so callers can pass ids straight from
 * `getSbomIdByName` without worrying about the `urn:uuid:` prefix.
 */
export async function getRecommendReport(
  axios: AxiosInstance,
  sbomIds: string[],
): Promise<RecommendReportResponse> {
  const response = await axios.post<RecommendReportResponse>(
    recommendReportEndpoint,
    { sbom_ids: sbomIds.map(bareUuid) },
  );
  expect(response.status).toBe(200);
  return response.data;
}

/** Find the single report package for an upstream PURL, asserting it exists. */
export function expectReportPackage(
  report: RecommendReportResponse,
  purl: string,
): RecommendReportPackage {
  const matches = report.packages.filter((pkg) => pkg.purl === purl);
  expect(matches, `report package for ${purl}`).toHaveLength(1);
  return matches[0];
}

/** Minimal shape of `GET /api/v3/purl/{key}` (PurlDetails) used by these tests. */
type PurlDetails = {
  advisories: {
    status: {
      vulnerability: { identifier: string };
      fixed_versions: string[];
    }[];
  }[];
};

/** Minimal shape of `GET /api/v3/sbom/{id}/advisory` (SbomAdvisory[]) items. */
type SbomAdvisory = {
  // SbomStatus = VulnerabilityHead & {...}, so `identifier` is a flat field here,
  // unlike PurlStatus where it lives under `vulnerability.identifier`.
  status:
    | {
        identifier: string;
        fixed_versions: string[];
        packages: { purl: { purl: string }[] }[];
      }[]
    | null;
}[];

/**
 * Extract the version segment of a PURL (the part after the last `@`, before any
 * `?qualifiers`). Reimplemented inline rather than importing the UI's
 * `decomposePurl`, which depends on `packageurl-js` (a client-only dependency).
 */
export function purlVersion(purl: string): string {
  const withoutQualifiers = purl.split("?")[0];
  const at = withoutQualifiers.lastIndexOf("@");
  return at >= 0 ? withoutQualifiers.slice(at + 1) : purl;
}

/**
 * Compare two PURLs by their base (type + namespace + name + version), ignoring
 * qualifiers — the test-side equivalent of the UI's `purlBaseEquals`. Stripping
 * the `?qualifiers` suffix leaves exactly those four components for maven/rpm PURLs.
 */
function purlBaseEquals(a: string, b: string): boolean {
  return a.split("?")[0] === b.split("?")[0];
}

/**
 * Assert the recommended package PURLs returned for each input PURL, and
 * optionally the per-PURL vulnerability statuses carried by those recommendations.
 *
 * Comparing PURLs only is deliberate: the shared UI dataset contains additional
 * advisories and assessments for the same packages, so asserting advisory_id or
 * per-CVE status here would couple these tests to unrelated fixture metadata.
 *
 * When `expectedVulnerabilities` is supplied, for each listed input PURL the
 * recommendation entries' `vulnerabilities[].id` set must equal the expected CVE
 * set exactly, and every vulnerability must carry the status mapped to its CVE id
 * (e.g. `Fixed`/`NotAffected`/`Affected`). Remediations are intentionally not
 * asserted here: a recommendation can carry a status with an empty `remediations[]`.
 */
export async function expectRecommendations(
  axios: AxiosInstance,
  purls: string[],
  expected: Record<string, string[]>,
  expectedVulnerabilities?: Record<string, Record<string, string>>,
) {
  const response = await axios.post<{
    recommendations: Record<string, Recommendation[]>;
  }>(recommendationsEndpoint, { purls });

  expect(response.status).toBe(200);
  const actual = response.data.recommendations;
  expect(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());

  for (const [purl, packages] of Object.entries(expected)) {
    expect(actual[purl].map((entry) => entry.package).sort(), purl).toEqual(
      [...packages].sort(),
    );

    const expectedStatusById = expectedVulnerabilities?.[purl];
    if (!expectedStatusById) {
      continue;
    }

    const vulnerabilities = actual[purl].flatMap(
      (entry) => entry.vulnerabilities,
    );

    expect(
      [...new Set(vulnerabilities.map((v) => v.id))].sort(),
      `${purl}: recommended vulnerability ids`,
    ).toEqual(Object.keys(expectedStatusById).sort());

    for (const vulnerability of vulnerabilities) {
      expect(vulnerability.status, `${purl} ${vulnerability.id}: status`).toBe(
        expectedStatusById[vulnerability.id],
      );
    }
  }
}

/**
 * Fetch `GET /api/v3/purl/{key}` for a single fully-qualified PURL and return its
 * per-CVE fixed versions, merged across every advisory status whose
 * `vulnerability.identifier` matches (the exact data source the UI reads to build
 * the green "upstream upgrade" and blue vendor chips).
 *
 * The `{key}` path param accepts "an opaque identifier or a URL-encoded PURL
 * itself" (OpenAPI `getPurl`), so the PURL is encoded directly into the path with
 * `encodeURIComponent`. A `?q=<purl>` search is deliberately avoided: it would feed
 * the PURL through query-language operator parsing (`:`, `/`, `@`, `&`), which
 * `encodeURIComponent` does not escape.
 *
 * Returns an empty map when the backend has no record for the PURL — a valid but
 * absent PURL yields `200` with a `null` body (see the absent-PURL test).
 */
export async function getPurlAdvisoryFixedVersions(
  axios: AxiosInstance,
  purl: string,
): Promise<Map<string, Set<string>>> {
  const response = await axios.get<PurlDetails | null>(
    `/api/v3/purl/${encodeURIComponent(purl)}`,
  );
  expect(response.status).toBe(200);
  const byCve = new Map<string, Set<string>>();
  for (const advisory of response.data?.advisories ?? []) {
    for (const status of advisory.status ?? []) {
      const cve = status.vulnerability.identifier;
      const versions = byCve.get(cve) ?? new Set<string>();
      for (const version of status.fixed_versions ?? []) {
        versions.add(version);
      }
      byCve.set(cve, versions);
    }
  }
  return byCve;
}

/**
 * Resolve an SBOM's id by its metadata name via `GET /api/v3/sbom?q=name=<name>`.
 * Asserts exactly one match so a name collision (or a missing SBOM) fails loudly
 * instead of silently selecting the wrong record.
 */
export async function getSbomIdByName(
  axios: AxiosInstance,
  name: string,
): Promise<string> {
  const queryParams = new URLSearchParams();
  queryParams.append("q", `name=${name}`);

  const response = await axios.get<{ items: { id: string }[] }>(
    "/api/v3/sbom",
    {
      params: queryParams,
    },
  );

  expect(response.status).toBe(200);
  expect(response.data.items, `SBOM "${name}"`).toHaveLength(1);

  return response.data.items[0].id;
}

/**
 * Fetch `GET /api/v3/sbom/{id}/advisory` (the source of the remediation COUNT on
 * the collapsed CVE row — NOT the chips) and return, for every CVE that has at
 * least one fixed version, the set of affected package PURLs.
 *
 * Keyed by `status.identifier` (the flat `VulnerabilityHead` field on `SbomStatus`),
 * which is how the UI builds `fixedPurlsByCve`. The request omits `include_resolved`
 * to mirror the UI default (`useState(false)`).
 */
export async function getSbomAdvisoryFixedPurls(
  axios: AxiosInstance,
  sbomId: string,
): Promise<Map<string, Set<string>>> {
  const response = await axios.get<SbomAdvisory>(
    `/api/v3/sbom/${sbomId}/advisory`,
  );
  expect(response.status).toBe(200);
  const byCve = new Map<string, Set<string>>();
  for (const advisory of response.data) {
    for (const status of advisory.status ?? []) {
      if ((status.fixed_versions ?? []).length === 0) {
        continue;
      }
      const purls = byCve.get(status.identifier) ?? new Set<string>();
      for (const pkg of status.packages ?? []) {
        for (const purlEntry of pkg.purl ?? []) {
          purls.add(purlEntry.purl);
        }
      }
      byCve.set(status.identifier, purls);
    }
  }
  return byCve;
}

/**
 * Assert the per-CVE `fixed_versions` of a package PURL from
 * `GET /api/v3/purl/{key}`. For each CVE the caller lists, the merged fixed-version
 * set must match exactly (count + members).
 *
 * The comparison is scoped to the listed CVEs on purpose: spring-webmvc is a shared
 * package and `global.setup.ts` ingests the full advisory dataset, so other CVEs may
 * legitimately carry fixed versions. Asserting each listed CVE's set *exactly* still
 * guarantees no unexpected (e.g. `.rhlw-`) version leaks onto those CVEs, without
 * pinning the open-world set of all CVEs on the package.
 */
export async function expectPurlFixedVersions(
  axios: AxiosInstance,
  purl: string,
  expected: Record<string, string[]>,
) {
  const byCve = await getPurlAdvisoryFixedVersions(axios, purl);

  for (const [cve, versions] of Object.entries(expected)) {
    expect([...(byCve.get(cve) ?? [])].sort(), `${purl} ${cve}`).toEqual(
      [...versions].sort(),
    );
  }
}

/**
 * Compute and assert the "Remediations" chips the UI renders for a package PURL,
 * from the two live sources the UI combines, per CVE:
 *
 *   recs(cve)  = recommend(purl) entries whose vulnerabilities include `cve` with a
 *                `Fixed`/`NotAffected` status
 *   vendorVers = versions of those recommended vendor-rebuild PURLs
 *   fixedVers  = purl-advisory `fixed_versions` for `cve`
 *
 *   recs empty AND (fixedVers - vendorVers) empty -> no chips
 *   any rec whose base PURL equals `purl`         -> ["Applied"]  (short-circuit)
 *   otherwise                                     -> vendorVers ∪ (fixedVers - vendorVers)
 *
 * This mirrors `vulnerabilities-by-sbom.tsx` / `vulnerabilities-by-package.tsx`
 * exactly, so one keyed-by-PURL assertion covers both UI views.
 *
 * Only the CVEs the caller lists are compared (each one's chip set is matched
 * exactly), NOT that these are the only CVEs with chips — the full dataset is
 * ingested and spring-webmvc is shared, so other CVEs may legitimately have chips.
 */
export async function expectRemediationChips(
  axios: AxiosInstance,
  purl: string,
  expected: Record<string, string[] | "Applied">,
) {
  const response = await axios.post<{
    recommendations: Record<string, Recommendation[]>;
  }>(recommendationsEndpoint, { purls: [purl] });
  expect(response.status).toBe(200);
  const recommendations = response.data.recommendations[purl] ?? [];

  const fixedVersionsByCve = await getPurlAdvisoryFixedVersions(axios, purl);

  for (const [cve, expectedChips] of Object.entries(expected)) {
    const recsForCve = recommendations.filter((rec) =>
      rec.vulnerabilities.some(
        (v) =>
          v.id === cve && (v.status === "Fixed" || v.status === "NotAffected"),
      ),
    );
    const vendorVersions = recsForCve.map((rec) => purlVersion(rec.package));
    const vendorVersionSet = new Set(vendorVersions);
    const nonVendorVersions = [...(fixedVersionsByCve.get(cve) ?? [])].filter(
      (version) => !vendorVersionSet.has(version),
    );
    const isApplied = recsForCve.some((rec) =>
      purlBaseEquals(rec.package, purl),
    );

    let computed: string[];
    if (recsForCve.length === 0 && nonVendorVersions.length === 0) {
      computed = [];
    } else if (isApplied) {
      computed = ["Applied"];
    } else {
      computed = [...vendorVersions, ...nonVendorVersions];
    }

    const expectedArray =
      expectedChips === "Applied" ? ["Applied"] : expectedChips;
    expect([...computed].sort(), `${purl} ${cve}`).toEqual(
      [...expectedArray].sort(),
    );
  }
}
