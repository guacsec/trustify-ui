import React from "react";
import { useNavigate } from "react-router-dom";

import {
  DropdownItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Tooltip,
} from "@patternfly/react-core";

import type { Group } from "@app/client";
import { FilterToolbar } from "@app/components/FilterToolbar";
import { KebabDropdown } from "@app/components/KebabDropdown";
import { ReadOnlyButton } from "@app/components/ReadOnlyButton";
import {
  READ_ONLY_TOOLTIP,
  useReadOnlyContext,
} from "@app/components/ReadOnlyContext";
import { SimplePagination } from "@app/components/SimplePagination";
import { ToolbarBulkSelector } from "@app/components/ToolbarBulkSelector";
import { Paths } from "@app/Routes";

import { AddToGroupModal } from "./components/add-to-group-form";
import { GroupFormModal } from "../sbom-groups/components/group-form";
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
  const { isReadOnly } = useReadOnlyContext();

  // Create Form Modal
  const [saveGroupModalState, setSaveGroupModalState] = React.useState<
    "create" | Group | null
  >(null);
  const isCreateUpdateGroupModalOpen = saveGroupModalState !== null;
  const createUpdateGroup =
    saveGroupModalState !== "create" ? saveGroupModalState : null;

  // Add to group Modal
  const [isAddToGroupModalOpen, setIsAddToGroupModalOpen] =
    React.useState(false);

  // Table controls

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
    selectedItems,
    propHelpers: { toolbarBulkSelectorProps },
  } = bulkSelectionControls;

  return (
    <>
      <Toolbar {...toolbarProps} aria-label="sbom-toolbar">
        <ToolbarContent>
          {showBulkSelector && (
            <ToolbarBulkSelector {...toolbarBulkSelectorProps} />
          )}
          {showFilters && <FilterToolbar {...filterToolbarProps} />}
          {showActions && (
            <>
              <ToolbarItem>
                <ReadOnlyButton
                  variant="primary"
                  onClick={() => setSaveGroupModalState("create")}
                >
                  Create group
                </ReadOnlyButton>
              </ToolbarItem>
              <ToolbarItem>
                <ReadOnlyButton
                  variant="secondary"
                  isDisabled={selectedItems.length === 0}
                  onClick={() => setIsAddToGroupModalOpen(true)}
                >
                  Add to group
                </ReadOnlyButton>
              </ToolbarItem>
              <ToolbarItem>
                <KebabDropdown
                  ariaLabel="SBOM actions"
                  dropdownItems={[
                    <Tooltip
                      key="upload-sbom-tooltip"
                      content={READ_ONLY_TOOLTIP}
                      trigger={isReadOnly ? "mouseenter focus" : "manual"}
                    >
                      <DropdownItem
                        key="upload-sbom"
                        component="button"
                        isAriaDisabled={isReadOnly}
                        onClick={() => navigate(Paths.sbomUpload)}
                      >
                        Upload SBOM
                      </DropdownItem>
                    </Tooltip>,
                    <DropdownItem
                      key="scan-sbom"
                      component="button"
                      onClick={() => navigate(Paths.sbomScan)}
                    >
                      Generate vulnerability report
                    </DropdownItem>,
                  ]}
                />
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

      <GroupFormModal
        isOpen={isCreateUpdateGroupModalOpen}
        group={createUpdateGroup}
        onClose={() => setSaveGroupModalState(null)}
      />
      <AddToGroupModal
        sboms={selectedItems}
        isOpen={isAddToGroupModalOpen}
        onClose={() => setIsAddToGroupModalOpen(false)}
      />
    </>
  );
};
