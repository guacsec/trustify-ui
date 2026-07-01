import type React from "react";

import { severityList, SeverityProps } from "@app/api/model-utils";
import { ExtendedSeverity } from "@app/api/models";

export interface IWithSeverityProps {
  severity: ExtendedSeverity | null;
  children: (severityProps: SeverityProps | null) => React.ReactNode;
}

export const WithSeverityProps: React.FC<IWithSeverityProps> = ({
  severity,
  children,
}) => {
  const severityProps =
    severity && severityList[severity] ? severityList[severity] : null;

  return <>{children(severityProps)}</>;
};
