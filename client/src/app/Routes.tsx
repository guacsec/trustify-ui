import { lazy } from "react";
import { createBrowserRouter, useParams } from "react-router-dom";

import { LazyRouteElement } from "@app/components/LazyRouteElement";

import App from "./App";

const Home = lazy(() => import("./pages/home"));

// Advisory
const AdvisoryList = lazy(() => import("./pages/advisory-list"));
const AdvisoryUpload = lazy(() => import("./pages/advisory-upload"));
const AdvisoryDetails = lazy(() => import("./pages/advisory-details"));

// Vulnerability
const VulnerabilityList = lazy(() => import("./pages/vulnerability-list"));
const VulnerabilityDetails = lazy(
  () => import("./pages/vulnerability-details"),
);

// Package
const PackageList = lazy(() => import("./pages/package-list"));
const PackageDetails = lazy(() => import("./pages/package-details"));

// SBOM
const SBOMList = lazy(() => import("./pages/sbom-list"));
const SBOMUpload = lazy(() => import("./pages/sbom-upload"));
const SBOMScan = lazy(() => import("./pages/sbom-scan"));
const SBOMDetails = lazy(() => import("./pages/sbom-details"));

// Others
const Search = lazy(() => import("./pages/search"));
const ImporterList = lazy(() => import("./pages/importer-list"));
const LicenseList = lazy(() => import("./pages/license-list"));

export enum PathParam {
  ADVISORY_ID = "advisoryId",
  VULNERABILITY_ID = "vulnerabilityId",
  SBOM_ID = "sbomId",
  PACKAGE_ID = "packageId",
  LICENSE_NAME = "licenseName",
}

export const Paths = {
  advisories: "/advisories",
  advisoryUpload: "/advisories/upload",
  advisoryDetails: `/advisories/:${PathParam.ADVISORY_ID}`,
  vulnerabilities: "/vulnerabilities",
  vulnerabilityDetails: `/vulnerabilities/:${PathParam.VULNERABILITY_ID}`,
  sboms: "/sboms",
  sbomUpload: "/sboms/upload",
  sbomScan: "/sboms/scan",
  sbomDetails: `/sboms/:${PathParam.SBOM_ID}`,
  packages: "/packages",
  packageDetails: `/packages/:${PathParam.PACKAGE_ID}`,
  search: "/search",
  importers: "/importers",
  licenses: "/licenses",
} as const;

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LazyRouteElement identifier="home" component={<Home />} />,
      },
      {
        path: Paths.advisories,
        element: (
          <LazyRouteElement
            identifier="advisory-list"
            component={<AdvisoryList />}
          />
        ),
      },
      {
        path: Paths.advisoryDetails,
        element: (
          <LazyRouteElement
            identifier="advisory-details"
            component={<AdvisoryDetails />}
          />
        ),
      },
      {
        path: Paths.advisoryUpload,
        element: (
          <LazyRouteElement
            identifier="advisory-upload"
            component={<AdvisoryUpload />}
          />
        ),
      },
      {
        path: Paths.importers,
        element: (
          <LazyRouteElement
            identifier="importer-list"
            component={<ImporterList />}
          />
        ),
      },
      {
        path: Paths.licenses,
        element: (
          <LazyRouteElement
            identifier="license-list"
            component={<LicenseList />}
          />
        ),
      },
      {
        path: Paths.packages,
        element: (
          <LazyRouteElement
            identifier="package-list"
            component={<PackageList />}
          />
        ),
      },
      {
        path: Paths.packageDetails,
        element: (
          <LazyRouteElement
            identifier="package-details"
            component={<PackageDetails />}
          />
        ),
      },
      {
        path: Paths.sboms,
        element: (
          <LazyRouteElement identifier="sbom-list" component={<SBOMList />} />
        ),
      },
      {
        path: Paths.sbomDetails,
        element: (
          <LazyRouteElement
            identifier="sbom-details"
            component={<SBOMDetails />}
          />
        ),
      },
      {
        path: Paths.sbomScan,
        element: (
          <LazyRouteElement identifier="sbom-scan" component={<SBOMScan />} />
        ),
      },
      {
        path: Paths.sbomUpload,
        element: (
          <LazyRouteElement
            identifier="sbom-upload"
            component={<SBOMUpload />}
          />
        ),
      },
      {
        path: Paths.search,
        element: (
          <LazyRouteElement identifier="search" component={<Search />} />
        ),
      },
      {
        path: Paths.vulnerabilities,
        element: (
          <LazyRouteElement
            identifier="vulnerability-list"
            component={<VulnerabilityList />}
          />
        ),
      },
      {
        path: Paths.vulnerabilityDetails,
        element: (
          <LazyRouteElement
            identifier="vulnerability-details"
            component={<VulnerabilityDetails />}
          />
        ),
      },
    ],
  },
]);

export const useRouteParams = (pathParam: PathParam) => {
  const params = useParams();
  const value = params[pathParam];
  if (value === undefined) {
    throw new Error(
      `ASSERTION FAILURE: required path parameter not set: ${pathParam}`,
    );
  }
  return value;
};
