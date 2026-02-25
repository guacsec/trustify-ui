import React from "react";

import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";

import { SbomGroupsContext } from "./sbom-groups-context";

export const SbomGroupsToolbar: React.FC = () => {
  const { tableControls } = React.useContext(SbomGroupsContext);

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
          <Button
            variant="primary"
            onClick={() => {
              alert("TODO");
            }}
          >
            Create group
          </Button>
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
