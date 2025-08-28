import type React from "react";

import {
  Content,
  PageSection,
  Tab,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";

import { SbomSearchProvider } from "./sbom-context";
import { SbomTable } from "./sbom-table";
import { SbomToolbar } from "./sbom-toolbar";
import { ImporterList } from "./components/ImporterList";

export const SbomList: React.FC = () => {
  return (
    <>
      <PageSection hasBodyWrapper={false}>
        <Content>
          <Content component="h1">SBOMs</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <Tabs
          defaultActiveKey={0}
          aria-label="Tabs in the uncontrolled example"
          role="region"
        >
          <Tab
            eventKey={0}
            title={<TabTitleText>All SBOMs</TabTitleText>}
            aria-label="Uncontrolled ref content - users"
          >
            <SbomSearchProvider>
              <SbomToolbar showFilters />
              <SbomTable />
            </SbomSearchProvider>
          </Tab>
          <Tab eventKey={1} title={<TabTitleText>SBOM Sources</TabTitleText>}>
            <ImporterList />
          </Tab>
        </Tabs>
      </PageSection>
    </>
  );
};
