import React from "react";

import { useFetchSBOMGroups } from "@app/queries/sbom-groups";

import type { Group } from "@app/client";

import { DrilldownSelect } from "../../../../components/DrilldownSelect";
import { buildHierarchy } from "./utils";

interface GroupSelectProps {
  value: Group | undefined;
  onChange: (value: Group | undefined) => void;
  placeholder?: string;
  limit: number;
}

export const GroupSelect: React.FC<GroupSelectProps> = ({
  value,
  onChange,
  placeholder = "Select",
  limit,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  const { rawData: groups } = useFetchSBOMGroups(
    {
      page: { pageNumber: 1, itemsPerPage: limit },
      ...(searchQuery && {
        filters: [{ field: "name", operator: "~", value: searchQuery }],
      }),
    },
    { parents: "resolve" },
  );

  const mappedGroups = groups
    ? buildHierarchy(groups, searchQuery.length < 1)
    : [];

  const onClear = (_event: React.SyntheticEvent) => {
    _event.stopPropagation();
    onChange(undefined);
    setSearchQuery("");
  };

  const onSelect = (group: Group) => {
    onChange(group);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <DrilldownSelect
      options={mappedGroups.map((gr) => ({
        ...gr,
        description: gr.parentsNames,
      }))}
      value={value}
      onChange={onSelect}
      placeholder={placeholder}
      onInputChange={setSearchQuery}
      inputValue={searchQuery}
      onClear={onClear}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};
