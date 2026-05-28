import React from "react";

import ReactECharts from "echarts-for-react";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Label,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import type { CsafDocument } from "../types";
import { collectProducts } from "../utils";

interface RelationshipTreeProps {
  csafDocument: CsafDocument;
}

const categoryStyles: Record<
  string,
  { color: string; lineType: string; label: string }
> = {
  default_component_of: {
    color: "#C9190B",
    lineType: "solid",
    label: "Default Component Of",
  },
  external_component_of: {
    color: "#0066CC",
    lineType: "solid",
    label: "External Component Of",
  },
  installed_on: {
    color: "#3E8635",
    lineType: "dashed",
    label: "Installed On",
  },
  installed_with: {
    color: "#6753AC",
    lineType: "dotted",
    label: "Installed With",
  },
  optional_component_of: {
    color: "#EC7A08",
    lineType: "dashed",
    label: "Optional Component Of",
  },
};

interface TreeNode {
  name: string;
  children?: TreeNode[];
  lineStyle?: { color: string; type: string };
}

/** Interactive ECharts tree showing product relationships grouped by target product. */
export const RelationshipTree: React.FC<RelationshipTreeProps> = ({
  csafDocument,
}) => {
  const relationships = csafDocument.product_tree.relationships;

  const productMap = React.useMemo(
    () => collectProducts(csafDocument.product_tree.branches),
    [csafDocument.product_tree.branches],
  );

  const treeData = React.useMemo(() => {
    if (!relationships || relationships.length === 0) return [];

    const grouped = new Map<string, TreeNode[]>();
    for (const rel of relationships) {
      const targetId = rel.relates_to_product_reference;
      const targetName = productMap.get(targetId) ?? targetId;
      const style =
        categoryStyles[rel.category] ?? categoryStyles.default_component_of;

      const child: TreeNode = {
        name: productMap.get(rel.product_reference) ?? rel.product_reference,
        lineStyle: { color: style.color, type: style.lineType },
      };

      if (!grouped.has(targetName)) {
        grouped.set(targetName, []);
      }
      grouped.get(targetName)!.push(child);
    }

    return Array.from(grouped.entries()).map(
      ([name, children]) => ({ name, children }) as TreeNode,
    );
  }, [relationships, productMap]);

  const usedCategories = React.useMemo(() => {
    if (!relationships) return [];
    const categories = new Set<string>();
    for (const rel of relationships) {
      categories.add(rel.category);
    }
    return Array.from(categories);
  }, [relationships]);

  if (!relationships || relationships.length === 0) {
    return (
      <EmptyState
        headingLevel="h4"
        icon={CubesIcon}
        titleText="No relationships found"
        variant={EmptyStateVariant.sm}
      >
        <EmptyStateBody>
          This advisory does not contain product relationship information.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  const nodeCount = treeData.reduce(
    (sum, node) => sum + 1 + (node.children?.length ?? 0),
    0,
  );
  const chartHeight = Math.max(400, nodeCount * 25);

  const option = {
    tooltip: { trigger: "item" as const },
    series: [
      {
        type: "tree" as const,
        data: treeData,
        orient: "LR",
        roam: true,
        initialTreeDepth: 3,
        symbolSize: 8,
        label: {
          fontSize: 11,
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
        },
        expandAndCollapse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
    ],
  };

  return (
    <Stack hasGutter>
      <StackItem>
        <Flex spaceItems={{ default: "spaceItemsSm" }}>
          {usedCategories.map((category) => {
            const style = categoryStyles[category];
            if (!style) return null;
            return (
              <FlexItem key={category}>
                <Label
                  style={{
                    backgroundColor: style.color,
                    color: "#fff",
                  }}
                >
                  {style.label}
                </Label>
              </FlexItem>
            );
          })}
        </Flex>
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
  );
};
