import React from 'react';
import {
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { GroupsContext } from './groups-context';
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { GroupTableData } from './group-table-data';
import { TGroupTreeNode } from '@app/queries/groups';

type FlattenedRow = {
  item: TGroupTreeNode;
  depth: number;
};

/**
 * Flatten a tree into a list of visible rows.
 * Children are only included if `isExpanded(node)` is true.
 */
function flattenVisibleRows(
  nodes: TGroupTreeNode[],
  isExpanded: (node: TGroupTreeNode) => boolean,
  depth = 0,
): FlattenedRow[] {
  const rows: FlattenedRow[] = [];

  for (const node of nodes) {
    rows.push({ item: node, depth });

    const children = node.children ?? [];
    if (children.length > 0 && isExpanded(node)) {
      // Go down the tree
      rows.push(...flattenVisibleRows(children, isExpanded, depth + 1));
    }
  }

  return rows;
}

export const GroupsTable: React.FC = () => {
  const {
    isFetching,
    fetchError,
    totalItemCount,
    tableControls,
    bulkSelection: {
      isEnabled: showBulkSelector,
      controls: bulkSelectionControls,
    },
  } = React.useContext(GroupsContext);

  const {
    numRenderedColumns,
    currentPageItems,
    propHelpers: {
      paginationProps,
      tableProps,
      getTrProps,
      getTdProps,
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  const {
    selectedItems: _selectedItems,
    propHelpers: { getSelectCheckboxTdProps },
  } = bulkSelectionControls;

  // Build the render list
  const visibleRows = React.useMemo(() => {
    return flattenVisibleRows(currentPageItems, isCellExpanded);
  }, [currentPageItems, isCellExpanded]);

  return (
    <>
      <Table {...tableProps} aria-label="sbom-groups-table">
        <Thead>
          <Tr>
          </Tr>
        </Thead>
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={totalItemCount === 0}
          numRenderedColumns={numRenderedColumns}
        >
          {visibleRows.map(({ item, depth }, rowIndex) => {
            // Indent child nodes
            const indentPx = depth * 24;

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
                      modifier="breakWord"
                      {...getTdProps({
                        isCompoundExpandToggle: true,
                        item: item,
                        rowIndex,
                      })}

                      style={{ paddingLeft: `calc(${indentPx}px + var(--pf-v6-c-table--cell--PaddingLeft, 1rem))` }}
                    >
                      <GroupTableData item={item} />
                    </Td>
                  </TableRowContentWithControls>
                </Tr>
              </Tbody>
            )
          })}
        </ConditionalTableBody >
      </Table >
      <SimplePagination
        idPrefix="sbom-table"
        isTop={false}
        paginationProps={paginationProps}
      />
    </>
  )
}
