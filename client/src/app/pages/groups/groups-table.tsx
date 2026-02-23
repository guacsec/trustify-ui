import React from "react";
import { ButtonVariant } from "@patternfly/react-core";

import {
  ActionsColumn,
  Table,
  Tbody,
  Td,
  type TdProps,
  TreeRowWrapper,
  type IAction,
} from "@patternfly/react-table";
import { ConfirmDialog } from "@app/components/ConfirmDialog.tsx";
import { NotificationsContext } from "@app/components/NotificationsContext.tsx";
import { SimplePagination } from "@app/components/SimplePagination";
import { ConditionalTableBody } from "@app/components/TableControls";

import { GroupsContext, type TGroupTreeNode } from "./groups-context";
import { GroupTableData } from "./group-table-data";
import { AxiosError } from "axios";
import { useDeleteGroupMutation } from "@app/queries/groups";
import { childGroupDeleteDialogProps } from "@app/Constants";

export const GroupsTable: React.FC = () => {
  const { pushNotification } = React.useContext(NotificationsContext);
  const {
    isFetching,
    fetchError,
    totalItemCount,
    tableControls,
    treeExpansion: { expandedNodeIds, setExpandedNodeIds },
    treeSelection: { isNodeSelected, selectNodes },
    treeData,
  } = React.useContext(GroupsContext);

  const {
    numRenderedColumns,
    propHelpers: { paginationProps, tableProps },
  } = tableControls;

  // Delete action
  // NOTE: only applies to child groups, not parent groups.
  const [childGroupToDelete, setChildGroupToDelete] =
    React.useState<TGroupTreeNode | null>(null);
  const onDeleteChildGroupSuccess = (group: TGroupTreeNode) => {
    setChildGroupToDelete(null);
    pushNotification({
      title: `The child group ${group.name} was deleted`,
      variant: "success",
    });
  };

  const onDeleteChildGroupError = (_error: AxiosError) => {
    pushNotification({
      title: "Error occur while deleting child group",
      variant: "danger",
    });
  };

  const { mutate: deleteChildGroup, isPending: isDeletingChildGroup } =
    useDeleteGroupMutation(onDeleteChildGroupSuccess, onDeleteChildGroupError);

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
    [node, ...remainingNodes]: TGroupTreeNode[],
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
      onCheckChange: (_event, isChecking) => {
        selectNodes([node], isChecking);
      },
      rowIndex,
      props: {
        isExpanded,
        isHidden,
        "aria-level": level,
        "aria-posinset": posinset,
        "aria-setsize": node.children.length || node.number_of_groups || 0,
        isChecked: isNodeSelected(node),
        checkboxId: `checkbox_id_${node.name.toLowerCase().replace(/\s+/g, "_")}`,
      },
    };

    const childRows = node.children?.length
      ? renderRows(
          node.children,
          level + 1,
          1,
          rowIndex + 1,
          !isExpanded || isHidden,
        )
      : [];

    const lastRowActions = (node: TGroupTreeNode): IAction[] => [
      {
        title: "Delete",
        onClick: () => {
          setChildGroupToDelete(node);
        },
      },
    ];

    const isChildNodeOnly = !node.number_of_groups;
    return [
      <TreeRowWrapper key={node.name} row={{ props: treeRow.props }}>
        <Td dataLabel={"name"} treeRow={treeRow}>
          <GroupTableData item={node} />
        </Td>
        {
          // Only render for non-parent group nodes
          isChildNodeOnly && (
            <Td isActionCell style={{ verticalAlign: "middle" }}>
              <ActionsColumn
                items={lastRowActions(node)}
                isDisabled={false}
              ></ActionsColumn>
            </Td>
          )
        }
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
      <Table {...tableProps} isTreeTable aria-label="sbom-groups-table">
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
