import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import type { PurlSummary } from "@app/client";

const makePurlSummary = (purl: string, uuid: string): PurlSummary =>
  ({ purl, uuid }) as unknown as PurlSummary;

const makePurlEntry = (purl: string, uuid: string) => ({
  isOrphan: false as const,
  purlSummary: makePurlSummary(purl, uuid),
});

const mockVulnerability = {
  vulnerability: { identifier: "CVE-2024-12345" },
  vulnerabilityStatus: "affected" as const,
  advisories: new Map(),
  purls: new Map([
    [
      "purl-key-1",
      makePurlEntry("pkg:maven/org.apache.log4j/log4j-core@2.14.1", "uuid-1"),
    ],
  ]),
  opinionatedAdvisory: {
    advisory: null,
    score: null,
    extendedSeverity: "none" as const,
  },
};

const mockRecommendationsMap = new Map<
  string,
  { package: string; vulnerabilities: [] }[]
>();

vi.mock("@app/hooks/domain-controls/useVulnerabilitiesOfSbom", () => ({
  useVulnerabilitiesOfSbom: () => ({
    data: {
      vulnerabilities: [mockVulnerability],
      summary: {
        vulnerabilityStatus: {
          affected: { total: 1, severities: {} },
          not_affected: { total: 0, severities: {} },
          fixed: { total: 0, severities: {} },
          under_investigation: { total: 0, severities: {} },
        },
      },
    },
    advisories: [],
    isFetching: false,
    fetchError: null,
  }),
  buildVexByPurl: () => new Map(),
}));

vi.mock("@app/queries/sboms", () => ({
  useFetchSBOMById: () => ({
    sbom: { name: "test-sbom", described_by: [] },
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

vi.mock("@app/queries/trustifyInfo", () => ({
  useIsExploitIntelligenceEnabled: () => false,
}));

vi.mock("@app/hooks/domain-controls/useExploitIntelligenceOfSbom", () => ({
  useExploitIntelligenceOfSbom: () => ({
    stateMap: {},
    trackJob: vi.fn(),
  }),
}));

vi.mock("@app/queries/exploit-intelligence", () => ({
  useSubmitExploitAnalysisMutation: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("@app/components/SbomVulnerabilitiesDonutChart", () => ({
  SbomVulnerabilitiesDonutChart: () => null,
}));

vi.mock("@app/components/LoadingWrapper", () => ({
  LoadingWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import { VulnerabilitiesBySbom } from "./vulnerabilities-by-sbom";

describe("VulnerabilitiesBySbom remediation column", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <VulnerabilitiesBySbom sbomId="test-sbom-id" />
      </MemoryRouter>,
    );

  beforeEach(() => {
    mockRecommendationsMap.clear();
  });

  /** Verifies the "Remediation" column header renders in the vulnerabilities table. */
  it("renders the Remediation column header", () => {
    renderComponent();
    expect(screen.getByText("Remediation")).toBeInTheDocument();
  });

  /** Verifies that a vulnerability row with recommendations renders the recommended version Label. */
  it("renders recommended version Label when recommendations exist for an affected package", () => {
    // Given a recommendation for the affected package PURL
    const affectedPurl = "pkg:maven/org.apache.log4j/log4j-core@2.14.1";
    mockRecommendationsMap.set(affectedPurl, [
      {
        package: "pkg:maven/org.apache.log4j/log4j-core@2.17.2",
        vulnerabilities: [],
      },
    ]);

    // When rendering the vulnerabilities table
    renderComponent();

    // Then the recommended version is shown as a Label
    expect(screen.getByText("2.17.2")).toBeInTheDocument();
  });

  /** Verifies that a vulnerability row with no recommendations renders no remediation content. */
  it("renders no remediation content when no recommendations exist", () => {
    renderComponent();
    expect(screen.queryByText("Applied")).not.toBeInTheDocument();
    expect(screen.queryByText("2.17.2")).not.toBeInTheDocument();
  });
});
