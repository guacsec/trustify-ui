import React from "react";

import { Content, PageSection } from "@patternfly/react-core";

import { DocumentMetadata } from "@app/components/DocumentMetadata";

import { GroupFormModal } from "../sbom-list/components/group-form";
import { SbomGroupsContext, SbomGroupsProvider } from "./sbom-groups-context";
import { SbomGroupsTable } from "./sbom-groups-table";
import { SbomGroupsToolbar } from "./sbom-groups-toolbar";

export const SbomGroups: React.FC = () => {
  return (
    <>
      <DocumentMetadata title={"Groups"} />
      <PageSection hasBodyWrapper={false}>
        <Content>
          <Content component="h1">Groups</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <div>
          <SbomGroupsProvider>
            <SbomGroupsToolbar />
            <SbomGroupsTable />
            <SbomGroupsActions />
          </SbomGroupsProvider>
        </div>
      </PageSection>
    </>
  );
};

const SbomGroupsActions: React.FC = () => {
  const { groupCreateUpdateModalState, setGroupCreateUpdateModalState } =
    React.useContext(SbomGroupsContext);

  const isCreateUpdateGroupModalOpen = groupCreateUpdateModalState !== null;
  const createUpdateGroup =
    groupCreateUpdateModalState !== "create"
      ? groupCreateUpdateModalState
      : null;

  return (
    <GroupFormModal
      isOpen={isCreateUpdateGroupModalOpen}
      group={createUpdateGroup}
      onClose={() => setGroupCreateUpdateModalState(null)}
    />
  );
};
