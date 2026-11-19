import { trimAndStringifyUrlParams } from "./useUrlParams";

describe("trimAndStringifyUrlParams", () => {
  it("keeps all the values of unrelated repeated params", () => {
    const search = trimAndStringifyUrlParams({
      existingSearchParams: new URLSearchParams("crypto=AES&crypto=RSA&a=1"),
      newPrefixedSerializedParams: { "pk:page": "2" },
    });

    expect(new URLSearchParams(search).getAll("crypto")).toEqual([
      "AES",
      "RSA",
    ]);
    expect(new URLSearchParams(search).get("a")).toBe("1");
    expect(new URLSearchParams(search).get("pk:page")).toBe("2");
  });

  it("replaces all the existing values of an updated param", () => {
    const search = trimAndStringifyUrlParams({
      existingSearchParams: new URLSearchParams("x=1&x=2&y=3"),
      newPrefixedSerializedParams: { x: "9" },
    });

    expect(new URLSearchParams(search).getAll("x")).toEqual(["9"]);
    expect(new URLSearchParams(search).get("y")).toBe("3");
  });

  it("removes params set to null and ignores undefined ones", () => {
    const search = trimAndStringifyUrlParams({
      existingSearchParams: new URLSearchParams("x=1&x=2&y=3&z=4"),
      newPrefixedSerializedParams: { x: null, y: undefined },
    });

    expect(new URLSearchParams(search).has("x")).toBe(false);
    expect(new URLSearchParams(search).get("y")).toBe("3");
    expect(new URLSearchParams(search).get("z")).toBe("4");
  });

  it("works without existing params", () => {
    expect(
      trimAndStringifyUrlParams({
        newPrefixedSerializedParams: { b: "2", a: "1", c: null },
      }),
    ).toBe("a=1&b=2");
  });
});
