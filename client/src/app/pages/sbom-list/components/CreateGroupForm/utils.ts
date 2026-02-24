import { GroupListResult } from "@app/client";

export interface SBOMGroup {
  id: string;
  name: string;
  description?: string | null;
  children?: SBOMGroup[];
  parentsNames?: string,
}

/**
 * Convert flat list of groups with parent references to hierarchical structure
 */
export const buildHierarchy = (groups: GroupListResult): SBOMGroup[] => {
  const groupMap = new Map<string, SBOMGroup>();
  const rootGroups: SBOMGroup[] = [];

  // Build a name lookup from both items and referenced groups
  const nameLookup = new Map<string, string>();
  for (const group of groups?.items) {
    nameLookup.set(group.id, group.name);
  }
  for (const ref of groups?.referenced ?? []) {
    nameLookup.set(ref.id, ref.name);
  }

  // First pass: Create all group objects
  for (const group of groups?.items) {
    const parentsNames = group.parents?.length
      ? group.parents.map((id) => nameLookup.get(id) ?? id).join(" > ")
      : undefined;

    groupMap.set(group.id, {
      id: group.id,
      name: group.name,
      description: group.description,
      children: [],
      ...(parentsNames && { parentsNames }),
    });
  }

  // Second pass: Build parent-child relationships
  for (const group of groups?.items) {
    const sbomGroup = groupMap.get(group.id);
    if (!sbomGroup) continue;

    if (group.parent) {
      // Add to parent's children
      const parent = groupMap.get(group.parent);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(sbomGroup);
      } else {
        // Parent not in current result set, treat as root
        rootGroups.push(sbomGroup);
      }
    } else {
      // No parent, this is a root group
      rootGroups.push(sbomGroup);
    }
  }

  // Clean up empty children arrays
  const cleanupEmptyChildren = (group: SBOMGroup) => {
    if (group.children && group.children.length === 0) {
      delete group.children;
    } else if (group.children) {
      for (const child of group.children) {
        cleanupEmptyChildren(child);
      }
    }
  };

  for (const group of rootGroups) {
    cleanupEmptyChildren(group);
  }

  return rootGroups;
};