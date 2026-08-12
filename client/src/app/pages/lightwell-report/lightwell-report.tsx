import React from "react";
import {
  type BlockerFunction,
  Link,
  useBlocker,
  useSearchParams,
} from "react-router-dom";

import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Label,
  LabelGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PageSection,
  Progress,
  Spinner,
  Stack,
  StackItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import DownloadIcon from "@patternfly/react-icons/dist/esm/icons/download-icon";

import { FilterToolbar, FilterType } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { useLocalTableControls } from "@app/hooks/table-controls";
import { useWithUiId } from "@app/utils/query-utils";
import { Paths } from "@app/Routes";
import {
  useBatchedRecommendations,
  type PackageResult,
} from "./use-batched-recommendations";
import { downloadCsv } from "./csv-export";

export const LightwellReport: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sbomIds = React.useMemo(() => {
    const ids = searchParams.get("ids");
    return ids ? ids.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const {
    progressPercent,
    isLoading,
    isComplete,
    sbomResults,
    packageResults,
    error,
    warnings,
  } = useBatchedRecommendations(sbomIds);

  const sbomNames = React.useMemo(
    () => [...new Set(packageResults.flatMap((p) => p.foundIn))].sort(),
    [packageResults],
  );

  const tableDataWithUiId = useWithUiId(
    packageResults,
    (d) => `${d.packageName}-${d.version}-${d.recommendedVersion}`,
  );

  const tableControls = useLocalTableControls({
    tableName: "lightwell-packages",
    idProperty: "_ui_unique_id",
    items: tableDataWithUiId,
    isLoading: false,
    columnNames: {
      packageName: "Package",
      version: "Version",
      recommendedVersion: "Recommended version",
      vulnerabilities: "Vulnerabilities addressed",
      foundIn: "Found in",
    },
    hasActionsColumn: false,
    isSortEnabled: true,
    sortableColumns: ["packageName"],
    getSortValues: (item) => ({
      packageName: item.packageName,
    }),
    isPaginationEnabled: true,
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: "foundIn",
        title: "SBOM",
        placeholderText: "Filter by SBOM...",
        type: FilterType.multiselect,
        selectOptions: sbomNames.map((name) => ({
          value: name,
          label: name,
        })),
        matcher: (filterValue: string, item: PackageResult) =>
          item.foundIn.includes(filterValue),
      },
      {
        categoryKey: "vulnerabilities",
        title: "CVE",
        placeholderText: "Filter by CVE...",
        type: FilterType.search,
        matcher: (filterValue: string, item: PackageResult) =>
          item.vulnerabilities.some((v) =>
            v.toLowerCase().includes(filterValue.toLowerCase()),
          ),
      },
    ],
    isExpansionEnabled: false,
  });

  const {
    currentPageItems,
    numRenderedColumns,
    propHelpers: {
      toolbarProps: pkgToolbarProps,
      filterToolbarProps: pkgFilterToolbarProps,
      paginationToolbarItemProps: pkgPaginationToolbarItemProps,
      paginationProps: pkgPaginationProps,
      tableProps: pkgTableProps,
      getThProps,
      getTrProps,
      getTdProps,
    },
  } = tableControls;

  // Tracks whether the user has already saved (downloaded) the report, so we
  // only warn about losing unsaved results.
  const [hasDownloaded, setHasDownloaded] = React.useState(false);

  // Block in-app navigation away from the page while an unsaved report exists.
  const shouldBlock = React.useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      return (
        isComplete &&
        packageResults.length > 0 &&
        !hasDownloaded &&
        currentLocation.pathname !== nextLocation.pathname
      );
    },
    [isComplete, packageResults.length, hasDownloaded],
  );

  const blocker = useBlocker(shouldBlock);

  // Downloads the report as CSV and marks it as saved.
  const handleDownload = () => {
    downloadCsv(packageResults);
    setHasDownloaded(true);
  };

  if (sbomIds.length === 0) {
    return (
      <PageSection>
        <Alert variant="warning" title="No SBOMs selected">
          Go back to the SBOMs page and select one or more SBOMs to generate a
          report.
        </Alert>
      </PageSection>
    );
  }

  const addressableSboms = sbomResults.filter((s) => s.addressablePackages > 0);

  const coverage =
    sbomIds.length > 0
      ? Math.round((addressableSboms.length / sbomIds.length) * 100)
      : 0;

  return (
    <>
      <PageSection variant="light">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sboms}>SBOMs</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Lightwell remediation report</BreadcrumbItem>
        </Breadcrumb>

        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <Content component="h1">Lightwell remediation report</Content>
              <Content component="p">
                Impact summary for your selected SBOMs. Download a copy if you
                want to keep it.
              </Content>
            </ToolbarItem>
            <ToolbarItem align={{ default: "alignEnd" }}>
              <Button
                variant="primary"
                isDisabled={!isComplete || packageResults.length === 0}
                onClick={handleDownload}
              >
                Download
              </Button>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </PageSection>

      <PageSection>
        <Stack hasGutter>
          {isLoading && (
            <StackItem>
              <Card>
                <CardBody>
                  <Progress
                    value={progressPercent}
                    title="Generating report..."
                    label={`${progressPercent}%`}
                  />
                </CardBody>
              </Card>
            </StackItem>
          )}

          {error && (
            <StackItem>
              <Alert variant="danger" title="Error generating report">
                {error}
              </Alert>
            </StackItem>
          )}

          {warnings.length > 0 && (
            <StackItem>
              <Alert variant="warning" title="Partial data warning">
                Some recommendation batches failed. Results may be incomplete:
                <ul>
                  {warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </Alert>
            </StackItem>
          )}

          {isComplete && (
            <>
              <StackItem>
                <Alert
                  variant="info"
                  title="Lightwell remediations available"
                  isInline
                >
                  Based on the selected SBOMs, Lightwell can address{" "}
                  {addressableSboms.length} of {sbomIds.length} and{" "}
                  {packageResults.length} related packages.
                </Alert>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>Impact summary</CardTitle>
                  <CardBody>
                    <Flex>
                      <FlexItem>
                        <DescriptionList isHorizontal>
                          <DescriptionListGroup>
                            <DescriptionListTerm>
                              SBOMs Lightwell can address
                            </DescriptionListTerm>
                            <DescriptionListDescription>
                              <Content component="h2">
                                {addressableSboms.length} / {sbomIds.length}
                              </Content>
                              <Content component="small">
                                You selected {sbomIds.length} SBOMs
                              </Content>
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                      </FlexItem>
                      <FlexItem>
                        <DescriptionList isHorizontal>
                          <DescriptionListGroup>
                            <DescriptionListTerm>
                              Packages Lightwell can address
                            </DescriptionListTerm>
                            <DescriptionListDescription>
                              <Content component="h2">
                                {packageResults.length}
                              </Content>
                              <Content component="small">
                                Unique packages across selected SBOMs
                              </Content>
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                      </FlexItem>
                    </Flex>

                    <Progress
                      value={coverage}
                      title="SBOM coverage"
                      label={`${coverage}%`}
                      style={{ marginTop: "1rem" }}
                    />

                    <DescriptionList isHorizontal style={{ marginTop: "1rem" }}>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Selected SBOMs
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {sbomIds.length}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Addressable SBOMs
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {addressableSboms.length}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Addressable packages
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {packageResults.length}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>SBOMs Lightwell can help with</CardTitle>
                  <CardBody>
                    <Table aria-label="SBOMs Lightwell can help with">
                      <Thead>
                        <Tr>
                          <Th>SBOM</Th>
                          <Th>Addressable packages</Th>
                          <Th>Vulnerabilities</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {addressableSboms.map((s) => (
                          <Tr key={s.sbomId}>
                            <Td>{s.sbomName}</Td>
                            <Td>{s.addressablePackages}</Td>
                            <Td>{s.vulnerabilityCount}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </CardBody>
                </Card>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>Packages Lightwell can help with</CardTitle>
                  <CardBody>
                    <Toolbar {...pkgToolbarProps} aria-label="packages-toolbar">
                      <ToolbarContent>
                        <FilterToolbar {...pkgFilterToolbarProps} />
                        <ToolbarItem {...pkgPaginationToolbarItemProps}>
                          <SimplePagination
                            idPrefix="lightwell-packages"
                            isTop
                            paginationProps={pkgPaginationProps}
                          />
                        </ToolbarItem>
                      </ToolbarContent>
                    </Toolbar>
                    <Table
                      {...pkgTableProps}
                      aria-label="Packages Lightwell can help with"
                    >
                      <Thead>
                        <Tr>
                          <TableHeaderContentWithControls {...tableControls}>
                            <Th
                              {...getThProps({
                                columnKey: "packageName",
                              })}
                            />
                            <Th
                              {...getThProps({
                                columnKey: "version",
                              })}
                            />
                            <Th
                              {...getThProps({
                                columnKey: "recommendedVersion",
                              })}
                            />
                            <Th
                              {...getThProps({
                                columnKey: "vulnerabilities",
                              })}
                            />
                            <Th
                              {...getThProps({
                                columnKey: "foundIn",
                              })}
                            />
                          </TableHeaderContentWithControls>
                        </Tr>
                      </Thead>
                      <ConditionalTableBody
                        isLoading={false}
                        isError={false}
                        isNoData={packageResults.length === 0}
                        numRenderedColumns={numRenderedColumns}
                      >
                        {currentPageItems?.map((item, rowIndex) => (
                          <Tbody key={item._ui_unique_id}>
                            <Tr {...getTrProps({ item })}>
                              <TableRowContentWithControls
                                {...tableControls}
                                item={item}
                                rowIndex={rowIndex}
                              >
                                <Td
                                  {...getTdProps({
                                    columnKey: "packageName",
                                  })}
                                >
                                  {item.packageName}
                                </Td>
                                <Td
                                  {...getTdProps({
                                    columnKey: "version",
                                  })}
                                >
                                  {item.version}
                                </Td>
                                <Td
                                  {...getTdProps({
                                    columnKey: "recommendedVersion",
                                  })}
                                >
                                  {item.recommendedVersion}
                                </Td>
                                <Td
                                  {...getTdProps({
                                    columnKey: "vulnerabilities",
                                  })}
                                >
                                  <LabelGroup>
                                    {item.vulnerabilities.map((cve) => (
                                      <Label key={cve} isCompact color="orange">
                                        {cve}
                                      </Label>
                                    ))}
                                  </LabelGroup>
                                </Td>
                                <Td
                                  {...getTdProps({
                                    columnKey: "foundIn",
                                  })}
                                >
                                  <LabelGroup>
                                    {item.foundIn.map((name) => (
                                      <Label key={name} isCompact color="grey">
                                        {name}
                                      </Label>
                                    ))}
                                  </LabelGroup>
                                </Td>
                              </TableRowContentWithControls>
                            </Tr>
                          </Tbody>
                        ))}
                      </ConditionalTableBody>
                    </Table>
                    <SimplePagination
                      idPrefix="lightwell-packages"
                      isTop={false}
                      paginationProps={pkgPaginationProps}
                    />
                  </CardBody>
                </Card>
              </StackItem>
            </>
          )}

          {isLoading && !isComplete && (
            <StackItem>
              <Flex justifyContent={{ default: "justifyContentCenter" }}>
                <Spinner size="lg" />
              </Flex>
            </StackItem>
          )}
        </Stack>
      </PageSection>

      <Modal
        variant="small"
        isOpen={blocker.state === "blocked"}
        onClose={() => blocker.state === "blocked" && blocker.reset()}
        aria-label="Leave Lightwell remediation report"
      >
        <ModalHeader title="Leave Lightwell remediation report?" />
        <ModalBody>
          This report is not saved and will be unavailable after leaving this
          page. To save the report, download it.
        </ModalBody>
        <ModalFooter>
          <Button
            key="download-and-leave"
            aria-label="download and leave"
            variant="primary"
            icon={<DownloadIcon />}
            onClick={() => {
              handleDownload();
              if (blocker.state === "blocked") blocker.proceed();
            }}
          >
            Download and leave
          </Button>
          <Button
            key="leave-without-downloading"
            aria-label="leave without downloading"
            variant="secondary"
            onClick={() => {
              if (blocker.state === "blocked") blocker.proceed();
            }}
          >
            Leave without downloading
          </Button>
          <Button
            key="cancel"
            aria-label="cancel"
            variant="link"
            onClick={() => {
              if (blocker.state === "blocked") blocker.reset();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
