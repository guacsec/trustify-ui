import type { Branch } from "@app/specs/csaf/csaf-v2.0-schema";

export interface EChartsTreeNode {
  name: string;
  value?: string;
  collapsed?: boolean;
  itemStyle?: { color: string; borderColor?: string };
  lineStyle?: { color: string; type?: string };
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

const countLeaves = (branch: Branch): number => {
  if (!branch.branches || branch.branches.length === 0) {
    return 1;
  }
  return branch.branches.reduce((sum, child) => sum + countLeaves(child), 0);
};

const transformBranch = (branch: Branch): EChartsTreeNode => {
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
};

export const countVisibleLeaves = (node: EChartsTreeNode): number => {
  if (!node.children || node.children.length === 0) return 1;
  if (node.collapsed) return 1;
  return node.children.reduce(
    (sum, child) => sum + countVisibleLeaves(child),
    0,
  );
};

export interface EChartsInternalNode {
  isExpand?: boolean;
  children?: EChartsInternalNode[];
}

export const countExpandedNodes = (node: EChartsInternalNode): number => {
  if (!node.children || node.children.length === 0) return 1;
  if (node.isExpand === false) return 1;
  return node.children.reduce(
    (sum, child) => sum + countExpandedNodes(child),
    0,
  );
};

export const transformBranchesToTreeData = (
  branches: Branch[],
): EChartsTreeNode => {
  const roots = branches.map(transformBranch);
  if (roots.length === 1) return roots[0];
  return {
    name: "Products",
    children: roots,
    itemStyle: { color: "#8A8D90", borderColor: "#8A8D90" },
  };
};
