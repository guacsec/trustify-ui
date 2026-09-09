import type React from "react";

import type { RequestedFieldHashMapHashMap } from "@app/client";
import { VulnerabilityGallery } from "@app/components/VulnerabilityGallery";

interface SBOMVulnerabilitiesProps {
  advisories?: RequestedFieldHashMapHashMap;
}

export const SBOMVulnerabilities: React.FC<SBOMVulnerabilitiesProps> = ({
  advisories,
}) => <VulnerabilityGallery severities={advisories ?? {}} />;
