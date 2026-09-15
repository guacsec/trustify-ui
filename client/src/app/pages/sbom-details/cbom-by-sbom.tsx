import React from "react";

import {
  Content,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import type { IconedStatusPreset } from "@app/components/IconedStatus";
import { IconedStatus } from "@app/components/IconedStatus";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { FilterToolbar, FilterType } from "@app/components/FilterToolbar";
import { FILTER_TEXT_CATEGORY_KEY } from "@app/Constants";
import {
  getHubRequestParams,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useFetchCryptoBySbom } from "@app/queries/crypto";
import type { CryptoAlgorithm } from "@app/pages/crypto-list/crypto-context";

interface CbomBySbomProps {
  sbomId: string;
}

const policyPresetMap: Record<string, IconedStatusPreset> = {
  Compliant: "Compliant",
  Warning: "Warning",
  NonCompliant: "NonCompliant",
};

/** Extracts the primitive value from algorithm properties. */
const getPrimitive = (item: CryptoAlgorithm): string => {
  const props = item.properties as Record<string, unknown>;
  return (props?.primitive as string) ?? "--";
};

/** Formats non-primitive properties as a compact summary string. */
const formatProperties = (item: CryptoAlgorithm): string => {
  const props = item.properties as Record<string, unknown>;
  if (!props || Object.keys(props).length === 0) return "--";

  const entries = Object.entries(props)
    .filter(([key]) => key !== "primitive")
    .map(([key, value]) => {
      if (Array.isArray(value)) return `${key}: ${value.join(", ")}`;
      if (typeof value === "object" && value !== null) {
        return `${key}: ${JSON.stringify(value)}`;
      }
      return `${key}: ${String(value)}`;
    });

  return entries.length > 0 ? entries.join("; ") : "--";
};

/** Displays a table of cryptographic assets for a specific SBOM. */
export const CbomBySbom: React.FC<CbomBySbomProps> = ({ sbomId }) => {
  const tableControlState = useTableControlState({
    tableName: "cbom-table",
    columnNames: {
      name: "Asset Name",
      type: "Type",
      primitive: "Primitive",
      oid: "OID",
      policy: "Policy Status",
      properties: "Properties",
    },
    isPaginationEnabled: true,
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: FILTER_TEXT_CATEGORY_KEY,
        title: "Filter text",
        placeholderText: "Search",
        type: FilterType.search,
      },
    ],
  });

  const {
    result: { data: cryptoAssets, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchCryptoBySbom(sbomId, {
    ...getHubRequestParams({
      ...tableControlState,
    }),
    total: true,
  });

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "node_id",
    currentPageItems: cryptoAssets,
    totalItemCount,
    isLoading: isFetching,
  });

  const {
    numRenderedColumns,
    currentPageItems,
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
      tableProps,
      getThProps,
      getTrProps,
      getTdProps,
    },
  } = tableControls;

  return (
    <>
      <Toolbar {...toolbarProps} aria-label="CBOM toolbar">
        <ToolbarContent>
          <FilterToolbar {...filterToolbarProps} />
          <ToolbarItem {...paginationToolbarItemProps}>
            <SimplePagination
              idPrefix="cbom-table"
              isTop
              paginationProps={paginationProps}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Table {...tableProps} aria-label="CBOM table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "name" })} />
              <Th {...getThProps({ columnKey: "type" })} />
              <Th {...getThProps({ columnKey: "primitive" })} />
              <Th {...getThProps({ columnKey: "oid" })} />
              <Th {...getThProps({ columnKey: "policy" })} />
              <Th {...getThProps({ columnKey: "properties" })} />
            </TableHeaderContentWithControls>
          </Tr>
        </Thead>
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={currentPageItems.length === 0}
          numRenderedColumns={numRenderedColumns}
          noDataEmptyState={
            <Content component="p">
              No cryptographic assets found for this SBOM.
            </Content>
          }
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
                    {item.name}
                  </Td>
                  <Td
                    width={15}
                    {...getTdProps({ columnKey: "type", item, rowIndex })}
                  >
                    {item.asset_type ?? "--"}
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({ columnKey: "primitive", item, rowIndex })}
                  >
                    {getPrimitive(item)}
                  </Td>
                  <Td
                    width={10}
                    modifier="breakWord"
                    {...getTdProps({ columnKey: "oid", item, rowIndex })}
                  >
                    {item.oid ?? "--"}
                  </Td>
                  <Td
                    width={10}
                    {...getTdProps({ columnKey: "policy", item, rowIndex })}
                  >
                    <IconedStatus
                      preset={policyPresetMap[item.policy_status] ?? "Unknown"}
                    />
                  </Td>
                  <Td
                    width={25}
                    modifier="breakWord"
                    {...getTdProps({
                      columnKey: "properties",
                      item,
                      rowIndex,
                    })}
                  >
                    {formatProperties(item)}
                  </Td>
                </TableRowContentWithControls>
              </Tr>
            </Tbody>
          ))}
        </ConditionalTableBody>
      </Table>

      <SimplePagination
        idPrefix="cbom-table"
        isTop={false}
        paginationProps={paginationProps}
      />
    </>
  );
};
