/** Helpers for transforming CSAF branch data into ECharts tree format. */
import type { CsafBranch } from "@app/types/csaf";

/** ECharts tree node data shape. */
export interface EChartsTreeNode {
  name: string;
  value?: string;
  collapsed?: boolean;
  itemStyle?: { color: string };
  children?: EChartsTreeNode[];
}

const AUTO_COLLAPSE_THRESHOLD = 40;

/** Color mapping for CSAF branch categories. */
export const BRANCH_CATEGORY_COLORS: Record<string, string> = {
  vendor: "#0066CC",
  product_family: "#009596",
  product_name: "#4CB140",
  product_version: "#EC7A08",
  product_version_range: "#6753AC",
  architecture: "#8A8D90",
  language: "#C9190B",
  legacy: "#F4C145",
  patch_level: "#38812F",
  service_pack: "#2B9AF3",
};

/** Counts leaf nodes in a CSAF branch subtree. */
function countLeaves(branch: CsafBranch): number {
  if (!branch.branches || branch.branches.length === 0) {
    return 1;
  }
  return branch.branches.reduce((sum, child) => sum + countLeaves(child), 0);
}

/** Transforms a single CSAF branch into an ECharts tree node. */
function transformBranch(branch: CsafBranch): EChartsTreeNode {
  const leafCount = countLeaves(branch);
  const node: EChartsTreeNode = {
    name: branch.name,
    value: branch.category,
    itemStyle: {
      color: BRANCH_CATEGORY_COLORS[branch.category] || "#8A8D90",
    },
    collapsed: leafCount > AUTO_COLLAPSE_THRESHOLD,
  };

  if (branch.branches && branch.branches.length > 0) {
    node.children = branch.branches.map(transformBranch);
  }

  return node;
}

/** Transforms CSAF branches array into ECharts tree data with a virtual root. */
export function transformBranchesToTreeData(
  branches: CsafBranch[],
): EChartsTreeNode {
  return {
    name: "Product Tree",
    children: branches.map(transformBranch),
  };
}
