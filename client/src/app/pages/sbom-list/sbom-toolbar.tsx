import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";
import { ToolbarBulkSelector } from "@app/components/ToolbarBulkSelector";
import { Paths } from "@app/Routes";

import { SbomSearchContext } from "./sbom-context";

interface SbomToolbarProps {
  showFilters?: boolean;
  showActions?: boolean;
}

export const SbomToolbar: React.FC<SbomToolbarProps> = ({
  showFilters,
  showActions,
}) => {
  const navigate = useNavigate();

  const {
    tableControls,
    bulkSelection: {
      isEnabled: showBulkSelector,
      controls: bulkSelectionControls,
    },
  } = React.useContext(SbomSearchContext);

  const {
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
  } = tableControls;

  const {
    propHelpers: { toolbarBulkSelectorProps },
  } = bulkSelectionControls;

  return (
    <Toolbar {...toolbarProps} aria-label="sbom-toolbar">
      <ToolbarContent>
        {showBulkSelector && (
          <ToolbarBulkSelector {...toolbarBulkSelectorProps} />
        )}
        {showFilters && <FilterToolbar {...filterToolbarProps} />}
        {showActions && (
          <>
            <ToolbarItem>
              <Button
                variant="primary"
                onClick={() => navigate(Paths.sbomUpload)}
              >
                Upload SBOM
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button
                variant="secondary"
                onClick={() => navigate(Paths.sbomScan)}
              >
                Generate vulnerability report
              </Button>
            </ToolbarItem>
          </>
        )}
        <ToolbarItem {...paginationToolbarItemProps}>
          <SimplePagination
            idPrefix="sbom-table"
            isTop
            paginationProps={paginationProps}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
