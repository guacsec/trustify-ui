import { describe, expect, it } from "vitest";

import type { Branch, FullProductName } from "@app/specs/csaf/csaf-v2.0-schema";

import { collectProducts } from "./csaf-utils";

describe("collectProducts", () => {
  const makeProduct = (id: string, name: string): FullProductName =>
    ({ product_id: id, name }) as FullProductName;

  const makeBranch = (
    product: FullProductName | undefined,
    children?: Branch[],
  ): Branch =>
    ({
      name: product?.name ?? "group",
      category: "product_name",
      ...(product ? { product } : {}),
      ...(children ? { branches: children } : {}),
    }) as Branch;

  it("collects products from flat branches", () => {
    const branches: Branch[] = [
      makeBranch(makeProduct("A", "Product A")),
      makeBranch(makeProduct("B", "Product B")),
    ];

    const result = collectProducts(branches);

    expect(result).toHaveLength(2);
    expect(result.map((p) => p.product_id)).toEqual(["A", "B"]);
  });

  it("collects products from nested branches", () => {
    const branches: Branch[] = [
      makeBranch(undefined, [
        makeBranch(makeProduct("A", "Product A")),
        makeBranch(makeProduct("B", "Product B")),
      ]),
    ];

    const result = collectProducts(branches);

    expect(result).toHaveLength(2);
  });

  it("deduplicates products with the same product_id", () => {
    const branches: Branch[] = [
      makeBranch(makeProduct("A", "Product A")),
      makeBranch(undefined, [makeBranch(makeProduct("A", "Product A"))]),
    ];

    const result = collectProducts(branches);

    expect(result).toHaveLength(1);
    expect(result[0].product_id).toBe("A");
  });

  it("deduplicates across multiple nesting levels", () => {
    const branches: Branch[] = [
      makeBranch(makeProduct("X", "Product X"), [
        makeBranch(makeProduct("X", "Product X")),
        makeBranch(makeProduct("Y", "Product Y"), [
          makeBranch(makeProduct("X", "Product X")),
        ]),
      ]),
    ];

    const result = collectProducts(branches);

    expect(result).toHaveLength(2);
    expect(result.map((p) => p.product_id).sort()).toEqual(["X", "Y"]);
  });

  it("keeps first occurrence when names differ for same product_id", () => {
    const branches: Branch[] = [
      makeBranch(makeProduct("A", "First Name")),
      makeBranch(makeProduct("A", "Second Name")),
    ];

    const result = collectProducts(branches);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("First Name");
  });

  it("returns empty array for branches with no products", () => {
    const branches: Branch[] = [makeBranch(undefined), makeBranch(undefined)];

    const result = collectProducts(branches);

    expect(result).toHaveLength(0);
  });

  it("returns empty array for empty input", () => {
    expect(collectProducts([])).toEqual([]);
  });
});
