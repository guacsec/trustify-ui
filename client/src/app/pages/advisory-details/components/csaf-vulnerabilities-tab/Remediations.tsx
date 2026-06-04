import React from "react";

import {
  Card,
  CardBody,
  Content,
  ExpandableSection,
  Grid,
  GridItem,
  Label,
  type LabelProps,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import type { Remediation } from "@app/specs/csaf/csaf-v2.0-schema";

import { AffectedProducts } from "./AffectedProducts";

interface ICsafRemediationsProps {
  remediations: Remediation[];
  productNameMap: Map<string, string>;
}

const remediationColor = (category: string): LabelProps["color"] => {
  switch (category) {
    case "no_fix_planned":
      return "red";
    case "none_available":
      return "orange";
    case "vendor_fix":
      return "blue";
    case "workaround":
      return "yellow";
    default:
      return "grey";
  }
};

const remediationLabel = (category: string): string => {
  switch (category) {
    case "no_fix_planned":
      return "No fix planned";
    case "none_available":
      return "None available";
    case "vendor_fix":
      return "Vendor fix";
    case "workaround":
      return "Workaround";
    default:
      return category.replace(/_/g, " ");
  }
};

const URL_REGEX = /(https?:\/\/[^\s,)]+)/g;

const linkifyDetails = (text: string): React.ReactNode => {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
};

const RemediationCard: React.FC<{
  remediation: Remediation;
  productNameMap: Map<string, string>;
}> = ({ remediation, productNameMap }) => {
  const productIds = remediation.product_ids || [];

  return (
    <Card variant="secondary" isFullHeight>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <Label color={remediationColor(remediation.category)}>
              {remediationLabel(remediation.category)}
            </Label>
          </StackItem>
          <StackItem>
            <Content component="p">
              Details: {linkifyDetails(remediation.details)}
            </Content>
          </StackItem>
          <StackItem>
            {productIds.length > 0 && (
              <ExpandableSection
                toggleText={`Affected products (${productIds.length})`}
              >
                <AffectedProducts
                  productIds={productIds}
                  productNameMap={productNameMap}
                  color={remediationColor(remediation.category)}
                />
              </ExpandableSection>
            )}
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};

const REMEDIATION_ORDER: Record<string, number> = {
  vendor_fix: 0,
  workaround: 1,
  none_available: 2,
  no_fix_planned: 3,
};

export const CsafRemediations: React.FC<ICsafRemediationsProps> = ({
  remediations,
  productNameMap,
}) => {
  const sorted = React.useMemo(() => {
    return [...remediations].sort(
      (a, b) =>
        (REMEDIATION_ORDER[a.category] ?? 99) -
        (REMEDIATION_ORDER[b.category] ?? 99),
    );
  }, [remediations]);

  return (
    <ExpandableSection
      toggleText={`Remediations (${sorted.length})`}
      isIndented
    >
      <Grid hasGutter md={6}>
        {sorted.map((rem, i) => (
          <GridItem key={`${rem.category}-${i}`}>
            <RemediationCard
              remediation={rem}
              productNameMap={productNameMap}
            />
          </GridItem>
        ))}
      </Grid>
    </ExpandableSection>
  );
};
