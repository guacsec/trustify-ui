import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const mockUseFetchPackages = vi.fn();

vi.mock("@app/queries/packages", () => ({
  useFetchPackages: (...args: unknown[]) => {
    mockUseFetchPackages(...args);
    return {
      result: { data: [], total: 0, params: {} },
      isFetching: false,
      fetchError: null,
      refetch: vi.fn(),
    };
  },
}));

vi.mock("@app/queries/licenses", () => ({
  useFetchLicenses: () => ({ result: { data: [] } }),
}));

vi.mock("@app/queries/recommendations", () => ({
  useFetchRecommendations: () => ({
    recommendationsMap: new Map(),
    isFetching: false,
    fetchError: null,
  }),
}));

import { PackageList } from "./package-list";

describe("PackageList crypto filter", () => {
  // BrowserRouter is used so that document.location, which the table URL persistence reads,
  // matches the router location, as in the running application.
  const renderAt = (url: string) => {
    window.history.pushState({}, "", url);
    return render(
      <BrowserRouter>
        <PackageList />
      </BrowserRouter>,
    );
  };

  const lastCryptoArg = () => (mockUseFetchPackages.mock.calls.at(-1) ?? [])[2];

  beforeEach(() => mockUseFetchPackages.mockClear());

  it("passes the crypto query parameter to the packages query", () => {
    renderAt("/packages?crypto=AES");

    expect(lastCryptoArg()).toEqual(["AES"]);
  });

  it("applies no crypto filter without the query parameter", () => {
    renderAt("/packages");

    expect(lastCryptoArg()).toEqual([]);
  });

  it("shows the crypto filter and removes it when closed", () => {
    renderAt("/packages?crypto=AES");

    expect(screen.getByText("AES")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Remove crypto filter AES"));

    expect(screen.queryByText("AES")).not.toBeInTheDocument();
    expect(window.location.search).not.toContain("crypto");
    expect(lastCryptoArg()).toEqual([]);
  });

  it("shows no crypto filter label without the query parameter", () => {
    renderAt("/packages");

    expect(screen.queryByTestId("crypto-filter-labels")).toBeNull();
  });

  it("keeps all the repeated crypto values when the table updates the URL", () => {
    renderAt("/packages?crypto=AES&crypto=RSA");

    expect(lastCryptoArg()).toEqual(["AES", "RSA"]);
    expect(screen.getByText("AES")).toBeInTheDocument();
    expect(screen.getByText("RSA")).toBeInTheDocument();
  });

  it("removes only the closed crypto value and keeps other URL params", () => {
    renderAt("/packages?crypto=AES&crypto=RSA");

    // A URL update made after the last render, e.g. by the table filters
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${window.location.search}&other=kept`,
    );
    fireEvent.click(screen.getByLabelText("Remove crypto filter AES"));

    const params = new URLSearchParams(window.location.search);
    expect(params.getAll("crypto")).toEqual(["RSA"]);
    expect(params.get("other")).toBe("kept");
    expect(lastCryptoArg()).toEqual(["RSA"]);
  });
});
