import { deserializeFilterUrlParams, sanitizeFilterValues } from "./helpers";

describe("sanitizeFilterValues", () => {
  /** Verifies that clean values are returned untouched (same reference) so memoized consumers stay stable. */
  it("returns the same object when already clean", () => {
    const clean = { name: ["rsa"], status: ["a", "b"] };
    expect(sanitizeFilterValues(clean)).toBe(clean);
  });

  /** Verifies that values that are not arrays are dropped. */
  it("drops non-array values", () => {
    expect(
      sanitizeFilterValues({ a: "rsa", b: 5, c: { x: 1 }, d: null, e: ["ok"] }),
    ).toEqual({ e: ["ok"] });
  });

  /** Verifies that blank and non-string entries are dropped and emptied categories removed. */
  it("drops blank and non-string entries and emptied categories", () => {
    expect(
      sanitizeFilterValues({
        a: [""],
        b: ["", "x"],
        c: [1, null, "y"],
        d: [],
      }),
    ).toEqual({ b: ["x"], c: ["y"] });
  });

  /** Verifies that anything that is not a plain object yields an empty object. */
  it.each([null, undefined, 5, "str", true, ["a"]])(
    "returns an empty object for %p",
    (input) => {
      expect(sanitizeFilterValues(input)).toEqual({});
    },
  );
});

describe("deserializeFilterUrlParams", () => {
  /** Verifies that valid serialized filters are restored. */
  it("restores valid filters", () => {
    expect(
      deserializeFilterUrlParams({
        filters: JSON.stringify({ name: ["rsa"] }),
      }),
    ).toEqual({ name: ["rsa"] });
  });

  /** Verifies that malformed but valid JSON is sanitized rather than passed through. */
  it("sanitizes valid JSON with malformed filter values", () => {
    expect(
      deserializeFilterUrlParams({
        filters: JSON.stringify({ name: "rsa", status: [""], ok: ["x"] }),
      }),
    ).toEqual({ ok: ["x"] });
  });

  /** Verifies that invalid JSON and non-object JSON yield no filters. */
  it.each(["{not json", "5", "null", '"str"', "[1]"])(
    "returns no filters for %s",
    (filters) => {
      expect(deserializeFilterUrlParams({ filters })).toEqual({});
    },
  );

  /** Verifies that a missing param yields no filters. */
  it("returns no filters when absent", () => {
    expect(deserializeFilterUrlParams({})).toEqual({});
  });
});
