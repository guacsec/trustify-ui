import React from "react";

import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";

import { getModelProperties } from "@app/pages/sbom-details/model-detail-drawer";

import { ModelSearchContext } from "./model-context";

export const ModelTable: React.FC = () => {
  const { isFetching, fetchError, totalItemCount, tableControls } =
    React.useContext(ModelSearchContext);

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
  } = tableControls;

  return (
    <>
      <Table {...tableProps} aria-label="model-table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "name" })} />
              <Th {...getThProps({ columnKey: "suppliedBy" })} />
              <Th {...getThProps({ columnKey: "licenses" })} />
            </TableHeaderContentWithControls>
          </Tr>
        </Thead>
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={totalItemCount === 0}
          numRenderedColumns={numRenderedColumns}
        >
          {currentPageItems.map((item, rowIndex) => {
            const props = getModelProperties(item.properties);
            return (
              <Tbody key={item.id}>
                <Tr {...getTrProps({ item })}>
                  <TableRowContentWithControls
                    {...tableControls}
                    item={item}
                    rowIndex={rowIndex}
                  >
                    <Td
                      width={40}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "name",
                        item: item,
                        rowIndex,
                      })}
                    >
                      {item.name}
                    </Td>
                    <Td
                      width={30}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "suppliedBy",
                        item: item,
                        rowIndex,
                      })}
                    >
                      {props.suppliedBy || "-"}
                    </Td>
                    <Td
                      width={30}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "licenses",
                        item: item,
                        rowIndex,
                      })}
                    >
                      {props.licenses || "-"}
                    </Td>
                  </TableRowContentWithControls>
                </Tr>
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="model-table"
        isTop={false}
        paginationProps={paginationProps}
      />
    </>
  );
};
