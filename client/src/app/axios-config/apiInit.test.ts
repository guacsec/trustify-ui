import { queryClient } from "@app/queries/config";
import { TrustifyInfoQueryKey } from "@app/queries/trustifyInfo";

import { readOnlyRejectionHandler } from "./apiInit";

jest.mock("@app/queries/config", () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));

jest.mock("@app/queries/trustifyInfo", () => ({
  TrustifyInfoQueryKey: "trustifyInfo",
}));

jest.mock("@app/Constants", () => ({
  isAuthRequired: false,
}));

jest.mock("@app/client/client", () => ({
  createClient: jest.fn(() => ({})),
}));

jest.mock("@app/oidc", () => ({
  OIDC_CLIENT_ID: "test",
  OIDC_SERVER_URL: "http://localhost",
  oidcClientSettings: {},
  oidcSignoutArgs: {},
}));

const mockInvalidateQueries =
  queryClient.invalidateQueries as jest.MockedFunction<
    typeof queryClient.invalidateQueries
  >;

describe("readOnlyRejectionHandler", () => {
  beforeEach(() => {
    mockInvalidateQueries.mockClear();
  });

  it("invalidates trustify info query on 503 ReadOnly response", async () => {
    const error = {
      response: { status: 503, data: { error: "ReadOnly" } },
    };

    await expect(readOnlyRejectionHandler(error)).rejects.toBe(error);

    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [TrustifyInfoQueryKey],
    });
  });

  it("does not invalidate on a regular 503 without ReadOnly error", async () => {
    const error = {
      response: { status: 503, data: { message: "Service Unavailable" } },
    };

    await expect(readOnlyRejectionHandler(error)).rejects.toBe(error);

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("does not invalidate on non-503 errors", async () => {
    const error = {
      response: { status: 500, data: { error: "InternalError" } },
    };

    await expect(readOnlyRejectionHandler(error)).rejects.toBe(error);

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("still rejects the error so mutation onError handlers fire", async () => {
    const error = {
      response: { status: 503, data: { error: "ReadOnly" } },
    };

    await expect(readOnlyRejectionHandler(error)).rejects.toBe(error);
  });
});
