import type { SbomGroupItem } from "./sbom-groups-context";

/**
 * Find root groups from a flat list: items whose parent is absent or
 * whose parent is not present in the list.
 */
export const findRootGroups = (items: SbomGroupItem[]): SbomGroupItem[] => {
  const idSet = new Set(items.map((item) => item.id));
  return items.filter((item) => !item.parent || !idSet.has(item.parent));
};

export const groupDeleteDialogProps = (
  group?: {
    name?: string;
    number_of_groups?: number | null | undefined;
  } | null,
) => ({
  title: !group?.number_of_groups
    ? "Permanently delete Group?"
    : "Cannot delete group",
  message: !group?.number_of_groups ? (
    <>
      This action permanently deletes the <strong>{group?.name}</strong> group.
    </>
  ) : (
    <>
      The <strong>{group?.name}</strong> group contains child groups and cannot
      be deleted. Delete or reassign the child groups, then try again.
    </>
  ),
});
