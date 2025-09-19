import React from "react";

import { useIsMutating } from "@tanstack/react-query";

import { Button } from "@patternfly/react-core";

import type { ReportResult } from "@app/client";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { useCreateAnalysisMutation } from "@app/queries/analysis";

interface ICreateAnalysisProps {
  sbomId: string;
  vulnerabilityId: string;
  onAnalysisCreated: (reportResult?: ReportResult) => void;
}

export const CreateAnalysis: React.FC<ICreateAnalysisProps> = ({
  sbomId,
  vulnerabilityId,
  onAnalysisCreated,
}) => {
  const { pushNotification } = React.useContext(NotificationsContext);

  const isMutating = useIsMutating();
  const { mutate: createAnalysis } = useCreateAnalysisMutation(
    (_payload, response) => {
      onAnalysisCreated(response);
    },
    (_error, payload) => {
      pushNotification({
        title: `Could not create an Analysis for ${payload.vulnerabilityId}`,
        variant: "danger",
      });
    },
  );

  const handleCreateAnalysis = () => {
    createAnalysis({ sbomId, vulnerabilityId });
  };

  return (
    <Button onClick={handleCreateAnalysis} disabled={isMutating > 0}>
      Analyze
    </Button>
  );
};
