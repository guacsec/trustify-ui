import React from "react";

import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { ReadOnlyButton } from "@app/components/ReadOnlyButton";
import { SimplePagination } from "@app/components/SimplePagination";

import { SbomGroupsContext } from "./sbom-groups-context";

export const SbomGroupsToolbar: React.FC = () => {
  const { tableControls, setGroupCreateUpdateModalState } =
    React.useContext(SbomGroupsContext);

  const {
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
  } = tableControls;

  return (
    <Toolbar {...toolbarProps} aria-label="sbom-groups-toolbar">
      <ToolbarContent>
        <FilterToolbar {...filterToolbarProps} />
        <ToolbarItem>
          <ReadOnlyButton
            variant="primary"
            onClick={() => setGroupCreateUpdateModalState("create")}
          >
            Create group
          </ReadOnlyButton>
        </ToolbarItem>
        <ToolbarItem {...paginationToolbarItemProps}>
          <SimplePagination
            idPrefix="sbom-groups-table"
            isTop
            paginationProps={paginationProps}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
