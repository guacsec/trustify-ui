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
  { package: string; vulnerabilities: { id: string; remediations: [] }[] }[]
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

  /** Verifies the "Remediations" column header is rendered. */
  it("renders the Remediations column header", () => {
    renderComponent();
    expect(screen.getByText("Remediations")).toBeInTheDocument();
  });

  /** Verifies that a package with CVE-scoped recommendations shows the CVE count. */
  it("renders remediation count when CVE-scoped recommendations exist", () => {
    // Given a CVE-scoped recommendation for the package
    const purl = "pkg:maven/org.apache.log4j/log4j-core@2.14.1";
    mockRecommendationsMap.set(purl, [
      {
        package: "pkg:maven/org.apache.log4j/log4j-core@2.17.2",
        vulnerabilities: [{ id: "CVE-2021-44228", remediations: [] }],
      },
    ]);

    // When rendering the SBOM packages table
    renderComponent();

    // Then the count of CVEs with remediations is shown
    expect(screen.getByText("1 Remediation")).toBeInTheDocument();
  });

  /** Verifies that a package with no recommendations renders "0 Remediations". */
  it("renders 0 Remediations when no recommendations exist", () => {
    renderComponent();
    // packageWithPurl has no recommendations → 0 Remediations
    // packageWithoutPurl has no purl → 0 Remediations (fallback)
    expect(screen.getAllByText("0 Remediations").length).toBeGreaterThan(0);
  });
});
