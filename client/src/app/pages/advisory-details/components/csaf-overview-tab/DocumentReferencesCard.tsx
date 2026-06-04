import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Label,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import type { Reference } from "@app/specs/csaf/csaf-v2.0-schema";

interface IDocumentReferencesCardProps {
  references: Reference[];
}

export const DocumentReferencesCard: React.FC<IDocumentReferencesCardProps> = ({
  references,
}) => (
  <Card>
    <CardTitle>Document references</CardTitle>
    <CardBody>
      <Flex direction={{ default: "column" }} gap={{ default: "gapSm" }}>
        {references.map((ref) => (
          <FlexItem key={ref.url}>
            <a href={ref.url} target="_blank" rel="noopener noreferrer">
              {ref.summary} <ExternalLinkAltIcon />
            </a>
            {ref.category && ref.category !== "self" && (
              <Label variant="outline" isCompact>
                {ref.category}
              </Label>
            )}
          </FlexItem>
        ))}
      </Flex>
    </CardBody>
  </Card>
);
