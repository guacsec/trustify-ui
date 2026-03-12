import React from "react";

import type { AxiosError } from "axios";

import { ButtonVariant, Skeleton } from "@patternfly/react-core";
import {
  ActionsColumn,
  Table,
  Tbody,
  Td,
  TreeRowWrapper,
  type IAction,
  type TdProps,
} from "@patternfly/react-table";

import type { Group } from "@app/client";
import { ConfirmDialog } from "@app/components/ConfirmDialog.tsx";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { NotificationsContext } from "@app/components/NotificationsContext.tsx";
import { SimplePagination } from "@app/components/SimplePagination";
import { TableCellError } from "@app/components/TableCellError";
import { ConditionalTableBody } from "@app/components/TableControls";
import { groupDeleteDialogProps } from "@app/Constants";
import {
  useDeleteSbomGroupMutation,
  useFetchSBOMGroups,
} from "@app/queries/sbom-groups";

import { GroupFormModal } from "../sbom-list/components/group-form";
import { SbomGroupTableData } from "./sbom-group-table-data";
import { SbomGroupsContext, type SbomGroupItem } from "./sbom-groups-context";

const SbomGroupRow: React.FC<{
  node: SbomGroupItem;
  level: number;
  posinset: number;
  isHidden: boolean;
  numRenderedColumns: number;
  onEdit: (node: SbomGroupItem) => void;
  onDelete: (node: SbomGroupItem) => void;
}> = ({
  node,
  level,
  posinset,
  isHidden,
  numRenderedColumns,
  onEdit,
  onDelete,
}) => {
  const {
    treeExpansion: { isNodeExpanded, toggleExpandedNodes },
  } = React.useContext(SbomGroupsContext);
  const isExpanded = isNodeExpanded(node);

  // Latches true on first expand so the query stays active after collapsing (instant re-expand, no refetch)
  const hasBeenExpanded = React.useRef(false);
  if (isExpanded) hasBeenExpanded.current = true;

  // Fetch children on demand — enabled only after the node has been expanded at least once
  const {
    result: { data: children },
    isFetching,
    fetchError,
  } = useFetchSBOMGroups(
    node.id,
    {},
    { totals: true },
    isExpanded || hasBeenExpanded.current,
  );

  const actions: IAction[] = [
    {
      title: "Edit",
      onClick: () => onEdit(node),
    },
    {
      title: "Delete",
      onClick: () => onDelete(node),
      isDisabled: !!node.number_of_groups,
    },
  ];

  const treeRow: TdProps["treeRow"] = {
    onCollapse: () => toggleExpandedNodes([node], !isExpanded),
    rowIndex: 0,
    props: {
      isExpanded,
      isHidden,
      "aria-level": level,
      "aria-posinset": posinset,
      "aria-setsize": node.number_of_groups || 0,
    },
  };

  return (
    <>
      <TreeRowWrapper row={{ props: treeRow.props }}>
        <Td dataLabel="name" treeRow={treeRow}>
          <SbomGroupTableData item={node} />
        </Td>
        <Td isActionCell style={{ verticalAlign: "middle" }}>
          <ActionsColumn items={actions} />
        </Td>
      </TreeRowWrapper>
      <LoadingWrapper
        isFetching={isExpanded && isFetching}
        fetchError={isExpanded ? fetchError : null}
        isFetchingState={
          <TreeRowWrapper
            row={{
              props: {
                isHidden: false,
                "aria-level": level + 1,
                "aria-posinset": 1,
                "aria-setsize": 1,
              },
            }}
          >
            <Td colSpan={numRenderedColumns}>
              <Skeleton
                screenreaderText="Loading child groups"
                fontSize="lg"
                width="60%"
              />
            </Td>
          </TreeRowWrapper>
        }
        fetchErrorState={(error) => (
          <TreeRowWrapper
            row={{
              props: {
                isHidden: false,
                "aria-level": level + 1,
                "aria-posinset": 1,
                "aria-setsize": 1,
              },
            }}
          >
            <Td colSpan={numRenderedColumns}>
              <TableCellError error={error} />
            </Td>
          </TreeRowWrapper>
        )}
      >
        {children.map((child, i) => (
          <SbomGroupRow
            key={child.id}
            node={child}
            level={level + 1}
            posinset={i + 1}
            isHidden={false}
            numRenderedColumns={numRenderedColumns}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </LoadingWrapper>      
    </>
  );
};

export const SbomGroupsTable: React.FC = () => {
  const { pushNotification } = React.useContext(NotificationsContext);
  const [saveGroupModalState, setSaveGroupModalState] = React.useState<
    "create" | Group | null
  >(null);
  const isCreateUpdateGroupModalOpen = saveGroupModalState !== null;
  const createUpdateGroup =
    saveGroupModalState !== "create" ? saveGroupModalState : null;
  const { isFetching, fetchError, totalItemCount, tableControls } =
    React.useContext(SbomGroupsContext);

  const {
    numRenderedColumns,
    propHelpers: { paginationProps, tableProps },
    currentPageItems,
  } = tableControls;

  // Delete action
  const [groupToDelete, setGroupToDelete] =
    React.useState<SbomGroupItem | null>(null);
  const onDeleteGroupSuccess = (group: Group) => {
    setGroupToDelete(null);
    pushNotification({
      title: `The group ${group.name} was deleted`,
      variant: "success",
    });
  };

  const onDeleteGroupError = (_error: AxiosError) => {
    pushNotification({
      title: "Error occurred while deleting group",
      variant: "danger",
    });
  };

  const { mutate: deleteGroup, isPending: isDeletingGroup } =
    useDeleteSbomGroupMutation(onDeleteGroupSuccess, onDeleteGroupError);

  return (
    <>
      <Table
        {...tableProps}
        isTreeTable
        isExpandable={false}
        aria-label="sbom-groups-table"
      >
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={totalItemCount === 0}
          numRenderedColumns={numRenderedColumns}
        >
          <Tbody>
            {currentPageItems.map((node, i) => (
              <SbomGroupRow
                key={node.id}
                node={node}
                level={1}
                posinset={i + 1}
                isHidden={false}
                numRenderedColumns={numRenderedColumns}
                onEdit={(n) => setSaveGroupModalState(n)}
                onDelete={(n) => setGroupToDelete(n)}
              />
            ))}
          </Tbody>
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="sbom-groups-table"
        isTop={false}
        paginationProps={paginationProps}
      />
      <GroupFormModal
        isOpen={isCreateUpdateGroupModalOpen}
        group={createUpdateGroup}
        onClose={() => setSaveGroupModalState(null)}
      />
      <ConfirmDialog
        {...groupDeleteDialogProps(groupToDelete)}
        inProgress={isDeletingGroup}
        titleIconVariant="warning"
        isOpen={!!groupToDelete}
        confirmBtnVariant={ButtonVariant.danger}
        confirmBtnLabel="Delete"
        cancelBtnLabel="Cancel"
        onCancel={() => setGroupToDelete(null)}
        onClose={() => setGroupToDelete(null)}
        onConfirm={() => {
          if (groupToDelete) {
            deleteGroup(groupToDelete);
          }
        }}
      />
    </>
  );
};
