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

  it("getAxiosErrorMessage: concatenates error and message (ErrorInformation)", () => {
    const error = createAxiosError({
      response: {
        data: { error: "InvalidFormat", message: "expected CycloneDX or SPDX" },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe(
      "InvalidFormat: expected CycloneDX or SPDX",
    );
  });

  it("getAxiosErrorMessage: includes details when error and message present", () => {
    const error = createAxiosError({
      response: {
        data: {
          error: "InvalidFormat",
          message: "could not parse document",
          details: "line 42: unexpected token",
        },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe(
      "InvalidFormat: could not parse document\nline 42: unexpected token",
    );
  });

  it("getAxiosErrorMessage: returns message when only message present", () => {
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

  it("getAxiosErrorMessage: returns error when only error present", () => {
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

  it("getAxiosErrorMessage: ignores unknown fields and uses error+message", () => {
    const error = createAxiosError({
      response: {
        data: {
          error: "SomeError",
          message: "Something happened",
          unknownField: "ignored",
        },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as never,
      },
    });
    expect(getAxiosErrorMessage(error)).toBe("SomeError: Something happened");
  });
});
