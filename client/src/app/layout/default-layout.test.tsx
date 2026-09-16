import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ReadOnlyContext } from "@app/components/ReadOnlyContext";

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
jest.mock("@patternfly/react-core", () => ({
  Page: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page">{children}</div>
  ),
  SkipToContent: () => null,
  Banner: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="banner">{children}</div>
  ),
  Flex: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  FlexItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderLayout = ({
  isLoading = false,
  areMutationsDisabled = false,
}: {
  isLoading?: boolean;
  areMutationsDisabled?: boolean;
}) => {
  return render(
    <ReadOnlyContext.Provider value={{ isLoading, areMutationsDisabled }}>
      <DefaultLayout>
        <div data-testid="page-content">Page content</div>
      </DefaultLayout>
    </ReadOnlyContext.Provider>,
  );
};

describe("DefaultLayout", () => {
  it("shows a read-only banner when mutations are disabled", () => {
    renderLayout({ areMutationsDisabled: true });

    expect(screen.getByText(/running in read-only mode/i)).toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });

  it("does not show a banner when mutations are allowed", () => {
    renderLayout({ areMutationsDisabled: false });

    expect(
      screen.queryByText(/running in read-only mode/i),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });

  it("does not show a banner while trustify info is loading", () => {
    renderLayout({ isLoading: true, areMutationsDisabled: false });

    expect(
      screen.queryByText(/running in read-only mode/i),
    ).not.toBeInTheDocument();
  });
});
