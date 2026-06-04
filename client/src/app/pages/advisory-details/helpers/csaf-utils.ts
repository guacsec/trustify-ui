import type { LabelProps } from "@patternfly/react-core";

import { ExtendedSeverity } from "@app/api/models";
import type {
  Branch,
  CommonSecurityAdvisoryFramework,
  FullProductName,
  JSONSchemaForCommonVulnerabilityScoringSystemVersion30,
  JSONSchemaForCommonVulnerabilityScoringSystemVersion31,
  ProductTree,
} from "@app/specs/csaf/csaf-v2.0-schema";

export type CvssV3 =
  | JSONSchemaForCommonVulnerabilityScoringSystemVersion30
  | JSONSchemaForCommonVulnerabilityScoringSystemVersion31;

export const SEVERITY_ORDER: Record<string, number> = {
  critical: 0,
  important: 1,
  high: 1,
  moderate: 2,
  medium: 2,
  low: 3,
  none: 4,
  unknown: 99,
};

export const severityOrderOf = (s: string): number =>
  SEVERITY_ORDER[s.toLowerCase()] ?? 99;

export const normalizeCsafSeverityText = (text?: string): ExtendedSeverity => {
  switch (text?.toLowerCase()) {
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

const collectBranchProducts = (
  branches: Branch[],
  map: Map<string, string>,
): void => {
  for (const branch of branches) {
    if (branch.product) {
      map.set(branch.product.product_id, branch.product.name);
    }
    if (branch.branches) {
      collectBranchProducts(branch.branches, map);
    }
  }
};

export const buildProductNameMap = (
  csaf: CommonSecurityAdvisoryFramework,
): Map<string, string> => {
  const map = new Map<string, string>();
  const products = csaf.product_tree?.full_product_names;
  if (products) {
    for (const p of products) {
      map.set(p.product_id, p.name);
    }
  }
  if (csaf.product_tree?.branches) {
    collectBranchProducts(csaf.product_tree.branches, map);
  }
  return map;
};
