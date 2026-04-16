import React from "react";
import { generatePath, Link } from "react-router-dom";

import dayjs from "dayjs";

import {
  Button,
  Card,
  CardBody,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Popover,
  Stack,
  StackItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  ExpandableRowContent,
  Table,
  TableText,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { PackageQualifiers } from "@app/components/PackageQualifiers";
import { SbomVulnerabilitiesDonutChart } from "@app/components/SbomVulnerabilitiesDonutChart";
import { SeverityShieldAndText } from "@app/components/SeverityShieldAndText";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { TdWithFocusStatus } from "@app/components/TdWithFocusStatus";
import { VulnerabilityDescription } from "@app/components/VulnerabilityDescription";
import { useVulnerabilitiesOfSbom } from "@app/hooks/domain-controls/useVulnerabilitiesOfSbom";
import { useLocalTableControls } from "@app/hooks/table-controls";
import { useFetchSBOMById } from "@app/queries/sboms";
import { Paths } from "@app/Routes";
import { useWithUiId } from "@app/utils/query-utils";
import { decomposePurl, formatDate } from "@app/utils/utils";
import { VulnerabilityScoreBreakdown } from "./components/vulnerability-score-breakdown";

interface VulnerabilitiesBySbomProps {
  sbomId: string;
}

export const VulnerabilitiesBySbom: React.FC<VulnerabilitiesBySbomProps> = ({
  sbomId,
}) => {
  const {
    sbom,
    isFetching: isFetchingSbom,
    fetchError: fetchErrorSbom,
  } = useFetchSBOMById(sbomId);
  const {
    data: { vulnerabilities, summary: vulnerabilitiesSummary },
    isFetching: isFetchingVulnerabilities,
    fetchError: fetchErrorVulnerabilities,
  } = useVulnerabilitiesOfSbom(sbomId);

  const affectedVulnerabilities = React.useMemo(() => {
    return vulnerabilities.filter(
      (item) => item.vulnerabilityStatus === "affected",
    );
  }, [vulnerabilities]);

  const tableDataWithUiId = useWithUiId(
    affectedVulnerabilities,
    (d) => `${d.vulnerability.identifier}-${d.vulnerabilityStatus}`,
  );

  const tableControls = useLocalTableControls({
    tableName: "vulnerability-table",
    idProperty: "_ui_unique_id",
    items: tableDataWithUiId,
    isLoading: isFetchingVulnerabilities,
    columnNames: {
      id: "Id",
      description: "Description",
      cvss: "CVSS",
      affectedDependencies: "Affected dependencies",
      published: "Published",
      updated: "Updated",
    },
    hasActionsColumn: false,
    isSortEnabled: true,
    sortableColumns: [
      "id",
      "cvss",
      "affectedDependencies",
      "published",
      "updated",
    ],
    getSortValues: (item) => ({
      id: item.vulnerability.identifier,
      cvss: item.opinionatedAdvisory.score?.value ?? 0,
      affectedDependencies: item.purls.size,
      published: item.vulnerability?.published
        ? dayjs(item.vulnerability.published).valueOf()
        : 0,
      updated: item.vulnerability?.modified
        ? dayjs(item.vulnerability.modified).valueOf()
        : 0,
    }),
    isPaginationEnabled: true,
    isFilterEnabled: false,
    isExpansionEnabled: true,
    expandableVariant: "compound",
  });

  const {
    currentPageItems,
    numRenderedColumns,
    propHelpers: {
      toolbarProps,
      paginationToolbarItemProps,
      paginationProps,
      tableProps,
      getThProps,
      getTrProps,
      getTdProps,
      getExpandedContentTdProps,
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  return (
    <Stack hasGutter>
      <StackItem>
        <Card>
          <CardBody>
            <LoadingWrapper
              isFetching={isFetchingSbom || isFetchingVulnerabilities}
              fetchError={fetchErrorSbom}
            >
              <Grid hasGutter>
                <GridItem md={6}>
                  <SbomVulnerabilitiesDonutChart
                    vulnerabilitiesSummary={
                      vulnerabilitiesSummary.vulnerabilityStatus.affected
                    }
                  />
                </GridItem>
                <GridItem md={6}>
                  <DescriptionList>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Name</DescriptionListTerm>
                      <DescriptionListDescription>
                        {sbom?.name}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Version</DescriptionListTerm>
                      <DescriptionListDescription>
                        {sbom?.described_by
                          .map((item) => item.version)
                          .join(", ")}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Creation date</DescriptionListTerm>
                      <DescriptionListDescription>
                        {formatDate(sbom?.published)}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </GridItem>
              </Grid>
            </LoadingWrapper>
          </CardBody>
        </Card>
      </StackItem>
      <StackItem>
        <Toolbar {...toolbarProps}>
          <ToolbarContent>
            <ToolbarItem {...paginationToolbarItemProps}>
              <SimplePagination
                idPrefix="vulnerability-table"
                isTop
                paginationProps={paginationProps}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>

        <Table {...tableProps} aria-label="Vulnerability table">
          <Thead>
            <Tr>
              <TableHeaderContentWithControls {...tableControls}>
                <Th {...getThProps({ columnKey: "id" })} />
                <Th {...getThProps({ columnKey: "description" })} />
                <Th {...getThProps({ columnKey: "cvss" })} />
                <Th {...getThProps({ columnKey: "affectedDependencies" })} />
                <Th {...getThProps({ columnKey: "published" })} />
                <Th {...getThProps({ columnKey: "updated" })} />
              </TableHeaderContentWithControls>
            </Tr>
          </Thead>
          <ConditionalTableBody
            isLoading={isFetchingVulnerabilities}
            isError={!!fetchErrorVulnerabilities}
            isNoData={tableDataWithUiId.length === 0}
            numRenderedColumns={numRenderedColumns}
          >
            {currentPageItems?.map((item, rowIndex) => {
              return (
                <Tbody
                  key={item._ui_unique_id}
                  isExpanded={isCellExpanded(item)}
                >
                  <Tr {...getTrProps({ item })}>
                    <TableRowContentWithControls
                      {...tableControls}
                      item={item}
                      rowIndex={rowIndex}
                    >
                      <Td
                        width={10}
                        modifier="breakWord"
                        {...getTdProps({ columnKey: "id" })}
                      >
                        <Link
                          to={generatePath(Paths.vulnerabilityDetails, {
                            vulnerabilityId: item.vulnerability.identifier,
                          })}
                        >
                          {item.vulnerability.identifier}
                        </Link>
                      </Td>
                      <TdWithFocusStatus>
                        {(isFocused, setIsFocused) => (
                          <Td
                            width={40}
                            modifier="truncate"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            tabIndex={0}
                            {...getTdProps({ columnKey: "description" })}
                          >
                            <TableText
                              focused={isFocused}
                              wrapModifier="truncate"
                            >
                              {item.vulnerability && (
                                <VulnerabilityDescription
                                  vulnerability={item.vulnerability}
                                />
                              )}
                            </TableText>
                          </Td>
                        )}
                      </TdWithFocusStatus>
                      <Td width={20} {...getTdProps({ columnKey: "cvss" })}>
                        <Flex>
                          <FlexItem>
                            <SeverityShieldAndText
                              value={item.opinionatedAdvisory.extendedSeverity}
                              score={
                                item.opinionatedAdvisory.score?.value ?? null
                              }
                              showLabel
                              showScore
                            />
                          </FlexItem>
                          <FlexItem>
                            <Popover
                              hasAutoWidth
                              aria-label="CVSS Score Breakdown"
                              headerContent={<div>CVSS Score Breakdown</div>}
                              bodyContent={
                                <VulnerabilityScoreBreakdown
                                  opinionatedAdvisory={{
                                    advisory: item.opinionatedAdvisory.advisory,
                                    score: item.opinionatedAdvisory.score,
                                    extendedSeverity:
                                      item.opinionatedAdvisory.extendedSeverity,
                                  }}
                                  advisories={Array.from(
                                    item.advisories.values(),
                                  )}
                                />
                              }
                            >
                              <Button
                                variant="link"
                                disabled
                                size="sm"
                              >{`${item.advisories.size} Sources`}</Button>
                            </Popover>
                          </FlexItem>
                        </Flex>
                      </Td>
                      <Td
                        width={10}
                        modifier="truncate"
                        {...getTdProps({
                          columnKey: "affectedDependencies",
                          isCompoundExpandToggle: true,
                          item: item,
                          rowIndex,
                        })}
                      >
                        {item.purls.size}
                      </Td>
                      <Td
                        width={10}
                        modifier="truncate"
                        {...getTdProps({ columnKey: "published" })}
                      >
                        {formatDate(item.vulnerability?.published)}
                      </Td>
                      <Td
                        width={10}
                        modifier="truncate"
                        {...getTdProps({ columnKey: "updated" })}
                      >
                        {formatDate(item.vulnerability?.modified)}
                      </Td>
                    </TableRowContentWithControls>
                  </Tr>
                  {isCellExpanded(item) ? (
                    <Tr isExpanded>
                      <Td
                        {...getExpandedContentTdProps({
                          item,
                        })}
                      >
                        <ExpandableRowContent>
                          {isCellExpanded(item, "affectedDependencies") ? (
                            <Table variant="compact">
                              <Thead>
                                <Tr>
                                  <Th>Type</Th>
                                  <Th>Namespace</Th>
                                  <Th>Name</Th>
                                  <Th>Version</Th>
                                  <Th>Path</Th>
                                  <Th>Qualifiers</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {Array.from(item.purls.values()).map(
                                  (purl, index) => {
                                    if (!purl.isOrphan) {
                                      const decomposedPurl = decomposePurl(
                                        purl.purlSummary.purl,
                                      );
                                      return (
                                        <Tr key={purl.purlSummary.uuid}>
                                          <Td>{decomposedPurl?.type}</Td>
                                          <Td>{decomposedPurl?.namespace}</Td>
                                          <Td>
                                            <Link
                                              to={generatePath(
                                                Paths.packageDetails,
                                                {
                                                  packageId:
                                                    purl.purlSummary.uuid,
                                                },
                                              )}
                                            >
                                              {decomposedPurl?.name}
                                            </Link>
                                          </Td>
                                          <Td>{decomposedPurl?.version}</Td>
                                          <Td>{decomposedPurl?.path}</Td>
                                          <Td>
                                            {decomposedPurl?.qualifiers && (
                                              <PackageQualifiers
                                                value={
                                                  decomposedPurl?.qualifiers
                                                }
                                              />
                                            )}
                                          </Td>
                                        </Tr>
                                      );
                                    } else {
                                      return (
                                        <Tr
                                          key={`${purl.parentName}-${index}-name`}
                                        >
                                          <Td />
                                          <Td />
                                          <Td>{purl.parentName}</Td>
                                          <Td />
                                          <Td />
                                          <Td />
                                        </Tr>
                                      );
                                    }
                                  },
                                )}
                              </Tbody>
                            </Table>
                          ) : null}
                        </ExpandableRowContent>
                      </Td>
                    </Tr>
                  ) : null}
                </Tbody>
              );
            })}
          </ConditionalTableBody>
        </Table>
        <SimplePagination
          idPrefix="vulnerability-table"
          isTop={false}
          paginationProps={paginationProps}
        />
      </StackItem>
    </Stack>
  );
};
