import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import type { PurlSummary, SbomPackage } from "@app/client";

const makePurl = (purl: string, uuid: string): PurlSummary =>
  ({ purl, uuid }) as unknown as PurlSummary;

const makePackage = (
  overrides: Partial<SbomPackage> & { id: string; name: string },
): SbomPackage => ({
  id: overrides.id,
  name: overrides.name,
  purl: overrides.purl ?? [],
  cpe: overrides.cpe ?? [],
  licenses: overrides.licenses ?? [],
  licenses_ref_mapping: overrides.licenses_ref_mapping ?? [],
  version: overrides.version ?? null,
  group: overrides.group ?? null,
});

const packageWithPurl = makePackage({
  id: "pkg-1",
  name: "log4j-core",
  version: "2.14.1",
  purl: [makePurl("pkg:maven/org.apache.log4j/log4j-core@2.14.1", "uuid-1")],
});

const packageWithoutPurl = makePackage({
  id: "pkg-2",
  name: "commons-lang3",
  version: "3.12.0",
  purl: [],
});

vi.mock("@app/queries/packages", () => ({
  useFetchPackagesBySbomId: () => ({
    result: {
      data: [packageWithPurl, packageWithoutPurl],
      total: 2,
    },
    isFetching: false,
    fetchError: null,
  }),
}));

vi.mock("@app/queries/sboms", () => ({
  useFetchSbomsLicenseIds: () => ({ licenseIds: [] }),
}));

const mockRecommendationsMap = new Map<
  string,
  { package: string; vulnerabilities: [] }[]
>();

vi.mock("@app/queries/recommendations", () => ({
  useFetchRecommendations: () => ({
    recommendationsMap: mockRecommendationsMap,
    isFetching: false,
    fetchError: null,
  }),
}));

vi.mock("@app/components/WithPackage", () => ({
  WithPackage: ({ children }: { children: (pkg: null) => React.ReactNode }) =>
    children(null),
}));

vi.mock("../package-list/components/PackageVulnerabilities", () => ({
  PackageVulnerabilities: () => null,
}));

vi.mock("@app/components/VulnerabilityGallery", () => ({
  VulnerabilityGallery: () => null,
}));

import { PackagesBySbom } from "./packages-by-sbom";

describe("PackagesBySbom", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <PackagesBySbom sbomId="test-sbom-id" />
      </MemoryRouter>,
    );

  beforeEach(() => {
    mockRecommendationsMap.clear();
  });

  /** Verifies the "Remediation" column header is rendered. */
  it("renders the Remediation column header", () => {
    renderComponent();
    expect(screen.getByText("Remediation")).toBeInTheDocument();
  });

  /** Verifies that a package with a recommendation renders the recommended version as a green Label. */
  it("renders recommended version Label when recommendations exist", () => {
    const purl = "pkg:maven/org.apache.log4j/log4j-core@2.14.1";
    mockRecommendationsMap.set(purl, [
      {
        package: "pkg:maven/org.apache.log4j/log4j-core@2.17.2",
        vulnerabilities: [],
      },
    ]);
    renderComponent();
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that a package with no recommendations and no fixed versions renders nothing in the remediation cell. */
  it("renders no remediation content when no recommendations exist", () => {
    renderComponent();
    expect(screen.queryByText("Applied")).not.toBeInTheDocument();
    expect(screen.queryByText("2.17.2")).not.toBeInTheDocument();
  });
});
