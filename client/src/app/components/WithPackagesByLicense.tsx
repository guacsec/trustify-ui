import type React from "react";

import type { AxiosError } from "axios";
import { useFetchPackagesByLicense } from "@app/queries/packages";

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
  const { result, isFetching, fetchError } =
    useFetchPackagesByLicense(licenseId);

  return <>{children(result?.total, isFetching, fetchError)}</>;
};
