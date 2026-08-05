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

import { useFetchVulnerabilities } from "@app/queries/vulnerabilities";

import { VulnerabilityAttentionSection } from "./WhatNeedsAttention";

vi.mock("@app/queries/vulnerabilities");

const mockedUseFetchVulnerabilities = useFetchVulnerabilities as MockedFunction<
  typeof useFetchVulnerabilities
>;

type VulnFetchResult = ReturnType<typeof useFetchVulnerabilities>;

const emptyFetchResult: VulnFetchResult = {
  isFetching: false,
  result: { data: [], total: 0, params: {} },
  fetchError: null,
  refetch: vi.fn(),
};

const renderVulnerabilityAttentionSection = () =>
  render(
    <MemoryRouter>
      <VulnerabilityAttentionSection />
    </MemoryRouter>,
  );

describe("VulnerabilityAttentionSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /** Verifies the section card has a stable data-testid locator. */
  it("renders with section-level data-testid", () => {
    mockedUseFetchVulnerabilities.mockReturnValue(emptyFetchResult);

    renderVulnerabilityAttentionSection();

    expect(screen.getByTestId("home-attention-section")).toBeInTheDocument();
  });

  /** Verifies the section heading renders correctly. */
  it("renders section heading", () => {
    mockedUseFetchVulnerabilities.mockReturnValue(emptyFetchResult);

    renderVulnerabilityAttentionSection();

    expect(
      screen.getByRole("heading", {
        name: /Highest vulnerabilities \(last 7 days\)/i,
      }),
    ).toBeInTheDocument();
  });

  /** Verifies vulnerability items render with indexed locators, identifiers, and severity. */
  it("renders vulnerability items with indexed locators when data exists", () => {
    mockedUseFetchVulnerabilities.mockReturnValue({
      ...emptyFetchResult,
      result: {
        data: [
          {
            identifier: "CVE-2026-0001",
            base_score: { severity: "critical", score: 9.8 },
          },
          {
            identifier: "CVE-2026-0002",
            base_score: { severity: "high", score: 8.1 },
          },
        ] as VulnFetchResult["result"]["data"],
        total: 2,
        params: {},
      },
    });

    renderVulnerabilityAttentionSection();

    // Verify each card has an indexed data-testid
    expect(screen.getByTestId("home-attention-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("home-attention-item-1")).toBeInTheDocument();

    // Verify each card has a severity locator
    expect(screen.getByTestId("home-attention-severity-0")).toBeInTheDocument();
    expect(screen.getByTestId("home-attention-severity-1")).toBeInTheDocument();

    // Verify each card has an identifier locator
    expect(screen.getByTestId("home-attention-id-0")).toBeInTheDocument();
    expect(screen.getByTestId("home-attention-id-1")).toBeInTheDocument();

    // Verify identifiers render as links with correct text
    expect(
      screen.getByRole("link", { name: "CVE-2026-0001" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "CVE-2026-0002" }),
    ).toBeInTheDocument();
  });

  /** Verifies the empty state renders when no vulnerabilities are returned. */
  it("renders empty state when no vulnerabilities returned", () => {
    mockedUseFetchVulnerabilities.mockReturnValue(emptyFetchResult);

    renderVulnerabilityAttentionSection();

    expect(
      screen.getByText("No vulnerabilities in the last 7 days"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View all vulnerabilities/i }),
    ).toBeInTheDocument();
  });
});
