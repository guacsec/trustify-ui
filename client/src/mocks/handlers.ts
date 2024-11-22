import { http, HttpResponse } from "msw";
import getAdvisories from "@mocks/data/advisory/list.json";
import getPurls from "@mocks/data/purl/list.json";
import getSboms from "@mocks/data/sbom/list.json";
import getVulnerabilities from "@mocks/data/vulnerability/list.json";

// DATA IMPORTS

import cve202245787 from "@mocks/data/vulnerability/details/CVE-2022-45787.json";
import cve20230044 from "@mocks/data/vulnerability/details/CVE-2023-0044.json";
import cve20230481 from "@mocks/data/vulnerability/details/CVE-2023-0481.json";
import cve20230482 from "@mocks/data/vulnerability/details/CVE-2023-0482.json";
import cve20231370 from "@mocks/data/vulnerability/details/CVE-2023-1370.json";
import cve20231436 from "@mocks/data/vulnerability/details/CVE-2023-1436.json";
import cve202320861 from "@mocks/data/vulnerability/details/CVE-2023-20861.json";
import cve202324815 from "@mocks/data/vulnerability/details/CVE-2023-24815.json";
import cve202324998 from "@mocks/data/vulnerability/details/CVE-2023-24998.json";
import cve202326464 from "@mocks/data/vulnerability/details/CVE-2023-26464.json";

import sbom1 from "@mocks/data/sbom/details/urn%3Auuid%3A01932ff3-0fc4-7bf2-8201-5d5e9dc471bd.json";
import sbom2 from "@mocks/data/sbom/details/urn%3Auuid%3A01932ff3-0fe1-7ca0-8ba6-c26de2fe81d9.json";

import purl1 from "@mocks/data/purl/details/2e05fb3a-cda9-5e54-96b2-d8c7ea390f8d.json";
import purl2 from "@mocks/data/purl/details/e0b74cfd-e0b0-512b-8814-947f868bc50e.json";
import purl3 from "@mocks/data/purl/details/f4f6b460-82e5-59f0-a7f6-da5f226a9b24.json";
import purl4 from "@mocks/data/purl/details/f357b0cc-75d5-532e-b7d9-2233f6f752c8.json";

import imgAvatar from "@app/images/avatar.svg";
import { VulnerabilityHead } from "@app/client";

export const cveDetails: { [identifier: string]: Partial<VulnerabilityHead> } =
  {
    "CVE-2022-45787": cve202245787,
    "CVE-2023-0044": cve20230044,
    "CVE-2023-0481": cve20230481,
    "CVE-2023-0482": cve20230482,
    "CVE-2023-1370": cve20231370,
    "CVE-2023-1436": cve20231436,
    "CVE-2023-20861": cve202320861,
    "CVE-2023-24815": cve202324815,
    "CVE-2023-24998": cve202324998,
    "CVE-2023-26464": cve202326464,
  };

export const sbomDetails: { [identifier: string]: any } = {
  "urn:uuid:01932ff3-0fc4-7bf2-8201-5d5e9dc471bd": sbom1,
  "urn:uuid:01932ff3-0fe1-7ca0-8ba6-c26de2fe81d9": sbom2,
};

export const purlDetails: { [identifier: string]: any } = {
  "2e05fb3a-cda9-5e54-96b2-d8c7ea390f8d": purl1,
  "e0b74cfd-e0b0-512b-8814-947f868bc50e": purl2,
  "f4f6b460-82e5-59f0-a7f6-da5f226a9b24": purl3,
  "f357b0cc-75d5-532e-b7d9-2233f6f752c8": purl4,
};

/**
 * MSW HANDLERS
 * There should be one array of handlers for each group of endpoints
 */

// ADVISORY HANDLERS

const advisoryHandlers = [
  // list advisories
  http.get("/api/v1/advisory", ({ request }) => {
    return HttpResponse.json(getAdvisories);
  }),

  // upload a new advisory
  http.post("/api/v1/advisory", () => {}),

  // replace the labels of an advisory
  http.put("/api/v1/advisory/:id/label", () => {}),

  // modify existing labels of an advisory
  http.patch("/api/v1/advisory/:id/label", () => {}),

  // get an advisory
  http.get("/api/v1/advisory/:key", () => {}),

  // delete an advisory
  http.delete("/api/v1/advisory/:key", () => {}),

  // download an advisory document
  http.get("/api/v1/advisory/:key/download", () => {}),
];

// AI HANDLERS

const aiHandlers = [
  http.get("/api/v1/ai/flags", () => {}),
  http.get("/api/v1/ai/tools", () => {}),
  http.post("/api/v1/ai/tools/:name", () => {}),
  http.post("/api/v1/ai/completions", () => {}),
];

// ANALYSIS HANDLERS

const analysisHandlers = [
  http.get("/api/v1/analysis/dep", () => {}),
  http.get("/api/v1/analysis/dep/:key", () => {}),
  http.get("/api/v1/analysis/root-component", () => {}),
  http.get("/api/v1/analysis/root-component/:key", () => {}),
  http.get("/api/v1/analysis/status", () => {}),
];

// ASSET HANDLERS

const assetHandlers = [
  http.get("/branding/images/masthead-logo.svg", () => {
    return new HttpResponse(imgAvatar);
  }),
];

// DATASET HANDLERS

const datasetHandlers = [
  // upload a new dataset
  http.post("/api/v1/dataset", () => {}),
];

// IMPORTER HANDLERS

const importerHandlers = [
  // list importer configurations
  http.get("/api/v1/importer", () => {}),

  // get an importer configuration
  http.get("/api/v1/importer/:name", () => {}),

  // update an existing importer configuration
  http.put("/api/v1/importer/:name", () => {}),

  // create an importer configuration
  http.post("/api/v1/importer/:name", () => {}),

  // delete an importer configuration
  http.delete("/api/v1/importer/:name", () => {}),

  // update an importer configuration
  http.patch("/api/v1/importer/:name", () => {}),

  // update an existing importer configuration
  http.put("/api/v1/importer/:name/enabled", () => {}),

  // force an importer to run as soon as possible
  http.post("/api/v1/importer/:name/force", () => {}),

  // get reports for an importer
  http.get("/api/v1/importer/:name/report", () => {}),
];

// LICENSE HANDLERS

const licenseHandlers = [
  http.get("/api/v1/license", () => {}),

  // license details
  http.get("/api/v1/license/:uuid", () => {}),

  // retrieve purls covered by a license
  http.get("/api/v1/license/:uuid/purl", () => {}),
];

// SPDX LICENSE HANDLERS

const spdxLicenseHandlers = [
  // list spdx licenses
  http.get("/api/v1/license/spdx/license", () => {}),

  // spdx license details
  http.get("/api/v1/license/spdx/license/:id", () => {}),
];

// ORGANIZATION HANDLERS

const organizationHandlers = [
  // list organizations
  http.get("/api/v1/organization", () => {}),

  // organization details
  http.get("/api/v1/organization/:id", () => {}),
];

// PRODUCT HANDLERS

const productHandlers = [
  http.get("/api/v1/product", () => {}),
  http.get("/api/v1/product/:id", () => {}),
  http.delete("/api/v1/product/:id", () => {}),
];

// PURL HANDLERS

const purlHandlers = [
  // list fully qualified purls
  http.get("/api/v1/purl", ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(getPurls);
  }),

  // retrieve versioned pURL details of a type
  http.get("/api/v1/purl/type/:type/:namespace_and_name@:version", () => {}),

  // retrieve details of a fully qualified purl
  http.get("/api/v1/purl/:key", ({ params }) => {
    const { key } = params;

    if (!key) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = purlDetails[key as string];
    if (!data) {
      return new HttpResponse("Purl not found", { status: 404 });
    }
    return HttpResponse.json(data);
  }),
];

// BASE PURL HANDLERS

const basePurlHandlers = [
  // list base versionless pURLs
  http.get("/api/v1/purl/base", () => {}),

  // retrieve details for a base versionless pURL
  http.get("/api/v1/purl/base/:key", () => {}),
];

// PURL TYPE HANDLERS

const purlTypeHandlers = [
  // list known pURL types
  http.get("/api/v1/purl/type", () => {}),

  // retrieve details about a pURL type
  http.get("/api/v1/purl/type/:type", () => {}),

  // retrieve base pURL details of a type
  http.get("/api/v1/purl/type/:type/:namespace_and_name", () => {}),
];

// VERSIONED PURL HANDLERS

const versionedPurlHandlers = [
  // retrieve details of a versioned, non-qualified pURL
  http.get("/api/v1/purl/version/{key}", () => {}),
];

// SBOM HANDLERS

const sbomHandlers = [
  // get ALL SBOMs
  http.get("/api/v1/sbom", () => {
    return HttpResponse.json(getSboms);
  }),

  // upload a new SBOM
  http.post("/api/v1/sbom", () => {}),

  // find all SBOMs containing the provided package
  // NOTE: The package can be provided either via a PURL or
  // using the ID of a package as returned by other APIs, but not both.
  http.get("/api/v1/sbom/by-package", () => {
    return HttpResponse.json(getSboms);
  }),

  // count all SBOMs containing the provided packages
  http.get("/api/v1/sbom/count-by-package", () => {
    return HttpResponse.json(getSboms);
  }),

  // get an SBOM by its ID
  http.get("/api/v1/sbom/:id", ({ params }) => {
    const { id } = params;

    if (!id) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = sbomDetails[id as string];
    if (!data) {
      return new HttpResponse("SBOM not found", { status: 404 });
    }
    return HttpResponse.json(data);
  }),

  http.delete("/api/v1/sbom/:id", () => {}),

  http.get("/api/v1/sbom/:id/advisory", () => {}),

  // replace labels of an SBOM
  http.put("/api/v1/sbom/:id/label", () => {}),

  // modify existing labels of an SBOM
  http.patch("/api/v1/sbom/:id/label", () => {}),

  // search for packages of an SBOM
  http.get("/api/v1/sbom/:id/packages", () => {}),

  // search for related packages in an SBOM
  http.get("/api/v1/sbom/:id/related", () => {}),

  http.get("/api/v1/sbom/:key/download", () => {}),
];

// USER PREFERENCES HANDLERS

const userPreferencesHandlers = [
  http.get("/api/v1/userPreference/:key", () => {}),
  http.put("/api/v1/userPreference/:key", () => {}),
  http.delete("/api/v1/userPreference/:key", () => {}),
];

// VULNERABILITY HANDLERS

const vulnerabilityHandlers = [
  http.get("/api/v1/vulnerability", ({ request }) => {
    // construct a URL instance out of the request intercepted
    const url = new URL(request.url);

    // Read the "id" URL query parameter using the "URLSearchParams" API.
    // Given "/vulnerability?id=1", "vulnerabilityId" will equal "1".
    // const vulnerabilityId = url.searchParams.get("id");
    const limit = url.searchParams.get("limit");

    return HttpResponse.json(getVulnerabilities);
  }),

  http.get("/api/v1/vulnerability/:id", ({ params }) => {
    const { id } = params;

    if (!id) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = cveDetails[id as string];
    if (!data) {
      return new HttpResponse("CVE not found", { status: 404 });
    }
    return HttpResponse.json(data);
  }),

  http.delete("/api/v1/vulnerability/:id", ({ params }) => {
    const { id } = params;

    if (!id) {
      return new HttpResponse(null, { status: 404 });
    }
  }),
];

// WEAKNESS HANDLERS

const weaknessHandlers = [
  // list weaknesses
  http.get("/api/v1/weakness", () => {}),

  http.get("/api/v1/weakness/:id", () => {}),
];

// named imports
export {
  advisoryHandlers,
  aiHandlers,
  analysisHandlers,
  assetHandlers,
  basePurlHandlers,
  datasetHandlers,
  importerHandlers,
  licenseHandlers,
  organizationHandlers,
  productHandlers,
  purlHandlers,
  purlTypeHandlers,
  sbomHandlers,
  spdxLicenseHandlers,
  userPreferencesHandlers,
  versionedPurlHandlers,
  vulnerabilityHandlers,
  weaknessHandlers,
};

// combined handlers
export const handlers = [
  ...advisoryHandlers,
  ...aiHandlers,
  ...analysisHandlers,
  ...assetHandlers,
  ...basePurlHandlers,
  ...datasetHandlers,
  ...importerHandlers,
  ...licenseHandlers,
  ...organizationHandlers,
  ...productHandlers,
  ...purlHandlers,
  ...purlTypeHandlers,
  ...sbomHandlers,
  ...spdxLicenseHandlers,
  ...userPreferencesHandlers,
  ...versionedPurlHandlers,
  ...vulnerabilityHandlers,
  ...weaknessHandlers,
];
