import type { Branch } from "@app/specs/csaf/csaf-v2.0-schema";

export interface EChartsTreeNode {
  name: string;
  value?: string;
  collapsed?: boolean;
  itemStyle?: { color: string; borderColor?: string };
  children?: EChartsTreeNode[];
}

const AUTO_COLLAPSE_THRESHOLD = 40;

export const BRANCH_CATEGORY_COLORS: Record<string, string> = {
  vendor: "#C9190B",
  product_family: "#EC7A08",
  product_name: "#0066CC",
  product_version: "#5752D1",
  product_version_range: "#009596",
  architecture: "#F0AB00",
  language: "#004B95",
  patch_level: "#8A8D90",
  service_pack: "#3E8635",
  host_name: "#470000",
  legacy: "#6A6E73",
  specification: "#2B9AF3",
};

function countLeaves(branch: Branch): number {
  if (!branch.branches || branch.branches.length === 0) {
    return 1;
  }
  return branch.branches.reduce((sum, child) => sum + countLeaves(child), 0);
}

function transformBranch(branch: Branch): EChartsTreeNode {
  const leafCount = countLeaves(branch);
  const node: EChartsTreeNode = {
    name: branch.name,
    value: branch.product?.product_id,
    itemStyle: {
      color: BRANCH_CATEGORY_COLORS[branch.category] || "#8A8D90",
      borderColor: BRANCH_CATEGORY_COLORS[branch.category] || "#8A8D90",
    },
    collapsed: leafCount > AUTO_COLLAPSE_THRESHOLD,
  };

  if (branch.branches && branch.branches.length > 0) {
    node.children = branch.branches.map(transformBranch);
  }

  return node;
}

export function transformBranchesToTreeData(
  branches: Branch[],
): EChartsTreeNode {
  return {
    name: "Product Tree",
    children: branches.map(transformBranch),
  };
}
