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

export enum PathParam {
  ADVISORY_ID = "advisoryId",
  VULNERABILITY_ID = "vulnerabilityId",
  SBOM_ID = "sbomId",
  PACKAGE_ID = "packageId",
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
} as const;

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LazyRouteElement component={<Home />} /> },
      {
        path: Paths.advisories,
        element: <LazyRouteElement component={<AdvisoryList />} />,
      },
      {
        path: Paths.advisoryUpload,
        element: <LazyRouteElement component={<AdvisoryUpload />} />,
      },
      {
        path: Paths.advisoryDetails,
        element: <LazyRouteElement component={<AdvisoryDetails />} />,
      },
      {
        path: Paths.vulnerabilities,
        element: <LazyRouteElement component={<VulnerabilityList />} />,
      },
      {
        path: Paths.vulnerabilityDetails,
        element: <LazyRouteElement component={<VulnerabilityDetails />} />,
      },
      {
        path: Paths.packages,
        element: <LazyRouteElement component={<PackageList />} />,
      },
      {
        path: Paths.packageDetails,
        element: <LazyRouteElement component={<PackageDetails />} />,
      },
      {
        path: Paths.sboms,
        element: <LazyRouteElement component={<SBOMList />} />,
      },
      {
        path: Paths.sbomUpload,
        element: <LazyRouteElement component={<SBOMUpload />} />,
      },
      {
        path: Paths.sbomScan,
        element: <LazyRouteElement component={<SBOMScan />} />,
      },
      {
        path: Paths.sbomDetails,
        element: <LazyRouteElement component={<SBOMDetails />} />,
      },
      {
        path: Paths.importers,
        element: <LazyRouteElement component={<ImporterList />} />,
      },
      {
        path: Paths.search,
        element: <LazyRouteElement component={<Search />} />,
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
