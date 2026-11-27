import React from "react";

import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";

import { CryptoSearchContext } from "./crypto-context";

interface CryptoToolbarProps {
  showFilters?: boolean;
  showFiltersSideBySide?: boolean;
}

/** Toolbar with filters and pagination for the cryptography algorithm and key lists. */
export const CryptoToolbar: React.FC<CryptoToolbarProps> = ({
  showFilters,
  showFiltersSideBySide,
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
        {showFilters && (
          <FilterToolbar
            {...filterToolbarProps}
            showFiltersSideBySide={showFiltersSideBySide}
          />
        )}
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
