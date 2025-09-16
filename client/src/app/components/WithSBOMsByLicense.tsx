import type React from "react";

import type { AxiosError } from "axios";
import { useFetchSBOMsByLicense } from "@app/queries/sboms";

export interface WithSBOMsByLicenseProps {
  licenseId: string;
  children: (
    totalSBOMs: number | undefined,
    isFetching: boolean,
    fetchError?: AxiosError | null,
  ) => React.ReactNode;
}

export const WithSBOMsByLicense: React.FC<WithSBOMsByLicenseProps> = ({
  licenseId,
  children,
}) => {
  const { result, isFetching, fetchError } = useFetchSBOMsByLicense(licenseId);

  return <>{children(result?.total, isFetching, fetchError)}</>;
};
