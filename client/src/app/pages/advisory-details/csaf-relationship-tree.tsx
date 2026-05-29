/** CSAF Relationship Tree tab with ECharts interactive graph visualization. */
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
  RELATIONSHIP_CATEGORY_COLORS,
  transformRelationshipsToTreeData,
} from "./helpers/csaf-relationship-helpers";
import { BRANCH_CATEGORY_COLORS } from "./helpers/csaf-tree-helpers";

interface CsafRelationshipTreeProps {
  csafDocument: CsafDocument;
}

const NODE_TYPE_SUBSET: Record<string, string> = {
  vendor: BRANCH_CATEGORY_COLORS.vendor,
  product_name: BRANCH_CATEGORY_COLORS.product_name,
  product_version: BRANCH_CATEGORY_COLORS.product_version,
  product_version_range: BRANCH_CATEGORY_COLORS.product_version_range,
  product_family: BRANCH_CATEGORY_COLORS.product_family,
  architecture: BRANCH_CATEGORY_COLORS.architecture,
};

const EDGE_STYLES: Record<string, { color: string; dash: string }> = {
  default_component_of: { color: "#0066CC", dash: "" },
  external_component_of: { color: "#EC7A08", dash: "8 4" },
  installed_on: { color: "#6753AC", dash: "2 3" },
  installed_with: { color: "#009596", dash: "5 2 2 2" },
  optional_component_of: { color: "#8A8D90", dash: "4 4" },
};

/** Legend with node-type colors and edge line styles. */
const RelationshipLegend: React.FC = () => {
  return (
    <Flex
      gap={{ default: "gapMd" }}
      flexWrap={{ default: "wrap" }}
      justifyContent={{ default: "justifyContentCenter" }}
    >
      {Object.entries(NODE_TYPE_SUBSET).map(([category, color]) => (
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
      {Object.entries(EDGE_STYLES).map(([category, { color, dash }]) => (
        <FlexItem key={category}>
          <Flex
            gap={{ default: "gapXs" }}
            alignItems={{ default: "alignItemsCenter" }}
          >
            <FlexItem>
              <svg width="24" height="12">
                <line
                  x1="0"
                  y1="6"
                  x2="24"
                  y2="6"
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray={dash || undefined}
                />
              </svg>
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

export const CsafRelationshipTree: React.FC<CsafRelationshipTreeProps> = ({
  csafDocument,
}) => {
  const relationships = csafDocument.product_tree?.relationships;
  const fullProductNames = csafDocument.product_tree?.full_product_names;

  const treeData = React.useMemo(() => {
    if (!relationships || relationships.length === 0) return null;
    return transformRelationshipsToTreeData(relationships, fullProductNames);
  }, [relationships, fullProductNames]);

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
        initialTreeDepth: 3,
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
        <Content component="h3">Relationship tree</Content>
        <Content component="small">
          Hover to highlight path. Click a node to expand or collapse. Drag to
          pan, scroll to zoom.
        </Content>
      </FlexItem>
      <FlexItem>
        <RelationshipLegend />
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
