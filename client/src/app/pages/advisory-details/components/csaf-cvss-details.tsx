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
  const [isExpanded, setIsExpanded] = React.useState(false);

  const metrics: { label: string; value?: string }[] = [
    { label: "Attack Vector", value: cvss.attackVector },
    { label: "Attack Complexity", value: cvss.attackComplexity },
    { label: "Privileges Required", value: cvss.privilegesRequired },
    { label: "User Interaction", value: cvss.userInteraction },
    { label: "Scope", value: cvss.scope },
    { label: "Confidentiality Impact", value: cvss.confidentialityImpact },
    { label: "Integrity Impact", value: cvss.integrityImpact },
    { label: "Availability Impact", value: cvss.availabilityImpact },
    { label: "Vector String", value: cvss.vectorString },
  ];

  return (
    <ExpandableSection
      toggleText={isExpanded ? "Hide CVSS details" : "Show CVSS details"}
      onToggle={(_event, expanded) => setIsExpanded(expanded)}
      isExpanded={isExpanded}
    >
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
