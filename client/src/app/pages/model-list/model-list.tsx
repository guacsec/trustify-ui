import type React from "react";
import { Content, PageSection } from "@patternfly/react-core";

import { DocumentMetadata } from "@app/components/DocumentMetadata";

import { ModelSearchProvider } from "./model-context";
import { ModelTable } from "./model-table";
import { ModelToolbar } from "./model-toolbar";

export const ModelList: React.FC = () => {
  return (
    <>
      <DocumentMetadata title="Models" />
      <PageSection hasBodyWrapper={false}>
        <Content>
          <Content component="h1">Models</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <div>
          <ModelSearchProvider>
            <ModelToolbar showFilters />
            <ModelTable />
          </ModelSearchProvider>
        </div>
      </PageSection>
    </>
  );
};
