import type React from "react";

import { IconedStatus } from "@app/components/IconedStatus";
import { useFetchAnalysisById } from "@app/queries/analysis";
import { Paths } from "@app/Routes";
import { Button } from "@patternfly/react-core";
import { generatePath, useNavigate } from "react-router-dom";

interface IViewAnalysisProps {
  sbomId: string;
  analysisId: string;
}

export const ViewAnalysis: React.FC<IViewAnalysisProps> = ({
  sbomId,
  analysisId,
}) => {
  const navigate = useNavigate();

  const { analysis } = useFetchAnalysisById(analysisId);

  const handleOnViewAnalysis = () => {
    navigate(
      generatePath(Paths.analysisDetails, {
        sbomId,
        analysisId,
      }),
    );
  };

  return (
    <>
      {analysis && !analysis.output ? (
        <IconedStatus preset="InProgress" />
      ) : (
        <Button variant="primary" onClick={handleOnViewAnalysis}>
          View
        </Button>
      )}
    </>
  );
};
