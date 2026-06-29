import type { AxiosError } from "axios";

import { getAxiosErrorMessage, getToolbarChipKey } from "./utils";

const createAxiosError = (
  overrides: Partial<AxiosError> = {},
): AxiosError<unknown> =>
  ({
    message: "Request failed with status code 400",
    isAxiosError: true,
    name: "AxiosError",
    toJSON: () => ({}),
    ...overrides,
  }) as AxiosError<unknown>;

describe("utils", () => {
  // getToolbarChipKey

  it("getToolbarChipKey: test 'string'", () => {
    const result = getToolbarChipKey("myValue");
    expect(result).toBe("myValue");
  });

  it("getToolbarChipKey: test 'ToolbarChip'", () => {
    const result = getToolbarChipKey({ key: "myKey", node: "myNode" });
    expect(result).toBe("myKey");
  });

  // getAxiosErrorMessage

  it("getAxiosErrorMessage: returns errorMessage when present", () => {
    const error = createAxiosError({
      response: {
        data: { errorMessage: "Detailed error from errorMessage" },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe(
      "Detailed error from errorMessage",
    );
  });

  it("getAxiosErrorMessage: returns message when present", () => {
    const error = createAxiosError({
      response: {
        data: { message: "Invalid SBOM format" },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe("Invalid SBOM format");
  });

  it("getAxiosErrorMessage: returns error string when present", () => {
    const error = createAxiosError({
      response: {
        data: { error: "Something went wrong" },
        status: 500,
        statusText: "Internal Server Error",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe("Something went wrong");
  });

  it("getAxiosErrorMessage: returns plain string response data", () => {
    const error = createAxiosError({
      response: {
        data: "Plain text error body",
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe("Plain text error body");
  });

  it("getAxiosErrorMessage: falls back to axiosError.message", () => {
    const error = createAxiosError({
      message: "Network Error",
    });
    expect(getAxiosErrorMessage(error)).toBe("Network Error");
  });

  it("getAxiosErrorMessage: errorMessage takes priority over message", () => {
    const error = createAxiosError({
      response: {
        data: {
          errorMessage: "Higher priority",
          message: "Lower priority",
        },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe("Higher priority");
  });
});
