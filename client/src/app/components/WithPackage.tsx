import type React from "react";

import { useFetchPackageById } from "@app/queries/packages";
import type { PurlDetails } from "@app/client/types.gen";
import type { AxiosError } from "axios";

export interface WithPackageProps {
  packageId: string;
  children: (
    pkg: PurlDetails | undefined,
    isFetching: boolean,
    fetchError?: AxiosError | null,
  ) => React.ReactNode;
}

export const WithPackage: React.FC<WithPackageProps> = ({
  packageId,
  children,
}) => {
  const { pkg, isFetching, fetchError } = useFetchPackageById(packageId);

  return <>{children(pkg, isFetching, fetchError)}</>;
};
