import type { LabelProps } from "@patternfly/react-core";

import type {
  Branch,
  FullProductName,
  ProductTree,
} from "@app/specs/csaf/csaf-v2.0-schema";

export const csafStatusColor = (status: string): LabelProps["color"] => {
  switch (status.toLowerCase()) {
    case "final":
      return "green";
    case "draft":
      return "orangered";
    case "interim":
      return "blue";
    default:
      return "grey";
  }
};

export const collectProducts = (
  branches: Branch[],
  result: FullProductName[] = [],
): FullProductName[] => {
  for (const branch of branches) {
    if (branch.product) {
      result.push(branch.product);
    }
    if (branch.branches) {
      collectProducts(branch.branches, result);
    }
  }
  return result;
};

export const collectRelationshipProducts = (
  tree: ProductTree,
): FullProductName[] => {
  if (!tree.relationships) return [];
  return tree.relationships.map((r) => r.full_product_name);
};
