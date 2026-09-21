import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

const mockPackagePurl = "pkg:maven/org.apache.log4j/log4j-core@2.14.1";

const mockVulnerability = {
  vulnerability: {
    identifier: "CVE-2021-44228",
    average_severity: "critical" as const,
    average_score: 10,
    published: "2021-12-10T00:00:00Z",
  },
  vulnerabilityStatus: "affected" as const,
};

const mockRecommendationsMap = new Map<
  string,
  { package: string; vulnerabilities: [] }[]
>();

vi.mock("@app/queries/packages", () => ({
  useFetchPackageById: () => ({
    pkg: { purl: mockPackagePurl, uuid: "pkg-uuid-1" },
    isFetching: false,
    fetchError: null,
  }),
}));

vi.mock("@app/hooks/domain-controls/useVulnerabilitiesOfPackage", () => ({
  useVulnerabilitiesOfPackageId: () => ({
    data: { vulnerabilities: [mockVulnerability] },
    isFetching: false,
    fetchError: null,
  }),
}));

vi.mock("@app/queries/recommendations", () => ({
  useFetchRecommendations: () => ({
    recommendationsMap: mockRecommendationsMap,
    isFetching: false,
    fetchError: null,
  }),
}));

import { VulnerabilitiesByPackage } from "./vulnerabilities-by-package";

describe("VulnerabilitiesByPackage remediation column", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <VulnerabilitiesByPackage packageId="pkg-uuid-1" />
      </MemoryRouter>,
    );

  beforeEach(() => {
    mockRecommendationsMap.clear();
  });

  /** Verifies the "Remediation" column header renders in the package detail vulnerabilities tab. */
  it("renders the Remediation column header", () => {
    renderComponent();
    expect(screen.getByText("Remediation")).toBeInTheDocument();
  });

  /** Verifies that a vulnerability row renders the recommended version Label when a recommendation exists for the package PURL. */
  it("renders recommended version Label when recommendations exist for the package", () => {
    // Given a recommendation for the affected package PURL
    mockRecommendationsMap.set(mockPackagePurl, [
      {
        package: "pkg:maven/org.apache.log4j/log4j-core@2.17.2",
        vulnerabilities: [],
      },
    ]);

    // When rendering the vulnerabilities tab
    renderComponent();

    // Then the recommended version is shown as a Label
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that a vulnerability row renders no remediation content when no recommendations exist. */
  it("renders no remediation content when no recommendations exist", () => {
    renderComponent();
    expect(screen.queryByText("Applied")).not.toBeInTheDocument();
    expect(screen.queryByText("2.17.2")).not.toBeInTheDocument();
  });
});
