import React from "react";

import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";

import { FilterToolbar } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";

import { SbomGroupsContext } from "./sbom-groups-context";
import type { Group } from "@app/client";
import { GroupFormModal } from "../sbom-list/components/group-form";

export const SbomGroupsToolbar: React.FC = () => {
  const { tableControls } = React.useContext(SbomGroupsContext);
  const [saveGroupModalState, setSaveGroupModalState] = React.useState<
    "create" | Group | null
  >(null);
  const isCreateUpdateGroupModalOpen = saveGroupModalState !== null;
  const createUpdateGroup =
    saveGroupModalState !== "create" ? saveGroupModalState : null;

  const {
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
  } = tableControls;

  return (
    <>
      <Toolbar {...toolbarProps} aria-label="sbom-groups-toolbar">
        <ToolbarContent>
          <FilterToolbar {...filterToolbarProps} />
          <ToolbarItem>
            <Button
              variant="primary"
              onClick={() => setSaveGroupModalState("create")}
            >
              Create group
            </Button>
          </ToolbarItem>
          <ToolbarItem {...paginationToolbarItemProps}>
            <SimplePagination
              idPrefix="sbom-groups-table"
              isTop
              paginationProps={paginationProps}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <GroupFormModal
        isOpen={isCreateUpdateGroupModalOpen}
        group={createUpdateGroup ?? null}
        onClose={() => setSaveGroupModalState(null)}
      />
    </>
  );
};
