import { render, screen } from "@testing-library/react";
import { type MockedFunction, vi } from "vitest";

import * as ReadOnlyContextModule from "@app/components/ReadOnlyContext/ReadOnlyContext";

import { DefaultLayout } from "./default-layout";

vi.mock("@app/components/ReadOnlyContext");
vi.mock("./header", () => ({
  HeaderApp: () => <div data-testid="header" />,
}));
vi.mock("./sidebar", () => ({
  SidebarApp: () => <div data-testid="sidebar" />,
}));
vi.mock("@app/components/Notifications", () => ({
  Notifications: () => null,
}));
vi.mock("@app/components/PageDrawerContext", () => ({
  PageContentWithDrawerProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
}));
vi.mock("@patternfly/react-core", async () => {
  const actual = await vi.importActual("@patternfly/react-core");
  return {
    ...actual,
    Page: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="page">{children}</div>
    ),
    SkipToContent: () => null,
  };
});

const mockedUseReadOnlyContext =
  ReadOnlyContextModule.useReadOnlyContext as MockedFunction<
    typeof ReadOnlyContextModule.useReadOnlyContext
  >;

const renderLayout = () => {
  return render(
    <DefaultLayout>
      <div data-testid="page-content">Page content</div>
    </DefaultLayout>,
  );
};

describe("DefaultLayout", () => {
  it("shows a read-only banner when isReadOnly is true", () => {
    mockedUseReadOnlyContext.mockReturnValue({
      isReadOnly: true,
      isLoading: false,
    });

    renderLayout();

    expect(screen.getByText(/running in read-only mode/i)).toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });

  it("does not show a banner when isReadOnly is false", () => {
    mockedUseReadOnlyContext.mockReturnValue({
      isReadOnly: false,
      isLoading: false,
    });

    renderLayout();

    expect(
      screen.queryByText(/running in read-only mode/i),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });
});
