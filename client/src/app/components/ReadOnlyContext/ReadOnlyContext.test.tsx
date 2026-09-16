import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReadOnlyContext } from "./ReadOnlyContext";
import { ReadOnlyProvider } from "./ReadOnlyProvider";

import * as trustifyInfoModule from "@app/queries/trustifyInfo";

jest.mock("@app/queries/trustifyInfo");

const mockedUseFetchTrustifyInfo =
  trustifyInfoModule.useFetchTrustifyInfo as jest.MockedFunction<
    typeof trustifyInfoModule.useFetchTrustifyInfo
  >;

const ReadOnlyConsumer: React.FC = () => {
  const { isLoading, areMutationsDisabled } = React.useContext(ReadOnlyContext);
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="mutations-disabled">
        {String(areMutationsDisabled)}
      </span>
    </div>
  );
};

const renderWithProvider = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ReadOnlyProvider>
        <ReadOnlyConsumer />
      </ReadOnlyProvider>
    </QueryClientProvider>,
  );
};

describe("ReadOnlyContext", () => {
  it("provides isReadOnly=true when the endpoint returns readOnly: true", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: { version: "0.5.0", readOnly: true },
      isLoading: false,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByTestId("read-only")).toHaveTextContent("true");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
  });

  it("allows mutations when the endpoint returns readOnly: false", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: { version: "0.5.0", readOnly: false },
      isLoading: false,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByTestId("mutations-disabled")).toHaveTextContent("false");
  });

  it("allows mutations while loading", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: undefined,
      isLoading: true,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    expect(screen.getByTestId("mutations-disabled")).toHaveTextContent("false");
  });

  it("allows mutations when the fetch errors", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: undefined,
      isLoading: false,
      error: new Error("network error"),
    });

    renderWithProvider();

    expect(screen.getByTestId("mutations-disabled")).toHaveTextContent("false");
  });
});
