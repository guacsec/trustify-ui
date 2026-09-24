import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import type { IconedStatusPreset } from "@app/components/IconedStatus";
import { IconedStatus } from "@app/components/IconedStatus";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";

import type { CryptoAlgorithm } from "./crypto-context";
import { CryptoSearchContext } from "./crypto-context";

interface CryptoTableProps {
  assetType: string;
  onSelectAlgorithm: (item: CryptoAlgorithm) => void;
}

/** Maps a backend policy_status string to an IconedStatus preset name. */
const policyPresetMap: Record<string, IconedStatusPreset> = {
  compliant: "Compliant",
  warning: "Warning",
  non_compliant: "NonCompliant",
};

const algProps = (item: CryptoAlgorithm) =>
  ((item.properties as Record<string, unknown>)?.algorithmProperties as Record<
    string,
    unknown
  >) ?? {};

const rcmProps = (item: CryptoAlgorithm) =>
  ((item.properties as Record<string, unknown>)
    ?.relatedCryptoMaterialProperties as Record<string, unknown>) ?? {};

/** Extracts the primitive value from algorithm properties. */
const getPrimitive = (item: CryptoAlgorithm): string =>
  (algProps(item).primitive as string) ?? "--";

/** Extracts the type value from related crypto material properties. */
const getKeyType = (item: CryptoAlgorithm): string =>
  (rcmProps(item).type as string) ?? item.asset_type ?? "--";

/** Extracts the recommendation from algorithm properties. */
const getRecommendation = (item: CryptoAlgorithm): string =>
  (algProps(item).recommendation as string) ?? "--";

/** Extracts the usage context from crypto properties. */
const getUsage = (item: CryptoAlgorithm): string =>
  (algProps(item).detectionContext as string) ?? "--";

/** Extracts the occurrence count from crypto properties. */
const getOccurrences = (item: CryptoAlgorithm): number =>
  (algProps(item).occurrences as number) ?? 1;

/** Extracts the packages count from crypto properties. */
const getPackagesCount = (item: CryptoAlgorithm): number =>
  (algProps(item).packages as number) ?? 0;

/** Extracts the SBOMs count from crypto properties. */
const getSbomsCount = (item: CryptoAlgorithm): number =>
  (algProps(item).sboms as number) ?? 0;

/** Master algorithm/key table component with tab-aware column rendering. */
export const CryptoTable: React.FC<CryptoTableProps> = ({
  assetType,
  onSelectAlgorithm,
}) => {
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

  const isAlgorithms = assetType === "algorithm";

  return (
    <>
      <Table {...tableProps} aria-label="crypto-table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "name" })} />
              {isAlgorithms ? (
                <>
                  <Th {...getThProps({ columnKey: "primitive" })} />
                  <Th {...getThProps({ columnKey: "occurrences" })} />
                  <Th {...getThProps({ columnKey: "policy" })} />
                  <Th {...getThProps({ columnKey: "recommendation" })} />
                  <Th {...getThProps({ columnKey: "usage" })} />
                  <Th {...getThProps({ columnKey: "packages" })} />
                  <Th {...getThProps({ columnKey: "sboms" })} />
                </>
              ) : (
                <>
                  <Th {...getThProps({ columnKey: "type" })} />
                  <Th {...getThProps({ columnKey: "occurrences" })} />
                  <Th {...getThProps({ columnKey: "usage" })} />
                  <Th {...getThProps({ columnKey: "sboms" })} />
                </>
              )}
            </TableHeaderContentWithControls>
          </Tr>
        </Thead>
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={currentPageItems.length === 0}
          numRenderedColumns={numRenderedColumns}
        >
          {currentPageItems.map((item, rowIndex) => (
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
                    {...getTdProps({ columnKey: "name", item, rowIndex })}
                  >
                    <Button
                      variant="link"
                      isInline
                      onClick={() => onSelectAlgorithm(item)}
                    >
                      {item.name}
                    </Button>
                  </Td>
                  {isAlgorithms ? (
                    <>
                      <Td
                        width={10}
                        {...getTdProps({
                          columnKey: "primitive",
                          item,
                          rowIndex,
                        })}
                      >
                        {getPrimitive(item)}
                      </Td>
                      <Td
                        width={10}
                        {...getTdProps({
                          columnKey: "occurrences",
                          item,
                          rowIndex,
                        })}
                      >
                        {getOccurrences(item)}
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
                          preset={
                            policyPresetMap[item.policy_status] ?? "Unknown"
                          }
                        />
                      </Td>
                      <Td
                        width={15}
                        modifier="breakWord"
                        {...getTdProps({
                          columnKey: "recommendation",
                          item,
                          rowIndex,
                        })}
                      >
                        {getRecommendation(item)}
                      </Td>
                      <Td
                        width={10}
                        {...getTdProps({
                          columnKey: "usage",
                          item,
                          rowIndex,
                        })}
                      >
                        {getUsage(item)}
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
                          to={`/packages?crypto=${encodeURIComponent(item.name)}`}
                        >
                          {getPackagesCount(item)}
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
                          to={`/sboms?crypto=${encodeURIComponent(item.name)}`}
                        >
                          {getSbomsCount(item)}
                        </Link>
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td
                        width={15}
                        {...getTdProps({
                          columnKey: "type",
                          item,
                          rowIndex,
                        })}
                      >
                        {getKeyType(item)}
                      </Td>
                      <Td
                        width={15}
                        {...getTdProps({
                          columnKey: "occurrences",
                          item,
                          rowIndex,
                        })}
                      >
                        {getOccurrences(item)}
                      </Td>
                      <Td
                        width={15}
                        {...getTdProps({
                          columnKey: "usage",
                          item,
                          rowIndex,
                        })}
                      >
                        {getUsage(item)}
                      </Td>
                      <Td
                        width={15}
                        {...getTdProps({
                          columnKey: "sboms",
                          item,
                          rowIndex,
                        })}
                      >
                        <Link
                          to={`/sboms?crypto=${encodeURIComponent(item.name)}`}
                        >
                          {getSbomsCount(item)}
                        </Link>
                      </Td>
                    </>
                  )}
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
