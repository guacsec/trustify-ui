import React from "react";

import {
  Button,
  CodeBlock,
  CodeBlockCode,
  Content,
  Flex,
  FlexItem,
  Icon,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import type { CsafDocument } from "@app/pages/csaf-visualizer";

interface SourceViewProps {
  csafDocument: CsafDocument;
}

/** Displays raw CSAF JSON with an optional link to the original advisory. */
export const SourceView: React.FC<SourceViewProps> = ({ csafDocument }) => {
  const selfRef = csafDocument.document.references?.find(
    (ref) => ref.category === "self",
  );

  return (
    <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
      {selfRef && (
        <FlexItem>
          <Content>
            <Content component="p">
              <Button
                variant="link"
                isInline
                component="a"
                href={selfRef.url}
                target="_blank"
                rel="noopener noreferrer"
                icon={
                  <Icon isInline>
                    <ExternalLinkAltIcon />
                  </Icon>
                }
                iconPosition="end"
              >
                Original advisory
              </Button>
            </Content>
          </Content>
        </FlexItem>
      )}
      <FlexItem>
        <CodeBlock>
          <CodeBlockCode>{JSON.stringify(csafDocument, null, 2)}</CodeBlockCode>
        </CodeBlock>
      </FlexItem>
    </Flex>
  );
};
