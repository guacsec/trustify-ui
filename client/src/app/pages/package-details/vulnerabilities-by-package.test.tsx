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
  relatedSboms: [],
};

const mockRecommendationsMap = new Map<
  string,
  { package: string; vulnerabilities: { id: string; remediations: [] }[] }[]
>();

let mockVulnerabilityList = [mockVulnerability];

vi.mock("@app/queries/packages", () => ({
  useFetchPackageById: () => ({
    pkg: { purl: mockPackagePurl, uuid: "pkg-uuid-1" },
    isFetching: false,
    fetchError: null,
  }),
}));

vi.mock("@app/hooks/domain-controls/useVulnerabilitiesOfPackage", () => ({
  useVulnerabilitiesOfPackageId: () => ({
    data: { vulnerabilities: mockVulnerabilityList },
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
    mockVulnerabilityList = [mockVulnerability];
  });

  /** Verifies the "Remediations" column header renders in the package detail vulnerabilities tab. */
  it("renders the Remediation column header", () => {
    renderComponent();
    expect(screen.getByText("Remediations")).toBeInTheDocument();
  });

  /** Verifies that a vulnerability row renders the recommended version Label when a recommendation exists for the package PURL. */
  it("renders recommended version Label when recommendations exist for the package", () => {
    // Given a recommendation for the affected package PURL that fixes the mock CVE
    mockRecommendationsMap.set(mockPackagePurl, [
      {
        package: "pkg:maven/org.apache.log4j/log4j-core@2.17.2",
        vulnerabilities: [{ id: "CVE-2021-44228", remediations: [] }],
      },
    ]);

    // When rendering the vulnerabilities tab
    renderComponent();

    // Then the recommended version is shown as a Label
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that a vulnerability row renders a blue Applied badge when the recommended PURL matches the package's current PURL. */
  it("renders Applied badge when recommendation matches the current package PURL", () => {
    // Given a recommendation whose PURL base-equals the package's current PURL and fixes the mock CVE
    mockRecommendationsMap.set(mockPackagePurl, [
      {
        package: mockPackagePurl,
        vulnerabilities: [{ id: "CVE-2021-44228", remediations: [] }],
      },
    ]);

    // When rendering the vulnerabilities tab
    renderComponent();

    // Then the blue Applied badge is shown
    expect(screen.getByText("Applied")).toBeInTheDocument();
  });

  /** Verifies that a recommendation with no CVE scope (empty vulnerabilities array) shows on all rows. */
  it("renders recommended version Label when recommendation has no CVE scope", () => {
    // Given a recommendation with an empty vulnerabilities array (general upgrade, not CVE-specific)
    mockRecommendationsMap.set(mockPackagePurl, [
      {
        package: "pkg:maven/org.apache.log4j/log4j-core@2.17.2",
        vulnerabilities: [],
      },
    ]);

    // When rendering the vulnerabilities tab
    renderComponent();

    // Then the recommended version is still shown (not filtered out)
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that fixed_versions from related advisories appear as version-upgrade Labels when no vendor recommendation exists. */
  it("renders fixed version Label from advisory when no vendor recommendation exists", () => {
    // Given a vulnerability row with a related advisory that has fixed_versions for the CVE
    mockVulnerabilityList = [
      {
        ...mockVulnerability,
        relatedSboms: [
          {
            advisory: {
              status: [
                {
                  vulnerability: { identifier: "CVE-2021-44228" },
                  fixed_versions: ["2.17.2"],
                },
              ],
            },
          },
        ],
      },
    ];

    // When rendering the vulnerabilities tab
    renderComponent();

    // Then the fixed version is shown (advisory-sourced upgrade, not filtered out)
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that a vulnerability row renders no remediation content when no recommendations exist. */
  it("renders no remediation content when no recommendations exist", () => {
    renderComponent();
    expect(screen.queryByText("Applied")).not.toBeInTheDocument();
    expect(screen.queryByText("2.17.2")).not.toBeInTheDocument();
  });
});
