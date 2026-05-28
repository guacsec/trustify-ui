/** CSAF-specific advisory details with 5-tab layout for VEX document visualization. */
import React from "react";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  PageSection,
  Tab,
  TabContent,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { useTabControls } from "@app/hooks/tab-controls";
import { useFetchAdvisoryCsafById } from "@app/queries/advisories";

import { CsafVulnerabilities } from "./csaf-vulnerabilities";

interface CsafAdvisoryDetailsProps {
  advisoryId: string;
}

/** Placeholder for tabs not yet implemented. */
const ComingSoon: React.FC<{ label: string }> = ({ label }) => (
  <EmptyState
    titleText={label}
    headingLevel="h2"
    icon={CubesIcon}
    variant={EmptyStateVariant.sm}
  >
    <EmptyStateBody>This tab is under construction.</EmptyStateBody>
  </EmptyState>
);

export const CsafAdvisoryDetails: React.FC<CsafAdvisoryDetailsProps> = ({
  advisoryId,
}) => {
  const { csafDocument, isFetching, fetchError } =
    useFetchAdvisoryCsafById(advisoryId);

  const {
    propHelpers: { getTabsProps, getTabProps, getTabContentProps },
  } = useTabControls({
    persistenceKeyPrefix: "cad",
    persistTo: "urlParams",
    tabKeys: [
      "overview",
      "vulnerabilities",
      "product-tree",
      "relationship-tree",
      "source",
    ],
  });

  const overviewTabRef = React.createRef<HTMLElement>();
  const vulnerabilitiesTabRef = React.createRef<HTMLElement>();
  const productTreeTabRef = React.createRef<HTMLElement>();
  const relationshipTreeTabRef = React.createRef<HTMLElement>();
  const sourceTabRef = React.createRef<HTMLElement>();

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
        <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
          <TabContent
            {...getTabContentProps("overview")}
            ref={overviewTabRef}
            aria-label="CSAF document overview"
          >
            <ComingSoon label="Overview" />
          </TabContent>
          <TabContent
            {...getTabContentProps("vulnerabilities")}
            ref={vulnerabilitiesTabRef}
            aria-label="CSAF vulnerabilities"
          >
            {csafDocument && (
              <CsafVulnerabilities csafDocument={csafDocument} />
            )}
          </TabContent>
          <TabContent
            {...getTabContentProps("product-tree")}
            ref={productTreeTabRef}
            aria-label="CSAF product tree"
          >
            <ComingSoon label="Product Tree" />
          </TabContent>
          <TabContent
            {...getTabContentProps("relationship-tree")}
            ref={relationshipTreeTabRef}
            aria-label="CSAF relationship tree"
          >
            <ComingSoon label="Relationship Tree" />
          </TabContent>
          <TabContent
            {...getTabContentProps("source")}
            ref={sourceTabRef}
            aria-label="CSAF source document"
          >
            <ComingSoon label="Source" />
          </TabContent>
        </LoadingWrapper>
      </PageSection>
    </>
  );
};
