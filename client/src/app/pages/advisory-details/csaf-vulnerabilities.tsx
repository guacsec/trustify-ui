import React from "react";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import type { Vulnerability } from "@app/specs/csaf/csaf-v2.0-schema";

import { CsafVulnerabilityCard } from "./components/csaf-vulnerabilities-tab/VulnerabilityCard";
import { CsafContext } from "./csaf-context";
import type { CvssV3 } from "./helpers/csaf-utils";
import { severityOrderOf } from "./helpers/csaf-utils";

const sortBySeverity = (vulnerabilities: Vulnerability[]): Vulnerability[] => {
  return [...vulnerabilities].sort((a, b) => {
    const aCvss = a.scores?.[0]?.cvss_v3 as CvssV3 | undefined;
    const bCvss = b.scores?.[0]?.cvss_v3 as CvssV3 | undefined;
    const aSev = aCvss?.baseSeverity ?? "NONE";
    const bSev = bCvss?.baseSeverity ?? "NONE";
    return severityOrderOf(aSev) - severityOrderOf(bSev);
  });
};

export const CsafVulnerabilities: React.FC = () => {
  const { csaf, productNameMap } = React.useContext(CsafContext);
  const vulnerabilities = csaf?.vulnerabilities;

  const sortedVulnerabilities = React.useMemo(
    () => (vulnerabilities ? sortBySeverity(vulnerabilities) : []),
    [vulnerabilities],
  );

  if (sortedVulnerabilities.length === 0) {
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
      {sortedVulnerabilities.map((vuln, i) => (
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
