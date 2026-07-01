import type React from "react";

import type { SbomAdvisorySummary } from "@app/client";
import { VulnerabilityGallery } from "@app/components/VulnerabilityGallery";
import type { ExtendedSeverity } from "@app/api/models";

interface SBOMVulnerabilitiesProps {
  advisories?: SbomAdvisorySummary | null;
}

const DEFAULT_SEVERITIES: { [key in ExtendedSeverity]: number } = {
  unknown: 0,
  none: 0,
  low: 0,
  medium: 0,
  high: 0,
  critical: 0,
};

export const SBOMVulnerabilities: React.FC<SBOMVulnerabilitiesProps> = ({
  advisories,
}) => {
  const severities = { ...DEFAULT_SEVERITIES, ...advisories };

  return <VulnerabilityGallery severities={severities} />;
};
