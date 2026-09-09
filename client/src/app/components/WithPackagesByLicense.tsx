import type React from "react";

import type { AxiosError } from "axios";
import { useFetchPackages } from "@app/queries/packages";

export interface WithPackagesByLicenseProps {
  licenseId: string;
  children: (
    totalPackages: number | undefined,
    isFetching: boolean,
    fetchError?: AxiosError | null,
  ) => React.ReactNode;
}

export const WithPackagesByLicense: React.FC<WithPackagesByLicenseProps> = ({
  licenseId,
  children,
}) => {
  const { result, isFetching, fetchError } = useFetchPackages({
    filters: [{ field: "license", operator: "=", value: licenseId }],
    page: { itemsPerPage: 0, pageNumber: 1 },
    total: true,
  });

  return <>{children(result?.total, isFetching, fetchError)}</>;
};
