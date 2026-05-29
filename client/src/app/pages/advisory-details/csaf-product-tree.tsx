/** CSAF Product Tree tab with ECharts interactive tree visualization. */
import React from "react";

import ReactECharts from "echarts-for-react";

import {
  Content,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import type { CsafDocument } from "@app/types/csaf";

import {
  BRANCH_CATEGORY_COLORS,
  transformBranchesToTreeData,
} from "./helpers/csaf-tree-helpers";

interface CsafProductTreeProps {
  csafDocument: CsafDocument;
}

/** Color-coded legend for branch categories. */
const CategoryLegend: React.FC = () => {
  const entries = Object.entries(BRANCH_CATEGORY_COLORS);
  return (
    <Flex
      gap={{ default: "gapMd" }}
      flexWrap={{ default: "wrap" }}
      justifyContent={{ default: "justifyContentCenter" }}
    >
      {entries.map(([category, color]) => (
        <FlexItem key={category}>
          <Flex
            gap={{ default: "gapXs" }}
            alignItems={{ default: "alignItemsCenter" }}
          >
            <FlexItem>
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
            </FlexItem>
            <FlexItem>
              <span style={{ fontSize: "var(--pf-t--global--font--size--sm)" }}>
                {category.replace(/_/g, " ")}
              </span>
            </FlexItem>
          </Flex>
        </FlexItem>
      ))}
    </Flex>
  );
};

export const CsafProductTree: React.FC<CsafProductTreeProps> = ({
  csafDocument,
}) => {
  const branches = csafDocument.product_tree?.branches;

  const treeData = React.useMemo(() => {
    if (!branches || branches.length === 0) return null;
    return transformBranchesToTreeData(branches);
  }, [branches]);

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

  const option = {
    tooltip: {
      trigger: "item" as const,
      triggerOn: "mousemove" as const,
      formatter: (params: { data?: { name?: string; value?: string } }) => {
        const category = params.data?.value;
        return category
          ? `${params.data?.name}<br/><em>${category.replace(/_/g, " ")}</em>`
          : params.data?.name || "";
      },
    },
    series: [
      {
        type: "tree" as const,
        data: [treeData],
        orient: "LR" as const,
        roam: true,
        initialTreeDepth: 2,
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        label: {
          position: "left" as const,
          verticalAlign: "middle" as const,
          align: "right" as const,
          fontSize: 11,
        },
        leaves: {
          label: {
            position: "right" as const,
            verticalAlign: "middle" as const,
            align: "left" as const,
          },
        },
      },
    ],
  };

  return (
    <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
      <FlexItem>
        <Content component="h3">Product tree</Content>
        <Content component="small">
          Click a node to expand or collapse. Scroll to zoom, drag to pan.
        </Content>
      </FlexItem>
      <FlexItem>
        <CategoryLegend />
      </FlexItem>
      <FlexItem>
        <ReactECharts
          option={option}
          style={{ height: "600px", width: "100%" }}
          notMerge
          lazyUpdate
        />
      </FlexItem>
    </Flex>
  );
};
