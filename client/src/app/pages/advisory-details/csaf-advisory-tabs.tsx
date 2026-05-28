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
import { useFetchCsafSource } from "@app/queries/advisories";

import { DocumentOverview } from "../csaf-visualizer/components/DocumentOverview";
import { ProductsTable } from "../csaf-visualizer/components/ProductsTable";
import { RelationshipTree } from "../csaf-visualizer/components/RelationshipTree";
import { SourceView } from "../csaf-visualizer/components/SourceView";
import { VulnerabilitySection } from "../csaf-visualizer/components/VulnerabilitySection";

interface CsafAdvisoryTabsProps {
  advisoryId: string;
}

/** Tab container for CSAF advisory visualization with 5 purpose-built tabs. */
export const CsafAdvisoryTabs: React.FC<CsafAdvisoryTabsProps> = ({
  advisoryId,
}) => {
  const { csafDocument, isFetching, fetchError } =
    useFetchCsafSource(advisoryId);

  const hasRelationships =
    (csafDocument?.product_tree?.relationships?.length ?? 0) > 0;

  const tabKeys = React.useMemo(() => {
    const keys: string[] = [
      "overview",
      "vulnerabilities",
      "product-tree",
      ...(hasRelationships ? ["relationship-tree"] : []),
      "source",
    ];
    return keys;
  }, [hasRelationships]);

  const {
    propHelpers: { getTabsProps, getTabProps, getTabContentProps },
  } = useTabControls({
    persistenceKeyPrefix: "ad",
    persistTo: "urlParams",
    tabKeys,
  });

  const overviewRef = React.createRef<HTMLElement>();
  const vulnerabilitiesRef = React.createRef<HTMLElement>();
  const productTreeRef = React.createRef<HTMLElement>();
  const relationshipTreeRef = React.createRef<HTMLElement>();
  const sourceRef = React.createRef<HTMLElement>();

  return (
    <>
      <PageSection>
        <Tabs
          mountOnEnter
          {...getTabsProps()}
          aria-label="CSAF advisory visualization tabs"
          role="region"
        >
          <Tab
            {...getTabProps("overview")}
            title={<TabTitleText>Overview</TabTitleText>}
            tabContentRef={overviewRef}
          />
          <Tab
            {...getTabProps("vulnerabilities")}
            title={<TabTitleText>Vulnerabilities</TabTitleText>}
            tabContentRef={vulnerabilitiesRef}
          />
          <Tab
            {...getTabProps("product-tree")}
            title={<TabTitleText>Product Tree</TabTitleText>}
            tabContentRef={productTreeRef}
          />
          {hasRelationships && (
            <Tab
              {...getTabProps("relationship-tree")}
              title={<TabTitleText>Relationship Tree</TabTitleText>}
              tabContentRef={relationshipTreeRef}
            />
          )}
          <Tab
            {...getTabProps("source")}
            title={<TabTitleText>Source</TabTitleText>}
            tabContentRef={sourceRef}
          />
        </Tabs>
      </PageSection>
      <PageSection>
        <TabContent
          {...getTabContentProps("overview")}
          ref={overviewRef}
          aria-label="CSAF document overview"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && <DocumentOverview csafDocument={csafDocument} />}
          </LoadingWrapper>
        </TabContent>
        <TabContent
          {...getTabContentProps("vulnerabilities")}
          ref={vulnerabilitiesRef}
          aria-label="CSAF vulnerabilities"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && (
              <VulnerabilitySection csafDocument={csafDocument} />
            )}
          </LoadingWrapper>
        </TabContent>
        <TabContent
          {...getTabContentProps("product-tree")}
          ref={productTreeRef}
          aria-label="CSAF product tree"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && <ProductsTable csafDocument={csafDocument} />}
          </LoadingWrapper>
        </TabContent>
        {hasRelationships && (
          <TabContent
            {...getTabContentProps("relationship-tree")}
            ref={relationshipTreeRef}
            aria-label="CSAF relationship tree"
          >
            <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
              {csafDocument && <RelationshipTree csafDocument={csafDocument} />}
            </LoadingWrapper>
          </TabContent>
        )}
        <TabContent
          {...getTabContentProps("source")}
          ref={sourceRef}
          aria-label="CSAF source document"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {csafDocument && <SourceView csafDocument={csafDocument} />}
          </LoadingWrapper>
        </TabContent>
      </PageSection>
    </>
  );
};
