import React from "react";

import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import type { CvssV3 } from "../../helpers/csaf-utils";

interface ICvssDetailsProps {
  cvss: CvssV3;
}

export const CvssDetails: React.FC<ICvssDetailsProps> = ({ cvss }) => {
  const metrics: { label: string; value?: string; isCode?: boolean }[] = [
    { label: "Attack vector", value: cvss.attackVector },
    { label: "Attack complexity", value: cvss.attackComplexity },
    { label: "Privileges required", value: cvss.privilegesRequired },
    { label: "User interaction", value: cvss.userInteraction },
    { label: "Scope", value: cvss.scope },
    { label: "Confidentiality", value: cvss.confidentialityImpact },
    { label: "Integrity", value: cvss.integrityImpact },
    { label: "Availability", value: cvss.availabilityImpact },
    { label: "Vector string", value: cvss.vectorString, isCode: true },
  ];

  return (
    <DescriptionList isCompact isHorizontal>
      {metrics
        .filter((m) => m.value)
        .map((m) => (
          <DescriptionListGroup key={m.label}>
            <DescriptionListTerm>{m.label}</DescriptionListTerm>
            <DescriptionListDescription>
              {m.isCode ? <code>{m.value}</code> : m.value}
            </DescriptionListDescription>
          </DescriptionListGroup>
        ))}
    </DescriptionList>
  );
};
