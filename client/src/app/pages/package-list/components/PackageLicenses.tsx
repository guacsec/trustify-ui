import type React from "react";
import { Skeleton } from "@patternfly/react-core";
import { NavLink, generatePath } from "react-router-dom";

import { Paths } from "@app/Routes";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { TableCellError } from "@app/components/TableCellError";
import { useFetchPackageById } from "@app/queries/packages";

interface PackageLicensesProps {
  packageId: string;
}

export const PackageLicenses: React.FC<PackageLicensesProps> = ({
  packageId,
}) => {
  const { pkg, isFetching, fetchError } =
    useFetchPackageById(packageId);

  return (
    <LoadingWrapper
      isFetching={isFetching}
      fetchError={fetchError}
      isFetchingState={<Skeleton screenreaderText="Loading contents" />}
      fetchErrorState={(error) => <TableCellError error={error} />}
    >
      <NavLink
          to={generatePath(Paths.packageDetails, {
            packageId: pkg?.uuid || "",
          })}
      >
        {(pkg?.licenses?.length ?? 0)} {(pkg?.licenses?.length ?? 0) > 1 ? "Licenses" : "License"}
      </NavLink>
    </LoadingWrapper>
  );
};
