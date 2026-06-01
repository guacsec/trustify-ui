import React from "react";

import {
  PageSection,
  Tab,
  TabContent,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { useTabControls } from "@app/hooks/tab-controls";
import { DocumentOverview } from "@app/pages/csaf-visualizer/components/DocumentOverview";
import { ProductsTable } from "@app/pages/csaf-visualizer/components/ProductsTable";
import { RelationshipTree } from "@app/pages/csaf-visualizer/components/RelationshipTree";
import { SourceView } from "@app/pages/csaf-visualizer/components/SourceView";
import { VulnerabilitySection } from "@app/pages/csaf-visualizer/components/VulnerabilitySection";
import { useFetchCsafSource } from "@app/queries/advisories";

interface CsafAdvisoryTabsProps {
  advisoryId: string;
}

/** CSAF-specific tab container replacing standard advisory tabs. */
export const CsafAdvisoryTabs: React.FC<CsafAdvisoryTabsProps> = ({
  advisoryId,
}) => {
  const { csafDocument, isFetching, fetchError } =
    useFetchCsafSource(advisoryId);

  const {
    propHelpers: { getTabsProps, getTabProps, getTabContentProps },
  } = useTabControls({
    persistenceKeyPrefix: "ad",
    persistTo: "urlParams",
    tabKeys: [
      "overview",
      "vulnerabilities",
      "product-tree",
      "relationship-tree",
      "source",
    ],
  });

  const overviewTabRef = React.useRef<HTMLElement>();
  const vulnerabilitiesTabRef = React.useRef<HTMLElement>();
  const productTreeTabRef = React.useRef<HTMLElement>();
  const relationshipTreeTabRef = React.useRef<HTMLElement>();
  const sourceTabRef = React.useRef<HTMLElement>();

  return (
    <>
      <PageSection>
        <Tabs
          mountOnEnter
          {...getTabsProps()}
          aria-label="Tabs that contain the CSAF advisory information"
          role="region"
        >
          <Tab
            {...getTabProps("overview")}
            title={<TabTitleText>Overview</TabTitleText>}
            tabContentRef={overviewTabRef}
          />
          <Tab
            {...getTabProps("vulnerabilities")}
            title={<TabTitleText>Vulnerabilities</TabTitleText>}
            tabContentRef={vulnerabilitiesTabRef}
          />
          <Tab
            {...getTabProps("product-tree")}
            title={<TabTitleText>Product Tree</TabTitleText>}
            tabContentRef={productTreeTabRef}
          />
          <Tab
            {...getTabProps("relationship-tree")}
            title={<TabTitleText>Relationship Tree</TabTitleText>}
            tabContentRef={relationshipTreeTabRef}
          />
          <Tab
            {...getTabProps("source")}
            title={<TabTitleText>Source</TabTitleText>}
            tabContentRef={sourceTabRef}
          />
        </Tabs>
      </PageSection>
      <PageSection>
        <TabContent
          {...getTabContentProps("overview")}
          ref={overviewTabRef}
          aria-label="CSAF advisory overview"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && <DocumentOverview csafDocument={csafDocument} />}
          </LoadingWrapper>
        </TabContent>
        <TabContent
          {...getTabContentProps("vulnerabilities")}
          ref={vulnerabilitiesTabRef}
          aria-label="CSAF advisory vulnerabilities"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && (
              <VulnerabilitySection csafDocument={csafDocument} />
            )}
          </LoadingWrapper>
        </TabContent>
        <TabContent
          {...getTabContentProps("product-tree")}
          ref={productTreeTabRef}
          aria-label="CSAF advisory product tree"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && <ProductsTable csafDocument={csafDocument} />}
          </LoadingWrapper>
        </TabContent>
        <TabContent
          {...getTabContentProps("relationship-tree")}
          ref={relationshipTreeTabRef}
          aria-label="CSAF advisory relationship tree"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && <RelationshipTree csafDocument={csafDocument} />}
          </LoadingWrapper>
        </TabContent>
        <TabContent
          {...getTabContentProps("source")}
          ref={sourceTabRef}
          aria-label="CSAF advisory source"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && <SourceView csafDocument={csafDocument} />}
          </LoadingWrapper>
        </TabContent>
      </PageSection>
    </>
  );
};
