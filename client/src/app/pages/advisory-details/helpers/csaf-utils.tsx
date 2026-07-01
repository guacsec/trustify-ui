import type React from "react";

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

export type CsafBaseSeverityType =
  | "critical"
  | "important"
  | "high"
  | "moderate"
  | "medium"
  | "low"
  | "none"
  | "unknown";

type CsafBaseSeverityListType = {
  [key in CsafBaseSeverityType]: {
    color: string;
  };
};

export const csafBaseSeverityList: CsafBaseSeverityListType = {
  critical: {
    color: "#C9190B",
  },
  important: {
    color: "#EC7A08",
  },
  high: {
    color: "#EC7A08",
  },
  moderate: {
    color: "#F0AB00",
  },
  medium: {
    color: "#F0AB00",
  },
  low: {
    color: "#0066CC",
  },
  none: {
    color: "#8A8D90",
  },
  unknown: {
    color: "#8A8D90",
  },
};

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

export type RemediationProps = {
  label: string;
  color: LabelProps["color"];
  order: number;
};

export const remediationList: Record<string, RemediationProps> = {
  vendor_fix: { label: "Vendor fix", color: "blue", order: 0 },
  workaround: { label: "Workaround", color: "yellow", order: 1 },
  none_available: { label: "None available", color: "orange", order: 2 },
  no_fix_planned: { label: "No fix planned", color: "red", order: 3 },
};

const defaultRemediationProps = (category: string): RemediationProps => ({
  label: category.replace(/_/g, " "),
  color: "grey",
  order: 99,
});

export const getRemediationProps = (category: string): RemediationProps =>
  remediationList[category] ?? defaultRemediationProps(category);

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

export const collectProducts = (branches: Branch[]): FullProductName[] => {
  const seen = new Map<string, FullProductName>();

  const walk = (nodes: Branch[]): void => {
    for (const branch of nodes) {
      if (branch.product && !seen.has(branch.product.product_id)) {
        seen.set(branch.product.product_id, branch.product);
      }
      if (branch.branches) {
        walk(branch.branches);
      }
    }
  };

  walk(branches);
  return Array.from(seen.values());
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

const URL_REGEX = /(https?:\/\/[^\s,)]+)/g;

export function linkifyDetails(text: string): React.ReactNode[] {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
}
