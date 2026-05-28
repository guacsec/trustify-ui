import type { Branch, Product, ProductTree, Relationship } from "./types";

/** Flattens the recursive branch tree into a map of product_id to product name. */
export function collectProducts(
  branches: Branch[] | undefined,
): Map<string, string> {
  const products = new Map<string, string>();

  function walk(branchList: Branch[]) {
    for (const branch of branchList) {
      if (branch.product) {
        products.set(branch.product.product_id, branch.product.name);
      }
      if (branch.branches) {
        walk(branch.branches);
      }
    }
  }

  if (branches) {
    walk(branches);
  }

  return products;
}

/** Collects all product leaf nodes from a branch tree. */
export function collectProductNodes(branches: Branch[] | undefined): Product[] {
  const products: Product[] = [];

  function walk(branchList: Branch[]) {
    for (const branch of branchList) {
      if (branch.product) {
        products.push(branch.product);
      }
      if (branch.branches) {
        walk(branch.branches);
      }
    }
  }

  if (branches) {
    walk(branches);
  }

  return products;
}

/** Maps relationship references to resolved product names using the product map. */
export function collectRelationshipProducts(
  relationships: Relationship[] | undefined,
  productMap: Map<string, string>,
): {
  productReference: string;
  productReferenceName: string;
  relatesToProductReference: string;
  relatesToProductReferenceName: string;
  category: string;
  fullProductName: string;
}[] {
  if (!relationships) {
    return [];
  }

  return relationships.map((rel) => ({
    productReference: rel.product_reference,
    productReferenceName:
      productMap.get(rel.product_reference) ?? rel.product_reference,
    relatesToProductReference: rel.relates_to_product_reference,
    relatesToProductReferenceName:
      productMap.get(rel.relates_to_product_reference) ??
      rel.relates_to_product_reference,
    category: rel.category,
    fullProductName: rel.full_product_name.name,
  }));
}
