import React from "react";

import {
  Card,
  CardBody,
  Content,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Label,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import {
  RELATIONSHIP_CATEGORY_COLORS,
  RELATIONSHIP_LINE_STYLES,
  transformRelationshipsToTreeData,
} from "./helpers/csaf-relationship-helpers";
import { BRANCH_CATEGORY_COLORS } from "./helpers/csaf-tree-helpers";
import { CsafTreeChart } from "./components/CsafTreeChart";
import { CsafContext } from "./csaf-context";
import { ThemeContext } from "@tsd-ui/core";

const NODE_CATEGORY_LABELS = [
  "vendor",
  "product_name",
  "product_version",
  "product_version_range",
  "product_family",
  "architecture",
];

const RELATIONSHIP_LABELS = [
  "default_component_of",
  "external_component_of",
  "installed_on",
  "installed_with",
  "optional_component_of",
];

const RelationshipLegend: React.FC = () => {
  return (
    <Flex
      gap={{ default: "gapSm" }}
      flexWrap={{ default: "wrap" }}
      alignItems={{ default: "alignItemsCenter" }}
    >
      {NODE_CATEGORY_LABELS.map((cat) => (
        <FlexItem key={cat}>
          <Label
            variant="outline"
            isCompact
            icon={
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: BRANCH_CATEGORY_COLORS[cat] ?? "#8A8D90",
                }}
              />
            }
          >
            {cat.replace(/_/g, " ")}
          </Label>
        </FlexItem>
      ))}

      <FlexItem>
        <span
          style={{
            borderLeft: "1px solid var(--pf-v6-global--BorderColor--100)",
            height: 20,
            display: "inline-block",
          }}
        />
      </FlexItem>

      {RELATIONSHIP_LABELS.map((rel) => (
        <FlexItem key={rel}>
          <Label
            variant="outline"
            isCompact
            icon={
              <span
                style={{
                  display: "inline-block",
                  width: 16,
                  height: 0,
                  borderTop: `2px ${RELATIONSHIP_LINE_STYLES[rel] ?? "solid"} ${RELATIONSHIP_CATEGORY_COLORS[rel] ?? "#8A8D90"}`,
                }}
              />
            }
          >
            {rel.replace(/_/g, " ")}
          </Label>
        </FlexItem>
      ))}
    </Flex>
  );
};

export const CsafRelationshipTree: React.FC = () => {
  const { csaf } = React.useContext(CsafContext);
  const { isDark } = React.useContext(ThemeContext);
  const relationships = csaf?.product_tree?.relationships;
  const branches = csaf?.product_tree?.branches;

  const treeData = React.useMemo(() => {
    if (!relationships || relationships.length === 0) return null;
    return transformRelationshipsToTreeData(relationships, branches ?? []);
  }, [relationships, branches]);

  if (!treeData) {
    return (
      <EmptyState
        titleText="No relationships found in this advisory"
        headingLevel="h2"
        icon={CubesIcon}
        variant={EmptyStateVariant.sm}
      >
        <EmptyStateBody>
          This advisory does not contain product relationship data.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <Card>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h3" size="md">
              Relationship tree
            </Title>
            <Content component="small">
              Hover to highlight path. Click a node to expand or collapse. Drag
              to pan, scroll to zoom.
            </Content>
          </StackItem>
          <StackItem>
            <RelationshipLegend />
          </StackItem>
          <StackItem>
            <CsafTreeChart
              treeData={treeData}
              initialTreeDepth={2}
              chartMinHeight={600}
              leafMultiplier={26}
              chartPadding={{ left: "6%", right: "20%" }}
              fontSize={11}
              lineColor={isDark ? "#5c5c5c" : "#C9C9C9"}
            />
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};
