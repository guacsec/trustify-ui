import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

vi.mock("./crypto-table", () => ({
  CryptoTable: () => <div data-testid="crypto-table" />,
}));

vi.mock("./crypto-toolbar", () => ({
  CryptoToolbar: () => <div data-testid="crypto-toolbar" />,
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
  /** Verifies that the page title renders. */
  it("renders the page title", () => {
    render(
      <MemoryRouter>
        <CryptoList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Cryptography")).toBeInTheDocument();
  });

  /** Verifies that the PQC algorithms KPI card shows the correct percentage and count. */
  it("displays the PQC algorithms KPI card with correct values", () => {
    render(
      <MemoryRouter>
        <CryptoList />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("kpi-pqc-algorithms");
    expect(card).toHaveTextContent("41%");
    expect(card).toHaveTextContent("9 of 22 algorithms");
    expect(card).toHaveTextContent("Algorithms meeting PQC");
  });

  /** Verifies that the classical algorithm share KPI card shows the correct percentage and count. */
  it("displays the classical algorithm share KPI card with correct values", () => {
    render(
      <MemoryRouter>
        <CryptoList />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("kpi-classical-algorithms");
    expect(card).toHaveTextContent("59%");
    expect(card).toHaveTextContent("13 of 22 algorithms");
    expect(card).toHaveTextContent("Classical algorithm share");
  });

  /** Verifies that the SBOMs meeting PQC KPI card shows the correct percentage and count. */
  it("displays the SBOMs meeting PQC KPI card with correct values", () => {
    render(
      <MemoryRouter>
        <CryptoList />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("kpi-pqc-sboms");
    expect(card).toHaveTextContent("50%");
    expect(card).toHaveTextContent("5 of 10 SBOMs");
    expect(card).toHaveTextContent("SBOMs meeting PQC");
  });

  /** Verifies that the Algorithms and Keys tabs render. */
  it("renders Algorithms and Keys tabs", () => {
    render(
      <MemoryRouter>
        <CryptoList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Algorithms")).toBeInTheDocument();
    expect(screen.getByText("Keys")).toBeInTheDocument();
  });
});
