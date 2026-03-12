import type { SbomGroupItem } from "./sbom-groups-context";

/**
 * Find root groups from a flat list: items whose parent is absent or
 * whose parent is not present in the list.
 */
export function findRootGroups(items: SbomGroupItem[]): SbomGroupItem[] {
  const idSet = new Set(items.map((item) => item.id));
  return items.filter((item) => !item.parent || !idSet.has(item.parent));
}
