import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

const mockPurl = "pkg:maven/org.apache.log4j/log4j-core@2.14.1";
const mockPackages = [{ purl: mockPurl, uuid: "pkg-uuid-1" }];

const mockRecommendationsMap = new Map<
  string,
  { package: string; vulnerabilities: [] }[]
>();

vi.mock("@app/queries/packages", () => ({
  useFetchPackages: () => ({
    result: { data: mockPackages, total: 1, params: {} },
    isFetching: false,
    fetchError: null,
    refetch: vi.fn(),
  }),
}));

vi.mock("@app/queries/licenses", () => ({
  useFetchLicenses: () => ({ result: { data: [] } }),
}));

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

vi.mock("./components/PackageVulnerabilities", () => ({
  PackageVulnerabilities: () => null,
}));

vi.mock("./components/PackageLicences", () => ({
  PackageLicenses: () => null,
}));

import { PackageSearchProvider } from "./package-provider";
import { PackageTable } from "./package-table";

describe("PackageTable remediation column", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <PackageSearchProvider>
          <PackageTable />
        </PackageSearchProvider>
      </MemoryRouter>,
    );

  beforeEach(() => {
    mockRecommendationsMap.clear();
  });

  /** Verifies the "Remediation" column header is rendered in the global packages table. */
  it("renders the Remediation column header", () => {
    renderComponent();
    expect(screen.getByText("Remediation")).toBeInTheDocument();
  });

  /** Verifies that a package row with a recommendation renders the recommended version as a Label. */
  it("renders recommended version Label when recommendations exist", () => {
    // Given a recommendation for the package PURL
    mockRecommendationsMap.set(mockPurl, [
      {
        package: "pkg:maven/org.apache.log4j/log4j-core@2.17.2",
        vulnerabilities: [],
      },
    ]);

    // When rendering the packages table
    renderComponent();

    // Then the recommended version is shown
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that a package row with no recommendations renders no remediation content. */
  it("renders no remediation content when no recommendations exist", () => {
    renderComponent();
    expect(screen.queryByText("Applied")).not.toBeInTheDocument();
    expect(screen.queryByText("2.17.2")).not.toBeInTheDocument();
  });
});
