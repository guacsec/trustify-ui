import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";

import type { Group } from "@app/client";
import { FilterToolbar } from "@app/components/FilterToolbar";
import { ReadOnlyContext } from "@app/components/ReadOnlyContext";
import { SimplePagination } from "@app/components/SimplePagination";
import { ToolbarBulkSelector } from "@app/components/ToolbarBulkSelector";
import { Paths } from "@app/Routes";

import { AddToGroupModal } from "./components/add-to-group-form";
import { GroupFormModal } from "../sbom-groups/components/group-form";
import { SbomSearchContext } from "./sbom-context";

interface ActionsDropdownProps {
  selectedItems: Array<{ id: string }>;
  areMutationsDisabled: boolean;
  onCreateGroup: () => void;
  onAddToGroup: () => void;
  onUploadSbom: () => void;
  onGenerateReport: () => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  selectedItems,
  areMutationsDisabled,
  onCreateGroup,
  onAddToGroup,
  onUploadSbom,
  onGenerateReport,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dropdown
      popperProps={{ position: "right" }}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      shouldFocusToggleOnSelect
      onSelect={() => setIsOpen(false)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          isExpanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          variant="secondary"
        >
          Actions
        </MenuToggle>
      )}
    >
      <DropdownList>
        <DropdownItem
          key="create-group"
          isDisabled={areMutationsDisabled}
          onClick={onCreateGroup}
        >
          Create group
        </DropdownItem>
        <DropdownItem
          key="upload-sbom"
          isDisabled={areMutationsDisabled}
          onClick={onUploadSbom}
        >
          Upload SBOM
        </DropdownItem>
        <DropdownItem key="generate-report" onClick={onGenerateReport}>
          Generate vulnerability report
        </DropdownItem>
        <Divider />
        <DropdownItem
          key="add-to-group"
          isDisabled={areMutationsDisabled || selectedItems.length === 0}
          onClick={onAddToGroup}
        >
          Add to group
        </DropdownItem>
        <DropdownItem key="run-policy" isDisabled>
          Run policy evaluation
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};

interface SbomToolbarProps {
  showFilters?: boolean;
  showActions?: boolean;
}

export const SbomToolbar: React.FC<SbomToolbarProps> = ({
  showFilters,
  showActions,
}) => {
  const navigate = useNavigate();
  const { areMutationsDisabled } = React.useContext(ReadOnlyContext);

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
                <ActionsDropdown
                  selectedItems={selectedItems}
                  areMutationsDisabled={areMutationsDisabled}
                  onCreateGroup={() => setSaveGroupModalState("create")}
                  onAddToGroup={() => setIsAddToGroupModalOpen(true)}
                  onUploadSbom={() => navigate(Paths.sbomUpload)}
                  onGenerateReport={() => navigate(Paths.sbomScan)}
                />
              </ToolbarItem>
              <ToolbarItem>
                <Button
                  variant="secondary"
                  isDisabled={selectedItems.length === 0}
                  onClick={() => {
                    const ids = selectedItems.map((s) => s.id).join(",");
                    navigate(`/sboms/lightwell-report?ids=${ids}`);
                  }}
                >
                  Lightwell remediation report
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
