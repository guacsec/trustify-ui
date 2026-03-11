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
import { childGroupDeleteDialogProps } from "@app/Constants";
import { useDeleteSbomGroupMutation } from "@app/queries/sbom-groups";

import { SbomGroupTableData } from "./sbom-group-table-data";
import {
  SbomGroupsContext,
  type SbomGroupTreeNode,
} from "./sbom-groups-context";

export const SbomGroupsTable: React.FC = () => {
  const { pushNotification } = React.useContext(NotificationsContext);

  const {
    isFetching,
    fetchError,
    totalItemCount,
    tableControls,
    treeExpansion: { expandedNodeIds, setExpandedNodeIds, childrenNodeStatus },
    treeData,
    setGroupCreateUpdateModalState,
  } = React.useContext(SbomGroupsContext);

  const {
    numRenderedColumns,
    propHelpers: { paginationProps, tableProps },
  } = tableControls;

  // Delete action
  // NOTE: only applies to child groups, not parent groups.
  const [childGroupToDelete, setChildGroupToDelete] =
    React.useState<SbomGroupTreeNode | null>(null);
  const onDeleteChildGroupSuccess = (group: Group) => {
    setChildGroupToDelete(null);
    pushNotification({
      title: `The child group ${group.name} was deleted`,
      variant: "success",
    });
  };

  const onDeleteChildGroupError = (_error: AxiosError) => {
    pushNotification({
      title: "Error occurred while deleting child group",
      variant: "danger",
    });
  };

  const { mutate: deleteChildGroup, isPending: isDeletingChildGroup } =
    useDeleteSbomGroupMutation(
      onDeleteChildGroupSuccess,
      onDeleteChildGroupError,
    );

  /**
    Recursive function which flattens the data into an array of flattened TreeRowWrapper components
    params:
      - nodes - array of a single level of tree nodes
      - level - number representing how deeply nested the current row is
      - posinset - position of the row relative to this row's siblings
      - currentRowIndex - position of the row relative to the entire table
      - isHidden - defaults to false, true if this row's parent is expanded
  */
  const renderRows = (
    [node, ...remainingNodes]: SbomGroupTreeNode[],
    level = 1,
    posinset = 1,
    rowIndex = 0,
    isHidden = false,
  ): React.ReactNode[] => {
    if (!node) {
      return [];
    }
    const isExpanded = expandedNodeIds.includes(node.id);

    const treeRow: TdProps["treeRow"] = {
      onCollapse: () => {
        setExpandedNodeIds((prevIds) =>
          isExpanded
            ? prevIds.filter((id) => id !== node.id)
            : [...prevIds, node.id],
        );
      },
      rowIndex,
      props: {
        isExpanded,
        isHidden,
        "aria-level": level,
        "aria-posinset": posinset,
        "aria-setsize": node.children.length || node.number_of_groups || 0,
      },
    };

    let childRows: React.ReactNode[] = [];
    if (node.children?.length) {
      childRows = renderRows(
        node.children,
        level + 1,
        1,
        rowIndex + 1,
        !isExpanded || isHidden,
      );
    } else if (isExpanded && !isHidden) {
      const status = childrenNodeStatus.get(node.id);
      if (status?.isFetching || status?.fetchError) {
        childRows = [
          <TreeRowWrapper
            key={`${node.id}-status`}
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
              <LoadingWrapper
                isFetching={status.isFetching}
                fetchError={status.fetchError}
                isFetchingState={
                  <Skeleton
                    screenreaderText="Loading child groups"
                    fontSize="lg"
                    width="60%"
                  />
                }
                fetchErrorState={(error) => <TableCellError error={error} />}
              >
                {null}
              </LoadingWrapper>
            </Td>
          </TreeRowWrapper>,
        ];
      }
    }

    const lastRowActions = (node: SbomGroupTreeNode): IAction[] => [
      {
        title: "Edit",
        onClick: () => setGroupCreateUpdateModalState(node),
      },
      {
        title: "Delete",
        onClick: () => {
          setChildGroupToDelete(node);
        },
        isDisabled: !!node.number_of_groups,
      },
    ];

    return [
      <TreeRowWrapper key={node.id} row={{ props: treeRow.props }}>
        <Td dataLabel={"name"} treeRow={treeRow}>
          <SbomGroupTableData item={node} />
        </Td>

        <Td isActionCell style={{ verticalAlign: "middle" }}>
          <ActionsColumn
            items={lastRowActions(node)}
            isDisabled={false}
          ></ActionsColumn>
        </Td>
      </TreeRowWrapper>,
      ...childRows,
      ...renderRows(
        remainingNodes,
        level,
        posinset + 1,
        rowIndex + 1 + childRows.length,
        isHidden,
      ),
    ];
  };

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
          <Tbody>{renderRows(treeData)}</Tbody>
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="sbom-groups-table"
        isTop={false}
        paginationProps={paginationProps}
      />

      <ConfirmDialog
        {...childGroupDeleteDialogProps(childGroupToDelete)}
        inProgress={isDeletingChildGroup}
        titleIconVariant="warning"
        isOpen={!!childGroupToDelete}
        confirmBtnVariant={ButtonVariant.danger}
        confirmBtnLabel="Delete"
        cancelBtnLabel="Cancel"
        onCancel={() => setChildGroupToDelete(null)}
        onClose={() => setChildGroupToDelete(null)}
        onConfirm={() => {
          if (childGroupToDelete) {
            deleteChildGroup(childGroupToDelete);
          }
        }}
      />
    </>
  );
};
