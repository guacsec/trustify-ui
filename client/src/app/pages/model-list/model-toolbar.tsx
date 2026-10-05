import React from "react";
import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";
import { ModelSearchContext } from "./model-context";

interface ModelToolbarProps {
  showFilters?: boolean;
}

export const ModelToolbar: React.FC<ModelToolbarProps> = ({ showFilters }) => {
  const { tableControls } = React.useContext(ModelSearchContext);

  const {
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
  } = tableControls;

  return (
    <Toolbar {...toolbarProps} aria-label="model-toolbar">
      <ToolbarContent>
        {showFilters && <FilterToolbar {...filterToolbarProps} />}
        <ToolbarItem {...paginationToolbarItemProps}>
          <SimplePagination
            idPrefix="model-table"
            isTop
            paginationProps={paginationProps}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
