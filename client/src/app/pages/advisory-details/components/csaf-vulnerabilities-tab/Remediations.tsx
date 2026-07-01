import React from "react";

import {
  Card,
  CardBody,
  Content,
  ExpandableSection,
  Grid,
  GridItem,
  Label,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import type { Remediation } from "@app/specs/csaf/csaf-v2.0-schema";

import { getRemediationProps, linkifyDetails } from "../../helpers/csaf-utils";
import { AffectedProducts } from "./AffectedProducts";

interface IRemediationCardProps {
  remediations: Remediation[];
  productNameMap: Map<string, string>;
}

const RemediationCard: React.FC<{
  remediation: Remediation;
  productNameMap: Map<string, string>;
}> = ({ remediation, productNameMap }) => {
  const productIds = remediation.product_ids || [];
  const props = getRemediationProps(remediation.category);

  return (
    <Card variant="secondary" isFullHeight>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <Label color={props.color}>{props.label}</Label>
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
                  color={props.color}
                />
              </ExpandableSection>
            )}
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};

export const CsafRemediations: React.FC<IRemediationCardProps> = ({
  remediations,
  productNameMap,
}) => {
  const sorted = React.useMemo(() => {
    return [...remediations].sort(
      (a, b) =>
        getRemediationProps(a.category).order -
        getRemediationProps(b.category).order,
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
