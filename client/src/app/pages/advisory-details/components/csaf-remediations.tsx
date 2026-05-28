/** Remediations section grouped by category with expandable product lists. */
import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  ExpandableSection,
  Flex,
  FlexItem,
  Label,
  List,
  ListItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import type { CsafFullProductName, CsafRemediation } from "@app/types/csaf";

interface CsafRemediationsProps {
  remediations: CsafRemediation[];
  productNameMap: Map<string, string>;
}

/** Groups remediations by category. */
function groupByCategory(
  remediations: CsafRemediation[],
): Map<string, CsafRemediation[]> {
  const groups = new Map<string, CsafRemediation[]>();
  for (const rem of remediations) {
    const existing = groups.get(rem.category);
    if (existing) {
      existing.push(rem);
    } else {
      groups.set(rem.category, [rem]);
    }
  }
  return groups;
}

/** Renders text with URLs converted to links. */
const LinkifiedText: React.FC<{ text: string }> = ({ text }) => {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlRegex);
  return (
    <>
      {parts.map((part, i) =>
        urlRegex.test(part) ? (
          <a
            key={`link-${i}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part} <ExternalLinkAltIcon />
          </a>
        ) : (
          <span key={`text-${i}`}>{part}</span>
        ),
      )}
    </>
  );
};

/** Single remediation card within a category group. */
const RemediationCard: React.FC<{
  remediation: CsafRemediation;
  productNameMap: Map<string, string>;
}> = ({ remediation, productNameMap }) => {
  const [showProducts, setShowProducts] = React.useState(false);
  const productIds = remediation.product_ids || [];

  return (
    <Card isPlain isCompact>
      <CardBody>
        <Flex direction={{ default: "column" }} gap={{ default: "gapSm" }}>
          <FlexItem>
            <LinkifiedText text={remediation.details} />
          </FlexItem>
          {remediation.url && (
            <FlexItem>
              <a
                href={remediation.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {remediation.url} <ExternalLinkAltIcon />
              </a>
            </FlexItem>
          )}
          {productIds.length > 0 && (
            <FlexItem>
              <ExpandableSection
                toggleText={
                  showProducts
                    ? "Hide affected products"
                    : `Show ${productIds.length} affected products`
                }
                onToggle={(_event, expanded) => setShowProducts(expanded)}
                isExpanded={showProducts}
              >
                <List isPlain>
                  {productIds.map((pid) => (
                    <ListItem key={pid}>
                      {productNameMap.get(pid) || pid}
                    </ListItem>
                  ))}
                </List>
              </ExpandableSection>
            </FlexItem>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export const CsafRemediations: React.FC<CsafRemediationsProps> = ({
  remediations,
  productNameMap,
}) => {
  const grouped = React.useMemo(
    () => groupByCategory(remediations),
    [remediations],
  );

  return (
    <ExpandableSection toggleText="Remediations" isExpanded={false}>
      <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
        {Array.from(grouped.entries()).map(([category, rems]) => (
          <FlexItem key={category}>
            <Card isPlain>
              <CardTitle>
                <Label isCompact>{category.replace(/_/g, " ")}</Label> (
                {rems.length})
              </CardTitle>
              <CardBody>
                <Flex
                  direction={{ default: "column" }}
                  gap={{ default: "gapSm" }}
                >
                  {rems.map((rem, i) => (
                    <FlexItem key={`${category}-${i}`}>
                      <RemediationCard
                        remediation={rem}
                        productNameMap={productNameMap}
                      />
                    </FlexItem>
                  ))}
                </Flex>
              </CardBody>
            </Card>
          </FlexItem>
        ))}
      </Flex>
    </ExpandableSection>
  );
};
