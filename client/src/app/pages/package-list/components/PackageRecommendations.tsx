import type React from "react";
import { Label, Skeleton } from "@patternfly/react-core";
import type { AxiosError } from "axios";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { TableCellError } from "@app/components/TableCellError";
import type { RecommendEntry } from "@app/client";
import { purlBaseEquals } from "@app/utils/utils";

interface PackageRecommendationsProps {
  recommendations: RecommendEntry[];
  isFetching: boolean;
  fetchError?: AxiosError | null;
  currentPurl?: string;
}

export const PackageRecommendations: React.FC<PackageRecommendationsProps> = ({
  recommendations,
  isFetching,
  fetchError,
  currentPurl,
}) => {
  const isApplied =
    currentPurl &&
    recommendations.some((rec) => purlBaseEquals(rec.package, currentPurl));

  return (
    <LoadingWrapper
      isFetching={isFetching}
      fetchError={fetchError}
      isFetchingState={<Skeleton screenreaderText="Loading contents" />}
      fetchErrorState={(error) => <TableCellError error={error} />}
    >
      {isApplied ? (
        <Label color="blue" isCompact>
          Applied
        </Label>
      ) : (
        <>
          {recommendations.length}{" "}
          {recommendations.length === 1 ? "Recommendation" : "Recommendations"}
        </>
      )}
    </LoadingWrapper>
  );
};
