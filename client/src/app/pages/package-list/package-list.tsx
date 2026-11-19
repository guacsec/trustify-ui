import type React from "react";
import { useSearchParams } from "react-router-dom";

import { Content, PageSection } from "@patternfly/react-core";

import { CryptoFilterLabels } from "@app/components/CryptoFilterLabels";
import { DocumentMetadata } from "@app/components/DocumentMetadata";

import { PackageSearchProvider } from "./package-provider";
import { PackageTable } from "./package-table";
import { PackageToolbar } from "./package-toolbar";

export const PackageList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const cryptoAlgorithms = searchParams.getAll("crypto");

  return (
    <>
      <DocumentMetadata title="Packages" />
      <PageSection hasBodyWrapper={false}>
        <Content>
          <Content component="h1">Packages</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <div>
          <CryptoFilterLabels cryptoAlgorithms={cryptoAlgorithms} />
          <PackageSearchProvider cryptoAlgorithms={cryptoAlgorithms}>
            <PackageToolbar showFilters />
            <PackageTable />
          </PackageSearchProvider>
        </div>
      </PageSection>
    </>
  );
};
