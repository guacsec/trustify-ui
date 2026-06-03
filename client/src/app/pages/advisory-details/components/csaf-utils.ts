import { ExtendedSeverity } from "@app/api/models";
import {
  Branch,
  FullProductName,
  ProductTree,
} from "@app/specs/csaf/csaf-v2.0-schema";
import { LabelProps } from "@patternfly/react-core";

export const csafSeverityToExtendedSeverity = (
  text: string,
): ExtendedSeverity => {
  switch (text.toLowerCase()) {
    case "critical":
      return "critical";
    case "important":
    case "high":
      return "high";
    case "moderate":
    case "medium":
      return "medium";
    case "low":
      return "low";
    case "none":
      return "none";
    default:
      return "unknown";
  }
};

export const csafSstatusColor = (status: string): LabelProps["color"] => {
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
