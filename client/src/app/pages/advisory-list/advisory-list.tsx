import React from "react";
import { NavLink } from "react-router-dom";

import { AxiosError } from "axios";

import {
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  Stack,
  StackItem,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  ActionsColumn,
  ExpandableRowContent,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

import { TablePersistenceKeyPrefixes } from "@app/Constants";
import { FilterToolbar, FilterType } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import {
  getHubRequestParams,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useDownload } from "@app/hooks/useDownload";
import { useSelectionState } from "@app/hooks/useSelectionState";
import {
  useDeleteAdvisoryMutation,
  useFetchAdvisories,
  useUpdateAdvisoryLabelsMutation,
} from "@app/queries/advisories";

import { EditLabelsModal } from "@app/components/EditLabelsModal";
import { LabelsAsList } from "@app/components/LabelsAsList";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { SeverityShieldAndText } from "@app/components/SeverityShieldAndText";

import { AdvisorySummary, Severity } from "@app/client";
import { AdvisoryGeneralView } from "@app/components/AdvisoryGeneralView";
import { AdvisoryIssuer } from "@app/components/AdvisoryIssuer";

import { Vulnerabilities } from "../advisory-details/vulnerabilities";
import { VulnerabilitiesGalleryCount } from "./components/VulnerabilitiesGaleryCount";

export const AdvisoryList: React.FC = () => {
  const { pushNotification } = React.useContext(NotificationsContext);

  // Actions that each row can trigger
  type RowAction = "editLabels";
  const [selectedRowAction, setSelectedRowAction] =
    React.useState<RowAction | null>(null);
  const [selectedRow, setSelectedRow] = React.useState<AdvisorySummary | null>(
    null
  );

  const prepareActionOnRow = (action: RowAction, row: AdvisorySummary) => {
    setSelectedRowAction(action);
    setSelectedRow(row);
  };

  const onUpdateLabelsError = (_error: AxiosError) => {
    pushNotification({
      title: "Error while updating labels",
      variant: "danger",
    });
  };

  const { mutate: updateAdvisoryLabels } = useUpdateAdvisoryLabelsMutation(
    () => {},
    onUpdateLabelsError
  );

  const execSaveLabels = (
    row: AdvisorySummary,
    labels: { [key: string]: string }
  ) => {
    updateAdvisoryLabels({ ...row, labels });
  };

  // Table config
  const tableControlState = useTableControlState({
    tableName: "advisories",
    persistenceKeyPrefix: TablePersistenceKeyPrefixes.advisories,
    columnNames: {
      identifier: "Identifier",
      title: "Title",
      severity: "Severity",
      labels: "Labels",
      vulnerabilities: "Vulnerabilities",
    },
    isPaginationEnabled: true,
    isSortEnabled: true,
    sortableColumns: ["identifier", "severity"],
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: "",
        title: "Filter text",
        placeholderText: "Search",
        type: FilterType.search,
      },
      {
        categoryKey: "average_severity",
        title: "Severity",
        placeholderText: "Severity",
        type: FilterType.multiselect,
        selectOptions: [
          { value: "none", label: "None" },
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "critical", label: "Critical" },
        ],
      },
    ],
    isExpansionEnabled: true,
    expandableVariant: "compound",
  });

  const {
    result: { data: advisories, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchAdvisories(
    getHubRequestParams({
      ...tableControlState,
      hubSortFieldKeys: {
        identifier: "identifier",
        severity: "average_score",
      },
    })
  );

  const onDeleteAdvisorySuccess = (advisory: AdvisorySummary) => {
    pushNotification({
      title: `The advisory ${advisory.identifier} was deleted`,
      variant: "success",
    });
  };

  const onDeleteAdvisoryError = (_error: AxiosError) => {
    pushNotification({
      title: "Error occurred while deleting the advisory",
      variant: "danger",
    });
  };

  const deleteAdvisoryByIdMutation = useDeleteAdvisoryMutation(
    onDeleteAdvisorySuccess,
    onDeleteAdvisoryError
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "uuid",
    currentPageItems: advisories,
    totalItemCount,
    isLoading: isFetching,
    selectionState: useSelectionState({
      items: advisories,
      isEqual: (a, b) => a.identifier === b.identifier,
    }),
  });

  const {
    numRenderedColumns,
    currentPageItems,
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
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

  const { downloadAdvisory } = useDownload();

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Advisories</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <div
          style={{
            backgroundColor: "var(--pf-v5-global--BackgroundColor--100)",
          }}
        >
          <Toolbar {...toolbarProps}>
            <ToolbarContent>
              <FilterToolbar showFiltersSideBySide {...filterToolbarProps} />
              <ToolbarItem {...paginationToolbarItemProps}>
                <SimplePagination
                  idPrefix="advisory-table"
                  isTop
                  paginationProps={paginationProps}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>

          <Table
            {...tableProps}
            aria-label="Advisory table"
            className="vertical-middle-aligned-table"
          >
            <Thead>
              <Tr>
                <TableHeaderContentWithControls {...tableControls}>
                  <Th {...getThProps({ columnKey: "identifier" })} />
                  <Th {...getThProps({ columnKey: "title" })} />
                  <Th {...getThProps({ columnKey: "severity" })} />
                  <Th {...getThProps({ columnKey: "labels" })} />
                  <Th {...getThProps({ columnKey: "vulnerabilities" })} />
                </TableHeaderContentWithControls>
              </Tr>
            </Thead>
            <ConditionalTableBody
              isLoading={isFetching}
              isError={!!fetchError}
              isNoData={totalItemCount === 0}
              numRenderedColumns={numRenderedColumns}
            >
              {currentPageItems.map((item, rowIndex) => {
                return (
                  <Tbody
                    key={item.identifier}
                    isExpanded={isCellExpanded(item)}
                  >
                    <Tr {...getTrProps({ item })}>
                      <TableRowContentWithControls
                        {...tableControls}
                        item={item}
                        rowIndex={rowIndex}
                      >
                        <Td
                          width={15}
                          {...getTdProps({
                            columnKey: "identifier",
                            isCompoundExpandToggle: true,
                            item: item,
                            rowIndex,
                          })}
                        >
                          <NavLink to={`/advisories/${item.uuid}`}>
                            {item.identifier}
                          </NavLink>
                        </Td>
                        <Td
                          width={40}
                          modifier="breakWord"
                          {...getTdProps({ columnKey: "title" })}
                        >
                          {item.title}
                        </Td>
                        <Td
                          width={10}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "severity" })}
                        >
                          {item.average_severity && (
                            <SeverityShieldAndText
                              value={item.average_severity as Severity}
                            />
                          )}
                        </Td>
                        <Td
                          width={25}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "labels" })}
                        >
                          {item.labels && <LabelsAsList value={item.labels} />}
                        </Td>
                        <Td
                          width={10}
                          modifier="truncate"
                          {...getTdProps({
                            columnKey: "vulnerabilities",
                            isCompoundExpandToggle: true,
                            item: item,
                            rowIndex,
                          })}
                        >
                          {item.vulnerabilities && (
                            <VulnerabilitiesGalleryCount
                              vulnerabilities={item.vulnerabilities}
                            />
                          )}
                        </Td>
                        <Td isActionCell>
                          <ActionsColumn
                            items={[
                              {
                                title: "Edit labels",
                                onClick: () => {
                                  prepareActionOnRow("editLabels", item);
                                },
                              },
                              {
                                title: "Download",
                                onClick: () => {
                                  downloadAdvisory(
                                    item.uuid,
                                    `${item.identifier}.json`
                                  );
                                },
                              },
                              {
                                title: "Delete",
                                onClick: () =>
                                  deleteAdvisoryByIdMutation.mutate(item.uuid),
                              },
                            ]}
                          />
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
                            <div className="pf-v5-u-m-md">
                              {isCellExpanded(item, "identifier") ? (
                                <>
                                  <Stack hasGutter>
                                    <StackItem>
                                      <Grid hasGutter>
                                        <GridItem md={6}>
                                          <Card isFullHeight isCompact>
                                            <CardTitle>General view</CardTitle>
                                            <CardBody>
                                              <AdvisoryGeneralView
                                                advisory={item}
                                                excludedFields={["title"]}
                                                descriptionListProps={{
                                                  columnModifier: {
                                                    default: "2Col",
                                                  },
                                                }}
                                              />
                                            </CardBody>
                                          </Card>
                                        </GridItem>
                                        <GridItem md={6}>
                                          <Card isFullHeight isCompact>
                                            <CardTitle>Issuer</CardTitle>
                                            <CardBody>
                                              <AdvisoryIssuer value={item} />
                                            </CardBody>
                                          </Card>
                                        </GridItem>
                                      </Grid>
                                    </StackItem>
                                  </Stack>
                                </>
                              ) : null}
                              {isCellExpanded(item, "vulnerabilities") ? (
                                <>
                                  {item.vulnerabilities && (
                                    <Vulnerabilities
                                      variant="compact"
                                      vulnerabilities={item.vulnerabilities}
                                    />
                                  )}
                                </>
                              ) : null}
                            </div>
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
            idPrefix="advisories-table"
            isTop={false}
            isCompact
            paginationProps={paginationProps}
          />
        </div>
      </PageSection>

      {selectedRowAction === "editLabels" && selectedRow && (
        <EditLabelsModal
          resourceName={selectedRow.identifier}
          value={selectedRow.labels ?? {}}
          onSave={(labels) => {
            execSaveLabels(selectedRow, labels);

            setSelectedRow(null);
            setSelectedRowAction(null);
          }}
          onClose={() => setSelectedRowAction(null)}
        />
      )}
    </>
  );
};
