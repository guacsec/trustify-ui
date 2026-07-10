import type React from "react";
import { Skeleton } from "@patternfly/react-core";
import type { AxiosError } from "axios";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { TableCellError } from "@app/components/TableCellError";
import type { RecommendEntry } from "@app/client";

interface PackageRecommendationsProps {
  recommendations: RecommendEntry[];
  isFetching: boolean;
  fetchError?: AxiosError | null;
}

export const PackageRecommendations: React.FC<
  PackageRecommendationsProps
> = ({ recommendations, isFetching, fetchError }) => {
  return (
    <LoadingWrapper
      isFetching={isFetching}
      fetchError={fetchError}
      isFetchingState={<Skeleton screenreaderText="Loading contents" />}
      fetchErrorState={(error) => <TableCellError error={error} />}
    >
      {recommendations.length}{" "}
      {recommendations.length === 1 ? "Recommendation" : "Recommendations"}
    </LoadingWrapper>
  );
};
