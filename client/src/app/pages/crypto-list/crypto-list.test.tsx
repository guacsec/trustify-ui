import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import type { CryptoPolicySummary } from "./crypto-context";

const mockSummary: CryptoPolicySummary = {
  total: 22,
  compliant: 9,
  warning: 5,
  non_compliant: 8,
};

vi.mock("@app/queries/crypto", () => ({
  useFetchCryptoPolicySummary: () => ({
    result: mockSummary,
    isFetching: false,
    fetchError: null,
    refetch: vi.fn(),
  }),
}));

vi.mock("./crypto-provider", () => ({
  CryptoSearchProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@app/components/DocumentMetadata", () => ({
  DocumentMetadata: () => null,
}));

vi.mock("@app/components/LoadingWrapper", () => ({
  LoadingWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import { CryptoList } from "./crypto-list";

/** Verifies that the page renders the title and all three KPI cards. */
describe("CryptoList", () => {
  /** Verifies the page title is rendered. */
  it("renders the page title", () => {
    render(<CryptoList />);

    expect(screen.getByText("Cryptography")).toBeInTheDocument();
  });

  /** Verifies that the compliant algorithms KPI card shows the correct percentage and count. */
  it("displays the compliant algorithms KPI card with correct values", () => {
    render(<CryptoList />);

    const card = screen.getByTestId("kpi-compliant");
    expect(card).toHaveTextContent("41%");
    expect(card).toHaveTextContent("9 of 22 algorithms");
    expect(card).toHaveTextContent("Compliant algorithms");
  });

  /** Verifies that the warning algorithms KPI card shows the correct percentage and count. */
  it("displays the warning algorithms KPI card with correct values", () => {
    render(<CryptoList />);

    const card = screen.getByTestId("kpi-warning");
    expect(card).toHaveTextContent("23%");
    expect(card).toHaveTextContent("5 of 22 algorithms");
    expect(card).toHaveTextContent("Algorithms with warnings");
  });

  /** Verifies that the non-compliant algorithms KPI card shows the correct percentage and count. */
  it("displays the non-compliant algorithms KPI card with correct values", () => {
    render(<CryptoList />);

    const card = screen.getByTestId("kpi-non-compliant");
    expect(card).toHaveTextContent("36%");
    expect(card).toHaveTextContent("8 of 22 algorithms");
    expect(card).toHaveTextContent("Non-compliant algorithms");
  });
});
