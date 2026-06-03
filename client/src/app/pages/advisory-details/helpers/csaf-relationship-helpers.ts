import type {
  FullProductName,
  Relationship,
} from "@app/specs/csaf/csaf-v2.0-schema";

import type { EChartsTreeNode } from "./csaf-tree-helpers";

export const RELATIONSHIP_CATEGORY_COLORS: Record<string, string> = {
  default_component_of: "#C9190B",
  external_component_of: "#EC7A08",
  installed_on: "#3E8635",
  installed_with: "#004B95",
  optional_component_of: "#8A8D90",
};

function buildProductNameMap(
  fullProductNames?: FullProductName[],
): Map<string, string> {
  const map = new Map<string, string>();
  if (fullProductNames) {
    for (const product of fullProductNames) {
      map.set(product.product_id, product.name);
    }
  }
  return map;
}

function resolveProductName(
  productId: string,
  nameMap: Map<string, string>,
): string {
  return nameMap.get(productId) || productId;
}

export function transformRelationshipsToTreeData(
  relationships: Relationship[],
  fullProductNames?: FullProductName[],
): EChartsTreeNode {
  const nameMap = buildProductNameMap(fullProductNames);
  const groups = new Map<string, Relationship[]>();

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
      itemStyle: {
        color: "#EC7A08",
        borderColor: "#EC7A08",
      },
      children: rels.map((rel) => ({
        name: resolveProductName(rel.product_reference, nameMap),
        value: rel.product_reference,
        itemStyle: {
          color: RELATIONSHIP_CATEGORY_COLORS[rel.category] || "#8A8D90",
          borderColor: RELATIONSHIP_CATEGORY_COLORS[rel.category] || "#8A8D90",
        },
      })),
    };
    children.push(parentNode);
  }

  return {
    name: "Relationships",
    itemStyle: {
      color: "#C9190B",
      borderColor: "#C9190B",
    },
    children,
  };
}
