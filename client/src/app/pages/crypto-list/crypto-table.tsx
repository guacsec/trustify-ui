import React from "react";
import { Link } from "react-router-dom";

import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { IconedStatus } from "@app/components/IconedStatus";
import type { IconedStatusPreset } from "@app/components/IconedStatus";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { Paths } from "@app/Routes";

import type { CryptoAlgorithm, PolicyVerdict } from "./crypto-context";
import { CryptoSearchContext } from "./crypto-context";

/** Maps a backend PolicyVerdict to an IconedStatus preset. */
const policyPresetMap: Record<PolicyVerdict, IconedStatusPreset> = {
  compliant: "Compliant",
  warning: "Warning",
  non_compliant: "NonCompliant",
};

/** Extracts the primitive value from algorithm properties JSON. */
const getPrimitive = (properties: Record<string, unknown>): string => {
  const algProps = properties?.algorithmProperties as
    Record<string, unknown> | undefined;
  return (algProps?.primitive as string) ?? "-";
};

/** Master algorithm inventory table displaying cryptographic assets. */
export const CryptoTable: React.FC = () => {
  const { isFetching, fetchError, tableControls } =
    React.useContext(CryptoSearchContext);

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
      <Table {...tableProps} aria-label="crypto-algorithm-table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "name" })} />
              <Th {...getThProps({ columnKey: "primitive" })} />
              <Th {...getThProps({ columnKey: "occurrences" })} />
              <Th {...getThProps({ columnKey: "policy" })} />
              <Th {...getThProps({ columnKey: "recommendation" })} />
              <Th {...getThProps({ columnKey: "usage" })} />
              <Th {...getThProps({ columnKey: "packages" })} />
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
          {currentPageItems.map((item: CryptoAlgorithm, rowIndex: number) => (
            <Tbody key={item.node_id}>
              <Tr {...getTrProps({ item })}>
                <TableRowContentWithControls
                  {...tableControls}
                  item={item}
                  rowIndex={rowIndex}
                >
                  <Td
                    width={20}
                    modifier="breakWord"
                    {...getTdProps({
                      columnKey: "name",
                      item,
                      rowIndex,
                    })}
                  >
                    {item.name}
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({
                      columnKey: "primitive",
                      item,
                      rowIndex,
                    })}
                  >
                    {getPrimitive(item.properties)}
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({
                      columnKey: "occurrences",
                      item,
                      rowIndex,
                    })}
                  >
                    -
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({
                      columnKey: "policy",
                      item,
                      rowIndex,
                    })}
                  >
                    <IconedStatus
                      preset={policyPresetMap[item.policy_status]}
                    />
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({
                      columnKey: "recommendation",
                      item,
                      rowIndex,
                    })}
                  >
                    -
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({
                      columnKey: "usage",
                      item,
                      rowIndex,
                    })}
                  >
                    -
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({
                      columnKey: "packages",
                      item,
                      rowIndex,
                    })}
                  >
                    <Link
                      to={`${Paths.packages}?crypto=${encodeURIComponent(item.name)}`}
                    >
                      -
                    </Link>
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({
                      columnKey: "sboms",
                      item,
                      rowIndex,
                    })}
                  >
                    <Link
                      to={`${Paths.sboms}?crypto=${encodeURIComponent(item.name)}`}
                    >
                      -
                    </Link>
                  </Td>
                </TableRowContentWithControls>
              </Tr>
            </Tbody>
          ))}
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="crypto-table"
        isTop={false}
        paginationProps={paginationProps}
      />
    </>
  );
};
