import React from "react";

import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";

import { CryptoSearchContext } from "./crypto-context";

interface CryptoToolbarProps {
  showFilters?: boolean;
}

/** Toolbar with filters and pagination for the cryptography algorithm list. */
export const CryptoToolbar: React.FC<CryptoToolbarProps> = ({
  showFilters,
}) => {
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
        {showFilters && <FilterToolbar {...filterToolbarProps} />}
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
