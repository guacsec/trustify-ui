import React from "react";

import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";

import { CryptoSearchContext } from "./crypto-context";

/** Toolbar with filter controls and pagination for the cryptography table. */
export const CryptoToolbar: React.FC = () => {
  const { tableControls } = React.useContext(CryptoSearchContext);

  const {
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
  } = tableControls;

  return (
    <Toolbar {...toolbarProps} aria-label="crypto-toolbar">
      <ToolbarContent>
        <FilterToolbar {...filterToolbarProps} />
        <ToolbarItem {...paginationToolbarItemProps}>
          <SimplePagination
            idPrefix="crypto-table"
            isTop
            paginationProps={paginationProps}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
