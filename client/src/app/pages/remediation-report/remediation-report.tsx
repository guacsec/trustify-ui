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

import { REMEDIATION_VENDOR_LABEL } from "@trustify-ui/common";

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
import { useFetchRemediationReport } from "@app/queries/recommendations";
import type { RecommendReportPackage } from "@app/client";

import { downloadCsv } from "./csv-export";
import { extractName, extractVersion } from "./purl-utils";

/** View model for a package row in the packages-with-remediations table. */
interface PackageRow {
  purl: string;
  packageName: string;
  version: string;
  recommendedVersion: string;
  foundInNames: string[];
  vulnerabilities: string[];
}

const toPackageRows = (
  packages: RecommendReportPackage[],
  sbomNameById: Map<string, string>,
): PackageRow[] =>
  packages.map((pkg) => ({
    purl: pkg.purl,
    packageName: extractName(pkg.purl),
    version: extractVersion(pkg.purl),
    recommendedVersion: extractVersion(pkg.recommended_purl),
    foundInNames: (pkg.found_in ?? []).map((id) => sbomNameById.get(id) ?? id),
    vulnerabilities: pkg.vulnerabilities ?? [],
  }));

/** Remediation report page — renders an impact summary and per-package remediations for selected SBOMs. */
export const RemediationReport: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sbomIds = React.useMemo(() => {
    const ids = searchParams.get("ids");
    return ids ? ids.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const { report, isFetching, fetchError, isLimitExceeded } =
    useFetchRemediationReport(sbomIds);

  const sbomNameById = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const sbom of report?.sboms ?? []) {
      map.set(sbom.id, sbom.name);
    }
    return map;
  }, [report]);

  const sbomNames = React.useMemo(
    () => (report?.sboms ?? []).map((s) => s.name).sort(),
    [report],
  );

  const packageRows = React.useMemo(
    () => toPackageRows(report?.packages ?? [], sbomNameById),
    [report, sbomNameById],
  );

  const tableDataWithUiId = useWithUiId(
    packageRows,
    (d) => `${d.purl}-${d.recommendedVersion}`,
  );

  const tableControls = useLocalTableControls({
    tableName: "remediation-packages",
    idProperty: "_ui_unique_id",
    items: tableDataWithUiId,
    isLoading: isFetching,
    columnNames: {
      packageName: "Package",
      version: "Version",
      recommendedVersion: "Remediation",
      vulnerabilities: "Vulnerabilities addressed",
      foundInNames: "Found in",
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
        categoryKey: "foundInNames",
        title: "SBOM",
        placeholderText: "Filter by SBOM...",
        type: FilterType.multiselect,
        selectOptions: sbomNames.map((name) => ({
          value: name,
          label: name,
        })),
        matcher: (filterValue: string, item: PackageRow) =>
          item.foundInNames.includes(filterValue),
      },
      {
        categoryKey: "vulnerabilities",
        title: "CVE",
        placeholderText: "Filter by CVE...",
        type: FilterType.search,
        matcher: (filterValue: string, item: PackageRow) =>
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

  const [hasDownloaded, setHasDownloaded] = React.useState(false);

  const shouldBlock = React.useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      !!report &&
      packageRows.length > 0 &&
      !hasDownloaded &&
      currentLocation.pathname !== nextLocation.pathname,
    [report, packageRows.length, hasDownloaded],
  );

  const blocker = useBlocker(shouldBlock);

  const handleDownload = () => {
    downloadCsv(report?.packages ?? [], sbomNameById);
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

  const addressableSboms = (report?.sboms ?? []).filter(
    (s) => s.addressable_packages > 0,
  );
  const impact = report?.impact_summary;

  return (
    <>
      <PageSection>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sboms}>SBOMs</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Remediation report</BreadcrumbItem>
        </Breadcrumb>

        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <Content component="h1">Remediation report</Content>
              <Content component="p">
                Impact summary for your selected SBOMs. Download a copy if you
                want to keep it.
              </Content>
            </ToolbarItem>
            <ToolbarItem align={{ default: "alignEnd" }}>
              <Button
                variant="primary"
                isDisabled={!report || packageRows.length === 0}
                onClick={handleDownload}
                icon={<DownloadIcon />}
              >
                Download CSV
              </Button>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </PageSection>

      <PageSection>
        <Stack hasGutter>
          {isFetching && (
            <StackItem>
              <Flex justifyContent={{ default: "justifyContentCenter" }}>
                <FlexItem>
                  <Spinner size="lg" />
                </FlexItem>
                <FlexItem>
                  <Content component="p">Generating report…</Content>
                </FlexItem>
              </Flex>
            </StackItem>
          )}

          {isLimitExceeded && (
            <StackItem>
              <Alert variant="danger" title="Package limit exceeded" isInline>
                The selected SBOMs contain too many packages to process at once.
                Select fewer SBOMs and try again.
              </Alert>
            </StackItem>
          )}

          {fetchError && !isLimitExceeded && (
            <StackItem>
              <Alert variant="danger" title="Error generating report" isInline>
                {fetchError.message}
              </Alert>
            </StackItem>
          )}

          {report && (
            <>
              <StackItem>
                <Alert
                  variant="info"
                  title={`${REMEDIATION_VENDOR_LABEL} remediations available`}
                  isInline
                >
                  Based on the selected SBOMs, {REMEDIATION_VENDOR_LABEL} can
                  address {addressableSboms.length} of {sbomIds.length} SBOMs
                  and {impact?.addressable_packages ?? 0} related packages.
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
                              SBOMs with remediations
                            </DescriptionListTerm>
                            <DescriptionListDescription>
                              <Content component="h2">
                                {impact?.sboms_with_recommendations ?? 0} /{" "}
                                {sbomIds.length}
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
                              Addressable packages
                            </DescriptionListTerm>
                            <DescriptionListDescription>
                              <Content component="h2">
                                {impact?.addressable_packages ?? 0}
                              </Content>
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                      </FlexItem>
                      <FlexItem flex={{ default: "flex_1" }}>
                        <DescriptionList isHorizontal>
                          <DescriptionListGroup>
                            <DescriptionListTerm>Coverage</DescriptionListTerm>
                            <DescriptionListDescription>
                              <Progress
                                value={
                                  sbomIds.length > 0
                                    ? Math.round(
                                        (addressableSboms.length /
                                          sbomIds.length) *
                                          100,
                                      )
                                    : 0
                                }
                                title="SBOMs with remediations"
                                aria-label="SBOMs coverage"
                              />
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                      </FlexItem>
                    </Flex>
                  </CardBody>
                </Card>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>SBOMs with remediations</CardTitle>
                  <CardBody>
                    <Table aria-label="SBOMs with remediations">
                      <Thead>
                        <Tr>
                          <Th>SBOM</Th>
                          <Th>Addressable packages</Th>
                          <Th>Vulnerabilities</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {(report.sboms ?? []).map((sbom) => (
                          <Tr key={sbom.id}>
                            <Td>{sbom.name}</Td>
                            <Td>{sbom.addressable_packages}</Td>
                            <Td>{sbom.vulnerability_count}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </CardBody>
                </Card>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>Packages with remediations</CardTitle>
                  <CardBody>
                    <Toolbar {...pkgToolbarProps} aria-label="packages-toolbar">
                      <ToolbarContent>
                        <FilterToolbar {...pkgFilterToolbarProps} />
                        <ToolbarItem {...pkgPaginationToolbarItemProps}>
                          <SimplePagination
                            idPrefix="remediation-packages"
                            isTop
                            paginationProps={pkgPaginationProps}
                          />
                        </ToolbarItem>
                      </ToolbarContent>
                    </Toolbar>
                    <Table
                      {...pkgTableProps}
                      aria-label="Packages with remediations"
                    >
                      <Thead>
                        <Tr>
                          <TableHeaderContentWithControls {...tableControls}>
                            <Th {...getThProps({ columnKey: "packageName" })} />
                            <Th {...getThProps({ columnKey: "version" })} />
                            <Th
                              {...getThProps({
                                columnKey: "recommendedVersion",
                              })}
                            />
                            <Th
                              {...getThProps({ columnKey: "vulnerabilities" })}
                            />
                            <Th
                              {...getThProps({ columnKey: "foundInNames" })}
                            />
                          </TableHeaderContentWithControls>
                        </Tr>
                      </Thead>
                      <ConditionalTableBody
                        isLoading={isFetching}
                        isError={!!fetchError && !isLimitExceeded}
                        isNoData={packageRows.length === 0}
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
                                  {...getTdProps({ columnKey: "packageName" })}
                                >
                                  {item.packageName}
                                </Td>
                                <Td {...getTdProps({ columnKey: "version" })}>
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
                                  {...getTdProps({ columnKey: "foundInNames" })}
                                >
                                  <LabelGroup>
                                    {item.foundInNames.map((name) => (
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
                      idPrefix="remediation-packages"
                      isTop={false}
                      paginationProps={pkgPaginationProps}
                    />
                  </CardBody>
                </Card>
              </StackItem>
            </>
          )}
        </Stack>
      </PageSection>

      <Modal
        variant="small"
        isOpen={blocker.state === "blocked"}
        onClose={() => blocker.state === "blocked" && blocker.reset()}
        aria-label="Leave remediation report"
      >
        <ModalHeader title="Leave remediation report?" />
        <ModalBody>
          This report is not saved and will be unavailable after leaving this
          page. To save the report, download it first.
        </ModalBody>
        <ModalFooter>
          <Button
            key="download-and-leave"
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
            variant="secondary"
            onClick={() => {
              if (blocker.state === "blocked") blocker.proceed();
            }}
          >
            Leave without downloading
          </Button>
          <Button
            key="cancel"
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
