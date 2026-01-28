import type { TGroupTreeNode } from "./groups-context";
import type { TGroupDD } from "@app/queries/groups";

/**
 * Generates a simple tree structure for groups
 */
export function buildGroupTree(items: TGroupDD[]): TGroupTreeNode[] {
  const byId = new Map<string, TGroupTreeNode>();
  const roots: TGroupTreeNode[] = [];

  // initialize nodes
  for (const item of items) {
    byId.set(item.id, { ...item, children: [] });
  }

  // wire up parent/child relationships
  for (const node of byId.values()) {
    if (!node.parent) {
      roots.push(node);
      continue;
    }

    const parent = byId.get(node.parent);
    if (parent) {
      parent.children.push(node);
    } else {
      // orphan: parent id not found -> treat as root.
      roots.push(node);
    }
  }

  return roots;
}
