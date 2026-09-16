import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import type { SbomPackage } from "@app/client";

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
  recommended_purl: overrides.recommended_purl ?? null,
});

const packageWithRecommendation = makePackage({
  id: "pkg-1",
  name: "log4j-core",
  version: "2.14.1",
  recommended_purl:
    "pkg:maven/org.apache.logging.log4j/log4j-core@2.17.2?type=jar",
});

const packageWithoutRecommendation = makePackage({
  id: "pkg-2",
  name: "commons-lang3",
  version: "3.12.0",
  recommended_purl: null,
});

vi.mock("@app/queries/packages", () => ({
  useFetchPackagesBySbomId: () => ({
    result: {
      data: [packageWithRecommendation, packageWithoutRecommendation],
      total: 2,
    },
    isFetching: false,
    fetchError: null,
  }),
}));

vi.mock("@app/queries/sboms", () => ({
  useFetchSbomsLicenseIds: () => ({ licenseIds: [] }),
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

  /** Verifies the "Recommended version" column header is rendered in the table. */
  it("renders the Recommended version column header", () => {
    renderComponent();
    expect(screen.getByText("Recommended version")).toBeInTheDocument();
  });

  /** Verifies that a package row with recommended_purl renders the extracted version. */
  it("renders the recommended version string for a package with recommended_purl", () => {
    renderComponent();
    // decomposePurl extracts version "2.17.2" from the recommended PURL
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that a package row with recommended_purl: null renders an em-dash. */
  it("renders an em-dash for a package without recommended_purl", () => {
    renderComponent();
    // em-dash is "—"; there may be multiple (one per null recommendation row)
    const emDashes = screen.getAllByText("—");
    expect(emDashes.length).toBeGreaterThanOrEqual(1);
  });
});
