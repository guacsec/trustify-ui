import React from 'react';
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { GroupsContext } from './groups-context';
import { NavLink } from 'react-router-dom';
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { LabelGroup, Label, Split, SplitItem, Stack, StackItem, Flex, FlexItem } from '@patternfly/react-core';
import { GroupTableData } from './group-table-data';
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
          {currentPageItems.map((item, rowIndex) => {
            return (
              <>
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
                        })}>
                        <GroupTableData item={item} />
                      </Td>
                    </TableRowContentWithControls>
                  </Tr>

                </Tbody>
                {
                  item.children.map((childNode) => {
                    return (
                      <Tbody key={childNode.id}>
                        <Tr
                          key={childNode.id}
                          {...getTrProps({ item: childNode })}
                          isExpanded={isCellExpanded(item)}
                        >
                          <Td
                            colSpan={numRenderedColumns}
                            className="pf-v6-u-py-md pf-v6-u-border-bottom"
                          >
                            <GroupTableData item={childNode} />
                          </Td>
                        </Tr>
                      </Tbody>
                    )
                  })
                }
              </>
            )
          })}
        </ConditionalTableBody >
      </Table >
      <SimplePagination
        idPrefix="sbom-groups-table"
        isTop={false}
        paginationProps={paginationProps}
      />
    </>
  )
}
