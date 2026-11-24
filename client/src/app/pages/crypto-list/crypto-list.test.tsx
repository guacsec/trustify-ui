import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import type { HubRequestParams } from "@app/api/models";

import type { CryptoAlgorithm, CryptoPolicySummary } from "./crypto-context";

const mockSummary: CryptoPolicySummary = {
  total: 22,
  compliant: 9,
  warning: 5,
  non_compliant: 8,
};

const mockAlgorithms: CryptoAlgorithm[] = [
  {
    node_id: "alg-1",
    name: "AES-256-GCM",
    asset_type: "algorithm",
    oid: null,
    properties: { primitive: "pke", cryptoFunctions: ["keygen"] },
    policy_status: "compliant",
    packages_count: 0,
    sboms_count: 0,
  },
  {
    node_id: "alg-2",
    name: "RSA-2048",
    asset_type: "algorithm",
    oid: null,
    properties: {
      primitive: "signature",
      parameterSetIdentifier: "2048",
    },
    policy_status: "non_compliant",
    packages_count: 0,
    sboms_count: 0,
  },
];

const mockKeys: CryptoAlgorithm[] = [
  {
    node_id: "key-1",
    name: "my-rsa-key",
    asset_type: "related-crypto-material",
    oid: null,
    properties: { type: "private-key" },
    policy_status: "compliant",
    packages_count: 0,
    sboms_count: 0,
  },
];

let mockAlgorithmResponse = mockAlgorithms;
const fetchCryptoAlgorithmsSpy = vi.hoisted(() => vi.fn());

vi.mock("@app/queries/crypto", () => ({
  useFetchCryptoPolicySummary: () => ({
    result: mockSummary,
    isFetching: false,
    fetchError: null,
    refetch: vi.fn(),
  }),
  useFetchCryptoAlgorithms: (
    params: unknown,
    _disable: boolean,
    assetType?: string,
  ) => {
    fetchCryptoAlgorithmsSpy(params, assetType);
    return {
      result: {
        data:
          assetType === "related-crypto-material"
            ? mockKeys
            : mockAlgorithmResponse,
        total:
          assetType === "related-crypto-material"
            ? mockKeys.length
            : mockAlgorithmResponse.length,
        params: {},
      },
      isFetching: false,
      fetchError: null,
      refetch: vi.fn(),
    };
  },
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

/** Verifies that the page renders the title, KPI cards, tabs, and table content. */
// Table pagination interactions need extra headroom under coverage on CI runners.
describe("CryptoList", { timeout: 15_000 }, () => {
  beforeEach(() => {
    mockAlgorithmResponse = mockAlgorithms;
  });

  afterEach(() => {
    window.history.replaceState({}, "", "/");
  });

  const renderBrowserComponent = () =>
    render(
      <BrowserRouter>
        <CryptoList />
      </BrowserRouter>,
    );

  const getLastAlgorithmCall = () => {
    const calls = (
      fetchCryptoAlgorithmsSpy.mock.calls as [
        HubRequestParams,
        string | undefined,
      ][]
    ).filter(([, assetType]) => assetType === "algorithm");
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

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <CryptoList />
      </MemoryRouter>,
    );

  /** Verifies that the page title is rendered. */
  it("renders the page title", () => {
    renderComponent();
    expect(screen.getByText("Cryptography")).toBeInTheDocument();
  });

  /** Verifies that the compliant algorithms KPI card shows the correct percentage and count. */
  it("displays the compliant algorithms KPI card with correct values", () => {
    renderComponent();

    const card = screen.getByTestId("kpi-compliant");
    expect(card).toHaveTextContent("41%");
    expect(card).toHaveTextContent("9 of 22 algorithms");
    expect(card).toHaveTextContent("Compliant algorithms");
  });

  /** Verifies that the warning algorithms KPI card shows the correct percentage and count. */
  it("displays the warning algorithms KPI card with correct values", () => {
    renderComponent();

    const card = screen.getByTestId("kpi-warning");
    expect(card).toHaveTextContent("23%");
    expect(card).toHaveTextContent("5 of 22 algorithms");
    expect(card).toHaveTextContent("Algorithms with warnings");
  });

  /** Verifies that the non-compliant algorithms KPI card shows the correct percentage and count. */
  it("displays the non-compliant algorithms KPI card with correct values", () => {
    renderComponent();

    const card = screen.getByTestId("kpi-non-compliant");
    expect(card).toHaveTextContent("36%");
    expect(card).toHaveTextContent("8 of 22 algorithms");
    expect(card).toHaveTextContent("Non-compliant algorithms");
  });

  /** Verifies that both Algorithms and Keys tabs are rendered with item counts. */
  it("renders tabs with item counts", () => {
    renderComponent();

    expect(screen.getByText("Algorithms (2)")).toBeInTheDocument();
    expect(screen.getByText("Keys (1)")).toBeInTheDocument();
  });

  /** Verifies that the Algorithms tab renders all 8 table columns. */
  it("renders all 8 algorithm table columns", () => {
    renderComponent();

    expect(screen.getByText("Algorithm name")).toBeInTheDocument();
    expect(screen.getByText("Primitive")).toBeInTheDocument();
    expect(screen.getAllByText("Occurrences").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Policy")).toBeInTheDocument();
    expect(screen.getByText("Recommendation")).toBeInTheDocument();
    expect(screen.getAllByText("Usage").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Packages")).toBeInTheDocument();
    expect(screen.getAllByText("SBOMs").length).toBeGreaterThanOrEqual(1);
  });

  /** Verifies that algorithm data rows render with correct compliance badges. */
  it("renders algorithm data with compliance badges", () => {
    renderComponent();

    expect(screen.getByText("AES-256-GCM")).toBeInTheDocument();
    expect(screen.getByText("RSA-2048")).toBeInTheDocument();
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

  /** Verifies that the Keys tab renders its 5 columns and key data. */
  it("renders Keys tab with correct columns and data", () => {
    renderComponent();

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();

    const keyRow = screen.getByText("my-rsa-key").closest("tr")!;
    const row = within(keyRow);
    expect(row.getByText("my-rsa-key")).toBeInTheDocument();
    expect(row.getByText("private-key")).toBeInTheDocument();
  });

  it("renders a standalone name search on the Keys tab", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("tab", { name: "Keys (1)" }));

    const toolbar = screen.getAllByLabelText("crypto-toolbar")[1]!;
    expect(
      within(toolbar).getByPlaceholderText("Search by key name"),
    ).toBeVisible();
    expect(within(toolbar).getAllByRole("textbox")).toHaveLength(1);
    expect(within(toolbar).queryByLabelText("filtered-by")).toBeNull();
    expect(within(toolbar).queryByRole("combobox")).toBeNull();
    expect(
      within(toolbar).getByRole("button", {
        name: "Import Remediation Mappings",
      }),
    ).toBeVisible();
  });

  it("submits and clears the standalone Keys name search", () => {
    renderBrowserComponent();
    fireEvent.click(screen.getByRole("tab", { name: "Keys (1)" }));
    const input = screen.getByPlaceholderText("Search by key name");

    fetchCryptoAlgorithmsSpy.mockClear();
    fireEvent.change(input, { target: { value: "rsa" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(fetchCryptoAlgorithmsSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        filters: [{ field: "name", operator: "~", value: "rsa" }],
        total: true,
      }),
      "related-crypto-material",
    );
    expect(
      JSON.parse(
        new URLSearchParams(window.location.search).get("ck:filters")!,
      ),
    ).toEqual({ "": ["rsa"] });

    fetchCryptoAlgorithmsSpy.mockClear();
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(fetchCryptoAlgorithmsSpy).toHaveBeenLastCalledWith(
      expect.not.objectContaining({ filters: expect.anything() }),
      "related-crypto-material",
    );
    expect(
      new URLSearchParams(window.location.search).get("ck:filters"),
    ).toBeNull();
  });

  /** Verifies that the Keys search is scoped to the name field instead of a full-text search. */
  it("scopes the Keys search to the name field", () => {
    fetchCryptoAlgorithmsSpy.mockClear();
    const filters = encodeURIComponent(JSON.stringify({ "": ["rsa"] }));
    // URL params are written through document.location, so a real browser router is needed
    window.history.replaceState({}, "", `/?ck:filters=${filters}`);
    render(
      <BrowserRouter>
        <CryptoList />
      </BrowserRouter>,
    );

    const keysCalls = (
      fetchCryptoAlgorithmsSpy.mock.calls as [
        { filters?: unknown[] },
        string | undefined,
      ][]
    ).filter(([, assetType]) => assetType === "related-crypto-material");
    const keysCall = keysCalls[keysCalls.length - 1];
    window.history.replaceState({}, "", "/");
    expect(keysCall?.[0].filters).toEqual([
      { field: "name", operator: "~", value: "rsa" },
    ]);
  });

  it("offers only name, Primitive, and Usage algorithm filter categories", async () => {
    renderComponent();
    const toolbar = screen.getAllByLabelText("crypto-toolbar")[0]!;

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
      "Filter",
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
      renderBrowserComponent();
      const toolbar = screen.getAllByLabelText("crypto-toolbar")[0]!;

      fetchCryptoAlgorithmsSpy.mockClear();
      await submitAlgorithmFilter(toolbar, category, placeholder, value);
      expect(getLastAlgorithmCall()).toEqual([
        expect.objectContaining({
          filters: [{ field, operator: "~", value }],
          total: true,
        }),
        "algorithm",
      ]);

      fetchCryptoAlgorithmsSpy.mockClear();
      const input = within(toolbar).getByPlaceholderText(placeholder);
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(getLastAlgorithmCall()).toEqual([
        expect.not.objectContaining({ filters: expect.anything() }),
        "algorithm",
      ]);
    },
  );

  it("combines name, primitive, and usage filters, persists them, and clears all", async () => {
    renderBrowserComponent();
    const toolbar = screen.getAllByLabelText("crypto-toolbar")[0]!;

    await submitAlgorithmFilter(
      toolbar,
      "Filter",
      "Search by algorithm name",
      "rsa",
    );
    await submitAlgorithmFilter(
      toolbar,
      "Primitive",
      "Search by primitive",
      "pke",
    );
    fetchCryptoAlgorithmsSpy.mockClear();
    await submitAlgorithmFilter(toolbar, "Usage", "Search by usage", "keygen");

    expect(getLastAlgorithmCall()).toEqual([
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
    expect(
      JSON.parse(
        new URLSearchParams(window.location.search).get("cr:filters")!,
      ),
    ).toEqual({ "": ["rsa"], primitive: ["pke"], usage: ["keygen"] });

    fetchCryptoAlgorithmsSpy.mockClear();
    fireEvent.click(
      within(toolbar).getByRole("button", { name: "Clear all filters" }),
    );
    expect(getLastAlgorithmCall()).toEqual([
      expect.not.objectContaining({ filters: expect.anything() }),
      "algorithm",
    ]);
    expect(
      new URLSearchParams(window.location.search).get("cr:filters"),
    ).toBeNull();
  });

  it("restores primitive, usage, and name from the URL while ignoring removed filters", () => {
    fetchCryptoAlgorithmsSpy.mockClear();
    // Removed categories precede valid ones so they cannot stop restoration.
    const filters = encodeURIComponent(
      JSON.stringify({
        policy_status: ["non_compliant"],
        recommendation: ["replace"],
        primitive: ["pke"],
        usage: ["keygen"],
        "": ["rsa"],
      }),
    );
    window.history.replaceState({}, "", `/?cr:filters=${filters}`);
    renderBrowserComponent();

    expect(getLastAlgorithmCall()).toEqual([
      expect.objectContaining({
        filters: [
          { field: "properties:primitive", operator: "~", value: "pke" },
          {
            field: "properties:cryptoFunctions",
            operator: "~",
            value: "keygen",
          },
          { field: "", operator: "~", value: "rsa" },
        ],
        total: true,
      }),
      "algorithm",
    ]);
  });

  /** Verifies that pagination controls are rendered on the Algorithms tab. */
  it("renders pagination controls", () => {
    renderComponent();

    const paginationElements = screen.getAllByLabelText(/pagination/i);
    expect(paginationElements.length).toBeGreaterThan(0);
  });
});
