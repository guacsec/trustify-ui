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
  vendor: "#C9190B",
  product_name: "#0066CC",
  product_version: "#6753AC",
  product_version_range: "#4CB140",
  product_family: "#EC7A08",
  architecture: "#F4C145",
  language: "#C9190B",
  patch_level: "#38812F",
  service_pack: "#2B9AF3",
  host_name: "#7D1007",
  legacy: "#8A8D90",
  specification: "#009596",
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
