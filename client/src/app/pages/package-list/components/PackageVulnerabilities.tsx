import type React from "react";

import { VulnerabilityGallery } from "@app/components/VulnerabilityGallery";
import { useVulnerabilitiesOfPackage } from "@app/hooks/domain-controls/useVulnerabilitiesOfPackage";
import type { PurlDetails } from "@app/client";

interface PackageVulnerabilitiesProps {
  pkg: PurlDetails | undefined;
}

export const PackageVulnerabilities: React.FC<PackageVulnerabilitiesProps> = ({
  pkg,
}) => {
  const { data } = useVulnerabilitiesOfPackage(pkg);

  if (!data?.summary?.vulnerabilityStatus?.affected?.severities) {
    return null;
  }

  return (
    <VulnerabilityGallery
      severities={data.summary.vulnerabilityStatus.affected.severities}
    />
  );
};
