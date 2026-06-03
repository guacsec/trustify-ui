import React from "react";

import {
  CodeBlock,
  CodeBlockCode,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import type { CommonSecurityAdvisoryFramework } from "@app/specs/csaf/csaf-v2.0-schema";

interface CsafSourceProps {
  csaf: CommonSecurityAdvisoryFramework;
}

export const CsafSource: React.FC<CsafSourceProps> = ({ csaf }) => {
  const selfRef = csaf.document.references?.find(
    (ref) => ref.category === "self",
  );

  const formattedJson = React.useMemo(
    () => JSON.stringify(csaf, null, 2),
    [csaf],
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
