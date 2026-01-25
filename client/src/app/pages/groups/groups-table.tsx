import React from "react";
import { Table, Tbody, Td, Tr } from "@patternfly/react-table";
import { GroupsContext } from "./groups-context";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { GroupTableData } from "./group-table-data";
import type { TGroupDD } from "@app/queries/groups";

export type TGroupTreeNode = TGroupDD & {
  children: TGroupTreeNode[];
};

/**
 * Generates a simple tree structure for groups
 */
export function buildGroupTree(items: TGroupDD[]) {
  const byId = new Map<string, TGroupTreeNode>();
  const roots: TGroupTreeNode[] = [];

  // initialize nodes
  for (const item of items) {
    byId.set(item.id, { ...item, children: [] });
  }

  // wire up parent/child relationships
  for (const node of byId.values()) {
    if (!node.parent) {
      roots.push(node);
      continue;
    }

    const parent = byId.get(node.parent);
    if (parent) {
      parent.children.push(node);
    } else {
      // orphan: parent id not found -> treat as root or handle however you want
      roots.push(node);
    }
  }

  return { roots, byId };
}

type FlattenedRow = {
  item: TGroupDD;
  depth: number;
};

/**
 * Flattens a tree into a list of rows that should be visible in the UI.
 *
 * Example:
 *
 * Tree:
 *   A
 *   |-B
 *   | |--C
 *   | |--D
 *   |
 *   |-E
 *
 *   Expanded: A, B
 *   (Indentation in this diagram corresponds to the `depth` value.)
 *
 * Result:
 * A (depth 0)
 * B (depth 1)
 * C (depth 2)
 * D (depth 2)
 * E (depth 1)
 *
 * Notes:
 * - Traversal is depth-first, pre-order (parent before child nodes)
 * - Only expanded nodes have their children included
 *   - Collapsed nodes still appear in the UI, only their child nodes are hidden
 * - The 'depth' value appended to each node is for easy visual indentation
 *
 */
function flattenVisibleRows(
  nodes: TGroupTreeNode[],
  isExpanded: (node: TGroupTreeNode) => boolean,
  depth = 0,
): FlattenedRow[] {
  const rows: FlattenedRow[] = [];

  // Build the list in depth-first, pre-order: parent first, then visible
  // child nodes.
  for (const node of nodes) {
    rows.push({ item: node, depth });

    const children = node.children ?? [];
    if (children.length > 0 && isExpanded(node)) {
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
    propHelpers: { paginationProps, tableProps, getTrProps, getTdProps },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  const {
    selectedItems: _selectedItems,
    propHelpers: { getSelectCheckboxTdProps },
  } = bulkSelectionControls;

  // Build the render list from the generated tree.
  const visibleRows = React.useMemo(() => {
    // Build the tree to determine node depths
    const { roots } = buildGroupTree(currentPageItems);
    // Flatten it!
    return flattenVisibleRows(roots, isCellExpanded);
  }, [currentPageItems, isCellExpanded]);

  return (
    <>
      <Table {...tableProps} aria-label="sbom-groups-table">
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
                        columnKey: "name",
                        isCompoundExpandToggle: true,
                        item: item,
                        rowIndex,
                      })}
                      style={{
                        paddingLeft: `calc(${indentPx}px + var(--pf-v6-c-table--cell--PaddingLeft, 1rem))`,
                      }}
                    >
                      <GroupTableData item={item} />
                    </Td>
                  </TableRowContentWithControls>
                </Tr>
              </Tbody>
            );
          })}
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
