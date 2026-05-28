/** CSAF Vulnerabilities tab rendering per-CVE cards sorted by severity. */
import React from "react";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import type { CsafDocument, CsafVulnerability } from "@app/types/csaf";

import { CsafVulnerabilityCard } from "./components/csaf-vulnerability-card";

interface CsafVulnerabilitiesProps {
  csafDocument: CsafDocument;
}

const SEVERITY_ORDER: Record<string, number> = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
  NONE: 4,
};

/** Sorts vulnerabilities by CVSS severity, critical first. */
function sortBySeverity(
  vulnerabilities: CsafVulnerability[],
): CsafVulnerability[] {
  return [...vulnerabilities].sort((a, b) => {
    const aSev = a.scores?.[0]?.cvss_v3?.baseSeverity?.toUpperCase() || "NONE";
    const bSev = b.scores?.[0]?.cvss_v3?.baseSeverity?.toUpperCase() || "NONE";
    return (SEVERITY_ORDER[aSev] ?? 5) - (SEVERITY_ORDER[bSev] ?? 5);
  });
}

/** Builds product ID to display name map from full_product_names. */
function buildProductNameMap(csafDocument: CsafDocument): Map<string, string> {
  const map = new Map<string, string>();
  const products = csafDocument.product_tree?.full_product_names;
  if (products) {
    for (const p of products) {
      map.set(p.product_id, p.name);
    }
  }
  return map;
}

export const CsafVulnerabilities: React.FC<CsafVulnerabilitiesProps> = ({
  csafDocument,
}) => {
  const vulnerabilities = csafDocument.vulnerabilities;

  const sorted = React.useMemo(
    () => (vulnerabilities ? sortBySeverity(vulnerabilities) : []),
    [vulnerabilities],
  );

  const productNameMap = React.useMemo(
    () => buildProductNameMap(csafDocument),
    [csafDocument],
  );

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
    <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
      {sorted.map((vuln, i) => (
        <FlexItem key={vuln.cve || `vuln-${i}`}>
          <CsafVulnerabilityCard
            vulnerability={vuln}
            productNameMap={productNameMap}
          />
        </FlexItem>
      ))}
    </Flex>
  );
};
