import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  type MockedFunction,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { LightwellReport } from "./lightwell-report";
import { downloadCsv } from "./csv-export";
import {
  type PackageResult,
  useBatchedRecommendations,
} from "./use-batched-recommendations";

vi.mock("./csv-export");
vi.mock("./use-batched-recommendations");

const mockedUseBatchedRecommendations =
  useBatchedRecommendations as MockedFunction<typeof useBatchedRecommendations>;
const mockedDownloadCsv = downloadCsv as MockedFunction<typeof downloadCsv>;

const samplePackages: PackageResult[] = [
  {
    packageName: "log4j-core",
    version: "2.14.0",
    recommendedVersion: "2.17.1",
    foundIn: ["sbom-1.json"],
    vulnerabilities: ["CVE-2021-44228"],
  },
];

const completeReport = {
  progress: 2,
  totalSteps: 2,
  progressPercent: 100,
  isLoading: false,
  isComplete: true,
  error: null,
  warnings: [],
  sbomResults: [
    {
      sbomId: "sbom-1",
      sbomName: "sbom-1.json",
      addressablePackages: 1,
      vulnerabilityCount: 1,
    },
  ],
  packageResults: samplePackages,
} satisfies ReturnType<typeof useBatchedRecommendations>;

const pendingReport = {
  ...completeReport,
  progress: 0,
  progressPercent: 0,
  isLoading: true,
  isComplete: false,
  sbomResults: [],
  packageResults: [],
} satisfies ReturnType<typeof useBatchedRecommendations>;

const REPORT_URL = "/sboms/lightwell-report?ids=sbom-1";

/**
 * Renders the report page inside a data router (required for useBlocker) at
 * /sboms/lightwell-report with a sibling /sboms route to navigate to.
 *
 * The table's useUrlParams hook syncs state via document.location, so the jsdom
 * URL is aligned with the router path to keep those navigations on a matched
 * route.
 */
const renderReport = () => {
  window.history.pushState({}, "", REPORT_URL);
  const router = createMemoryRouter(
    [
      { path: "/sboms/lightwell-report", element: <LightwellReport /> },
      { path: "/sboms", element: <div>SBOMs list page</div> },
    ],
    { initialEntries: [REPORT_URL] },
  );
  return { router, ...render(<RouterProvider router={router} />) };
};

const MODAL_HEADING = "Leave Lightwell remediation report?";

describe("LightwellReport leave-page warning (TC-5631)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseBatchedRecommendations.mockReturnValue(completeReport);
  });

  it("shows the leave-warning modal when navigating away with an unsaved report", async () => {
    // Given a generated, not-yet-downloaded report
    renderReport();

    // When the user clicks an in-app link that leaves the page
    fireEvent.click(screen.getByRole("link", { name: "SBOMs" }));

    // Then the confirmation modal appears with the unsaved-report warning
    await waitFor(() => {
      expect(screen.getByText(MODAL_HEADING)).toBeInTheDocument();
    });
    expect(
      screen.getByText(/not saved and will be unavailable/i),
    ).toBeInTheDocument();
  });

  it("does not block navigation when no report has been generated", async () => {
    // Given a report that is still loading (nothing to lose)
    mockedUseBatchedRecommendations.mockReturnValue(pendingReport);
    renderReport();

    // When the user navigates away
    fireEvent.click(screen.getByRole("link", { name: "SBOMs" }));

    // Then navigation proceeds without a modal
    await waitFor(() => {
      expect(screen.getByText("SBOMs list page")).toBeInTheDocument();
    });
    expect(screen.queryByText(MODAL_HEADING)).not.toBeInTheDocument();
  });

  it("does not block navigation after the report has been downloaded", async () => {
    // Given a report that the user has already downloaded
    renderReport();
    fireEvent.click(screen.getByRole("button", { name: "Download" }));
    expect(mockedDownloadCsv).toHaveBeenCalledWith(samplePackages);

    // When the user navigates away
    fireEvent.click(screen.getByRole("link", { name: "SBOMs" }));

    // Then navigation proceeds without a modal
    await waitFor(() => {
      expect(screen.getByText("SBOMs list page")).toBeInTheDocument();
    });
    expect(screen.queryByText(MODAL_HEADING)).not.toBeInTheDocument();
  });

  it("downloads the report and leaves when 'Download and leave' is clicked", async () => {
    // Given the leave-warning modal is open
    renderReport();
    fireEvent.click(screen.getByRole("link", { name: "SBOMs" }));
    await screen.findByText(MODAL_HEADING);

    // When the user chooses to download and leave
    fireEvent.click(
      screen.getByRole("button", { name: /Download and leave/i }),
    );

    // Then the CSV is downloaded and navigation proceeds
    expect(mockedDownloadCsv).toHaveBeenCalledWith(samplePackages);
    await waitFor(() => {
      expect(screen.getByText("SBOMs list page")).toBeInTheDocument();
    });
  });

  it("leaves without downloading when 'Leave without downloading' is clicked", async () => {
    // Given the leave-warning modal is open
    renderReport();
    fireEvent.click(screen.getByRole("link", { name: "SBOMs" }));
    await screen.findByText(MODAL_HEADING);

    // When the user chooses to leave without downloading
    fireEvent.click(
      screen.getByRole("button", { name: /Leave without downloading/i }),
    );

    // Then navigation proceeds and no CSV is downloaded
    await waitFor(() => {
      expect(screen.getByText("SBOMs list page")).toBeInTheDocument();
    });
    expect(mockedDownloadCsv).not.toHaveBeenCalled();
  });

  it("stays on the report page when 'Cancel' is clicked", async () => {
    // Given the leave-warning modal is open
    const { router } = renderReport();
    fireEvent.click(screen.getByRole("link", { name: "SBOMs" }));
    await screen.findByText(MODAL_HEADING);

    // When the user cancels
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    // Then the modal closes, no download happens, and the user stays put
    await waitFor(() => {
      expect(screen.queryByText(MODAL_HEADING)).not.toBeInTheDocument();
    });
    expect(mockedDownloadCsv).not.toHaveBeenCalled();
    expect(router.state.location.pathname).toBe("/sboms/lightwell-report");
    expect(screen.queryByText("SBOMs list page")).not.toBeInTheDocument();
  });
});
