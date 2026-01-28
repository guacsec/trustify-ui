import React from "react";

import {
  ActionsColumn,
  Table,
  Tbody,
  Td,
  type TdProps,
  TreeRowWrapper,
  type IAction,
} from "@patternfly/react-table";

import { SimplePagination } from "@app/components/SimplePagination";
import { ConditionalTableBody } from "@app/components/TableControls";

import { GroupsContext, type TGroupTreeNode } from "./groups-context";
import { GroupTableData } from "./group-table-data";

export const GroupsTable: React.FC = () => {
  const {
    isFetching,
    fetchError,
    totalItemCount,
    tableControls,
    treeExpansion: { expandedNodeNames, setExpandedNodeNames },
    treeSelection: { selectedNodeNames, setSelectedNodeNames },
    treeData,
  } = React.useContext(GroupsContext);

  const {
    numRenderedColumns,
    propHelpers: { paginationProps, tableProps },
  } = tableControls;

  const isNodeChecked = (node: TGroupTreeNode) =>
    selectedNodeNames.includes(node.name);

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
    const isExpanded = expandedNodeNames.includes(node.name);
    const isChecked = isNodeChecked(node);

    const treeRow: TdProps["treeRow"] = {
      onCollapse: () => {
        setExpandedNodeNames((prevNodes) =>
          isExpanded
            ? prevNodes.filter((name) => name !== node.name)
            : [...prevNodes, node.name],
        );
      },
      onCheckChange: (_event, isChecking) => {
        setSelectedNodeNames((prevNodes) => {
          return !isChecking
            ? prevNodes.filter((name) => name !== node.name)
            : [...prevNodes, node.name];
        });
      },
      rowIndex,
      props: {
        isExpanded,
        isHidden,
        "aria-level": level,
        "aria-posinset": posinset,
        "aria-setsize": node.children ? node.children.length : 0,
        isChecked,
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

    // TODO: Update once the actions are mocked.
    const lastRowActions = (node: TGroupTreeNode): IAction[] => [
      {
        title: "Some action",
        onClick: () =>
          console.log(`clicked on Some action, on row ${node.name}`),
      },
      {
        title: <div>Another action</div>,
        onClick: () =>
          console.log(`clicked on Another action, on row ${node.name}`),
      },
      {
        isSeparator: true,
      },
      {
        title: "Third action",
        onClick: () =>
          console.log(`clicked on Third action, on row ${node.name}`),
      },
    ];

    return [
      <TreeRowWrapper key={node.name} row={{ props: treeRow.props }}>
        <Td dataLabel={"name"} treeRow={treeRow}>
          <GroupTableData item={node} />
        </Td>
        {
          // Only render for non-parent group nodes
          !node.children.length && (
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
    </>
  );
};
