import type React from "react";

import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { compareByScoreTypeFn } from "@app/api/model-utils";
import { extendedSeverityFromSeverity } from "@app/api/models";
import type { ScoredVector } from "@app/client";

import { SeverityShieldAndText } from "./SeverityShieldAndText";

interface CvssScoreExpandedContentProps {
  scores: ScoredVector[];
}

export const CvssScoreExpandedContent: React.FC<
  CvssScoreExpandedContentProps
> = ({ scores }) => {
  if (scores.length === 0) {
    return <>-</>;
  }

  const sortedScores = [...scores].sort(
    compareByScoreTypeFn((item) => item.type),
  );

  return (
    <Table variant="compact">
      <Thead>
        <Tr>
          <Th>CVSS Version</Th>
          <Th>Score</Th>
          <Th>Severity</Th>
          <Th>Vector</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedScores.map((score) => (
          <Tr key={score.vector}>
            <Td>{score.type}</Td>
            <Td>{Math.round(score.value * 10) / 10}</Td>
            <Td>
              <SeverityShieldAndText
                value={extendedSeverityFromSeverity(score.severity)}
                score={null}
                showLabel
              />
            </Td>
            <Td modifier="breakWord">{score.vector}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
