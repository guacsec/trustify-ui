import type { Branch, Relationship } from "@app/specs/csaf/csaf-v2.0-schema";

import {
  BRANCH_CATEGORY_COLORS,
  type EChartsTreeNode,
} from "./csaf-tree-helpers";

export const RELATIONSHIP_CATEGORY_COLORS: Record<string, string> = {
  default_component_of: "#C9190B",
  external_component_of: "#EC7A08",
  installed_on: "#3E8635",
  installed_with: "#004B95",
  optional_component_of: "#8A8D90",
};

export const RELATIONSHIP_LINE_STYLES: Record<string, string> = {
  default_component_of: "solid",
  external_component_of: "solid",
  installed_on: "dashed",
  installed_with: "dashed",
  optional_component_of: "dotted",
};

const buildProductIdMap = (
  branches: Branch[],
): Map<string, { name: string; category: string }> => {
  const map = new Map<string, { name: string; category: string }>();

  const walk = (b: Branch) => {
    if (b.product) {
      map.set(b.product.product_id, { name: b.name, category: b.category });
    }
    b.branches?.forEach(walk);
  };

  branches.forEach(walk);
  return map;
};

const findVendorName = (branches: Branch[]): string => {
  const vendor = branches.find((b) => b.category === "vendor");
  return vendor?.name ?? "Root";
};

export const transformRelationshipsToTreeData = (
  relationships: Relationship[],
  branches: Branch[],
): EChartsTreeNode => {
  const productMap = buildProductIdMap(branches);
  const vendorName = findVendorName(branches);

  const byRelatesToProduct = new Map<string, Relationship[]>();
  for (const rel of relationships) {
    const key = rel.relates_to_product_reference;
    const existing = byRelatesToProduct.get(key);
    if (existing) {
      existing.push(rel);
    } else {
      byRelatesToProduct.set(key, [rel]);
    }
  }

  const productNodes: EChartsTreeNode[] = [];

  for (const [relatesToId, rels] of byRelatesToProduct) {
    const relatesToInfo = productMap.get(relatesToId);
    const relatesToName = relatesToInfo?.name ?? relatesToId;
    const relatesToColor =
      BRANCH_CATEGORY_COLORS[relatesToInfo?.category ?? ""] ?? "#0066CC";

    const byComponent = new Map<string, Relationship[]>();
    for (const rel of rels) {
      const compKey = rel.product_reference;
      const existing = byComponent.get(compKey);
      if (existing) {
        existing.push(rel);
      } else {
        byComponent.set(compKey, [rel]);
      }
    }

    const relationshipNodes: EChartsTreeNode[] = [];

    for (const [componentId, compRels] of byComponent) {
      const componentInfo = productMap.get(componentId);
      const componentName = componentInfo?.name ?? componentId;

      for (const rel of compRels) {
        const relColor =
          RELATIONSHIP_CATEGORY_COLORS[rel.category] ?? "#8A8D90";
        const relLineType = RELATIONSHIP_LINE_STYLES[rel.category] ?? "solid";
        const componentColor =
          BRANCH_CATEGORY_COLORS[componentInfo?.category ?? ""] ?? "#5752D1";

        relationshipNodes.push({
          name: rel.full_product_name.name,
          value: rel.full_product_name.product_id,
          lineStyle: { color: relColor, type: relLineType },
          itemStyle: { color: relColor, borderColor: relColor },
          children: [
            {
              name: componentName,
              value: componentId,
              itemStyle: {
                color: componentColor,
                borderColor: componentColor,
              },
            },
          ],
        });
      }
    }

    productNodes.push({
      name: relatesToName,
      value: relatesToId,
      itemStyle: { color: relatesToColor, borderColor: relatesToColor },
      children: relationshipNodes,
      collapsed: relationshipNodes.length > 15,
    });
  }

  return {
    name: vendorName,
    itemStyle: {
      color: BRANCH_CATEGORY_COLORS.vendor,
      borderColor: BRANCH_CATEGORY_COLORS.vendor,
    },
    children: productNodes,
  };
};
