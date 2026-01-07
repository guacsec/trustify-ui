import type React from "react";

import { Content, PageSection } from "@patternfly/react-core";

import { AdvisorySearchProvider } from "./advisory-context";
import { AdvisoryTable } from "./advisory-table";
import { AdvisoryToolbar } from "./advisory-toolbar";
import { DocumentMetadata } from "@app/components/DocumentMetadata";

export const AdvisoryList: React.FC = () => {
  return (
    <>
      <DocumentMetadata title="Advisories" />
      <PageSection hasBodyWrapper={false}>
        <Content>
          <Content component="h1">Advisories</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <div>
          <AdvisorySearchProvider>
            <AdvisoryToolbar showFilters showActions />
            <AdvisoryTable />
          </AdvisorySearchProvider>
        </div>
      </PageSection>
    </>
  );
};
