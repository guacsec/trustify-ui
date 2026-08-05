import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MemoryRouter } from "react-router-dom";

import { GetStartedSection } from "./GetStartedSection";

vi.mock("@app/hooks/useBranding");

import getBranding from "@app/hooks/useBranding";

const mockedGetBranding = getBranding as ReturnType<typeof vi.fn>;

const renderGetStartedSection = () =>
  render(
    <MemoryRouter>
      <GetStartedSection />
    </MemoryRouter>,
  );

describe("GetStartedSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /** Verifies the section card has a stable data-testid locator. */
  it("renders with section-level data-testid", () => {
    mockedGetBranding.mockReturnValue({
      application: { title: "Test App" },
      about: { displayName: "Test App" },
      masthead: {},
    });

    renderGetStartedSection();

    expect(screen.getByTestId("home-get-started-section")).toBeInTheDocument();
  });

  /** Verifies the section heading renders with the branding display name. */
  it("renders section heading with display name", () => {
    mockedGetBranding.mockReturnValue({
      application: { title: "Test App" },
      about: { displayName: "Test App" },
      masthead: {},
    });

    renderGetStartedSection();

    expect(
      screen.getByRole("heading", { name: /Get started with Test App/i }),
    ).toBeInTheDocument();
  });

  /** Verifies static action cards render with correct button labels. */
  it("renders static action cards with correct button labels", () => {
    mockedGetBranding.mockReturnValue({
      application: { title: "Test App" },
      about: { displayName: "Test App" },
      masthead: {},
    });

    renderGetStartedSection();

    expect(
      screen.getByRole("button", { name: /Upload SBOM/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Generate vulnerability report/i,
      }),
    ).toBeInTheDocument();
  });

  /** Verifies action card titles render as h3 headings. */
  it("renders action card titles", () => {
    mockedGetBranding.mockReturnValue({
      application: { title: "Test App" },
      about: { displayName: "Test App" },
      masthead: {},
    });

    renderGetStartedSection();

    expect(
      screen.getByRole("heading", { name: "Upload an SBOM" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Generate vulnerability report",
      }),
    ).toBeInTheDocument();
  });

  /** Verifies the documentation action appears when documentationUrl is set. */
  it("renders documentation action when documentationUrl is set", () => {
    mockedGetBranding.mockReturnValue({
      application: { title: "Test App" },
      about: {
        displayName: "Test App",
        documentationUrl: "https://docs.example.com",
      },
      masthead: {},
    });

    renderGetStartedSection();

    expect(
      screen.getByRole("button", { name: /View documentation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Learn more" }),
    ).toBeInTheDocument();
  });

  /** Verifies the documentation action is omitted when documentationUrl is empty. */
  it("omits documentation action when documentationUrl is empty", () => {
    mockedGetBranding.mockReturnValue({
      application: { title: "Test App" },
      about: { displayName: "Test App", documentationUrl: "" },
      masthead: {},
    });

    renderGetStartedSection();

    expect(
      screen.queryByRole("button", { name: /View documentation/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Learn more" }),
    ).not.toBeInTheDocument();
  });
});
