import type { Branch, Product, ProductTree, Relationship } from "./types";

/** Flattens the recursive branch tree into a map of product_id to product name. */
export function collectProducts(branches: Branch[]): Map<string, string> {
  const products = new Map<string, string>();

  function walkBranches(branchList: Branch[]) {
    for (const branch of branchList) {
      if (branch.product) {
        products.set(branch.product.product_id, branch.product.name);
      }
      if (branch.branches) {
        walkBranches(branch.branches);
      }
    }
  }

  walkBranches(branches);
  return products;
}

/** Maps relationship references to resolved product names for display. */
export function collectRelationshipProducts(
  relationships: Relationship[] | undefined,
  productMap: Map<string, string>,
): { name: string; product_id: string }[] {
  if (!relationships) return [];

  return relationships.map((r) => ({
    name:
      productMap.get(r.full_product_name.product_id) ??
      r.full_product_name.name,
    product_id: r.full_product_name.product_id,
  }));
}

/** Collects all leaf products from a product tree, combining branch and relationship products. */
export function collectAllProducts(tree: ProductTree): Product[] {
  const products: Product[] = [];

  function walkBranches(branches: Branch[]) {
    for (const branch of branches) {
      if (branch.product) {
        products.push(branch.product);
      }
      if (branch.branches) {
        walkBranches(branch.branches);
      }
    }
  }

  walkBranches(tree.branches);
  return products;
}
