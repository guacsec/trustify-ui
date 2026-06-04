import React from "react";

import {
  Button,
  Card,
  CardBody,
  ExpandableSection,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
} from "@patternfly/react-core";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";

import type { Remediation } from "@app/specs/csaf/csaf-v2.0-schema";
import { linkifyDetails } from "../helpers/csaf-utils";

const expandableSectionStyle = {
  "--pf-v6-c-expandable-section--m-expanded__toggle-icon--Rotate": "90deg",
} as React.CSSProperties;

interface CsafRemediationsProps {
  remediations: Remediation[];
  productNameMap: Map<string, string>;
}

type LabelColor = "red" | "orange" | "yellow" | "blue" | "grey";

const remediationColor = (category: string): LabelColor => {
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

const AffectedProducts: React.FC<{
  productIds: string[];
  productNameMap: Map<string, string>;
  color?: LabelColor;
}> = ({ productIds, productNameMap, color = "orange" }) => {
  const [expanded, setExpanded] = React.useState(false);
  const INITIAL_SHOW = 5;
  const visible = expanded ? productIds : productIds.slice(0, INITIAL_SHOW);
  const remaining = productIds.length - INITIAL_SHOW;

  return (
    <Flex gap={{ default: "gapXs" }} flexWrap={{ default: "wrap" }}>
      {visible.map((id) => (
        <FlexItem key={id}>
          <Label variant="outline" color={color} isCompact>
            {productNameMap.get(id) ?? id}
          </Label>
        </FlexItem>
      ))}
      {!expanded && remaining > 0 && (
        <FlexItem>
          <Button variant="link" size="sm" onClick={() => setExpanded(true)}>
            +{remaining} more
          </Button>
        </FlexItem>
      )}
      {expanded && productIds.length > INITIAL_SHOW && (
        <FlexItem>
          <Button variant="link" size="sm" onClick={() => setExpanded(false)}>
            Show less
          </Button>
        </FlexItem>
      )}
    </Flex>
  );
};

const RemediationCard: React.FC<{
  remediation: Remediation;
  productNameMap: Map<string, string>;
}> = ({ remediation, productNameMap }) => {
  const [showProducts, setShowProducts] = React.useState(false);
  const productIds = remediation.product_ids || [];

  return (
    <Card variant="secondary">
      <CardBody>
        <Label color={remediationColor(remediation.category)}>
          {remediationLabel(remediation.category)}
        </Label>
        <div style={{ marginTop: 8 }} />
        <span
          style={{
            color: "var(--pf-v6-global--Color--200)",
            fontSize: "var(--pf-v6-global--FontSize--sm)",
          }}
        >
          Details: {linkifyDetails(remediation.details)}
        </span>
        {productIds.length > 0 && (
          <>
            <div style={{ marginTop: 8 }}>
              <Button
                variant="link"
                isInline
                onClick={() => setShowProducts(!showProducts)}
                icon={
                  <AngleRightIcon
                    style={{
                      transition: "transform 150ms",
                      transform: showProducts
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  />
                }
              >
                Affected products ({productIds.length})
              </Button>
            </div>
            {showProducts && (
              <div style={{ marginTop: 16 }}>
                <AffectedProducts
                  productIds={productIds}
                  productNameMap={productNameMap}
                  color={remediationColor(remediation.category)}
                />
              </div>
            )}
          </>
        )}
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

export const CsafRemediations: React.FC<CsafRemediationsProps> = ({
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
      toggleIcon={<AngleRightIcon />}
      style={expandableSectionStyle}
      isIndented
    >
      <Grid hasGutter style={{ marginTop: "var(--pf-v6-global--spacer--sm)" }}>
        {sorted.map((rem, i) => (
          <GridItem
            key={`${rem.category}-${i}`}
            md={6}
            style={{ alignSelf: "start" }}
          >
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
