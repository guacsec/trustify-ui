import React from "react";
import { Link, useNavigate } from "react-router-dom";

import type { AxiosError } from "axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  ButtonVariant,
  Content,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  FlexItem,
  Label,
  MenuToggle,
  PageSection,
  Split,
  SplitItem,
  Tab,
  TabContent,
  Tabs,
  TabTitleText,
  type MenuToggleElement,
} from "@patternfly/react-core";

import {
  advisoryDeletedErrorMessage,
  advisoryDeleteDialogProps,
  advisoryDeletedSuccessMessage,
} from "@app/Constants";
import { PathParam, Paths, useRouteParams } from "@app/Routes";
import { ExtendedSeverity } from "@app/api/models";
import { client } from "@app/axios-config/apiInit";
import { downloadAdvisory, type AdvisorySummary } from "@app/client";
import { ConfirmDialog } from "@app/components/ConfirmDialog";
import { DocumentMetadata } from "@app/components/DocumentMetadata";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { WithSeverityProps } from "@app/components/WithSeverityProps";
import { useDownload } from "@app/hooks/domain-controls/useDownload";
import { useTabControls } from "@app/hooks/tab-controls";
import {
  useDeleteAdvisoryMutation,
  useFetchAdvisoryById,
} from "@app/queries/advisories";
import { CommonSecurityAdvisoryFramework } from "@app/specs/csaf/csaf-v2.0-schema";

import { CsafOverview } from "./csaf-overview";
import { CsafProductTree } from "./csaf-product-tree";
import { CsafRelationshipTree } from "./csaf-relationship-tree";
import { CsafSource } from "./csaf-source";
import { TabContentCsafVulnerabilities } from "./csaf-vulnerabilities";
import { Overview } from "./overview";
import { VulnerabilitiesByAdvisory } from "./vulnerabilities-by-advisory";

export const AdvisoryDetails: React.FC = () => {
  const navigate = useNavigate();
  const { pushNotification } = React.useContext(NotificationsContext);

  const advisoryId = useRouteParams(PathParam.ADVISORY_ID);
  const { advisory, isFetching, fetchError } = useFetchAdvisoryById(advisoryId);

  // Actions Dropdown
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] =
    React.useState(false);

  const handleActionsDropdownToggle = () => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
  };

  // Download action
  const { downloadAdvisory } = useDownload();

  // Delete action
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const onDeleteAdvisorySuccess = (advisory: AdvisorySummary) => {
    setIsDeleteDialogOpen(false);
    pushNotification({
      title: advisoryDeletedSuccessMessage(advisory),
      variant: "success",
    });
    navigate("/advisories");
  };

  const onDeleteAdvisoryError = (error: AxiosError) => {
    pushNotification({
      title: advisoryDeletedErrorMessage(error),
      variant: "danger",
    });
  };

  const { mutate: deleteAdvisory, isPending: isDeleting } =
    useDeleteAdvisoryMutation(onDeleteAdvisorySuccess, onDeleteAdvisoryError);

  const isCsaf = advisory?.labels.type === "csaf";

  // Tabs
  const {
    propHelpers: { getTabsProps, getTabProps, getTabContentProps },
  } = useTabControls({
    persistenceKeyPrefix: "ad", // ad="advisory details"
    persistTo: "urlParams",
    tabKeys: [
      "info",
      "vulnerabilities",
      "csaf-overview",
      "csaf-vulnerabilities",
      "csaf-products",
      "csaf-relationship-tree",
      "csaf-source",
    ],
    defaultActiveTab: {
      tabKey: !isCsaf ? "info" : "csaf-overview",
    },
  });

  const infoTabRef = React.useRef<HTMLElement>(null);
  const vulnerabilitiesTabRef = React.useRef<HTMLElement>(null);
  const csafOverviewTabRef = React.useRef<HTMLElement>(null);
  const csafVulnerabilitiesTabRef = React.useRef<HTMLElement>(null);
  const csafProductsTabRef = React.useRef<HTMLElement>(null);
  const csafRelationshipTreeTabRef = React.useRef<HTMLElement>(null);
  const csafSourceTabRef = React.useRef<HTMLElement>(null);

  return (
    <>
      <DocumentMetadata title={advisory?.document_id} />
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.advisories}>Advisories</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Advisory details</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Split>
          <SplitItem isFilled>
            <Flex>
              <FlexItem spacer={{ default: "spacerSm" }}>
                <Content>
                  <Content component="h1">
                    {advisory?.document_id ?? advisoryId ?? ""}
                  </Content>
                </Content>
              </FlexItem>
              <FlexItem>
                <Flex gap={{ default: "gapSm" }}>
                  {advisory?.labels.type && (
                    <FlexItem>
                      <Label color="blue">{`type=${advisory.labels.type}`}</Label>
                    </FlexItem>
                  )}
                  {advisory?.labels.severity && (
                    <FlexItem>
                      <WithSeverityProps
                        severity={advisory.labels.severity as ExtendedSeverity}
                      >
                        {(props) => (
                          <Label
                            color={props?.labelColor}
                          >{`severity=${advisory.labels.severity}`}</Label>
                        )}
                      </WithSeverityProps>
                    </FlexItem>
                  )}
                </Flex>
              </FlexItem>
            </Flex>
          </SplitItem>
          <SplitItem>
            {advisory && (
              <Dropdown
                isOpen={isActionsDropdownOpen}
                onSelect={() => setIsActionsDropdownOpen(false)}
                onOpenChange={(isOpen) => setIsActionsDropdownOpen(isOpen)}
                popperProps={{ position: "right" }}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={handleActionsDropdownToggle}
                    isExpanded={isActionsDropdownOpen}
                  >
                    Actions
                  </MenuToggle>
                )}
                ouiaId="BasicDropdown"
                shouldFocusToggleOnSelect
              >
                <DropdownList>
                  <DropdownItem
                    key="advisory"
                    onClick={() => {
                      if (advisoryId) {
                        downloadAdvisory(
                          advisoryId,
                          advisory?.identifier
                            ? `${advisory?.identifier}.json`
                            : `${advisoryId}.json`,
                        );
                      }
                    }}
                  >
                    Download Advisory
                  </DropdownItem>
                  <Divider component="li" key="separator" />
                  <DropdownItem
                    key="delete"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownList>
              </Dropdown>
            )}
          </SplitItem>
        </Split>
      </PageSection>

      <AdvisorySourceFetcher advisoryId={advisoryId} isEnabled={isCsaf}>
        {({
          source,
          isFetching: isFetchingSource,
          fetchError: fetchSourceError,
        }) => (
          <CSAFParser content={source}>
            {({ csaf, parseError }) => (
              <>
                <PageSection>
                  <Tabs
                    mountOnEnter
                    {...getTabsProps()}
                    aria-label="Tabs that contain the Advisory information"
                    role="region"
                  >
                    {!isCsaf && (
                      <Tab
                        {...getTabProps("info")}
                        title={<TabTitleText>Info</TabTitleText>}
                        tabContentRef={infoTabRef}
                      />
                    )}
                    {!isCsaf && (
                      <Tab
                        {...getTabProps("vulnerabilities")}
                        title={<TabTitleText>Vulnerabilities</TabTitleText>}
                        tabContentRef={vulnerabilitiesTabRef}
                      />
                    )}
                    {isCsaf && (
                      <Tab
                        {...getTabProps("csaf-overview")}
                        title={<TabTitleText>Overview</TabTitleText>}
                        tabContentRef={csafOverviewTabRef}
                      />
                    )}
                    {isCsaf && (
                      <Tab
                        {...getTabProps("csaf-vulnerabilities")}
                        title={<TabTitleText>Vulnerabilities</TabTitleText>}
                        tabContentRef={csafVulnerabilitiesTabRef}
                      />
                    )}
                    {isCsaf && (
                      <Tab
                        {...getTabProps("csaf-products")}
                        title={<TabTitleText>Products</TabTitleText>}
                        tabContentRef={csafProductsTabRef}
                      />
                    )}
                    {isCsaf && (
                      <Tab
                        {...getTabProps("csaf-relationship-tree")}
                        title={<TabTitleText>Relationship Tree</TabTitleText>}
                        tabContentRef={csafRelationshipTreeTabRef}
                      />
                    )}
                    {isCsaf && (
                      <Tab
                        {...getTabProps("csaf-source")}
                        title={<TabTitleText>Source</TabTitleText>}
                        tabContentRef={csafSourceTabRef}
                      />
                    )}
                  </Tabs>
                </PageSection>
                <PageSection>
                  {!isCsaf && (
                    <TabContent
                      {...getTabContentProps("info")}
                      ref={infoTabRef}
                      aria-label="Information of the Advisory"
                    >
                      <LoadingWrapper
                        isFetching={isFetching}
                        fetchError={fetchError}
                      >
                        {advisory && <Overview advisory={advisory} />}
                      </LoadingWrapper>
                    </TabContent>
                  )}
                  {!isCsaf && (
                    <TabContent
                      {...getTabContentProps("vulnerabilities")}
                      ref={vulnerabilitiesTabRef}
                      aria-label="Vulnerabilities within the Advisory"
                    >
                      <VulnerabilitiesByAdvisory
                        isFetching={isFetching}
                        fetchError={fetchError}
                        vulnerabilities={advisory?.vulnerabilities || []}
                      />
                    </TabContent>
                  )}
                  {isCsaf && (
                    <TabContent
                      {...getTabContentProps("csaf-overview")}
                      ref={csafOverviewTabRef}
                      aria-label="CSAF advisory overview"
                    >
                      <LoadingWrapper
                        isFetching={isFetching || isFetchingSource}
                        fetchError={
                          fetchError || fetchSourceError || parseError
                        }
                      >
                        {csaf && <CsafOverview csafDocument={csaf} />}
                      </LoadingWrapper>
                    </TabContent>
                  )}
                  {isCsaf && (
                    <TabContent
                      {...getTabContentProps("csaf-vulnerabilities")}
                      ref={csafVulnerabilitiesTabRef}
                      aria-label="CSAF vulnerabilities"
                    >
                      <LoadingWrapper
                        isFetching={isFetching || isFetchingSource}
                        fetchError={
                          fetchError || fetchSourceError || parseError
                        }
                      >
                        {csaf && <TabContentCsafVulnerabilities csaf={csaf} />}
                      </LoadingWrapper>
                    </TabContent>
                  )}
                  {isCsaf && (
                    <TabContent
                      {...getTabContentProps("csaf-products")}
                      ref={csafProductsTabRef}
                      aria-label="CSAF product tree"
                    >
                      <LoadingWrapper
                        isFetching={isFetching || isFetchingSource}
                        fetchError={
                          fetchError || fetchSourceError || parseError
                        }
                      >
                        {csaf && <CsafProductTree csaf={csaf} />}
                      </LoadingWrapper>
                    </TabContent>
                  )}
                  {isCsaf && (
                    <TabContent
                      {...getTabContentProps("csaf-relationship-tree")}
                      ref={csafRelationshipTreeTabRef}
                      aria-label="CSAF relationship tree"
                    >
                      <LoadingWrapper
                        isFetching={isFetching || isFetchingSource}
                        fetchError={
                          fetchError || fetchSourceError || parseError
                        }
                      >
                        {csaf && <CsafRelationshipTree csaf={csaf} />}
                      </LoadingWrapper>
                    </TabContent>
                  )}
                  {isCsaf && (
                    <TabContent
                      {...getTabContentProps("csaf-source")}
                      ref={csafSourceTabRef}
                      aria-label="CSAF source JSON"
                    >
                      <LoadingWrapper
                        isFetching={isFetching || isFetchingSource}
                        fetchError={
                          fetchError || fetchSourceError || parseError
                        }
                      >
                        {csaf && <CsafSource csaf={csaf} />}
                      </LoadingWrapper>
                    </TabContent>
                  )}
                </PageSection>
              </>
            )}
          </CSAFParser>
        )}
      </AdvisorySourceFetcher>

      <ConfirmDialog
        {...advisoryDeleteDialogProps(advisory)}
        inProgress={isDeleting}
        titleIconVariant="warning"
        isOpen={isDeleteDialogOpen}
        confirmBtnVariant={ButtonVariant.danger}
        confirmBtnLabel="Delete"
        cancelBtnLabel="Cancel"
        onCancel={() => setIsDeleteDialogOpen(false)}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (advisory) {
            deleteAdvisory(advisory.uuid);
          }
        }}
      />
    </>
  );
};

interface IAdvisorySourceFetcherProps {
  isEnabled: boolean;
  advisoryId: string;
  children: (args: {
    source: string | null;
    isFetching: boolean;
    fetchError: AxiosError | null;
  }) => React.ReactNode;
}

const AdvisorySourceFetcher: React.FC<IAdvisorySourceFetcherProps> = ({
  isEnabled,
  advisoryId,
  children,
}) => {
  const [source, setSource] = React.useState<string | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const [fetchError, setFetchError] = React.useState<AxiosError | null>(null);

  React.useEffect(() => {
    if (isEnabled) {
      let cancelled = false;
      setIsFetching(true);
      downloadAdvisory({
        client,
        path: { key: advisoryId },
        responseType: "text",
        headers: { Accept: "text/plain" },
      })
        .then((response) => {
          if (!cancelled) setSource(String(response.data));
        })
        .catch((error: AxiosError) => {
          if (!cancelled) setFetchError(error);
        })
        .finally(() => {
          if (!cancelled) setIsFetching(false);
        });

      return () => {
        cancelled = true;
      };
    }
  }, [isEnabled]);

  return <>{children({ source, isFetching, fetchError })}</>;
};

interface ICSAFParserProps {
  content: string | null;
  children: (args: {
    csaf: CommonSecurityAdvisoryFramework | null;
    parseError: Error | null;
  }) => React.ReactNode;
}

const CSAFParser: React.FC<ICSAFParserProps> = ({ content, children }) => {
  const { csaf, parseError } = React.useMemo(() => {
    if (!content) {
      return {
        csaf: null,
        parseError: null,
      };
    }

    try {
      return {
        csaf: JSON.parse(content) as CommonSecurityAdvisoryFramework,
        parseError: null,
      };
    } catch (e) {
      return {
        csaf: null,
        parseError: e instanceof Error ? e : new Error(String(e)),
      };
    }
  }, [content]);

  return <>{children({ csaf, parseError })}</>;
};
