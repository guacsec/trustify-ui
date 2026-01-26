import React from "react";

import {
  Table,
  Tbody,
  Td,
  type TdProps,
  TreeRowWrapper,
} from "@patternfly/react-table";

import { SimplePagination } from "@app/components/SimplePagination";
import { ConditionalTableBody } from "@app/components/TableControls";

import { GroupsContext, type TGroupTreeNode } from "./groups-context";
import { GroupTableData } from "./group-table-data";

const getDescendants = (node: TGroupTreeNode): TGroupTreeNode[] => {
  if (!node.children || !node.children.length) {
    return [node];
  }
  let children: TGroupTreeNode[] = [];
  node.children.forEach((child) => {
    children = [...children, ...getDescendants(child)];
  });
  return children;
};

export const GroupsTable: React.FC = () => {
  const {
    isFetching,
    fetchError,
    totalItemCount,
    tableControls,
    treeExpansion: {
      expandedNodeNames,
      setExpandedNodeNames,
      expandedDetailsNodeNames,
      setExpandedDetailsNodeNames,
    },
    treeSelection: { selectedNodeNames, setSelectedNodeNames },
    treeData: { roots },
  } = React.useContext(GroupsContext);

  const {
    numRenderedColumns,
    propHelpers: { paginationProps, tableProps },
  } = tableControls;

  const areAllDescendantsSelected = (node: TGroupTreeNode) =>
    getDescendants(node).every((n) => selectedNodeNames.includes(n.name));
  const areSomeDescendantsSelected = (node: TGroupTreeNode) =>
    getDescendants(node).some((n) => selectedNodeNames.includes(n.name));

  const isNodeChecked = (node: TGroupTreeNode) => {
    if (areAllDescendantsSelected(node)) {
      return true;
    }
    if (areSomeDescendantsSelected(node)) {
      return null;
    }
    return false;
  };

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
    const isDetailsExpanded = expandedDetailsNodeNames.includes(node.name);
    const isChecked = isNodeChecked(node);

    const treeRow: TdProps["treeRow"] = {
      onCollapse: () => {
        const otherExpandedNodeNames = expandedNodeNames.filter(
          (name) => name !== node.name,
        );
        setExpandedNodeNames(
          isExpanded
            ? otherExpandedNodeNames
            : [...otherExpandedNodeNames, node.name],
        );
      },
      onToggleRowDetails: () => {
        const otherDetailsExpandedNodeNames = expandedDetailsNodeNames.filter(
          (name) => name !== node.name,
        );
        setExpandedDetailsNodeNames(
          isDetailsExpanded
            ? otherDetailsExpandedNodeNames
            : [...otherDetailsExpandedNodeNames, node.name],
        );
      },
      onCheckChange: (_event, isChecking) => {
        const nodeNamesToCheck = getDescendants(node).map((n) => n.name);
        setSelectedNodeNames((prevSelected) => {
          const otherSelectedNodeNames = prevSelected.filter(
            (name) => !nodeNamesToCheck.includes(name),
          );
          return !isChecking
            ? otherSelectedNodeNames
            : [...otherSelectedNodeNames, ...nodeNamesToCheck];
        });
      },
      rowIndex,
      props: {
        isExpanded,
        isDetailsExpanded,
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

    return [
      <TreeRowWrapper key={node.name} row={{ props: treeRow.props }}>
        <Td dataLabel={"name"} treeRow={treeRow}>
          <GroupTableData item={node} />
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
      <Table {...tableProps} isTreeTable aria-label="sbom-groups-table">
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={totalItemCount === 0}
          numRenderedColumns={numRenderedColumns}
        >
          <Tbody>{renderRows(roots)}</Tbody>
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
