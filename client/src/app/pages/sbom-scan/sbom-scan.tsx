import React, { useMemo, useState } from "react";
import { Link, useBlocker, type BlockerFunction } from "react-router-dom";

import { saveAs } from "file-saver";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Content,
  Dropdown,
  DropdownItem,
  DropdownList,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateVariant,
  MenuToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PageSection,
  Spinner,
  Split,
  SplitItem,
  type MenuToggleElement,
} from "@patternfly/react-core";

import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import DownloadIcon from "@patternfly/react-icons/dist/esm/icons/download-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";

import type { ExtractResult } from "@app/client";
import { useUploadAndAnalyzeSBOM } from "@app/queries/sboms-analysis";
import { Paths } from "@app/Routes";

import { UploadFileForAnalysis } from "./components/UploadFileForAnalysis";
import { VulnerabilityTable } from "./components/VulnerabilityTable";
import { useVulnerabilitiesOfSbomByPurls } from "./hooks/useVulnerabilitiesOfSbom";
import { convertToCSV } from "./scan-utils";

export const SbomScan: React.FC = () => {
  // Actions dropdown
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

  const handleActionsDropdownToggle = () => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
  };

  // Upload handlers
  const [uploadResponseData, setUploadResponseData] =
    useState<ExtractResult | null>(null);

  const { uploads, handleUpload, handleCancelUpload, handleRemoveUpload } =
    useUploadAndAnalyzeSBOM((extractedData, _file) => {
      setUploadResponseData(extractedData);
    });

  const joinedFileName = React.useMemo(() => {
    return Array.from(uploads.keys())
      .map((e) => e.name)
      .join("_");
  }, [uploads]);

  // Navigation blockers
  const shouldBlock = React.useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      return (
        uploadResponseData !== null &&
        currentLocation.pathname !== nextLocation.pathname
      );
    },
    [uploadResponseData],
  );

  const blocker = useBlocker(shouldBlock);

  // Post Upload handlers
  const allPurls = useMemo(() => {
    return Object.entries(uploadResponseData?.packages ?? {}).flatMap(
      ([_packageName, { purls }]) => {
        return purls;
      },
    );
  }, [uploadResponseData]);

  const {
    data: { vulnerabilities },
    isFetching,
    fetchError,
  } = useVulnerabilitiesOfSbomByPurls(allPurls);

  // Other actions

  const handleDownloadCSV = async () => {
    const csv = convertToCSV(vulnerabilities);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${joinedFileName}.csv`);
  };

  const scanAnotherFile = () => {
    for (const file of uploads.keys()) {
      handleRemoveUpload(file);
    }

    setUploadResponseData(null);
  };

  const noReportToRender =
    uploadResponseData === null ||
    isFetching ||
    fetchError ||
    vulnerabilities.length === 0;

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sboms}>SBOMs</Link>
          </BreadcrumbItem>
          {noReportToRender ? (
            <BreadcrumbItem isActive>
              Generate vulnerability report
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem isActive>Vulnerability report</BreadcrumbItem>
          )}
        </Breadcrumb>
      </PageSection>
      <PageSection>
        {noReportToRender ? (
          <Content>
            <Content component="h1">Generate vulnerability report</Content>
            <Content component="p">
              Select an SBOM file to generate a temporary vulnerability report.
              The file and report will not be saved.
            </Content>
          </Content>
        ) : (
          <Split>
            <SplitItem isFilled>
              <Content>
                <Content component="h1">Vulnerability report</Content>
                <Content component="p">
                  This is a temporary vulnerability report.
                </Content>
              </Content>
            </SplitItem>
            <SplitItem>
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
                  <DropdownItem key="scan-another" onClick={scanAnotherFile}>
                    Generate new report
                  </DropdownItem>
                </DropdownList>
                <DropdownList>
                  <DropdownItem
                    key="download-report"
                    onClick={handleDownloadCSV}
                  >
                    Download as CSV
                  </DropdownItem>
                </DropdownList>
              </Dropdown>
            </SplitItem>
          </Split>
        )}
      </PageSection>
      <PageSection>
        {uploadResponseData === null ? (
          <UploadFileForAnalysis
            uploads={uploads}
            handleUpload={handleUpload}
            handleRemoveUpload={handleRemoveUpload}
            handleCancelUpload={handleCancelUpload}
          />
        ) : isFetching ? (
          <EmptyState
            titleText="Generating vulnerability report"
            headingLevel="h4"
            icon={Spinner}
          >
            <EmptyStateBody>
              Analyzing your SBOM for security vulnerabilities and package
              details.
            </EmptyStateBody>
            <EmptyStateFooter>
              <EmptyStateActions>
                <Button
                  variant="link"
                  onClick={scanAnotherFile}
                  icon={<TimesIcon />}
                >
                  Cancel Report
                </Button>
              </EmptyStateActions>
            </EmptyStateFooter>
          </EmptyState>
        ) : fetchError ? (
          <EmptyState
            status="danger"
            headingLevel="h4"
            titleText="Scan failed"
            icon={ExclamationCircleIcon}
            variant={EmptyStateVariant.sm}
          >
            <EmptyStateBody>
              The {joinedFileName} file could not be analyzed. The file might be
              corrupted or an unsupported format.
            </EmptyStateBody>
            <EmptyStateFooter>
              <EmptyStateActions>
                <Button variant="primary" onClick={scanAnotherFile}>
                  Try another file
                </Button>
              </EmptyStateActions>
            </EmptyStateFooter>
          </EmptyState>
        ) : vulnerabilities.length === 0 ? (
          <EmptyState
            status="success"
            headingLevel="h4"
            titleText="No vulnerabilities found"
            icon={CheckCircleIcon}
            variant={EmptyStateVariant.sm}
          >
            <EmptyStateBody>
              The {joinedFileName} was successfully analyzed and found no
              vulnerabilities to report.
            </EmptyStateBody>
            <EmptyStateFooter>
              <EmptyStateActions>
                <Button variant="primary" onClick={scanAnotherFile}>
                  Try another file
                </Button>
              </EmptyStateActions>
            </EmptyStateFooter>
          </EmptyState>
        ) : (
          <VulnerabilityTable
            vulnerabilities={vulnerabilities}
            isFetching={isFetching}
            fetchError={fetchError}
          />
        )}
      </PageSection>

      <Modal
        variant="small"
        isOpen={blocker.state === "blocked"}
        onClose={() => blocker.state === "blocked" && blocker.reset()}
      >
        <ModalHeader title="Leave Vulnerability report?" />
        <ModalBody>
          This report is not saved and will be unavailable after leaving this
          page. To save the report, download it.
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            icon={<DownloadIcon />}
            onClick={async () => {
              await handleDownloadCSV();
              blocker.state === "blocked" && blocker.proceed();
            }}
          >
            Download and leave
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              blocker.state === "blocked" && blocker.proceed();
            }}
          >
            Leave without downloading
          </Button>
          <Button
            key="cancel"
            variant="link"
            onClick={() => {
              blocker.state === "blocked" && blocker.reset();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
