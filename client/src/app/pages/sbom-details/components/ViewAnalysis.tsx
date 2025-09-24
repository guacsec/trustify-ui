import type React from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { Button, Skeleton } from "@patternfly/react-core";

import { IconedStatus } from "@app/components/IconedStatus";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { TableCellError } from "@app/components/TableCellError";
import { useFetchAnalysisById } from "@app/queries/analysis";
import { Paths } from "@app/Routes";

interface IViewAnalysisProps {
  sbomId: string;
  analysisId: string;
}

export const ViewAnalysis: React.FC<IViewAnalysisProps> = ({
  sbomId,
  analysisId,
}) => {
  const navigate = useNavigate();

  const { analysis, isFetching, fetchError } = useFetchAnalysisById(analysisId);

  const handleOnViewAnalysis = () => {
    navigate(
      generatePath(Paths.analysisDetails, {
        sbomId,
        analysisId,
      }),
    );
  };

  return (
    <LoadingWrapper
      isFetching={isFetching}
      fetchError={fetchError}
      isFetchingState={<Skeleton />}
      fetchErrorState={(error) => <TableCellError error={error} />}
    >
      {analysis && !analysis.output ? (
        <IconedStatus preset="InProgress" />
      ) : (
        <Button variant="primary" onClick={handleOnViewAnalysis}>
          View
        </Button>
      )}
    </LoadingWrapper>
  );
};
