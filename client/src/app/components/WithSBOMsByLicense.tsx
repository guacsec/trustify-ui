import type React from "react";

import { useFetchSBOMs } from "@app/queries/sboms";
import type { AxiosError } from "axios";

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
  const { result, isFetching, fetchError } = useFetchSBOMs(
    null,
    {
      filters: [{ field: "license", operator: "=", value: licenseId }],
      page: { itemsPerPage: 1, pageNumber: 1 },
    },
    [],
  );

  return <>{children(result?.total, isFetching, fetchError)}</>;
};
