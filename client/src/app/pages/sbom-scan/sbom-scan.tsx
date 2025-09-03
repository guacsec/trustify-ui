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
  Split,
  SplitItem,
  type MenuToggleElement,
} from "@patternfly/react-core";

import DownloadIcon from "@patternfly/react-icons/dist/esm/icons/download-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import InProgressIcon from "@patternfly/react-icons/dist/esm/icons/in-progress-icon";

import { generateStaticReport } from "@app/api/rest";
import type { ExtractResult } from "@app/client";
import { WINDOW_ANALYSIS_RESPONSE } from "@app/Constants";
import { useUploadAndAnalyzeSBOM } from "@app/queries/sboms-analysis";
import { Paths } from "@app/Routes";

import { useVulnerabilitiesOfSbomByPurls } from "@static-report/hooks/useVulnerabilitiesOfSbom";
import { VulnerabilityTable } from "@static-report/pages/vulnerabilities/components/VulnerabilityTable";

import { UploadFileForAnalysis } from "./components/UploadFileForAnalysis";

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
    analysisResponse,
    isFetching,
    fetchError,
  } = useVulnerabilitiesOfSbomByPurls(allPurls);

  // Other actions
  const [isDownloadingReport, setIsDownloadingReport] = React.useState(false);

  const downloadReport = async () => {
    setIsDownloadingReport(true);

    const form = new FormData();
    form.append(
      WINDOW_ANALYSIS_RESPONSE,
      new Blob([JSON.stringify(analysisResponse)], {
        type: "application/json",
      }),
    );

    await generateStaticReport(form).then((response) => {
      saveAs(new Blob([response.data as BlobPart]), "report.tar.gz");
    });

    setIsDownloadingReport(false);
  };

  const scanAnotherFile = () => {
    for (const file of uploads.keys()) {
      handleRemoveUpload(file);
    }

    setUploadResponseData(null);
  };

  const reportNotReady =
    uploadResponseData === null || isFetching || fetchError;

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sboms}>SBOMs</Link>
          </BreadcrumbItem>
          {reportNotReady ? (
            <BreadcrumbItem isActive>
              Generate vulnerability report
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem isActive>Vulnerability report</BreadcrumbItem>
          )}
        </Breadcrumb>
      </PageSection>
      <PageSection>
        {reportNotReady ? (
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
                    Scan another
                  </DropdownItem>
                </DropdownList>
                <DropdownList>
                  <DropdownItem
                    key="download-report"
                    onClick={downloadReport}
                    isDisabled={isDownloadingReport}
                  >
                    Download report
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
            titleText="Generating SBOM report"
            headingLevel="h4"
            icon={InProgressIcon}
          >
            <EmptyStateBody>
              Analyzing your SBOM for security vulnerabilities, license issues
              and dependency details.
            </EmptyStateBody>
            <EmptyStateFooter>
              <EmptyStateActions>
                <Button variant="link" onClick={scanAnotherFile}>
                  Cancel scan
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
              The file could not be analyzed. The file might be corrupted or an
              unsupported format.
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
            isLoading={isDownloadingReport}
            isDisabled={isDownloadingReport}
            onClick={async () => {
              await downloadReport();
              blocker.state === "blocked" && blocker.proceed();
            }}
          >
            Download and leave
          </Button>
          <Button
            variant="secondary"
            isDisabled={isDownloadingReport}
            onClick={async () => {
              blocker.state === "blocked" && blocker.proceed();
            }}
          >
            Leave without downloading
          </Button>
          <Button
            key="cancel"
            variant="link"
            isDisabled={isDownloadingReport}
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
