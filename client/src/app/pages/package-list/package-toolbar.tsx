import React from "react";

import {
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";
import { ManageColumnsToolbar } from "@app/components/TableControls/ManageColumnsToolbar";

import { PackageSearchContext } from "./package-context";

interface PackageToolbarProps {
  showFilters?: boolean;
}

export const PackageToolbar: React.FC<PackageToolbarProps> = ({
  showFilters,
}) => {
  const { tableControls } = React.useContext(PackageSearchContext);

  const {
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
    columnState,
  } = tableControls;

  return (
    <Toolbar {...toolbarProps} aria-label="package-toolbar">
      <ToolbarContent>
        {showFilters && <FilterToolbar {...filterToolbarProps} />}
        <ToolbarGroup variant="action-group-plain">
          <ManageColumnsToolbar
            columns={columnState.columns}
            setColumns={columnState.setColumns}
            defaultColumns={columnState.defaultColumns}
          />
        </ToolbarGroup>
        <ToolbarItem {...paginationToolbarItemProps}>
          <SimplePagination
            idPrefix="package-table"
            isTop
            paginationProps={paginationProps}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
