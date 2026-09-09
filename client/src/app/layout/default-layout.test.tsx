import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { ReadOnlyContext } from "@app/components/ReadOnlyContext";

import { DefaultLayout } from "./default-layout";

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
    renderLayout({ isLoading: true, areMutationsDisabled: true });

    expect(
      screen.queryByText(/running in read-only mode/i),
    ).not.toBeInTheDocument();
  });
});
