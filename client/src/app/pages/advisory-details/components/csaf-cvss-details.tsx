/** Expandable CVSS v3 breakdown showing all scoring metrics. */
import React from "react";

import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  ExpandableSection,
} from "@patternfly/react-core";

import type { CsafCvssV3 } from "@app/types/csaf";

interface CsafCvssDetailsProps {
  cvss: CsafCvssV3;
}

export const CsafCvssDetails: React.FC<CsafCvssDetailsProps> = ({ cvss }) => {
  const metrics: { label: string; value?: string }[] = [
    { label: "Attack vector", value: cvss.attackVector },
    { label: "Attack complexity", value: cvss.attackComplexity },
    { label: "Privileges required", value: cvss.privilegesRequired },
    { label: "User interaction", value: cvss.userInteraction },
    { label: "Scope", value: cvss.scope },
    { label: "Confidentiality", value: cvss.confidentialityImpact },
    { label: "Integrity", value: cvss.integrityImpact },
    { label: "Availability", value: cvss.availabilityImpact },
    { label: "Vector string", value: cvss.vectorString },
  ];

  return (
    <ExpandableSection toggleText="CVSS v3 details">
      <DescriptionList isHorizontal isCompact>
        {metrics
          .filter((m) => m.value)
          .map((m) => (
            <DescriptionListGroup key={m.label}>
              <DescriptionListTerm>{m.label}</DescriptionListTerm>
              <DescriptionListDescription>{m.value}</DescriptionListDescription>
            </DescriptionListGroup>
          ))}
      </DescriptionList>
    </ExpandableSection>
  );
};
