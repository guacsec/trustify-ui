import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import type { CryptoAlgorithm } from "@app/pages/crypto-list/crypto-context";

const mockCryptoAssets: CryptoAlgorithm[] = [
  {
    node_id: "algo-1",
    name: "AES-256-GCM",
    asset_type: "algorithm",
    oid: "2.16.840.1.101.3.4.1.46",
    properties: {
      primitive: "block-cipher",
      cryptoFunctions: ["encrypt", "decrypt"],
    },
    policy_status: "Compliant",
  },
  {
    node_id: "algo-2",
    name: "RSA-2048",
    asset_type: "algorithm",
    oid: null,
    properties: {
      primitive: "pke",
      parameterSetIdentifier: "2048",
    },
    policy_status: "NonCompliant",
  },
  {
    node_id: "cert-1",
    name: "TLS-Certificate",
    asset_type: "certificate",
    oid: null,
    properties: {},
    policy_status: "Warning",
  },
];

let returnEmpty = false;

vi.mock("@app/queries/crypto", () => ({
  useFetchCryptoBySbom: () => ({
    result: {
      data: returnEmpty ? [] : mockCryptoAssets,
      total: returnEmpty ? 0 : mockCryptoAssets.length,
      params: {},
    },
    isFetching: false,
    fetchError: null,
    refetch: vi.fn(),
  }),
}));

import { CbomBySbom } from "./cbom-by-sbom";

describe("CbomBySbom", () => {
  beforeEach(() => {
    returnEmpty = false;
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <CbomBySbom sbomId="test-sbom-id" />
      </MemoryRouter>,
    );

  /** Verifies that all 6 table column headers are rendered. */
  it("renders all table column headers", () => {
    renderComponent();

    expect(screen.getByText("Asset Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Primitive")).toBeInTheDocument();
    expect(screen.getByText("OID")).toBeInTheDocument();
    expect(screen.getByText("Policy Status")).toBeInTheDocument();
    expect(screen.getByText("Properties")).toBeInTheDocument();
  });

  /** Verifies that crypto asset names are rendered in the table. */
  it("renders crypto asset data rows", () => {
    renderComponent();

    expect(screen.getByText("AES-256-GCM")).toBeInTheDocument();
    expect(screen.getByText("RSA-2048")).toBeInTheDocument();
    expect(screen.getByText("TLS-Certificate")).toBeInTheDocument();
  });

  /** Verifies that OID is displayed when present and "--" shown as fallback. */
  it("displays OID when present and fallback when absent", () => {
    renderComponent();

    expect(screen.getByText("2.16.840.1.101.3.4.1.46")).toBeInTheDocument();
    expect(screen.getAllByText("--").length).toBeGreaterThanOrEqual(1);
  });

  /** Verifies that policy status badges render with correct compliance text. */
  it("renders policy status badges", () => {
    renderComponent();

    expect(screen.getByText("Compliant")).toBeInTheDocument();
    expect(screen.getByText("Non-compliant")).toBeInTheDocument();
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  /** Verifies that the primitive field is extracted from properties. */
  it("displays primitive values from properties", () => {
    renderComponent();

    expect(screen.getByText("block-cipher")).toBeInTheDocument();
    expect(screen.getByText("pke")).toBeInTheDocument();
  });

  /** Verifies that pagination controls are rendered. */
  it("renders pagination controls", () => {
    renderComponent();

    const paginationElements = screen.getAllByLabelText(/pagination/i);
    expect(paginationElements.length).toBeGreaterThan(0);
  });

  /** Verifies that an empty state message is shown when no crypto assets exist. */
  it("shows empty state when SBOM has no crypto assets", () => {
    returnEmpty = true;
    renderComponent();

    expect(
      screen.getByText("No cryptographic assets found for this SBOM."),
    ).toBeInTheDocument();
  });
});
