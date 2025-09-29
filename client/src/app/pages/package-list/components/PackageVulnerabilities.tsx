import type React from "react";

import { VulnerabilityGallery } from "@app/components/VulnerabilityGallery";
import { useVulnerabilitiesOfPackage } from "@app/hooks/domain-controls/useVulnerabilitiesOfPackage";
import type { PurlDetails } from "@app/client";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import type { AxiosError } from "axios";
import { Skeleton } from "@patternfly/react-core";
import { TableCellError } from "@app/components/TableCellError";

interface PackageVulnerabilitiesProps {
  pkg: PurlDetails | undefined;
  isFetching: boolean;
  fetchError: AxiosError | undefined;
}

export const PackageVulnerabilities: React.FC<PackageVulnerabilitiesProps> = ({
  pkg,
  isFetching,
  fetchError,
}) => {
  const { data } = useVulnerabilitiesOfPackage(pkg);

  if (!data || !data.summary?.vulnerabilityStatus?.affected?.severities) {
    return <span>-</span>;
  }

  return (
    <LoadingWrapper
      isFetching={isFetching}
      fetchError={fetchError}
      isFetchingState={<Skeleton screenreaderText="Loading contents" />}
      fetchErrorState={(error) => <TableCellError error={error} />}
    >
      <VulnerabilityGallery
        severities={data.summary.vulnerabilityStatus.affected.severities}
      />
    </LoadingWrapper>
  );
};
