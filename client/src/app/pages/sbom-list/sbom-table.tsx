import React from "react";
import { generatePath, NavLink } from "react-router-dom";

import { Modal, ModalBody, ModalHeader } from "@patternfly/react-core";
import type { AxiosError } from "axios";

import { ButtonVariant } from "@patternfly/react-core";
import {
  ActionsColumn,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

import { joinKeyValueAsString } from "@app/api/model-utils";
import type { SbomHead } from "@app/client";
import { ConfirmDialog } from "@app/components/ConfirmDialog";
import { LabelsAsList } from "@app/components/LabelsAsList";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { ReadOnlyContext } from "@app/components/ReadOnlyContext";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import {
  sbomDeletedErrorMessage,
  sbomDeleteDialogProps,
  sbomDeletedSuccessMessage,
} from "@app/Constants";
import { useDownload } from "@app/hooks/domain-controls/useDownload";
import {
  useDeleteSbomMutation,
  useRemoveSBOMFromGroupMutation,
} from "@app/queries/sboms";
import { Paths } from "@app/Routes";
import { formatDate } from "@app/utils/utils";

import { SBOMEditLabelsForm } from "./components/SBOMEditLabelsForm";
import { SBOMVulnerabilities } from "./components/SbomVulnerabilities";
import { SbomSearchContext } from "./sbom-context";

export const SbomTable: React.FC = () => {
  const { pushNotification } = React.useContext(NotificationsContext);
  const { areMutationsDisabled } = React.useContext(ReadOnlyContext);

  const {
    sbomGroupId,
    isFetching,
    fetchError,
    tableControls,
    bulkSelection: {
      isEnabled: showBulkSelector,
      controls: bulkSelectionControls,
    },
  } = React.useContext(SbomSearchContext);

  const [editLabelsModalState, setEditLabelsModalState] =
    React.useState<SbomHead | null>(null);
  const isEditLabelsModalOpen = editLabelsModalState !== null;
  const rowLabelsToUpdate = editLabelsModalState;

  const {
    numRenderedColumns,
    currentPageItems,
    propHelpers: {
      paginationProps,
      tableProps,
      getThProps,
      getTrProps,
      getTdProps,
    },
    expansionDerivedState: { isCellExpanded },
    filterState: { filterValues, setFilterValues },
  } = tableControls;

  const {
    propHelpers: { getSelectCheckboxTdProps },
  } = bulkSelectionControls;

  const { downloadSBOM, downloadSBOMLicenses } = useDownload();

  const closeEditLabelsModal = () => {
    setEditLabelsModalState(null);
  };

  // Delete action

  const [sbomToDelete, setSbomToDelete] = React.useState<SbomHead | null>(null);

  const onDeleteSbomSuccess = (sbom: SbomHead) => {
    setSbomToDelete(null);
    pushNotification({
      title: sbomDeletedSuccessMessage(sbom),
      variant: "success",
    });
  };

  const onDeleteAdvisoryError = (error: AxiosError) => {
    pushNotification({
      title: sbomDeletedErrorMessage(error),
      variant: "danger",
    });
  };

  const { mutate: deleteSbom, isPending: isDeletingSbom } =
    useDeleteSbomMutation(onDeleteSbomSuccess, onDeleteAdvisoryError);

  // Remove from group action

  const [sbomToRemoveFromGroup, setSbomToRemoveFromGroup] =
    React.useState<SbomHead | null>(null);

  const onRemoveFromGroupSuccess = (payload: {
    groupId: string;
    sbom: SbomHead;
  }) => {
    setSbomToRemoveFromGroup(null);
    pushNotification({
      title: `SBOM "${payload.sbom.name}" removed from group`,
      variant: "success",
    });
  };

  const onRemoveFromGroupError = (error: AxiosError) => {
    pushNotification({
      title: `Failed to remove SBOM from group: ${error.message}`,
      variant: "danger",
    });
  };

  const { mutate: removeSbomFromGroup, isPending: isRemovingFromGroup } =
    useRemoveSBOMFromGroupMutation(
      onRemoveFromGroupSuccess,
      onRemoveFromGroupError,
    );

  return (
    <>
      <Table {...tableProps} aria-label="sbom-table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "name" })} />
              <Th {...getThProps({ columnKey: "version" })} />
              <Th {...getThProps({ columnKey: "supplier" })} />
              <Th {...getThProps({ columnKey: "labels" })} />
              <Th {...getThProps({ columnKey: "published" })} />
              <Th {...getThProps({ columnKey: "packages" })} />
              <Th {...getThProps({ columnKey: "vulnerabilities" })} />
            </TableHeaderContentWithControls>
          </Tr>
        </Thead>
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={currentPageItems.length === 0}
          numRenderedColumns={numRenderedColumns}
        >
          {currentPageItems.map((item, rowIndex) => {
            return (
              <Tbody key={item.id} isExpanded={isCellExpanded(item)}>
                <Tr {...getTrProps({ item })}>
                  <TableRowContentWithControls
                    {...tableControls}
                    getSelectCheckboxTdProps={
                      showBulkSelector ? getSelectCheckboxTdProps : undefined
                    }
                    item={item}
                    rowIndex={rowIndex}
                  >
                    <Td
                      width={20}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "name",
                        isCompoundExpandToggle: true,
                        item: item,
                        rowIndex,
                      })}
                    >
                      <NavLink
                        to={generatePath(Paths.sbomDetails, {
                          sbomId: item.id,
                        })}
                      >
                        {item.name}
                      </NavLink>
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "version" })}
                    >
                      {item.described_by
                        .map((e) => e.version)
                        .filter((e) => e)
                        .join(", ")}
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "supplier" })}
                    >
                      {item.suppliers.join(", ")}
                    </Td>
                    <Td
                      width={20}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "labels" })}
                    >
                      <LabelsAsList
                        value={item.labels}
                        onClick={({ key, value }) => {
                          const labelString = joinKeyValueAsString({
                            key,
                            value,
                          });

                          const filterValue = filterValues.labels;
                          if (!filterValue?.includes(labelString)) {
                            const newFilterValue = filterValue
                              ? [...filterValue, labelString]
                              : [labelString];

                            setFilterValues({
                              ...filterValues,
                              labels: newFilterValue,
                            });
                          }
                        }}
                      />
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "published" })}
                    >
                      {formatDate(item.published)}
                    </Td>
                    <Td width={10} {...getTdProps({ columnKey: "packages" })}>
                      {item.number_of_packages}
                    </Td>
                    <Td
                      width={20}
                      {...getTdProps({ columnKey: "vulnerabilities" })}
                    >
                      <SBOMVulnerabilities advisories={item.advisories} />
                    </Td>
                    <Td isActionCell>
                      <ActionsColumn
                        items={[
                          {
                            title: "Edit labels",
                            onClick: () => {
                              setEditLabelsModalState(item);
                            },
                            isDisabled: areMutationsDisabled,
                          },
                          {
                            isSeparator: true,
                          },
                          {
                            title: "Download SBOM",
                            onClick: () => {
                              downloadSBOM(item.id, `${item.name}.json`);
                            },
                          },
                          {
                            title: "Download License Report",
                            onClick: () => {
                              downloadSBOMLicenses(item.id);
                            },
                          },
                          {
                            isSeparator: true,
                          },
                          {
                            title: "Delete",
                            onClick: () => {
                              setSbomToDelete(item);
                            },
                            isDisabled: areMutationsDisabled,
                          },
                          ...(sbomGroupId
                            ? [
                                {
                                  title: "Delete SBOM from group",
                                  onClick: () => {
                                    setSbomToRemoveFromGroup(item);
                                  },
                                  isDisabled: areMutationsDisabled,
                                },
                              ]
                            : []),
                        ]}
                      />
                    </Td>
                  </TableRowContentWithControls>
                </Tr>
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="sbom-table"
        isTop={false}
        paginationProps={paginationProps}
      />

      <Modal
        isOpen={isEditLabelsModalOpen}
        variant="medium"
        onClose={closeEditLabelsModal}
      >
        <ModalHeader title="Edit labels" />
        <ModalBody>
          {rowLabelsToUpdate && (
            <SBOMEditLabelsForm
              sbom={rowLabelsToUpdate}
              onClose={closeEditLabelsModal}
            />
          )}
        </ModalBody>
      </Modal>

      <ConfirmDialog
        {...sbomDeleteDialogProps(sbomToDelete)}
        inProgress={isDeletingSbom}
        titleIconVariant="warning"
        isOpen={!!sbomToDelete}
        confirmBtnVariant={ButtonVariant.danger}
        confirmBtnLabel="Delete"
        cancelBtnLabel="Cancel"
        onCancel={() => setSbomToDelete(null)}
        onClose={() => setSbomToDelete(null)}
        onConfirm={() => {
          if (sbomToDelete) {
            deleteSbom(sbomToDelete);
          }
        }}
      />

      <ConfirmDialog
        title="Delete SBOM from group"
        message={`Are you sure you want to remove "${sbomToRemoveFromGroup?.name}" from this group? The SBOM itself will not be deleted.`}
        inProgress={isRemovingFromGroup}
        titleIconVariant="warning"
        isOpen={!!sbomToRemoveFromGroup}
        confirmBtnVariant={ButtonVariant.danger}
        confirmBtnLabel="Remove"
        cancelBtnLabel="Cancel"
        onCancel={() => setSbomToRemoveFromGroup(null)}
        onClose={() => setSbomToRemoveFromGroup(null)}
        onConfirm={() => {
          if (sbomToRemoveFromGroup && sbomGroupId) {
            removeSbomFromGroup({
              groupId: sbomGroupId,
              sbom: sbomToRemoveFromGroup,
            });
          }
        }}
      />
    </>
  );
};
