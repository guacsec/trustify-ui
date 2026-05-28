import { describe, expect, it } from "vitest";

import { collectProducts, collectRelationshipProducts } from "./utils";
import type { Branch, Relationship } from "./types";

describe("collectProducts", () => {
  /** Verifies that a 3-level nested branch tree is flattened into a product map. */
  it("flattens a nested branch tree (3+ levels deep)", () => {
    // Given a branch tree with vendor → family → product version
    const branches: Branch[] = [
      {
        category: "vendor",
        name: "Red Hat",
        branches: [
          {
            category: "product_family",
            name: "Red Hat Enterprise Linux",
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
        ],
      },
      {
        category: "vendor",
        name: "Fedora",
        product: {
          name: "Fedora 40",
          product_id: "fedora-40",
        },
      },
    ];

    // When collecting products
    const result = collectProducts(branches);

    // Then all leaf products are in the map
    expect(result.size).toBe(3);
    expect(result.get("rhel-8")).toBe("Red Hat Enterprise Linux 8");
    expect(result.get("rhel-9")).toBe("Red Hat Enterprise Linux 9");
    expect(result.get("fedora-40")).toBe("Fedora 40");
  });

  /** Verifies that an empty branch array returns an empty map. */
  it("returns an empty map for empty branches", () => {
    const result = collectProducts([]);
    expect(result.size).toBe(0);
  });

  /** Verifies that undefined branches return an empty map. */
  it("returns an empty map for undefined branches", () => {
    const result = collectProducts(undefined);
    expect(result.size).toBe(0);
  });

  /** Verifies that branches without product leaves are skipped. */
  it("handles branches with no product leaves", () => {
    const branches: Branch[] = [
      {
        category: "vendor",
        name: "Empty Vendor",
        branches: [
          {
            category: "product_family",
            name: "Empty Family",
          },
        ],
      },
    ];

    const result = collectProducts(branches);
    expect(result.size).toBe(0);
  });
});

describe("collectRelationshipProducts", () => {
  /** Verifies that relationships are mapped to resolved product names. */
  it("maps relationship references to product names", () => {
    // Given relationships and a product map
    const relationships: Relationship[] = [
      {
        category: "default_component_of",
        product_reference: "openssl-1.1",
        relates_to_product_reference: "rhel-8",
        full_product_name: {
          name: "OpenSSL 1.1 as component of RHEL 8",
          product_id: "openssl-in-rhel8",
        },
      },
    ];

    const productMap = new Map<string, string>([
      ["openssl-1.1", "OpenSSL 1.1.1k"],
      ["rhel-8", "Red Hat Enterprise Linux 8"],
    ]);

    // When collecting relationship products
    const result = collectRelationshipProducts(relationships, productMap);

    // Then references are resolved to names
    expect(result).toHaveLength(1);
    expect(result[0].productReferenceName).toBe("OpenSSL 1.1.1k");
    expect(result[0].relatesToProductReferenceName).toBe(
      "Red Hat Enterprise Linux 8",
    );
    expect(result[0].category).toBe("default_component_of");
    expect(result[0].fullProductName).toBe(
      "OpenSSL 1.1 as component of RHEL 8",
    );
  });

  /** Verifies graceful degradation when product references are not in the map. */
  it("falls back to raw IDs for missing product references", () => {
    // Given a relationship with references not in the product map
    const relationships: Relationship[] = [
      {
        category: "installed_on",
        product_reference: "unknown-component",
        relates_to_product_reference: "unknown-target",
        full_product_name: {
          name: "Unknown Component on Unknown Target",
          product_id: "unknown-combo",
        },
      },
    ];

    const productMap = new Map<string, string>();

    // When collecting relationship products
    const result = collectRelationshipProducts(relationships, productMap);

    // Then raw IDs are used as fallback names
    expect(result).toHaveLength(1);
    expect(result[0].productReferenceName).toBe("unknown-component");
    expect(result[0].relatesToProductReferenceName).toBe("unknown-target");
  });

  /** Verifies that undefined relationships return an empty array. */
  it("returns empty array for undefined relationships", () => {
    const result = collectRelationshipProducts(
      undefined,
      new Map<string, string>(),
    );
    expect(result).toHaveLength(0);
  });
});
