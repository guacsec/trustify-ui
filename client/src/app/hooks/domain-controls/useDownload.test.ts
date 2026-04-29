import { act, renderHook } from "@testing-library/react";
import { AxiosError, AxiosHeaders } from "axios";
import { saveAs } from "file-saver";

import { downloadSbomLicense } from "@app/api/rest";
import { downloadAdvisory, downloadSbom } from "@app/client";
import { getAxiosErrorMessage } from "@app/utils/utils";

import { useDownload } from "./useDownload";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));
jest.mock("@app/api/rest", () => ({ downloadSbomLicense: jest.fn() }));
jest.mock("@app/client", () => ({
  downloadAdvisory: jest.fn(),
  downloadSbom: jest.fn(),
}));
jest.mock("@app/utils/utils", () => ({
  getAxiosErrorMessage: jest.fn((err: AxiosError) => err.message),
  getFilenameFromContentDisposition: jest.fn(() => "license.tar.gz"),
}));

const pushNotification = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => ({ pushNotification }),
}));

const createAxiosError = (message: string): AxiosError =>
  new AxiosError(message, "ERR_BAD_REQUEST", undefined, undefined, {
    status: 500,
    statusText: "Internal Server Error",
    data: {},
    headers: {},
    config: { headers: new AxiosHeaders() },
  });

/** Flushes the microtask queue so fire-and-forget promise chains settle before assertions. */
const flushPromises = () => act(() => new Promise((r) => setTimeout(r, 0)));

describe("useDownload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** Verifies that pushNotification is called with variant "danger" when downloadAdvisory rejects. */
  it("should notify with danger variant when downloadAdvisory fails", async () => {
    // Given a failing advisory download
    const error = createAxiosError("advisory download failed");
    (downloadAdvisory as jest.Mock).mockRejectedValue(error);

    // When triggering the download
    const { result } = renderHook(() => useDownload());
    result.current.downloadAdvisory("adv-1");
    await flushPromises();

    // Then a danger notification is pushed
    expect(pushNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Failed to download advisory",
        variant: "danger",
      }),
    );
  });

  /** Verifies that pushNotification is called with variant "danger" when downloadSbom rejects. */
  it("should notify with danger variant when downloadSbom fails", async () => {
    // Given a failing SBOM download
    const error = createAxiosError("sbom download failed");
    (downloadSbom as jest.Mock).mockRejectedValue(error);

    // When triggering the download
    const { result } = renderHook(() => useDownload());
    result.current.downloadSBOM("sbom-1");
    await flushPromises();

    // Then a danger notification is pushed
    expect(pushNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Failed to download SBOM",
        variant: "danger",
      }),
    );
  });

  /** Verifies that pushNotification is called with variant "danger" when downloadSbomLicense rejects. */
  it("should notify with danger variant when downloadSbomLicense fails", async () => {
    // Given a failing SBOM license download
    const error = createAxiosError("license download failed");
    (downloadSbomLicense as jest.Mock).mockRejectedValue(error);

    // When triggering the download
    const { result } = renderHook(() => useDownload());
    result.current.downloadSBOMLicenses("sbom-1");
    await flushPromises();

    // Then a danger notification is pushed
    expect(pushNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Failed to download SBOM licenses",
        variant: "danger",
      }),
    );
  });

  /** Verifies that getAxiosErrorMessage is used to extract the error message for the notification. */
  it("should use getAxiosErrorMessage to extract the error message", async () => {
    // Given a failing advisory download
    const error = createAxiosError("raw error");
    (downloadAdvisory as jest.Mock).mockRejectedValue(error);

    // When triggering the download
    const { result } = renderHook(() => useDownload());
    result.current.downloadAdvisory("adv-1");
    await flushPromises();

    // Then getAxiosErrorMessage is called with the error and its result is used as the message
    expect(getAxiosErrorMessage).toHaveBeenCalledWith(error);
    expect(pushNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "raw error",
      }),
    );
  });

  /** Verifies that the success path still calls saveAs with the expected blob for advisory download. */
  it("should call saveAs on successful advisory download", async () => {
    // Given a successful advisory download
    const data = new ArrayBuffer(8);
    (downloadAdvisory as jest.Mock).mockResolvedValue({ data });

    // When triggering the download
    const { result } = renderHook(() => useDownload());
    result.current.downloadAdvisory("adv-1", "advisory.json");
    await flushPromises();

    // Then saveAs is called and no notification is pushed
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), "advisory.json");
    expect(pushNotification).not.toHaveBeenCalled();
  });

  /** Verifies that the success path still calls saveAs with the expected blob for SBOM download. */
  it("should call saveAs on successful SBOM download", async () => {
    // Given a successful SBOM download
    const data = new ArrayBuffer(8);
    (downloadSbom as jest.Mock).mockResolvedValue({ data });

    // When triggering the download
    const { result } = renderHook(() => useDownload());
    result.current.downloadSBOM("sbom-1", "sbom.json");
    await flushPromises();

    // Then saveAs is called and no notification is pushed
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), "sbom.json");
    expect(pushNotification).not.toHaveBeenCalled();
  });

  /** Verifies that the success path still calls saveAs with the expected blob for SBOM license download. */
  it("should call saveAs on successful SBOM license download", async () => {
    // Given a successful SBOM license download
    const data = new ArrayBuffer(8);
    (downloadSbomLicense as jest.Mock).mockResolvedValue({
      data,
      headers: {
        "content-disposition": 'attachment; filename="license.tar.gz"',
      },
    });

    // When triggering the download
    const { result } = renderHook(() => useDownload());
    result.current.downloadSBOMLicenses("sbom-1");
    await flushPromises();

    // Then saveAs is called and no notification is pushed
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), "license.tar.gz");
    expect(pushNotification).not.toHaveBeenCalled();
  });
});
