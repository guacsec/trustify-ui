import type React from "react";

import type { AxiosError } from "axios";
import { useFetchSBOMs } from "@app/queries/sboms";

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
    {
      filters: [{ field: "license", operator: "=", value: licenseId }],
      page: { itemsPerPage: 1, pageNumber: 1 },
    },
    [],
  );

  return <>{children(result?.total, isFetching, fetchError)}</>;
};
