import { describe, expect, it } from "vitest";

import type { Branch, Relationship } from "./types";
import { collectProducts, collectRelationshipProducts } from "./utils";

describe("collectProducts", () => {
  /** Verifies that a nested branch tree (3+ levels) is flattened into a product map. */
  it("should flatten a nested branch tree into a product map", () => {
    // Given a 3-level branch tree with products at leaf nodes
    const branches: Branch[] = [
      {
        category: "vendor",
        name: "Red Hat",
        branches: [
          {
            category: "product_family",
            name: "Enterprise Linux",
            branches: [
              {
                category: "product_version",
                name: "RHEL 8",
                product: {
                  name: "Red Hat Enterprise Linux 8",
                  product_id: "rhel-8",
                },
              },
              {
                category: "product_version",
                name: "RHEL 9",
                product: {
                  name: "Red Hat Enterprise Linux 9",
                  product_id: "rhel-9",
                },
              },
            ],
          },
          {
            category: "product_family",
            name: "OpenShift",
            branches: [
              {
                category: "product_version",
                name: "OCP 4.14",
                product: {
                  name: "Red Hat OpenShift Container Platform 4.14",
                  product_id: "ocp-4.14",
                },
              },
            ],
          },
        ],
      },
    ];

    // When collecting products
    const result = collectProducts(branches);

    // Then all leaf products are in the map
    expect(result.size).toBe(3);
    expect(result.get("rhel-8")).toBe("Red Hat Enterprise Linux 8");
    expect(result.get("rhel-9")).toBe("Red Hat Enterprise Linux 9");
    expect(result.get("ocp-4.14")).toBe(
      "Red Hat OpenShift Container Platform 4.14",
    );
  });

  /** Verifies that an empty branch array returns an empty map. */
  it("should return an empty map for empty branches", () => {
    const result = collectProducts([]);
    expect(result.size).toBe(0);
  });

  /** Verifies that branches without products are skipped. */
  it("should handle branches with no leaf products", () => {
    // Given branches that contain only intermediate nodes (no product fields)
    const branches: Branch[] = [
      {
        category: "vendor",
        name: "Red Hat",
        branches: [
          {
            category: "product_family",
            name: "Enterprise Linux",
          },
        ],
      },
    ];

    // When collecting products
    const result = collectProducts(branches);

    // Then the map is empty
    expect(result.size).toBe(0);
  });
});

describe("collectRelationshipProducts", () => {
  /** Verifies that valid relationships are resolved to product names. */
  it("should map relationship references to product names", () => {
    // Given a product map and relationships referencing known products
    const productMap = new Map([
      ["prod-1", "Product One"],
      ["prod-2", "Product Two"],
    ]);
    const relationships: Relationship[] = [
      {
        category: "default_component_of",
        full_product_name: { name: "Component A", product_id: "comp-a" },
        product_reference: "prod-1",
        relates_to_product_reference: "prod-2",
      },
    ];

    // When collecting relationship products
    const result = collectRelationshipProducts(relationships, productMap);

    // Then the full_product_name is returned with its name
    expect(result).toHaveLength(1);
    expect(result[0].product_id).toBe("comp-a");
    expect(result[0].name).toBe("Component A");
  });

  /** Verifies that undefined relationships return an empty array. */
  it("should return empty array for undefined relationships", () => {
    const productMap = new Map<string, string>();
    const result = collectRelationshipProducts(undefined, productMap);
    expect(result).toEqual([]);
  });

  /** Verifies that missing product references fall back to full_product_name.name. */
  it("should use full_product_name when product not in map", () => {
    // Given a relationship with a product_id not in the map
    const productMap = new Map<string, string>();
    const relationships: Relationship[] = [
      {
        category: "installed_on",
        full_product_name: { name: "Fallback Name", product_id: "unknown-id" },
        product_reference: "ref-1",
        relates_to_product_reference: "ref-2",
      },
    ];

    // When collecting relationship products
    const result = collectRelationshipProducts(relationships, productMap);

    // Then the fallback name from full_product_name is used
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Fallback Name");
    expect(result[0].product_id).toBe("unknown-id");
  });
});
