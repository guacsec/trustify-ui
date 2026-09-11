import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import type { CryptoSummary } from "./crypto-context";

const mockSummary: CryptoSummary = {
  pqcAlgorithms: 9,
  classicalAlgorithms: 13,
  totalAlgorithms: 22,
  pqcSboms: 5,
  totalSboms: 10,
};

vi.mock("@app/queries/crypto", () => ({
  useFetchCryptoSummary: () => ({
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
  it("renders the page title", () => {
    render(<CryptoList />);

    expect(screen.getByText("Cryptography")).toBeInTheDocument();
  });

  /** Verifies that the PQC algorithms KPI card shows the correct percentage and count. */
  it("displays the PQC algorithms KPI card with correct values", () => {
    render(<CryptoList />);

    // Then
    const card = screen.getByTestId("kpi-pqc-algorithms");
    expect(card).toHaveTextContent("41%");
    expect(card).toHaveTextContent("9 of 22 algorithms");
    expect(card).toHaveTextContent("Algorithms meeting PQC");
  });

  /** Verifies that the classical algorithm share KPI card shows the correct percentage and count. */
  it("displays the classical algorithm share KPI card with correct values", () => {
    render(<CryptoList />);

    const card = screen.getByTestId("kpi-classical-algorithms");
    expect(card).toHaveTextContent("59%");
    expect(card).toHaveTextContent("13 of 22 algorithms");
    expect(card).toHaveTextContent("Classical algorithm share");
  });

  /** Verifies that the SBOMs meeting PQC KPI card shows the correct percentage and count. */
  it("displays the SBOMs meeting PQC KPI card with correct values", () => {
    render(<CryptoList />);

    const card = screen.getByTestId("kpi-pqc-sboms");
    expect(card).toHaveTextContent("50%");
    expect(card).toHaveTextContent("5 of 10 SBOMs");
    expect(card).toHaveTextContent("SBOMs meeting PQC");
  });
});
