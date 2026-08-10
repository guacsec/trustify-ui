import { type Page } from "@playwright/test";

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
  "cve-from-2024": {
    cve: {
      disabled: true,
      period: "5m",
      description: "CVE List V5 (starting 2024)",
      source: "https://github.com/CVEProject/cvelistV5",
      startYear: 2024,
    },
  },
};

const getOidcAccessToken = (page: Page): Promise<string | null> =>
  page.evaluate(() => {
    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key = window.sessionStorage.key(i);
      if (key?.startsWith("oidc.user:")) {
        const raw = window.sessionStorage.getItem(key);
        if (raw) {
          try {
            return (
              (JSON.parse(raw) as { access_token?: string }).access_token ??
              null
            );
          } catch {
            return null;
          }
        }
      }
    }
    return null;
  });

/**
 * Creates the importer via the API if it does not already exist (HTTP 404),
 * then reloads the page so the table reflects the new entry.
 */
export const ensureImporterExists = async (
  page: Page,
  importerName: string,
  importerConfig: ImporterConfig,
) => {
  const accessToken = await getOidcAccessToken(page);

  const baseUrl = process.env.TRUSTIFY_UI_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/api/v3/importer/${encodeURIComponent(importerName)}`;
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const checkResponse = await page.request.get(url, { headers });
  if (checkResponse.status() === 404) {
    await page.request.post(url, {
      headers: { ...headers, "Content-Type": "application/json" },
      data: importerConfig,
    });
    await page.reload();
    await page.waitForTimeout(1000);
  }
};

/**
 * Ensures every entry in IMPORTER_CONFIGS exists, creating missing ones in a
 * single pass. Must be called after the page has navigated to the app so that
 * sessionStorage is accessible. Reloads once if any importer was created.
 */
export const ensureAllImportersExist = async (page: Page): Promise<void> => {
  const accessToken = await getOidcAccessToken(page);
  const baseUrl = process.env.TRUSTIFY_UI_URL ?? "http://localhost:3000";
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let anyCreated = false;
  for (const [importerName, importerConfig] of Object.entries(
    IMPORTER_CONFIGS,
  )) {
    const url = `${baseUrl}/api/v3/importer/${encodeURIComponent(importerName)}`;
    const checkResponse = await page.request.get(url, { headers });
    if (checkResponse.status() === 404) {
      await page.request.post(url, {
        headers: { ...headers, "Content-Type": "application/json" },
        data: importerConfig,
      });
      anyCreated = true;
    }
  }

  if (anyCreated) {
    await page.reload();
    await page.waitForTimeout(1000);
  }
};
