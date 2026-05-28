/** CSAF Relationship Tree tab with ECharts interactive graph visualization. */
import React from "react";

import ReactECharts from "echarts-for-react";

import {
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

interface CsafRelationshipTreeProps {
  csafDocument: CsafDocument;
}

/** Color-coded legend for relationship types. */
const RelationshipLegend: React.FC = () => {
  const entries = Object.entries(RELATIONSHIP_CATEGORY_COLORS);
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
        <ReactECharts
          option={option}
          style={{ height: "600px", width: "100%" }}
          notMerge
          lazyUpdate
        />
      </FlexItem>
      <FlexItem>
        <RelationshipLegend />
      </FlexItem>
    </Flex>
  );
};
