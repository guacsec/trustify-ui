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
  BRANCH_CATEGORY_COLORS,
  transformBranchesToTreeData,
} from "../../helpers/csaf-tree-helpers";

interface CsafProductTreeProps {
  csaf: CommonSecurityAdvisoryFramework;
}

const CATEGORY_LABELS = [
  "vendor",
  "product_name",
  "product_version",
  "product_version_range",
  "product_family",
  "architecture",
  "language",
  "patch_level",
  "service_pack",
  "host_name",
  "legacy",
  "specification",
];

const CategoryLegend: React.FC = () => {
  return (
    <Flex gap={{ default: "gapSm" }} flexWrap={{ default: "wrap" }}>
      {CATEGORY_LABELS.map((cat) => (
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
    </Flex>
  );
};

export const CsafProductTree: React.FC<CsafProductTreeProps> = ({ csaf }) => {
  const branches = csaf.product_tree?.branches;

  const treeData = React.useMemo(() => {
    if (!branches || branches.length === 0) return null;
    return transformBranchesToTreeData(branches);
  }, [branches]);

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
        titleText="No product tree available"
        headingLevel="h2"
        icon={CubesIcon}
        variant={EmptyStateVariant.sm}
      >
        <EmptyStateBody>
          This advisory does not contain product tree data.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  const chartHeight = Math.max(500, leafCount * 28);

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
        left: "8%",
        right: "24%",
        top: "2%",
        bottom: "2%",
        orient: "LR" as const,
        roam: true,
        symbol: "circle" as const,
        symbolSize: 10,
        edgeShape: "curve" as const,
        lineStyle: {
          width: 1.5,
          color: "#C9C9C9",
          curveness: 0.5,
        },
        initialTreeDepth: 3,
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        label: {
          position: "right" as const,
          verticalAlign: "middle" as const,
          align: "left" as const,
          fontSize: 12,
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
              Product tree
            </Title>
            <Content component="small">
              Click a node to expand or collapse. Scroll to zoom, drag to pan.
            </Content>
          </StackItem>
          <StackItem>
            <CategoryLegend />
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
