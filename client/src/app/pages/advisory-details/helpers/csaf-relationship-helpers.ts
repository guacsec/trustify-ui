/** Helpers for transforming CSAF relationship data into ECharts tree format. */
import type { CsafFullProductName, CsafRelationship } from "@app/types/csaf";

import type { EChartsTreeNode } from "./csaf-tree-helpers";

/** Color mapping for CSAF relationship categories. */
export const RELATIONSHIP_CATEGORY_COLORS: Record<string, string> = {
  default_component_of: "#0066CC",
  external_component_of: "#4CB140",
  installed_on: "#EC7A08",
  installed_with: "#6753AC",
  optional_component_of: "#009596",
};

/** Builds a product ID to display name lookup map. */
function buildProductNameMap(
  fullProductNames?: CsafFullProductName[],
): Map<string, string> {
  const map = new Map<string, string>();
  if (fullProductNames) {
    for (const product of fullProductNames) {
      map.set(product.product_id, product.name);
    }
  }
  return map;
}

/** Resolves a product ID to its display name, falling back to the ID. */
function resolveProductName(
  productId: string,
  nameMap: Map<string, string>,
): string {
  return nameMap.get(productId) || productId;
}

/** Transforms CSAF relationships into an ECharts tree grouped by relates_to_product_reference. */
export function transformRelationshipsToTreeData(
  relationships: CsafRelationship[],
  fullProductNames?: CsafFullProductName[],
): EChartsTreeNode {
  const nameMap = buildProductNameMap(fullProductNames);
  const groups = new Map<string, CsafRelationship[]>();

  for (const rel of relationships) {
    const key = rel.relates_to_product_reference;
    const existing = groups.get(key);
    if (existing) {
      existing.push(rel);
    } else {
      groups.set(key, [rel]);
    }
  }

  const children: EChartsTreeNode[] = [];
  for (const [parentId, rels] of groups) {
    const parentNode: EChartsTreeNode = {
      name: resolveProductName(parentId, nameMap),
      value: parentId,
      children: rels.map((rel) => ({
        name: resolveProductName(rel.product_reference, nameMap),
        value: rel.category,
        itemStyle: {
          color: RELATIONSHIP_CATEGORY_COLORS[rel.category] || "#8A8D90",
        },
      })),
    };
    children.push(parentNode);
  }

  return {
    name: "Relationships",
    children,
  };
}
