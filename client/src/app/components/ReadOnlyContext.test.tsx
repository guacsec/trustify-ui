import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReadOnlyProvider, useReadOnlyContext } from "./ReadOnlyContext";

import * as trustifyInfoModule from "@app/queries/trustifyInfo";

jest.mock("@app/queries/trustifyInfo");

const mockedUseFetchTrustifyInfo =
  trustifyInfoModule.useFetchTrustifyInfo as jest.MockedFunction<
    typeof trustifyInfoModule.useFetchTrustifyInfo
  >;

const ReadOnlyConsumer: React.FC = () => {
  const { isReadOnly, isLoading } = useReadOnlyContext();
  return (
    <div>
      <span data-testid="read-only">{String(isReadOnly)}</span>
      <span data-testid="loading">{String(isLoading)}</span>
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

  it("provides isReadOnly=false when the endpoint returns readOnly: false", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: { version: "0.5.0", readOnly: false },
      isLoading: false,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByTestId("read-only")).toHaveTextContent("false");
  });

  it("defaults to isReadOnly=false when the field is absent", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: { version: "0.5.0" },
      isLoading: false,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByTestId("read-only")).toHaveTextContent("false");
  });

  it("treats isReadOnly as true while loading", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: undefined,
      isLoading: true,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByTestId("read-only")).toHaveTextContent("true");
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
  });

  it("defaults to isReadOnly=false when the fetch errors", () => {
    mockedUseFetchTrustifyInfo.mockReturnValue({
      trustifyInfo: undefined,
      isLoading: false,
      error: new Error("network error"),
    });

    renderWithProvider();

    expect(screen.getByTestId("read-only")).toHaveTextContent("false");
  });
});
