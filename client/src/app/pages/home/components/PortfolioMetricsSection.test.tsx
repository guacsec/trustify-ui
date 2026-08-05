import { render, screen } from "@testing-library/react";
import {
  type MockedFunction,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { MemoryRouter } from "react-router-dom";

import { useFetchAdvisories } from "@app/queries/advisories";
import { useFetchSBOMs } from "@app/queries/sboms";

import { PortfolioMetricsSection } from "./PortfolioMetricsSection";

vi.mock("@app/queries/sboms");
vi.mock("@app/queries/advisories");

const mockedUseFetchSBOMs = useFetchSBOMs as MockedFunction<
  typeof useFetchSBOMs
>;
const mockedUseFetchAdvisories = useFetchAdvisories as MockedFunction<
  typeof useFetchAdvisories
>;

type SbomFetchResult = ReturnType<typeof useFetchSBOMs>;
type AdvisoryFetchResult = ReturnType<typeof useFetchAdvisories>;

const emptySbomResult: SbomFetchResult = {
  isFetching: false,
  result: { data: [], total: 0, params: {} },
  fetchError: null,
  refetch: vi.fn(),
};

const emptyAdvisoryResult: AdvisoryFetchResult = {
  isFetching: false,
  result: { data: [], total: 0, params: {} },
  fetchError: null,
  refetch: vi.fn(),
};

const renderPortfolioMetricsSection = () =>
  render(
    <MemoryRouter>
      <PortfolioMetricsSection />
    </MemoryRouter>,
  );

describe("PortfolioMetricsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /** Verifies the section card has a stable data-testid locator. */
  it("renders with section-level data-testid", () => {
    mockedUseFetchSBOMs.mockReturnValue(emptySbomResult);
    mockedUseFetchAdvisories.mockReturnValue(emptyAdvisoryResult);

    renderPortfolioMetricsSection();

    expect(screen.getByTestId("home-metrics-section")).toBeInTheDocument();
  });

  /** Verifies the section renders description list terms for metrics. */
  it("renders metric labels", () => {
    mockedUseFetchSBOMs.mockReturnValue(emptySbomResult);
    mockedUseFetchAdvisories.mockReturnValue(emptyAdvisoryResult);

    renderPortfolioMetricsSection();

    expect(screen.getByText("Total SBOMs")).toBeInTheDocument();
    expect(screen.getByText("Total Advisories")).toBeInTheDocument();
    expect(screen.getByText("Last SBOM ingested")).toBeInTheDocument();
    expect(screen.getByText("Last Advisory ingested")).toBeInTheDocument();
  });

  /** Verifies total SBOM and advisory counts render from mocked data. */
  it("renders total SBOM and advisory counts", () => {
    mockedUseFetchSBOMs.mockReturnValue({
      ...emptySbomResult,
      result: { data: [], total: 42, params: {} },
    });
    mockedUseFetchAdvisories.mockReturnValue({
      ...emptyAdvisoryResult,
      result: { data: [], total: 17, params: {} },
    });

    renderPortfolioMetricsSection();

    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("17")).toBeInTheDocument();
  });

  /** Verifies latest SBOM name renders as a link when data is present. */
  it("renders latest SBOM name as a link", () => {
    mockedUseFetchSBOMs.mockReturnValue({
      ...emptySbomResult,
      result: {
        data: [
          {
            id: "sbom-1",
            name: "my-sbom.json",
            ingested: "2026-01-15T10:00:00Z",
          },
        ] as SbomFetchResult["result"]["data"],
        total: 1,
        params: {},
      },
    });
    mockedUseFetchAdvisories.mockReturnValue(emptyAdvisoryResult);

    renderPortfolioMetricsSection();

    const sbomLink = screen.getByRole("link", { name: "my-sbom.json" });
    expect(sbomLink).toBeInTheDocument();
  });

  /** Verifies latest advisory document_id renders as a link when data is present. */
  it("renders latest advisory name as a link", () => {
    mockedUseFetchSBOMs.mockReturnValue(emptySbomResult);
    mockedUseFetchAdvisories.mockReturnValue({
      ...emptyAdvisoryResult,
      result: {
        data: [
          {
            uuid: "adv-1",
            document_id: "RHSA-2026:0001",
            ingested: "2026-01-15T10:00:00Z",
          },
        ] as AdvisoryFetchResult["result"]["data"],
        total: 1,
        params: {},
      },
    });

    renderPortfolioMetricsSection();

    const advisoryLink = screen.getByRole("link", {
      name: "RHSA-2026:0001",
    });
    expect(advisoryLink).toBeInTheDocument();
  });
});
