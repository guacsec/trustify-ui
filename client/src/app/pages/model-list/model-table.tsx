import React from "react";

import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import type { SbomModel } from "@app/client";
import {
  AIModelDetails,
  getModelProperties,
} from "@app/components/AIModelDetails";
import { PageDrawerContent } from "@app/components/PageDrawerContext";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";

import { Button, Content } from "@patternfly/react-core";
import { ModelSearchContext } from "./model-context";

export const ModelTable: React.FC = () => {
  const [selectedModel, setSelectedModel] = React.useState<SbomModel | null>(
    null,
  );

  const { isFetching, fetchError, tableControls } =
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
              <Th {...getThProps({ columnKey: "sboms" })} />
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
                      <Button
                        variant="link"
                        isInline
                        onClick={() => setSelectedModel(item)}
                      >
                        {item.name}
                      </Button>
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
                      width={15}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "licenses",
                        item: item,
                        rowIndex,
                      })}
                    >
                      {props.licenses || "-"}
                    </Td>
                    <Td
                      width={15}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "sboms",
                        item: item,
                        rowIndex,
                      })}
                    >
                      {item.sbom_count}
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

      <PageDrawerContent
        isExpanded={selectedModel !== null}
        onCloseClick={() => setSelectedModel(null)}
        header={<Content component="h2">{selectedModel?.name}</Content>}
        pageKey="sbom-details-models"
      >
        {selectedModel && <AIModelDetails model={selectedModel} />}
      </PageDrawerContent>
    </>
  );
};
