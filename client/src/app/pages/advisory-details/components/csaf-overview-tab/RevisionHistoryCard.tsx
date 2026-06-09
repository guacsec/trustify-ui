import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Label,
} from "@patternfly/react-core";

import type { Revision } from "@app/specs/csaf/csaf-v2.0-schema";
import { formatDate } from "@app/utils/utils";

interface IRevisionHistoryCardProps {
  revisions: Revision[];
}

export const RevisionHistoryCard: React.FC<IRevisionHistoryCardProps> = ({
  revisions,
}) => {
  const sorted = React.useMemo(
    () =>
      [...revisions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [revisions],
  );

  return (
    <Card>
      <CardTitle>Revision history</CardTitle>
      <CardBody>
        <DescriptionList
          isHorizontal
          isCompact
          horizontalTermWidthModifier={{ md: "15ch" }}
        >
          {sorted.map((rev) => (
            <DescriptionListGroup key={rev.number}>
              <DescriptionListTerm>
                <Flex>
                  <FlexItem>
                    <Label variant="outline" isCompact>
                      v{rev.number}
                    </Label>
                  </FlexItem>
                  <FlexItem>
                    <Content component="small">{formatDate(rev.date)}</Content>
                  </FlexItem>
                </Flex>
              </DescriptionListTerm>
              <DescriptionListDescription>
                {rev.summary}
              </DescriptionListDescription>
            </DescriptionListGroup>
          ))}
        </DescriptionList>
      </CardBody>
    </Card>
  );
};
