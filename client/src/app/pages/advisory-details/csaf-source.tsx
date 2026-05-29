/** CSAF Source tab displaying raw JSON and a link to the original advisory. */
import React from "react";

import {
  CodeBlock,
  CodeBlockCode,
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

  const formattedJson = React.useMemo(
    () => JSON.stringify(csafDocument, null, 2),
    [csafDocument],
  );

  return (
    <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
      {selfRef && (
        <FlexItem>
          <a href={selfRef.url} target="_blank" rel="noopener noreferrer">
            View original advisory <ExternalLinkAltIcon />
          </a>
        </FlexItem>
      )}
      <FlexItem>
        <CodeBlock>
          <CodeBlockCode>{formattedJson}</CodeBlockCode>
        </CodeBlock>
      </FlexItem>
    </Flex>
  );
};
