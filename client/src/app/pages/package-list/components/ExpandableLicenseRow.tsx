import type React from "react";
import { Skeleton } from "@patternfly/react-core";
import spacing from "@patternfly/react-styles/css/utilities/Spacing/spacing";
import { List, ListItem } from "@patternfly/react-core";
import { ExpandableRowContent, Td, Tr } from "@patternfly/react-table";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { TableCellError } from "@app/components/TableCellError";
import { useFetchPackageById } from "@app/queries/packages";

interface ExpandableLicenseRowProps {
  packageId: string;
  isExpanded: boolean;
}

export const ExpandableLicenseRow: React.FC<ExpandableLicenseRowProps> = ({
  packageId,
  isExpanded,
}) => {
  const { pkg, isFetching, fetchError } = useFetchPackageById(packageId);

  if (!isExpanded) return null;

  console.log("Fetched package:", pkg);

  return (
    <LoadingWrapper
      isFetching={isFetching}
      fetchError={fetchError}
      isFetchingState={<Skeleton screenreaderText="Loading contents" />}
      fetchErrorState={(error) => <TableCellError error={error} />}
    >
      <List isPlain>
        {pkg?.licenses?.map((license, idx) => (
          <ListItem key={`${license.license_name}-${idx}`}>
            {license.license_name}
          </ListItem>
        ))}
      </List>
    </LoadingWrapper>
  );
};
