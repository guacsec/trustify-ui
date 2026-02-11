import type React from "react";

import { Content, PageSection } from "@patternfly/react-core";

import { DocumentMetadata } from "@app/components/DocumentMetadata";

import { GroupsProvider } from "./groups-context";
import { GroupsToolbar } from "./groups-toolbar";
import { GroupsTable } from "./groups-table";

export const Groups: React.FC = () => {
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
          <GroupsProvider>
            <GroupsToolbar />
            <GroupsTable />
          </GroupsProvider>
        </div>
      </PageSection>
    </>
  );
};
