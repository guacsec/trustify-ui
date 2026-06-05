import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Branch, FullProductName } from "@app/specs/csaf/csaf-v2.0-schema";

import { collectProducts, linkifyDetails } from "./csaf-utils";

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

describe("linkifyDetails", () => {
  it("converts a URL in text to a link", () => {
    const text = "Visit https://example.com for more info";
    const { container } = render(<div>{linkifyDetails(text)}</div>);

    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("https://example.com");
    expect(link?.textContent).toBe("https://example.com");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("handles text with no URLs", () => {
    const text = "This is plain text without any URLs";
    const { container } = render(<div>{linkifyDetails(text)}</div>);

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(0);
    expect(container.textContent).toBe(text);
  });

  it("handles multiple URLs in one string", () => {
    const text = "Check https://example.com and https://test.org";
    const { container } = render(<div>{linkifyDetails(text)}</div>);

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(2);
    expect(links[0].textContent).toBe("https://example.com");
    expect(links[1].textContent).toBe("https://test.org");
  });

  it("linkifies correctly on consecutive calls (global regex lastIndex bug)", () => {
    const text = "Visit https://example.com for details";

    const result1 = render(<div>{linkifyDetails(text)}</div>);
    const link1 = result1.container.querySelector("a");
    expect(link1).toBeTruthy();
    expect(link1?.textContent).toBe("https://example.com");
    result1.unmount();

    const result2 = render(<div>{linkifyDetails(text)}</div>);
    const link2 = result2.container.querySelector("a");
    expect(link2).toBeTruthy();
    expect(link2?.textContent).toBe("https://example.com");
    result2.unmount();

    const result3 = render(<div>{linkifyDetails(text)}</div>);
    const link3 = result3.container.querySelector("a");
    expect(link3).toBeTruthy();
    expect(link3?.textContent).toBe("https://example.com");
    result3.unmount();
  });
});
