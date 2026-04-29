import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as ReadOnlyContextModule from "@app/components/ReadOnlyContext";

import { DefaultLayout } from "./default-layout";

jest.mock("@app/components/ReadOnlyContext");
jest.mock("./header", () => ({
  HeaderApp: () => <div data-testid="header" />,
}));
jest.mock("./sidebar", () => ({
  SidebarApp: () => <div data-testid="sidebar" />,
}));
jest.mock("@app/components/Notifications", () => ({
  Notifications: () => null,
}));
jest.mock("@app/components/PageDrawerContext", () => ({
  PageContentWithDrawerProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
}));
jest.mock("@patternfly/react-core", () => {
  const actual = jest.requireActual("@patternfly/react-core");
  return {
    ...actual,
    Page: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="page">{children}</div>
    ),
    SkipToContent: () => null,
  };
});

const mockedUseReadOnlyContext =
  ReadOnlyContextModule.useReadOnlyContext as jest.MockedFunction<
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
