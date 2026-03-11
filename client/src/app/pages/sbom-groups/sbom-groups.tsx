import type React from "react";

import { Content, PageSection } from "@patternfly/react-core";

import { DocumentMetadata } from "@app/components/DocumentMetadata";

import { SbomGroupsProvider } from "./sbom-groups-context";
import { SbomGroupsToolbar } from "./sbom-groups-toolbar";
import { SbomGroupsTable } from "./sbom-groups-table";

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
          </SbomGroupsProvider>
        </div>
      </PageSection>
    </>
  );
};
