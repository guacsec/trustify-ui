import React from "react";

import type { Group } from "@app/client";
import {
  type DrilldownOption,
  DrilldownSelect,
  type SearchQuery,
} from "@app/components/DrilldownSelect/DrilldownSelect";
import { FILTER_NULL_VALUE, FILTER_TEXT_CATEGORY_KEY } from "@app/Constants";
import { useFetchSBOMGroups } from "@app/queries/sbom-groups";

interface ISbomGroupSelectProps {
  value?: Group;
  onChange: (value?: Group) => void;
}

export const SbomGroupSelect: React.FC<ISbomGroupSelectProps> = ({
  value,
  onChange,
}) => {
  const [searchQuery, setSearchQuery] = React.useState<SearchQuery>({
    type: "drillIn",
    parentIds: [],
  });

  const parentIdQuery =
    searchQuery.type === "filterText"
      ? null
      : (searchQuery.parentIds[searchQuery.parentIds.length - 1] ??
        FILTER_NULL_VALUE);

  const paramsQuery = {
    ...(searchQuery.type === "filterText" && {
      filters: [{ field: FILTER_TEXT_CATEGORY_KEY, value: searchQuery.value }],
      page: { pageNumber: 1, itemsPerPage: 10 },
    }),
  };

  const {
    result: { data: groups },
    references,
    isFetching,
    fetchError,
  } = useFetchSBOMGroups(parentIdQuery, paramsQuery, {
    parents: "resolve",
    totals: true,
  });

  const groupToOption = (
    group: Group & {
      number_of_groups?: number | null;
      parents?: Array<string> | null;
    },
  ): DrilldownOption => {
    const option: DrilldownOption = {
      id: group.id,
      name: group.name,
      hasChildren: (group.number_of_groups ?? 0) > 0,
      value: group,
    };

    switch (searchQuery.type) {
      case "filterText": {
        const parentsChain = (group.parents || [])
          .map((parentId) => references.get(parentId)?.name ?? parentId)
          .join(" > ");
        return {
          ...option,
          itemProps: {
            description: parentsChain,
          },
        };
      }
      case "drillIn": {
        return option;
      }
    }
  };

  return (
    <DrilldownSelect
      options={groups.map(groupToOption)}
      isLoading={isFetching}
      fetchError={fetchError ?? undefined}
      value={value ? groupToOption(value) : undefined}
      onChange={(option) => onChange(option?.value)}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      placeholder={"Select parent group"}
      searchInputProps={{ placeholder: "Find by name" }}
    />
  );
};
