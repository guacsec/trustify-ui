import React from "react";

import { AxiosError } from "axios";
import dayjs from "dayjs";

import {
  Button,
  ButtonVariant,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
  Modal,
  ModalVariant,
  PageSection,
  PageSectionVariants,
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

import { Importer, ImporterType } from "@app/api/models";
import { ConfirmDialog } from "@app/components/ConfirmDialog";
import { NotificationsContext } from "@app/components/NotificationsContext";
import {
  useDeleteiIporterMutation as useDeleteIporterMutation,
  useFetchImporters,
} from "@app/queries/importers";
import { getAxiosErrorMessage } from "@app/utils/utils";

import { FilterToolbar, FilterType } from "@app/components/FilterToolbar";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { useLocalTableControls } from "@app/hooks/table-controls";

import { RENDER_DATETIME_FORMAT } from "@app/Constants";
import { ImporterForm } from "./components/importer-form";
import { ImporterStatusIcon } from "./components/importer-status-icon";

export const ImporterList: React.FC = () => {
  const { pushNotification } = React.useContext(NotificationsContext);

  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    React.useState<boolean>(false);
  const [importerToDelete, setImporterToDelete] = React.useState<Importer>();

  const [createUpdateModalState, setCreateUpdateModalState] = React.useState<
    "create" | Importer | null
  >(null);
  const isCreateUpdateModalOpen = createUpdateModalState !== null;
  const entityToUpdate =
    createUpdateModalState !== "create" ? createUpdateModalState : null;

  const onDeleteImporterSuccess = () => {
    pushNotification({
      title: "Importer deleted",
      variant: "success",
    });
  };

  const onDeleteImporterError = (error: AxiosError) => {
    pushNotification({
      title: getAxiosErrorMessage(error),
      variant: "danger",
    });
  };

  const { importers, isFetching, fetchError, refetch } = useFetchImporters(
    isDeleteConfirmDialogOpen || createUpdateModalState !== null
  );

  const { mutate: deleteImporter } = useDeleteIporterMutation(
    onDeleteImporterSuccess,
    onDeleteImporterError
  );

  const closeCreateUpdateModal = () => {
    setCreateUpdateModalState(null);
    refetch;
  };

  // Table config
  const tableControls = useLocalTableControls({
    tableName: "importers-table",
    idProperty: "name",
    items: importers,
    columnNames: {
      name: "Name",
      type: "Type",
      description: "Description",
      state: "State",
      start: "Start",
      end: "End",
      itemsImported: "Items imported",
    },
    hasActionsColumn: true,
    isSortEnabled: true,
    sortableColumns: ["name"],
    getSortValues: (item) => ({
      name: item.name,
    }),
    isPaginationEnabled: true,
    isExpansionEnabled: true,
    expandableVariant: "single",
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: "name",
        title: "Name",
        type: FilterType.search,
        placeholderText: "Search by name...",
        getItemValue: (item) => item.name || "",
      },
    ],
  });

  const {
    currentPageItems,
    numRenderedColumns,
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
      tableProps,
      getThProps,
      getTrProps,
      getTdProps,
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  const deleteRow = (row: Importer) => {
    setImporterToDelete(row);
    setIsDeleteConfirmDialogOpen(true);
  };

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Importers</Text>
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
              <ToolbarItem>
                <Button
                  type="button"
                  id="create-importer"
                  aria-label="Create new importer"
                  variant={ButtonVariant.primary}
                  onClick={() => setCreateUpdateModalState("create")}
                >
                  Create Importer
                </Button>
              </ToolbarItem>
              <ToolbarItem {...paginationToolbarItemProps}>
                <SimplePagination
                  idPrefix="importer-table"
                  isTop
                  paginationProps={paginationProps}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>

          <Table {...tableProps} aria-label="CVEs table">
            <Thead>
              <Tr>
                <TableHeaderContentWithControls {...tableControls}>
                  <Th {...getThProps({ columnKey: "name" })} />
                  <Th {...getThProps({ columnKey: "type" })} />
                  <Th {...getThProps({ columnKey: "description" })} />
                  <Th {...getThProps({ columnKey: "state" })} />
                  <Th {...getThProps({ columnKey: "start" })} />
                  <Th {...getThProps({ columnKey: "end" })} />
                  <Th {...getThProps({ columnKey: "itemsImported" })} />
                </TableHeaderContentWithControls>
              </Tr>
            </Thead>
            <ConditionalTableBody
              isLoading={isFetching}
              isError={!!fetchError}
              isNoData={importers.length === 0}
              numRenderedColumns={numRenderedColumns}
            >
              {currentPageItems?.map((item, rowIndex) => {
                const importerType = Object.keys(
                  item.configuration ?? {}
                )[0] as ImporterType;
                const configValues = item.configuration[importerType];

                return (
                  <Tbody key={item.name}>
                    <Tr {...getTrProps({ item })}>
                      <TableRowContentWithControls
                        {...tableControls}
                        item={item}
                        rowIndex={rowIndex}
                      >
                        <Td width={15} {...getTdProps({ columnKey: "name" })}>
                          {item.name}
                        </Td>
                        <Td width={10} {...getTdProps({ columnKey: "type" })}>
                          {importerType}
                        </Td>
                        <Td
                          width={25}
                          {...getTdProps({ columnKey: "description" })}
                          modifier="truncate"
                        >
                          {configValues?.description}
                        </Td>
                        <Td
                          width={10}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "state" })}
                        >
                          {item.state && configValues?.disabled == false ? (
                            <ImporterStatusIcon state={item.state} />
                          ) : (
                            <Label color="orange">Disabled</Label>
                          )}
                        </Td>
                        <Td
                          width={15}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "start" })}
                        >
                          {item.report?.startDate &&
                            dayjs(item.report.startDate).format(
                              RENDER_DATETIME_FORMAT
                            )}
                        </Td>
                        <Td
                          width={15}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "end" })}
                        >
                          {item.report?.endDate &&
                            dayjs(item.report.endDate).format(
                              RENDER_DATETIME_FORMAT
                            )}
                        </Td>
                        <Td
                          width={10}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "itemsImported" })}
                        >
                          {item.report?.numerOfItems}
                        </Td>
                        <Td isActionCell>
                          <ActionsColumn
                            items={[
                              {
                                title: "Edit",
                                onClick: () => setCreateUpdateModalState(item),
                              },
                              {
                                title: "Delete",
                                onClick: () => deleteRow(item),
                              },
                            ]}
                          />
                        </Td>
                      </TableRowContentWithControls>
                    </Tr>
                    {isCellExpanded(item) ? (
                      <Tr isExpanded>
                        <Td colSpan={7}>
                          <ExpandableRowContent>
                            <div className="pf-v5-u-m-md">
                              <DescriptionList>
                                <DescriptionListGroup>
                                  <DescriptionListTerm>
                                    Source
                                  </DescriptionListTerm>
                                  <DescriptionListDescription>
                                    {configValues?.source}
                                  </DescriptionListDescription>
                                </DescriptionListGroup>
                                <DescriptionListGroup>
                                  <DescriptionListTerm>
                                    Period
                                  </DescriptionListTerm>
                                  <DescriptionListDescription>
                                    {configValues?.period}
                                  </DescriptionListDescription>
                                </DescriptionListGroup>
                              </DescriptionList>
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
            idPrefix="importer-table"
            isTop={false}
            isCompact
            paginationProps={paginationProps}
          />
        </div>
      </PageSection>

      <Modal
        id="create-edit-importer-modal"
        title={entityToUpdate ? "Update Importer" : "New Importer"}
        variant={ModalVariant.medium}
        isOpen={isCreateUpdateModalOpen}
        onClose={closeCreateUpdateModal}
      >
        <ImporterForm
          importer={entityToUpdate ? entityToUpdate : undefined}
          onClose={closeCreateUpdateModal}
        />
      </Modal>

      {isDeleteConfirmDialogOpen && (
        <ConfirmDialog
          title="Delete Importer"
          isOpen={true}
          titleIconVariant={"warning"}
          message={`Are you sure you want to delete the Importer ${importerToDelete?.name}?`}
          confirmBtnVariant={ButtonVariant.danger}
          confirmBtnLabel="Delete"
          cancelBtnLabel="Cancel"
          onCancel={() => setIsDeleteConfirmDialogOpen(false)}
          onClose={() => setIsDeleteConfirmDialogOpen(false)}
          onConfirm={() => {
            if (importerToDelete) {
              deleteImporter(importerToDelete.name);
              setImporterToDelete(undefined);
            }
            setIsDeleteConfirmDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
