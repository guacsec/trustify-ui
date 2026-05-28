/** CSAF Source tab displaying raw JSON and a link to the original advisory. */
import React from "react";

import {
  Button,
  CodeBlock,
  CodeBlockCode,
  Content,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import type { CsafDocument } from "@app/types/csaf";

interface CsafSourceProps {
  csafDocument: CsafDocument;
}

export const CsafSource: React.FC<CsafSourceProps> = ({ csafDocument }) => {
  const selfRef = csafDocument.document.references?.find(
    (ref) => ref.category === "self",
  );

  return (
    <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
      {selfRef && (
        <FlexItem>
          <Content component="h3">Original Advisory</Content>
          <Button
            variant="link"
            component="a"
            href={selfRef.url}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ExternalLinkAltIcon />}
            iconPosition="end"
          >
            {selfRef.summary || selfRef.url}
          </Button>
        </FlexItem>
      )}
      <FlexItem>
        <Content component="h3">CSAF Document</Content>
        <CodeBlock>
          <CodeBlockCode>{JSON.stringify(csafDocument, null, 2)}</CodeBlockCode>
        </CodeBlock>
      </FlexItem>
    </Flex>
  );
};
