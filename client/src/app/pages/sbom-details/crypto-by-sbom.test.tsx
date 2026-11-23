import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import type { HubRequestParams } from "@app/api/models";
import type { CryptoAlgorithm } from "@app/pages/crypto-list/crypto-context";

const mockAlgorithms: CryptoAlgorithm[] = [
  {
    node_id: "alg-1",
    name: "AES-256-GCM",
    asset_type: "algorithm",
    oid: null,
    properties: { primitive: "block-cipher" },
    policy_status: "compliant",
    packages_count: 0,
    sboms_count: 0,
  },
  {
    node_id: "alg-2",
    name: "RSA-2048",
    asset_type: "algorithm",
    oid: null,
    properties: { primitive: "pke", parameterSetIdentifier: "2048" },
    policy_status: "warning",
    packages_count: 0,
    sboms_count: 0,
  },
  {
    node_id: "alg-3",
    name: "SHA-256",
    asset_type: "algorithm",
    oid: null,
    properties: { primitive: "hash" },
    policy_status: "non_compliant",
    packages_count: 0,
    sboms_count: 0,
  },
];

const mockKeys: CryptoAlgorithm[] = [
  {
    node_id: "key-1",
    name: "private-key-rsa",
    asset_type: "related-crypto-material",
    oid: null,
    properties: { type: "private-key", size: 2048 },
    policy_status: "compliant",
    packages_count: 0,
    sboms_count: 0,
  },
  {
    node_id: "key-2",
    name: "public-key-ec",
    asset_type: "related-crypto-material",
    oid: null,
    properties: { type: "public-key" },
    policy_status: "compliant",
    packages_count: 0,
    sboms_count: 0,
  },
];

let mockAlgorithmResponse = mockAlgorithms;
let mockKeyResponse = mockKeys;
let returnEmpty = false;
const fetchCryptoBySbomSpy = vi.hoisted(() => vi.fn());

vi.mock("@app/queries/crypto", () => ({
  useFetchCryptoBySbom: (
    sbomId: string,
    params: unknown,
    assetType?: string,
  ) => {
    fetchCryptoBySbomSpy(sbomId, params, assetType);
    if (returnEmpty) {
      return {
        result: { data: [], total: 0, params: {} },
        isFetching: false,
        fetchError: null,
        refetch: vi.fn(),
      };
    }
    const data =
      assetType === "related-crypto-material"
        ? mockKeyResponse
        : mockAlgorithmResponse;
    return {
      result: { data, total: data.length, params: {} },
      isFetching: false,
      fetchError: null,
      refetch: vi.fn(),
    };
  },
}));

vi.mock("@app/components/LoadingWrapper", () => ({
  LoadingWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import { CryptoBySbom } from "./crypto-by-sbom";

describe("CryptoBySbom", () => {
  const getLastAlgorithmCall = () => {
    const calls = (
      fetchCryptoBySbomSpy.mock.calls as [
        string,
        HubRequestParams,
        string | undefined,
      ][]
    ).filter(
      ([, params, assetType]) =>
        assetType === "algorithm" && params.sort?.field === "name",
    );
    expect(calls.length).toBeGreaterThan(0);
    return calls[calls.length - 1];
  };

  const submitAlgorithmFilter = async (
    toolbar: HTMLElement,
    category: string,
    placeholder: string,
    value: string,
  ) => {
    await act(async () => {
      fireEvent.click(within(toolbar).getByLabelText("filtered-by"));
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("menuitem", { name: category }));
    });
    const input = within(toolbar).getByPlaceholderText(placeholder);
    expect(input).toBeVisible();
    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: "Enter" });
  };

  beforeEach(() => {
    mockAlgorithmResponse = mockAlgorithms;
    mockKeyResponse = mockKeys;
    returnEmpty = false;
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <CryptoBySbom sbomId="test-sbom-id" />
      </MemoryRouter>,
    );

  it("displays the PQC KPI card with correct values", () => {
    renderComponent();

    const card = screen.getByTestId("kpi-pqc");
    expect(card).toHaveTextContent("33%");
    expect(card).toHaveTextContent("1 of 3 inventoried algorithms");
  });

  it("displays the classical algorithm share KPI card with correct values", () => {
    renderComponent();

    const card = screen.getByTestId("kpi-classical");
    expect(card).toHaveTextContent("33%");
    expect(card).toHaveTextContent("1 of 3 algorithms use classical");
  });

  it("renders tabs with item counts", () => {
    renderComponent();

    expect(screen.getByText("Algorithms (3)")).toBeInTheDocument();
    expect(screen.getByText("Keys (2)")).toBeInTheDocument();
  });

  it("renders all 7 algorithm table columns", () => {
    renderComponent();

    expect(screen.getByText("Algorithm name")).toBeInTheDocument();
    expect(screen.getByText("Primitive")).toBeInTheDocument();
    expect(screen.getAllByText("Occurrences").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Policy")).toBeInTheDocument();
    expect(screen.getByText("Recommendation")).toBeInTheDocument();
    expect(screen.getAllByText("Usage").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Packages")).toBeInTheDocument();
  });

  it("renders algorithm data with compliance badges", () => {
    renderComponent();

    expect(screen.getByText("AES-256-GCM")).toBeInTheDocument();
    expect(screen.getByText("RSA-2048")).toBeInTheDocument();
    expect(screen.getByText("SHA-256")).toBeInTheDocument();
    expect(screen.getByText("Compliant")).toBeInTheDocument();
    expect(screen.getByText("Non-compliant")).toBeInTheDocument();
  });

  it.each([
    {
      description: "nested primitive and joined cryptoFunctions",
      algorithm: {
        properties: {
          primitive: "signature",
          cryptoFunctions: ["sign", "verify"],
        },
      },
    },
    {
      description: "canonical fields instead of conflicting fallbacks",
      algorithm: {
        primitive: "unsupported-primitive",
        properties: {
          primitive: "signature",
          cryptoFunctions: ["sign", "verify"],
          detectionContext: "unsupported-usage",
        },
      },
    },
  ])("displays $description in the Algorithms table", ({ algorithm }) => {
    mockAlgorithmResponse = [{ ...mockAlgorithms[0]!, ...algorithm }];
    renderComponent();

    const row = screen.getByText("AES-256-GCM").closest("tr")!;
    expect(row.querySelector('[data-label="Primitive"]')).toHaveTextContent(
      /^signature$/,
    );
    expect(row.querySelector('[data-label="Usage"]')).toHaveTextContent(
      /^sign, verify$/,
    );
    expect(within(row).queryByText("unsupported-primitive")).toBeNull();
    expect(within(row).queryByText("unsupported-usage")).toBeNull();
  });

  it.each([
    { description: "absent", properties: {} },
    { description: "empty", properties: { cryptoFunctions: [] } },
  ])(
    "displays placeholders instead of unsupported fallbacks when cryptoFunctions is $description",
    ({ properties }) => {
      mockAlgorithmResponse = [
        {
          ...mockAlgorithms[0]!,
          primitive: "unsupported-primitive",
          properties: {
            ...properties,
            detectionContext: "unsupported-usage",
          },
        },
      ];
      renderComponent();

      const row = screen.getByText("AES-256-GCM").closest("tr")!;
      expect(row.querySelector('[data-label="Primitive"]')).toHaveTextContent(
        /^--$/,
      );
      expect(row.querySelector('[data-label="Usage"]')).toHaveTextContent(
        /^--$/,
      );
      expect(within(row).queryByText("unsupported-primitive")).toBeNull();
      expect(within(row).queryByText("unsupported-usage")).toBeNull();
    },
  );

  it("renders parameter set subtitle when present", () => {
    renderComponent();

    expect(screen.getByText("Parameter set 2048")).toBeInTheDocument();
  });

  it("offers only name, Primitive, and Usage algorithm filter categories", async () => {
    renderComponent();
    const toolbar = screen.getByLabelText("Algorithms toolbar");

    expect(within(toolbar).queryByText(/policy|recommendation/i)).toBeNull();
    expect(
      within(toolbar).queryByPlaceholderText(/policy|recommendation/i),
    ).toBeNull();
    expect(
      within(toolbar).queryByLabelText(/policy|recommendation/i),
    ).toBeNull();
    expect(within(toolbar).queryByLabelText("Select")).toBeNull();
    expect(within(toolbar).getAllByRole("textbox")).toHaveLength(1);
    expect(
      within(toolbar).getByPlaceholderText("Search by algorithm name"),
    ).toBeVisible();

    await act(async () => {
      fireEvent.click(within(toolbar).getByLabelText("filtered-by"));
    });
    expect(screen.getAllByRole("menuitem").map((c) => c.textContent)).toEqual([
      "Search",
      "Primitive",
      "Usage",
    ]);
  });

  it.each([
    ["Primitive", "Search by primitive", "pke", "properties:primitive"],
    ["Usage", "Search by usage", "keygen", "properties:cryptoFunctions"],
  ])(
    "submits and clears the %s algorithm search",
    async (category, placeholder, value, field) => {
      renderComponent();
      const toolbar = screen.getByLabelText("Algorithms toolbar");

      fetchCryptoBySbomSpy.mockClear();
      await submitAlgorithmFilter(toolbar, category, placeholder, value);
      expect(getLastAlgorithmCall()).toEqual([
        "test-sbom-id",
        expect.objectContaining({
          filters: [{ field, operator: "~", value }],
          total: true,
        }),
        "algorithm",
      ]);

      fetchCryptoBySbomSpy.mockClear();
      const input = within(toolbar).getByPlaceholderText(placeholder);
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(getLastAlgorithmCall()).toEqual([
        "test-sbom-id",
        expect.not.objectContaining({ filters: expect.anything() }),
        "algorithm",
      ]);
    },
  );

  it("combines name, primitive, and usage filters for the SBOM and clears all", async () => {
    renderComponent();
    const toolbar = screen.getByLabelText("Algorithms toolbar");

    await submitAlgorithmFilter(
      toolbar,
      "Search",
      "Search by algorithm name",
      "rsa",
    );
    await submitAlgorithmFilter(
      toolbar,
      "Primitive",
      "Search by primitive",
      "pke",
    );
    fetchCryptoBySbomSpy.mockClear();
    await submitAlgorithmFilter(toolbar, "Usage", "Search by usage", "keygen");

    expect(getLastAlgorithmCall()).toEqual([
      "test-sbom-id",
      expect.objectContaining({
        filters: [
          { field: "", operator: "~", value: "rsa" },
          { field: "properties:primitive", operator: "~", value: "pke" },
          {
            field: "properties:cryptoFunctions",
            operator: "~",
            value: "keygen",
          },
        ],
        total: true,
      }),
      "algorithm",
    ]);

    fetchCryptoBySbomSpy.mockClear();
    fireEvent.click(
      within(toolbar).getByRole("button", { name: "Clear all filters" }),
    );
    expect(getLastAlgorithmCall()).toEqual([
      "test-sbom-id",
      expect.not.objectContaining({ filters: expect.anything() }),
      "algorithm",
    ]);
  });

  it("renders a standalone name search on the Keys tab", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("tab", { name: "Keys (2)" }));

    const toolbar = screen.getByLabelText("Keys toolbar");
    expect(
      within(toolbar).getByPlaceholderText("Search by key name"),
    ).toBeVisible();
    expect(within(toolbar).getAllByRole("textbox")).toHaveLength(1);
    expect(within(toolbar).queryByLabelText("filtered-by")).toBeNull();
    expect(within(toolbar).queryByRole("combobox")).toBeNull();
  });

  it("submits and clears the standalone Keys name search", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("tab", { name: "Keys (2)" }));
    const input = screen.getByPlaceholderText("Search by key name");

    fetchCryptoBySbomSpy.mockClear();
    fireEvent.change(input, { target: { value: "rsa" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(fetchCryptoBySbomSpy).toHaveBeenLastCalledWith(
      "test-sbom-id",
      expect.objectContaining({
        filters: [{ field: "name", operator: "~", value: "rsa" }],
        total: true,
      }),
      "related-crypto-material",
    );

    fetchCryptoBySbomSpy.mockClear();
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(fetchCryptoBySbomSpy).toHaveBeenLastCalledWith(
      "test-sbom-id",
      expect.not.objectContaining({ filters: expect.anything() }),
      "related-crypto-material",
    );
  });

  it("renders pagination controls", () => {
    renderComponent();

    const paginationElements = screen.getAllByLabelText(/pagination/i);
    expect(paginationElements.length).toBeGreaterThan(0);
  });

  it("shows empty state when no algorithms exist", () => {
    returnEmpty = true;
    renderComponent();

    expect(
      screen.getByText("No algorithms found for this SBOM."),
    ).toBeInTheDocument();
  });

  it.each([
    { description: "absent", properties: {} },
    { description: "empty", properties: { cryptoFunctions: [] } },
  ])(
    "preserves the Keys Usage detectionContext fallback when cryptoFunctions is $description",
    ({ properties }) => {
      mockKeyResponse = [
        {
          ...mockKeys[0]!,
          properties: {
            ...properties,
            detectionContext: "TLS key exchange",
          },
        },
      ];
      renderComponent();
      fireEvent.click(screen.getByRole("tab", { name: "Keys (1)" }));

      const row = screen.getByText("private-key-rsa").closest("tr")!;
      expect(row.querySelector('[data-label="Usage"]')).toHaveTextContent(
        /^TLS key exchange$/,
      );
    },
  );

  it("renders Size column in keys table with correct values", async () => {
    renderComponent();

    const keysTab = screen.getByText("Keys (2)");
    await act(() => keysTab.click());

    expect(screen.getByText("Size")).toBeInTheDocument();

    const findSizeCell = (rowLabel: string) => {
      const row = screen.getByText(rowLabel).closest("tr")!;
      return within(row)
        .getAllByRole("cell")
        .find((cell) => cell.getAttribute("data-label") === "Size")!;
    };

    expect(findSizeCell("private-key-rsa")).toHaveTextContent("2048 bits");
    expect(findSizeCell("public-key-ec")).toHaveTextContent("--");
  });
});
