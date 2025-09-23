import React from "react";
import { generatePath, Link } from "react-router-dom";

import dayjs from "dayjs";

import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
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

import { extendedSeverityFromSeverity } from "@app/api/models";
import type { PurlSummary } from "@app/client";
import { FilterToolbar, FilterType } from "@app/components/FilterToolbar";
import { PackageQualifiers } from "@app/components/PackageQualifiers";
import { SeverityShieldAndText } from "@app/components/SeverityShieldAndText";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { TdWithFocusStatus } from "@app/components/TdWithFocusStatus";
import { VulnerabilityDescription } from "@app/components/VulnerabilityDescription";
import { VulnerabilityStatusLabel } from "@app/components/VulnerabilityStatusLabel";
import { useVulnerabilitiesOfSbom } from "@app/hooks/domain-controls/useVulnerabilitiesOfSbom";
import { useLocalTableControls } from "@app/hooks/table-controls";
import { Paths } from "@app/Routes";
import { useWithUiId } from "@app/utils/query-utils";
import { decomposePurl, formatDate } from "@app/utils/utils";
import { extractImporterNameFromAdvisory } from "../sbom-scan/scan-utils";

interface VulnerabilitiesBySbomProps {
  sbomId: string;
}

export const VulnerabilitiesBySbom: React.FC<VulnerabilitiesBySbomProps> = ({
  sbomId,
}) => {
  const {
    data: { vulnerabilities },
    isFetching: isFetchingVulnerabilities,
    fetchError: fetchErrorVulnerabilities,
  } = useVulnerabilitiesOfSbom(sbomId);

  const allImporterNames = React.useMemo(() => {
    return vulnerabilities
      .flatMap((e) => Array.from(e.advisories.values()))
      .reduce((prev, current) => {
        const importerName = extractImporterNameFromAdvisory(current);
        prev.add(importerName);
        return prev;
      }, new Set<string>());
  }, [vulnerabilities]);

  const tableDataWithUiId = useWithUiId(
    vulnerabilities,
    (d) => `${d.vulnerability.identifier}-${d.status}`,
  );

  const tableControls = useLocalTableControls({
    tableName: "vulnerability-table",
    idProperty: "_ui_unique_id",
    items: tableDataWithUiId,
    isLoading: isFetchingVulnerabilities,
    columnNames: {
      vulnerabilityId: "Vulnerability ID",
      description: "Description",
      severity: "Severity",
      status: "Status",
      affectedPackages: "Affected packages",
      published: "Published",
      updated: "Updated",
    },
    hasActionsColumn: false,
    isSortEnabled: true,
    sortableColumns: [
      "vulnerabilityId",
      "affectedPackages",
      "published",
      "updated",
    ],
    getSortValues: (item) => ({
      vulnerabilityId: item.vulnerability.identifier,
      affectedPackages: item.packages.size,
      published: item.vulnerability?.published
        ? dayjs(item.vulnerability.published).valueOf()
        : 0,
      updated: item.vulnerability?.modified
        ? dayjs(item.vulnerability.modified).valueOf()
        : 0,
    }),
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: "vulnerabilityId",
        title: "Vulnerability ID",
        type: FilterType.search,
        placeholderText: "Search by Vulnerability ID",
        getItemValue: (item) => item.vulnerability.identifier,
      },
      {
        categoryKey: "importer",
        title: "Importer",
        type: FilterType.multiselect,
        placeholderText: "Importer",
        selectOptions: Array.from(allImporterNames).map((e) => ({
          value: e,
          label: e,
        })),
        matcher: (filter, item) => {
          return !!Array.from(item.advisories.values())
            .map((advisory) => extractImporterNameFromAdvisory(advisory))
            .find((importerName) => importerName === filter);
        },
      },
      {
        categoryKey: "status",
        title: "Status",
        type: FilterType.multiselect,
        placeholderText: "Status",
        selectOptions: [
          {
            value: "affected",
            label: "Affected",
          },
          {
            value: "under_investigation",
            label: "Under investigation",
          },
          {
            value: "known_not_affected",
            label: "Known not affected",
          },
          {
            value: "not_affected",
            label: "Not affected",
          },
          {
            value: "fixed",
            label: "Fixed",
          },
        ],
        matcher: (filter, item) => {
          return filter === item.status;
        },
      },
      // {
      //   categoryKey: "severity",
      //   title: "Severity",
      //   placeholderText: "Severity",
      //   type: FilterType.multiselect,
      //   selectOptions: [
      //     { value: "null", label: "Unknown" },
      //     { value: "none", label: "None" },
      //     { value: "low", label: "Low" },
      //     { value: "medium", label: "Medium" },
      //     { value: "high", label: "High" },
      //     { value: "critical", label: "Critical" },
      //   ],
      //   matcher: (filter, item) => {
      //     return !!Array.from(item.advisories.values())
      //       .map((advisory) => advisory.severity)
      //       .find((severity) => severity === filter);
      //   },
      // },
    ],
    initialFilterValues: {
      status: ["affected"],
    },
    isPaginationEnabled: true,
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
      filterToolbarProps,
      getThProps,
      getTrProps,
      getTdProps,
      getExpandedContentTdProps,
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  return (
    <>
      <Toolbar {...toolbarProps}>
        <ToolbarContent>
          <FilterToolbar {...filterToolbarProps} />
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
              <Th {...getThProps({ columnKey: "vulnerabilityId" })} />
              <Th {...getThProps({ columnKey: "description" })} />
              <Th {...getThProps({ columnKey: "severity" })} />
              <Th {...getThProps({ columnKey: "status" })} />
              <Th {...getThProps({ columnKey: "affectedPackages" })} />
              <Th
                {...getThProps({ columnKey: "published" })}
                info={{
                  tooltip:
                    "The date when information about this vulnerability was first made available.",
                }}
              />
              <Th
                {...getThProps({ columnKey: "updated" })}
                info={{
                  tooltip:
                    "The date when information about this vulnerability was most recently revised.",
                }}
              />
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
              <Tbody key={item._ui_unique_id} isExpanded={isCellExpanded(item)}>
                <Tr {...getTrProps({ item })}>
                  <TableRowContentWithControls
                    {...tableControls}
                    item={item}
                    rowIndex={rowIndex}
                  >
                    <Td
                      width={15}
                      modifier="breakWord"
                      {...getTdProps({ columnKey: "vulnerabilityId" })}
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
                          width={25}
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
                    <Td width={10} {...getTdProps({ columnKey: "severity" })}>
                      <SeverityShieldAndText
                        value={extendedSeverityFromSeverity(
                          item.vulnerability.average_severity,
                        )}
                        score={item.vulnerability.average_score}
                        showLabel
                        showScore
                      />
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "status" })}
                    >
                      <VulnerabilityStatusLabel value={item.status} />
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({
                        columnKey: "affectedPackages",
                        isCompoundExpandToggle: true,
                        item: item,
                        rowIndex,
                      })}
                    >
                      {item.packages.size}
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
                        {isCellExpanded(item, "affectedPackages") ? (
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
                              {Array.from(item.packages.values())
                                .flatMap((item) => {
                                  // Some packages do not have purl neither ID. So we render only the parent name meanwhile
                                  type EnrichedPurlSummary = {
                                    parentName: string;
                                    purlSummary?: PurlSummary;
                                  };

                                  const hasNoPurlsButOnlyName =
                                    item.name && item.purl.length === 0;

                                  if (hasNoPurlsButOnlyName) {
                                    const result: EnrichedPurlSummary = {
                                      parentName: item.name,
                                    };
                                    return [result];
                                  }

                                  return item.purl.map((i) => {
                                    const result: EnrichedPurlSummary = {
                                      parentName: item.name,
                                      purlSummary: i,
                                    };
                                    return result;
                                  });
                                })
                                .map((purl, index) => {
                                  if (purl.purlSummary) {
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
                                              value={decomposedPurl?.qualifiers}
                                            />
                                          )}
                                        </Td>
                                      </Tr>
                                    );
                                  }

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
                                })}
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
    </>
  );
};
