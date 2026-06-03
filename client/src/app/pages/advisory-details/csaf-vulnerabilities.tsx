import React from "react";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import type {
  Branch,
  CommonSecurityAdvisoryFramework,
  JSONSchemaForCommonVulnerabilityScoringSystemVersion30,
  JSONSchemaForCommonVulnerabilityScoringSystemVersion31,
  Vulnerability,
} from "@app/specs/csaf/csaf-v2.0-schema";

import { CsafVulnerabilityCard } from "./components/csaf-vulnerability-card";

type CvssV3 =
  | JSONSchemaForCommonVulnerabilityScoringSystemVersion30
  | JSONSchemaForCommonVulnerabilityScoringSystemVersion31;

interface CsafVulnerabilitiesProps {
  csaf: CommonSecurityAdvisoryFramework;
}

const SEVERITY_ORDER: Record<string, number> = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
  NONE: 4,
};

function sortBySeverity(vulnerabilities: Vulnerability[]): Vulnerability[] {
  return [...vulnerabilities].sort((a, b) => {
    const aCvss = a.scores?.[0]?.cvss_v3 as CvssV3 | undefined;
    const bCvss = b.scores?.[0]?.cvss_v3 as CvssV3 | undefined;
    const aSev = aCvss?.baseSeverity?.toUpperCase() || "NONE";
    const bSev = bCvss?.baseSeverity?.toUpperCase() || "NONE";
    return (SEVERITY_ORDER[aSev] ?? 5) - (SEVERITY_ORDER[bSev] ?? 5);
  });
}

function collectBranchProducts(branches: Branch[], map: Map<string, string>) {
  for (const branch of branches) {
    if (branch.product) {
      map.set(branch.product.product_id, branch.product.name);
    }
    if (branch.branches) {
      collectBranchProducts(branch.branches, map);
    }
  }
}

function buildProductNameMap(
  csaf: CommonSecurityAdvisoryFramework,
): Map<string, string> {
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
}

export const CsafVulnerabilities: React.FC<CsafVulnerabilitiesProps> = ({
  csaf,
}) => {
  const vulnerabilities = csaf.vulnerabilities;

  const sorted = React.useMemo(
    () => (vulnerabilities ? sortBySeverity(vulnerabilities) : []),
    [vulnerabilities],
  );

  const productNameMap = React.useMemo(() => buildProductNameMap(csaf), [csaf]);

  if (sorted.length === 0) {
    return (
      <EmptyState
        titleText="No vulnerabilities"
        headingLevel="h2"
        icon={CubesIcon}
        variant={EmptyStateVariant.sm}
      >
        <EmptyStateBody>
          This advisory does not contain vulnerability data.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <Stack hasGutter>
      {sorted.map((vuln, i) => (
        <StackItem key={vuln.cve || `vuln-${i}`}>
          <CsafVulnerabilityCard
            vulnerability={vuln}
            productNameMap={productNameMap}
          />
        </StackItem>
      ))}
    </Stack>
  );
};
