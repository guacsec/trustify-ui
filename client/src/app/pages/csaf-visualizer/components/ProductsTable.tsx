import React from "react";

import ReactECharts from "echarts-for-react";

import { Flex, FlexItem, Label } from "@patternfly/react-core";

import type { Branch, CsafDocument } from "..";

interface ProductsTableProps {
  csafDocument: CsafDocument;
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
  collapsed?: boolean;
  itemStyle?: { color: string };
}

const CATEGORY_COLORS: Record<string, string> = {
  vendor: "#0066CC",
  product_family: "#009596",
  product_name: "#3E8635",
  product_version: "#6A6E73",
  product_version_range: "#6753AC",
  architecture: "#EC7A08",
};

const CATEGORY_LABELS: Record<string, string> = {
  vendor: "Vendor",
  product_family: "Product Family",
  product_name: "Product Name",
  product_version: "Product Version",
  product_version_range: "Version Range",
  architecture: "Architecture",
};

const AUTO_COLLAPSE_THRESHOLD = 40;
const MIN_CHART_HEIGHT = 400;
const PX_PER_LEAF = 25;

function countLeaves(node: TreeNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
}

function countVisibleLeaves(node: TreeNode): number {
  if (!node.children || node.children.length === 0) return 1;
  if (node.collapsed) return 1;
  return node.children.reduce(
    (sum, child) => sum + countVisibleLeaves(child),
    0,
  );
}

function branchToTreeNode(branch: Branch): TreeNode {
  const node: TreeNode = {
    name: branch.product?.name ?? branch.name,
    itemStyle: {
      color: CATEGORY_COLORS[branch.category] ?? "#6A6E73",
    },
  };

  if (branch.branches && branch.branches.length > 0) {
    node.children = branch.branches.map(branchToTreeNode);
    if (countLeaves(node) > AUTO_COLLAPSE_THRESHOLD) {
      node.collapsed = true;
    }
  }

  return node;
}

/** Renders the CSAF product tree as an interactive left-to-right ECharts tree. */
export const ProductsTable: React.FC<ProductsTableProps> = ({
  csafDocument,
}) => {
  const treeData = React.useMemo<TreeNode[]>(() => {
    const branches = csafDocument.product_tree?.branches ?? [];
    return branches.map(branchToTreeNode);
  }, [csafDocument]);

  const rootNode: TreeNode = React.useMemo(
    () => ({ name: "Products", children: treeData }),
    [treeData],
  );

  const chartHeight = React.useMemo(() => {
    const leaves = countVisibleLeaves(rootNode);
    return Math.max(MIN_CHART_HEIGHT, leaves * PX_PER_LEAF);
  }, [rootNode]);

  const usedCategories = React.useMemo(() => {
    const categories = new Set<string>();
    function walk(branches: Branch[]) {
      for (const b of branches) {
        categories.add(b.category);
        if (b.branches) walk(b.branches);
      }
    }
    walk(csafDocument.product_tree?.branches ?? []);
    return Object.entries(CATEGORY_LABELS).filter(([key]) =>
      categories.has(key),
    );
  }, [csafDocument]);

  const option = React.useMemo(
    () => ({
      tooltip: { trigger: "item" as const },
      series: [
        {
          type: "tree" as const,
          data: [rootNode],
          orient: "LR" as const,
          initialTreeDepth: 2,
          roam: true,
          label: {
            position: "right" as const,
            verticalAlign: "middle" as const,
            align: "left" as const,
            fontSize: 12,
          },
          leaves: {
            label: {
              position: "left" as const,
              verticalAlign: "middle" as const,
              align: "right" as const,
            },
          },
          emphasis: { focus: "descendant" as const },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    }),
    [rootNode],
  );

  return (
    <>
      <div style={{ height: chartHeight }}>
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          notMerge
        />
      </div>
      <Flex
        gap={{ default: "gapMd" }}
        style={{ paddingTop: "var(--pf-t--global--spacer--sm)" }}
      >
        {usedCategories.map(([key, label]) => (
          <FlexItem key={key}>
            <Label
              style={{
                backgroundColor: CATEGORY_COLORS[key],
                color: "#fff",
              }}
            >
              {label}
            </Label>
          </FlexItem>
        ))}
      </Flex>
    </>
  );
};
