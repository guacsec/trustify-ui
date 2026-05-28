import React from "react";

import ReactECharts from "echarts-for-react";

import {
  Flex,
  FlexItem,
  Label,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import type { Branch, CsafDocument } from "../types";

interface ProductsTableProps {
  csafDocument: CsafDocument;
}

const categoryColors: Record<string, string> = {
  vendor: "#0066CC",
  product_family: "#009596",
  product_name: "#3E8635",
  product_version: "#6A6E73",
  product_version_range: "#6753AC",
  architecture: "#EC7A08",
  language: "#C9190B",
};

interface TreeNode {
  name: string;
  children?: TreeNode[];
  collapsed?: boolean;
  itemStyle?: { color: string };
}

/** Counts descendant leaf nodes in a branch. */
function countLeaves(branch: Branch): number {
  if (!branch.branches || branch.branches.length === 0) return 1;
  return branch.branches.reduce((sum, child) => sum + countLeaves(child), 0);
}

/** Converts a CSAF Branch into an ECharts tree node. */
function branchToTreeNode(branch: Branch): TreeNode {
  const node: TreeNode = {
    name: branch.product?.name ?? branch.name,
    itemStyle: { color: categoryColors[branch.category] ?? "#6A6E73" },
  };

  if (branch.branches && branch.branches.length > 0) {
    node.children = branch.branches.map(branchToTreeNode);
    if (countLeaves(branch) > 40) {
      node.collapsed = true;
    }
  }

  return node;
}

/** Interactive ECharts tree visualization of the CSAF product hierarchy. */
export const ProductsTable: React.FC<ProductsTableProps> = ({
  csafDocument,
}) => {
  const treeData = React.useMemo(() => {
    return csafDocument.product_tree.branches.map(branchToTreeNode);
  }, [csafDocument.product_tree.branches]);

  const leafCount = React.useMemo(() => {
    return csafDocument.product_tree.branches.reduce(
      (sum, branch) => sum + countLeaves(branch),
      0,
    );
  }, [csafDocument.product_tree.branches]);

  const chartHeight = Math.max(400, leafCount * 25);

  const option = React.useMemo(
    () => ({
      tooltip: { trigger: "item" as const },
      series: [
        {
          type: "tree" as const,
          data: treeData,
          orient: "LR",
          roam: true,
          initialTreeDepth: 2,
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
    }),
    [treeData],
  );

  const usedCategories = React.useMemo(() => {
    const categories = new Set<string>();
    function walk(branches: Branch[]) {
      for (const branch of branches) {
        categories.add(branch.category);
        if (branch.branches) walk(branch.branches);
      }
    }
    walk(csafDocument.product_tree.branches);
    return Array.from(categories);
  }, [csafDocument.product_tree.branches]);

  return (
    <Stack hasGutter>
      <StackItem>
        <Flex spaceItems={{ default: "spaceItemsSm" }}>
          {usedCategories.map((category) => (
            <FlexItem key={category}>
              <Label
                style={{
                  backgroundColor: categoryColors[category] ?? "#6A6E73",
                  color: "#fff",
                }}
              >
                {category.replace(/_/g, " ")}
              </Label>
            </FlexItem>
          ))}
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
