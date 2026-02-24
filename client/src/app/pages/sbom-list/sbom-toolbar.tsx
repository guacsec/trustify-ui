import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import type { AxiosError } from "axios";

import {
  Button,
  DropdownItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";

import type { Group, GroupRequest, Labels } from "@app/client";
import { FilterToolbar } from "@app/components/FilterToolbar";
import { KebabDropdown } from "@app/components/KebabDropdown";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { SimplePagination } from "@app/components/SimplePagination";
import { ToolbarBulkSelector } from "@app/components/ToolbarBulkSelector";
import { useCreateSBOMGroupMutation } from "@app/queries/sbom-groups";
import { Paths } from "@app/Routes";

import { SbomSearchContext } from "./sbom-context";
import { SBOMGroupFormModal } from "./components/CreateGroupForm/SBOMGroupFormModal";

interface SbomToolbarProps {
  showFilters?: boolean;
  showActions?: boolean;
}

export const SbomToolbar: React.FC<SbomToolbarProps> = ({
  showFilters,
  showActions,
}) => {
  const navigate = useNavigate();
  const { pushNotification } = useContext(NotificationsContext);

  const [createGroupOpened, setCreateGroupOpened] =
    React.useState<boolean>(false);
  const closeCreateGroup = () => setCreateGroupOpened(false);

  const onCreateSuccess = () => {
    pushNotification({
      title: "Group created successfully",
      variant: "success",
    });
    closeCreateGroup();
  };

  const onCreateError = (_error: AxiosError) => {
    pushNotification({
      title: "Error while creating the group",
      variant: "danger",
    });
  };

  const createGroupMutation = useCreateSBOMGroupMutation(
    onCreateSuccess,
    onCreateError,
  );

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

  const handleCreateGroup = async (values: {
    name: string;
    parentGroup?: Group;
    isProduct: "yes" | "no";
    description?: string;
    labels: string[];
  }) => {
    // Convert labels array to Labels object
    const labelsObj: Labels = {};
    for (const label of values.labels) {
      labelsObj[label] = "";
    }

    // Add Product label if isProduct is "yes"
    if (values.isProduct === "yes") {
      labelsObj.Product = "true";
    }

    const body: GroupRequest = {
      name: values.name,
      description: values.description || null,
      parent: values.parentGroup?.id || null,
      labels: Object.keys(labelsObj).length > 0 ? labelsObj : undefined,
    };

    await createGroupMutation.mutateAsync(body);
  };

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
                <Button
                  variant="primary"
                  onClick={() => setCreateGroupOpened(true)}
                >
                  Create group
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button variant="secondary" isDisabled>
                  Add to group
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <KebabDropdown
                  ariaLabel="SBOM actions"
                  dropdownItems={[
                    <DropdownItem
                      key="upload-sbom"
                      component="button"
                      onClick={() => navigate(Paths.sbomUpload)}
                    >
                      Upload SBOM
                    </DropdownItem>,
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
      <SBOMGroupFormModal
        isOpen={createGroupOpened}
        onClose={closeCreateGroup}
        onSubmit={handleCreateGroup}
      />
    </>
  );
};
