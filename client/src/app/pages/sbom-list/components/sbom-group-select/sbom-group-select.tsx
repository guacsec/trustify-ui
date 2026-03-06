import React from "react";

import {
  type DrilldownOption,
  DrilldownSelect,
  type SearchQuery,
} from "@app/components/DrilldownSelect/DrilldownSelect";
import { FILTER_TEXT_CATEGORY_KEY } from "@app/Constants";
import { useFetchSBOMGroups } from "@app/queries/sbom-groups";
import { Group } from "@app/client";

interface ISbomGroupSelectProps {
  value: Group;
  onChange: (value: Group | null) => void;
}

export const SbomGroupSelect: React.FC<ISbomGroupSelectProps> = ({
  // value,
  // onChange,
}) => {
  const [value, setValue] = React.useState<DrilldownOption | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<SearchQuery>({
    type: "drillIn",
    parentIds: [],
  });

  const onChange = (value: DrilldownOption | null) => {
    setValue(value);
  };

  const {
    result: { data: groups },
    isFetching,
    fetchError,
  } = useFetchSBOMGroups(
    searchQuery.type === "filterText"
      ? null
      : searchQuery.parentIds[searchQuery.parentIds.length - 1],
    {
      ...(searchQuery.type === "filterText" && {
        filters: [
          { field: FILTER_TEXT_CATEGORY_KEY, value: searchQuery.value },
        ],
        page: { pageNumber: 1, itemsPerPage: 10 },
      }),
    },
    { parents: "resolve", totals: true },
  );

  return (
    <DrilldownSelect
      options={groups.map((group) => ({
        id: group.id,
        name: group.name,
        value: group,
        hasChildren: (group.number_of_groups ?? 0) > 0,
      }))}
      isLoading={isFetching}
      fetchError={fetchError ?? undefined}
      value={value ?? undefined}
      onChange={onChange}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      placeholder={"Select parent group"}
      searchInputProps={{ placeholder: "Find by name" }}
    />
  );
};
