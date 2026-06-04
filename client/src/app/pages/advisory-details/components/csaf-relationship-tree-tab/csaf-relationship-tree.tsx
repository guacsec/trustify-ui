import React from "react";

import ReactECharts from "echarts-for-react";

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

import type { CommonSecurityAdvisoryFramework } from "@app/specs/csaf/csaf-v2.0-schema";

import {
  RELATIONSHIP_CATEGORY_COLORS,
  RELATIONSHIP_LINE_STYLES,
  transformRelationshipsToTreeData,
} from "../../helpers/csaf-relationship-helpers";
import { BRANCH_CATEGORY_COLORS } from "../../helpers/csaf-tree-helpers";

interface CsafRelationshipTreeProps {
  csaf: CommonSecurityAdvisoryFramework;
}

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

export const CsafRelationshipTree: React.FC<CsafRelationshipTreeProps> = ({
  csaf,
}) => {
  const relationships = csaf.product_tree?.relationships;
  const branches = csaf.product_tree?.branches;

  const treeData = React.useMemo(() => {
    if (!relationships || relationships.length === 0) return null;
    return transformRelationshipsToTreeData(relationships, branches ?? []);
  }, [relationships, branches]);

  const leafCount = React.useMemo(() => {
    if (!treeData) return 0;
    function count(node: { children?: unknown[] }): number {
      if (!node.children || node.children.length === 0) return 1;
      return (node.children as { children?: unknown[] }[]).reduce(
        (s, c) => s + count(c),
        0,
      );
    }
    return count(treeData);
  }, [treeData]);

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

  const chartHeight = Math.max(600, leafCount * 26);

  const option = {
    tooltip: {
      trigger: "item" as const,
      triggerOn: "mousemove" as const,
      formatter: (params: { name: string; value?: string }) => {
        let html = `<strong>${params.name}</strong>`;
        if (params.value) {
          html += `<br/><span style="color:#999">ID:</span> ${params.value}`;
        }
        return html;
      },
    },
    series: [
      {
        type: "tree" as const,
        data: [treeData],
        left: "6%",
        right: "20%",
        top: "2%",
        bottom: "2%",
        orient: "LR" as const,
        roam: true,
        symbol: "circle" as const,
        symbolSize: 10,
        edgeShape: "curve" as const,
        lineStyle: {
          width: 1.5,
          curveness: 0.5,
        },
        initialTreeDepth: 2,
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        label: {
          position: "right" as const,
          verticalAlign: "middle" as const,
          align: "left" as const,
          fontSize: 11,
          fontFamily:
            "RedHatText, Overpass, overpass, helvetica, arial, sans-serif",
          color: "#151515",
          distance: 8,
        },
        leaves: {
          label: {
            position: "right" as const,
            verticalAlign: "middle" as const,
            align: "left" as const,
          },
        },
        emphasis: {
          focus: "descendant" as const,
          lineStyle: { width: 3 },
        },
      },
    ],
  };

  return (
    <Card>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h3" size="md">
              Relationship tree
            </Title>
            <Content
              component="small"
              style={{
                color: "var(--pf-v6-global--Color--200)",
                marginTop: "var(--pf-v6-global--spacer--xs)",
              }}
            >
              Hover to highlight path. Click a node to expand or collapse. Drag
              to pan, scroll to zoom.
            </Content>
          </StackItem>
          <StackItem>
            <RelationshipLegend />
          </StackItem>
          <StackItem>
            <ReactECharts
              option={option}
              style={{ height: `${chartHeight}px`, width: "100%" }}
              notMerge
              lazyUpdate
            />
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};
