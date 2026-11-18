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
});
