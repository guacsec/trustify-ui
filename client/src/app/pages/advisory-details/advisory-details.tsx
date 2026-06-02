import React from "react";
import { Link, useNavigate } from "react-router-dom";

import axios, { type AxiosError } from "axios";

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
  type MenuToggleElement,
  PageSection,
  Split,
  SplitItem,
  Tab,
  TabContent,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";

import {
  advisoryDeletedErrorMessage,
  advisoryDeleteDialogProps,
  advisoryDeletedSuccessMessage,
} from "@app/Constants";
import { PathParam, Paths, useRouteParams } from "@app/Routes";
import type { AdvisorySummary } from "@app/client";
import { ConfirmDialog } from "@app/components/ConfirmDialog";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { useDownload } from "@app/hooks/domain-controls/useDownload";
import { useTabControls } from "@app/hooks/tab-controls";
import { DocumentOverview } from "@app/pages/csaf-visualizer/components/DocumentOverview";
import { ProductsTable } from "@app/pages/csaf-visualizer/components/ProductsTable";
import { RelationshipTree } from "@app/pages/csaf-visualizer/components/RelationshipTree";
import { SourceView } from "@app/pages/csaf-visualizer/components/SourceView";
import { VulnerabilitySection } from "@app/pages/csaf-visualizer/components/VulnerabilitySection";
import type { CsafDocument } from "@app/pages/csaf-visualizer";
import {
  useDeleteAdvisoryMutation,
  useFetchAdvisoryById,
} from "@app/queries/advisories";

import { DocumentMetadata } from "@app/components/DocumentMetadata";

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

  // CSAF data — fetched directly without TanStack Query to avoid caching large payloads
  const isCsaf = advisory?.labels.type === "csaf";
  const [csafDocument, setCsafDocument] = React.useState<CsafDocument>();
  const [isCsafFetching, setIsCsafFetching] = React.useState(false);
  const [csafFetchError, setCsafFetchError] = React.useState<AxiosError | null>(
    null,
  );

  React.useEffect(() => {
    if (!isCsaf || !advisoryId) return;

    let cancelled = false;
    setIsCsafFetching(true);
    setCsafFetchError(null);

    axios
      .get<CsafDocument>(
        `/api/v3/advisory/${encodeURIComponent(advisoryId)}/download`,
      )
      .then((response) => {
        if (!cancelled) setCsafDocument(response.data);
      })
      .catch((error: AxiosError) => {
        if (!cancelled) setCsafFetchError(error);
      })
      .finally(() => {
        if (!cancelled) setIsCsafFetching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isCsaf, advisoryId]);

  const hasRelationships =
    (csafDocument?.product_tree?.relationships?.length ?? 0) > 0;

  // Tabs
  const tabKeys = React.useMemo(() => {
    if (isCsaf) {
      const keys: string[] = ["overview", "vulnerabilities", "product-tree"];
      if (hasRelationships) keys.push("relationship-tree");
      keys.push("source");
      return keys;
    }
    return ["info", "vulnerabilities"];
  }, [isCsaf, hasRelationships]);

  const {
    propHelpers: { getTabsProps, getTabProps, getTabContentProps },
  } = useTabControls({
    persistenceKeyPrefix: "ad",
    persistTo: "urlParams",
    tabKeys,
  });

  const infoTabRef = React.useRef<HTMLElement>();
  const overviewTabRef = React.useRef<HTMLElement>();
  const vulnerabilitiesTabRef = React.useRef<HTMLElement>();
  const productTreeTabRef = React.useRef<HTMLElement>();
  const relationshipTreeTabRef = React.useRef<HTMLElement>();
  const sourceTabRef = React.useRef<HTMLElement>();

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
                  <Content component="p">Advisory detail information</Content>
                </Content>
              </FlexItem>
              <FlexItem>
                {advisory?.labels.type && (
                  <Label color="blue">{advisory?.labels.type}</Label>
                )}
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
      <PageSection>
        <Tabs
          mountOnEnter
          {...getTabsProps()}
          aria-label="Tabs that contain the Advisory information"
          role="region"
        >
          {isCsaf ? (
            <Tab
              {...getTabProps("overview")}
              title={<TabTitleText>Overview</TabTitleText>}
              tabContentRef={overviewTabRef}
            />
          ) : (
            <Tab
              {...getTabProps("info")}
              title={<TabTitleText>Info</TabTitleText>}
              tabContentRef={infoTabRef}
            />
          )}
          <Tab
            {...getTabProps("vulnerabilities")}
            title={<TabTitleText>Vulnerabilities</TabTitleText>}
            tabContentRef={vulnerabilitiesTabRef}
          />
          {isCsaf && (
            <Tab
              {...getTabProps("product-tree")}
              title={<TabTitleText>Product Tree</TabTitleText>}
              tabContentRef={productTreeTabRef}
            />
          )}
          {isCsaf && hasRelationships && (
            <Tab
              {...getTabProps("relationship-tree")}
              title={<TabTitleText>Relationship Tree</TabTitleText>}
              tabContentRef={relationshipTreeTabRef}
            />
          )}
          {isCsaf && (
            <Tab
              {...getTabProps("source")}
              title={<TabTitleText>Source</TabTitleText>}
              tabContentRef={sourceTabRef}
            />
          )}
        </Tabs>
      </PageSection>
      <PageSection>
        {isCsaf ? (
          <TabContent
            {...getTabContentProps("overview")}
            ref={overviewTabRef}
            aria-label="CSAF advisory overview"
          >
            <LoadingWrapper
              isFetching={isCsafFetching}
              fetchError={csafFetchError}
            >
              {csafDocument && <DocumentOverview csafDocument={csafDocument} />}
            </LoadingWrapper>
          </TabContent>
        ) : (
          <TabContent
            {...getTabContentProps("info")}
            ref={infoTabRef}
            aria-label="Information of the Advisory"
          >
            <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
              {advisory && <Overview advisory={advisory} />}
            </LoadingWrapper>
          </TabContent>
        )}
        <TabContent
          {...getTabContentProps("vulnerabilities")}
          ref={vulnerabilitiesTabRef}
          aria-label="Vulnerabilities within the Advisory"
        >
          {isCsaf ? (
            <LoadingWrapper
              isFetching={isCsafFetching}
              fetchError={csafFetchError}
            >
              {csafDocument && (
                <VulnerabilitySection csafDocument={csafDocument} />
              )}
            </LoadingWrapper>
          ) : (
            <VulnerabilitiesByAdvisory
              isFetching={isFetching}
              fetchError={fetchError}
              vulnerabilities={advisory?.vulnerabilities || []}
            />
          )}
        </TabContent>
        {isCsaf && (
          <TabContent
            {...getTabContentProps("product-tree")}
            ref={productTreeTabRef}
            aria-label="CSAF advisory product tree"
          >
            <LoadingWrapper
              isFetching={isCsafFetching}
              fetchError={csafFetchError}
            >
              {csafDocument && <ProductsTable csafDocument={csafDocument} />}
            </LoadingWrapper>
          </TabContent>
        )}
        {isCsaf && hasRelationships && (
          <TabContent
            {...getTabContentProps("relationship-tree")}
            ref={relationshipTreeTabRef}
            aria-label="CSAF advisory relationship tree"
          >
            <LoadingWrapper
              isFetching={isCsafFetching}
              fetchError={csafFetchError}
            >
              {csafDocument && <RelationshipTree csafDocument={csafDocument} />}
            </LoadingWrapper>
          </TabContent>
        )}
        {isCsaf && (
          <TabContent
            {...getTabContentProps("source")}
            ref={sourceTabRef}
            aria-label="CSAF advisory source"
          >
            <LoadingWrapper
              isFetching={isCsafFetching}
              fetchError={csafFetchError}
            >
              {csafDocument && <SourceView csafDocument={csafDocument} />}
            </LoadingWrapper>
          </TabContent>
        )}
      </PageSection>

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
