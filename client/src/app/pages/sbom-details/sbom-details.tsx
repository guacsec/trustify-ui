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
  type MenuToggleElement,
  PageSection,
  Popover,
  Split,
  SplitItem,
  Tab,
  TabAction,
  TabContent,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";

import {
  sbomDeletedErrorMessage,
  sbomDeleteDialogProps,
  sbomDeletedSuccessMessage,
} from "@app/Constants";
import { PathParam, Paths, useRouteParams } from "@app/Routes";
import type { SbomSummary } from "@app/client";
import { ConfirmDialog } from "@app/components/ConfirmDialog";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { useDownload } from "@app/hooks/domain-controls/useDownload";
import { useTabControls } from "@app/hooks/tab-controls";
import { useDeleteSbomMutation, useSuspenseSBOMById } from "@app/queries/sboms";

import { Overview } from "./overview";
import { PackagesBySbom } from "./packages-by-sbom";
import { VulnerabilitiesBySbom } from "./vulnerabilities-by-sbom";

export const SbomDetails: React.FC = () => {
  const navigate = useNavigate();
  const { pushNotification } = React.useContext(NotificationsContext);

  const sbomId = useRouteParams(PathParam.SBOM_ID);
  const { sbom, isFetching, fetchError } = useSuspenseSBOMById(sbomId);

  // Actions Dropdown
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] =
    React.useState(false);

  const handleActionsDropdownToggle = () => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
  };

  // Download action
  const { downloadSBOM, downloadSBOMLicenses } = useDownload();

  // Delete action
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const onDeleteSbomSuccess = (sbom: SbomSummary) => {
    setIsDeleteDialogOpen(false);
    pushNotification({
      title: sbomDeletedSuccessMessage(sbom),
      variant: "success",
    });
    navigate("/sboms");
  };

  const onDeleteAdvisoryError = (error: AxiosError) => {
    pushNotification({
      title: sbomDeletedErrorMessage(error),
      variant: "danger",
    });
  };

  const { mutate: deleteSbom, isPending: isDeleting } = useDeleteSbomMutation(
    onDeleteSbomSuccess,
    onDeleteAdvisoryError,
  );

  // Tabs
  const {
    propHelpers: { getTabsProps, getTabProps, getTabContentProps },
  } = useTabControls({
    persistenceKeyPrefix: "sd", // sb="sbom details"
    persistTo: "urlParams",
    tabKeys: ["info", "packages", "vulnerabilities"],
  });

  const infoTabRef = React.createRef<HTMLElement>();
  const packagesTabRef = React.createRef<HTMLElement>();
  const vulnerabilitiesTabRef = React.createRef<HTMLElement>();

  // Tabs popover refs
  const vulnerabilitiesTabPopoverRef = React.createRef<HTMLElement>();

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sboms}>SBOMs</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>SBOM details</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Split>
          <SplitItem isFilled>
            <Flex>
              <FlexItem spacer={{ default: "spacerSm" }}>
                <Content>
                  <Content component="h1">{sbom?.name ?? sbomId ?? ""}</Content>
                </Content>
              </FlexItem>
              <FlexItem>
                {sbom?.labels.type && (
                  <Label color="blue">{sbom?.labels.type}</Label>
                )}
              </FlexItem>
            </Flex>
          </SplitItem>
          <SplitItem>
            {sbom && (
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
                    key="sbom"
                    onClick={() => {
                      if (sbomId) {
                        downloadSBOM(
                          sbomId,
                          sbom?.name ? `${sbom?.name}.json` : `${sbomId}.json`,
                        );
                      }
                    }}
                  >
                    Download SBOM
                  </DropdownItem>
                  <DropdownItem
                    key="license"
                    onClick={() => {
                      if (sbomId) {
                        downloadSBOMLicenses(sbomId);
                      }
                    }}
                  >
                    Download License Report
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
          aria-label="Tabs that contain the SBOM information"
          role="region"
        >
          <Tab
            {...getTabProps("info")}
            title={<TabTitleText>Info</TabTitleText>}
            tabContentRef={infoTabRef}
          />
          <Tab
            {...getTabProps("packages")}
            title={<TabTitleText>Packages</TabTitleText>}
            tabContentRef={packagesTabRef}
          />
          <Tab
            {...getTabProps("vulnerabilities")}
            title={<TabTitleText>Vulnerabilities</TabTitleText>}
            tabContentRef={vulnerabilitiesTabRef}
            actions={
              <>
                <TabAction ref={vulnerabilitiesTabPopoverRef}>
                  <HelpIcon />
                </TabAction>
                <Popover
                  triggerRef={vulnerabilitiesTabPopoverRef}
                  bodyContent={
                    <div>
                      Any found vulnerabilities related to this SBOM. Fixed
                      vulnerabilities are not listed.
                    </div>
                  }
                />
              </>
            }
          />
        </Tabs>
      </PageSection>
      <PageSection>
        <TabContent
          {...getTabContentProps("info")}
          ref={infoTabRef}
          aria-label="Information of the SBOM"
        >
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {sbom && <Overview sbom={sbom} />}
          </LoadingWrapper>
        </TabContent>
        <TabContent
          {...getTabContentProps("packages")}
          ref={packagesTabRef}
          aria-label="Packages within the SBOM"
        >
          {sbomId && <PackagesBySbom sbomId={sbomId} />}
        </TabContent>
        <TabContent
          {...getTabContentProps("vulnerabilities")}
          ref={vulnerabilitiesTabRef}
          aria-label="Vulnerabilities within the SBOM"
        >
          {sbomId && <VulnerabilitiesBySbom sbomId={sbomId} />}
        </TabContent>
      </PageSection>

      <ConfirmDialog
        {...sbomDeleteDialogProps(sbom)}
        inProgress={isDeleting}
        titleIconVariant="warning"
        isOpen={isDeleteDialogOpen}
        confirmBtnVariant={ButtonVariant.danger}
        confirmBtnLabel="Delete"
        cancelBtnLabel="Cancel"
        onCancel={() => setIsDeleteDialogOpen(false)}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (sbom) {
            deleteSbom(sbom.id);
          }
        }}
      />
    </>
  );
};
