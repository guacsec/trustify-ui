import React from "react";

import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import type {
  JSONSchemaForCommonVulnerabilityScoringSystemVersion30,
  JSONSchemaForCommonVulnerabilityScoringSystemVersion31,
} from "@app/specs/csaf/csaf-v2.0-schema";

type CvssV3 =
  | JSONSchemaForCommonVulnerabilityScoringSystemVersion30
  | JSONSchemaForCommonVulnerabilityScoringSystemVersion31;

interface CsafCvssDetailsProps {
  cvss: CvssV3;
}

export const CsafCvssDetails: React.FC<CsafCvssDetailsProps> = ({ cvss }) => {
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
              {m.isCode ? (
                <code
                  style={{
                    fontSize: "var(--pf-v6-global--FontSize--xs)",
                  }}
                >
                  {m.value}
                </code>
              ) : (
                m.value
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
        ))}
    </DescriptionList>
  );
};
