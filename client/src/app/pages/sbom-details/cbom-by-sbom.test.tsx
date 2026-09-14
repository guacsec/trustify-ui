import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import type { CryptoAlgorithm } from "@app/pages/crypto-list/crypto-context";

const mockCryptoAssets: CryptoAlgorithm[] = [
  {
    node_id: "alg-1",
    name: "AES-256-GCM",
    asset_type: "algorithm",
    oid: "2.16.840.1.101.3.4.1.46",
    properties: {
      algorithmProperties: { primitive: "block-cipher", mode: "GCM" },
    },
    policy_status: "Compliant",
  },
  {
    node_id: "alg-2",
    name: "RSA-2048",
    asset_type: "algorithm",
    oid: null,
    properties: {
      algorithmProperties: { primitive: "signature" },
    },
    policy_status: "Warning",
  },
];

let mockData: CryptoAlgorithm[] = mockCryptoAssets;

vi.mock("@app/queries/crypto", () => ({
  useFetchCryptoBySbom: () => ({
    result: {
      data: mockData,
      total: mockData.length,
      params: {},
    },
    isFetching: false,
    fetchError: null,
    refetch: vi.fn(),
  }),
}));

import { CbomBySbom } from "./cbom-by-sbom";

describe("CbomBySbom", () => {
  const renderComponent = (sbomId = "test-sbom-id") =>
    render(
      <MemoryRouter>
        <CbomBySbom sbomId={sbomId} />
      </MemoryRouter>,
    );

  /** Verifies that all six table columns are rendered. */
  it("renders all table columns", () => {
    renderComponent();

    expect(screen.getByText("Asset Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Primitive")).toBeInTheDocument();
    expect(screen.getByText("OID")).toBeInTheDocument();
    expect(screen.getByText("Policy Status")).toBeInTheDocument();
    expect(screen.getByText("Properties")).toBeInTheDocument();
  });

  /** Verifies that crypto asset rows render with correct names and types. */
  it("renders crypto asset data rows", () => {
    renderComponent();

    expect(screen.getByText("AES-256-GCM")).toBeInTheDocument();
    expect(screen.getByText("RSA-2048")).toBeInTheDocument();
    expect(screen.getAllByText("algorithm").length).toBeGreaterThanOrEqual(2);
  });

  /** Verifies that the OID column displays the value when present and "--" when null. */
  it("renders OID values with fallback for null", () => {
    renderComponent();

    expect(screen.getByText("2.16.840.1.101.3.4.1.46")).toBeInTheDocument();
    expect(screen.getAllByText("--").length).toBeGreaterThanOrEqual(1);
  });

  /** Verifies that policy status badges render via IconedStatus. */
  it("renders policy status badges", () => {
    renderComponent();

    expect(screen.getByText("Compliant")).toBeInTheDocument();
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  /** Verifies that the primitive column shows extracted values. */
  it("renders primitive values from properties", () => {
    renderComponent();

    expect(screen.getByText("block-cipher")).toBeInTheDocument();
    expect(screen.getByText("signature")).toBeInTheDocument();
  });

  /** Verifies that the empty state message is shown when no crypto assets exist. */
  it("shows empty state when SBOM has no crypto assets", () => {
    mockData = [];
    renderComponent();

    expect(
      screen.getByText("No cryptographic assets found for this SBOM."),
    ).toBeInTheDocument();
    mockData = mockCryptoAssets;
  });

  /** Verifies that pagination controls are rendered. */
  it("renders pagination controls", () => {
    renderComponent();

    const paginationElements = screen.getAllByLabelText(/pagination/i);
    expect(paginationElements.length).toBeGreaterThan(0);
  });
});
