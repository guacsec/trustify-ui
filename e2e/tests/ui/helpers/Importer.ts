import { type Page } from "@playwright/test";
import { AUTH_REQUIRED, TRUSTIFY_API_URL } from "../../common/constants";
import { getAccessToken } from "./Auth";

export interface ImporterConfig {
  [importerType: string]: object;
}

export const IMPORTER_CONFIGS: Record<string, ImporterConfig> = {
  "clearly-defined-curations": {
    clearlyDefinedCuration: {
      disabled: true,
      period: "1h",
      description: "Community-curated ClearlyDefined licenses",
      source: "https://github.com/clearlydefined/curated-data",
      types: [
        "pypi",
        "deb",
        "npm",
        "pod",
        "nuget",
        "crate",
        "git",
        "composer",
        "go",
        "maven",
        "gem",
      ],
    },
  },
  importer1: { cwe: { disabled: true, period: "1d" } },
  importer2: { cwe: { disabled: true, period: "1d" } },
  importer3: { cwe: { disabled: true, period: "1d" } },
  importer4: { cwe: { disabled: true, period: "1d" } },
  importer5: { cwe: { disabled: true, period: "1d" } },
  cve: {
    cve: {
      disabled: true,
      period: "5m",
      description: "CVE List V5",
      source: "https://github.com/CVEProject/cvelistV5",
    },
  },
  "cve-from-2024": {
    cve: {
      disabled: true,
      period: "5m",
      description: "CVE List V5 (starting 2024)",
      source: "https://github.com/CVEProject/cvelistV5",
      startYear: 2024,
    },
  },
  "fake-importer-disable": {
    osv: {
      disabled: true,
      period: "1day",
      description: "GitHub Advisory Database",
      source: "https://github.com/matejnesuta/sample_advisories",
      path: "advisories",
    },
  },
  "fake-importer-enable": {
    osv: {
      disabled: true,
      period: "1day",
      description: "GitHub Advisory Database",
      source: "https://github.com/matejnesuta/sample_advisories",
      path: "advisories",
    },
  },
  "fake-importer-run": {
    osv: {
      disabled: true,
      period: "1day",
      description: "GitHub Advisory Database",
      source: "https://github.com/matejnesuta/sample_advisories",
      path: "advisories",
    },
  },
};

export const ensureAllImportersExist = async (page: Page): Promise<void> => {
  // Ensure the app is loaded so sessionStorage (and the OIDC token) is
  // accessible. When auth is disabled the page may still be on about:blank,
  // where page.evaluate() throws a SecurityError.
  await page.goto("/importers");

  // Use the API base URL (which may differ from the UI host on downstream
  // deployments) so importer creation targets the real API and not the UI's
  // SPA fallback, which would answer /api/v3/... with a 200 HTML page.
  const baseUrl = TRUSTIFY_API_URL.replace(/\/+$/, "");
  const accessToken = await getAccessToken(page);
  if (AUTH_REQUIRED === "true" && !accessToken) {
    throw new Error(
      "ensureAllImportersExist: auth is required but no OIDC access token was " +
        "found in sessionStorage. Ensure login() ran and succeeded before this.",
    );
  }
  const headers: Record<string, string> = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  for (const [importerName, importerConfig] of Object.entries(
    IMPORTER_CONFIGS,
  )) {
    const url = `${baseUrl}/api/v3/importer/${encodeURIComponent(importerName)}`;
    const checkResponse = await page.request.get(url, { headers });
    const checkStatus = checkResponse.status();

    if (checkStatus === 200) {
      continue; // Already exists.
    }
    if (checkStatus !== 404) {
      throw new Error(
        `ensureAllImportersExist: unexpected status ${checkStatus} checking ` +
          `"${importerName}" at ${url}. Body: ${await checkResponse.text()}`,
      );
    }

    const createResponse = await page.request.post(url, {
      headers: { ...headers, "Content-Type": "application/json" },
      data: importerConfig,
    });
    // 409 means another parallel worker created it between our GET and POST;
    // the importer now exists, which is exactly what we want.
    if (!createResponse.ok() && createResponse.status() !== 409) {
      throw new Error(
        `ensureAllImportersExist: failed to create "${importerName}" ` +
          `(status ${createResponse.status()}). Body: ${await createResponse.text()}`,
      );
    }
  }
  // Importers are created server-side via the API above. Each scenario's first
  // step navigates to the Importers page (fetching fresh data), so there is no
  // need to reload/re-render here.
};
