import type React from "react";
import { Content, PageSection } from "@patternfly/react-core";

import { LicenseSearchProvider } from "./license-context";
import { LicenseTable } from "./license-table";
import { LicenseToolbar } from "./license-toolbar";

export const LicenseList: React.FC = () => {
  return (
    <>
      <PageSection hasBodyWrapper={false}>
        <Content>
          <Content component="h1">Licenses</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <div>
          <LicenseSearchProvider>
            <LicenseToolbar showFilters />
            <LicenseTable />
          </LicenseSearchProvider>
        </div>
      </PageSection>
    </>
  );
};
