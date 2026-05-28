import React from "react";

import {
  CodeBlock,
  CodeBlockCode,
  Content,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import type { CsafDocument } from "../types";

interface SourceViewProps {
  csafDocument: CsafDocument;
}

/** Displays the raw CSAF JSON with a link to the original advisory. */
export const SourceView: React.FC<SourceViewProps> = ({ csafDocument }) => {
  const selfRef = csafDocument.document.references?.find(
    (ref) => ref.category === "self",
  );

  return (
    <Stack hasGutter>
      {selfRef && (
        <StackItem>
          <Content>
            <a href={selfRef.url} target="_blank" rel="noopener noreferrer">
              {selfRef.summary || "View original advisory"}{" "}
              <ExternalLinkAltIcon />
            </a>
          </Content>
        </StackItem>
      )}
      <StackItem>
        <CodeBlock>
          <CodeBlockCode>{JSON.stringify(csafDocument, null, 2)}</CodeBlockCode>
        </CodeBlock>
      </StackItem>
    </Stack>
  );
};
