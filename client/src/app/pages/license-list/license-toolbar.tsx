import React from "react";
import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";
import { LicenseSearchContext } from "./license-context";

interface LicenseToolbarProps {
  showFilters?: boolean;
}

export const LicenseToolbar: React.FC<LicenseToolbarProps> = ({
  showFilters,
}) => {
  const { tableControls } = React.useContext(LicenseSearchContext);

  const {
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
  } = tableControls;

  return (
    <Toolbar {...toolbarProps} aria-label="license-toolbar">
      <ToolbarContent>
        {showFilters && <FilterToolbar {...filterToolbarProps} />}
        <ToolbarItem {...paginationToolbarItemProps}>
          <SimplePagination
            idPrefix="license-table"
            isTop
            paginationProps={paginationProps}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
