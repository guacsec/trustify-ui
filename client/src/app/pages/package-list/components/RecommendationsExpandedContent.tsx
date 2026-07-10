import type React from "react";
import { Label, LabelGroup, List, ListItem } from "@patternfly/react-core";
import spacing from "@patternfly/react-styles/css/utilities/Spacing/spacing";

import type { RecommendEntry } from "@app/client";
import { formatVexStatus, vexStatusColor } from "@app/utils/vex-utils";

interface RecommendationsExpandedContentProps {
  recommendations: RecommendEntry[];
}

export const RecommendationsExpandedContent: React.FC<
  RecommendationsExpandedContentProps
> = ({ recommendations }) => {
  return (
    <List isPlain>
      {recommendations.map((rec) => (
        <ListItem key={rec.package}>
          <strong>{rec.package}</strong>
          {rec.vulnerabilities.length > 0 && (
            <LabelGroup className={spacing.mlSm}>
              {rec.vulnerabilities.map((v) => (
                <Label key={v.id} color={vexStatusColor(v.status)}>
                  {v.id}: {formatVexStatus(v.status)}
                </Label>
              ))}
            </LabelGroup>
          )}
        </ListItem>
      ))}
    </List>
  );
};
