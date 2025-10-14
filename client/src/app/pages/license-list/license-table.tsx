import React from "react";
import { Link } from "react-router-dom";

import { Skeleton } from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { SimplePagination } from "@app/components/SimplePagination";
import { TableCellError } from "@app/components/TableCellError";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { WithPackagesByLicense } from "@app/components/WithPackagesByLicense";
import { WithSBOMsByLicense } from "@app/components/WithSBOMsByLicense";

import { getPackageFilteredByLicenseUrl } from "@app/pages/package-list/helpers";
import { getSbomFilteredByLicenseUrl } from "@app/pages/sbom-list/helpers";

import { LicenseSearchContext } from "./license-context";

export const LicenseTable: React.FC = () => {
  const { isFetching, fetchError, totalItemCount, tableControls } =
    React.useContext(LicenseSearchContext);

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
      <Table {...tableProps} aria-label="License table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "name" })} />
              <Th {...getThProps({ columnKey: "packages" })} />
              <Th {...getThProps({ columnKey: "sboms" })} />
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
            return (
              <Tbody key={item.license}>
                <Tr {...getTrProps({ item })}>
                  <TableRowContentWithControls
                    {...tableControls}
                    item={item}
                    rowIndex={rowIndex}
                  >
                    <Td
                      width={70}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "name",
                        item: item,
                        rowIndex,
                      })}
                    >
                      {item.license}
                    </Td>
                    <Td
                      width={15}
                      {...getTdProps({
                        columnKey: "packages",
                        item: item,
                        rowIndex,
                      })}
                    >
                      <WithPackagesByLicense
                        key={item.license}
                        licenseId={item.license}
                      >
                        {(totalPackages, isFetching, fetchError) => (
                          <LoadingWrapper
                            isFetching={isFetching}
                            fetchError={fetchError}
                            isFetchingState={
                              <Skeleton screenreaderText="Loading contents" />
                            }
                            fetchErrorState={(error) => (
                              <TableCellError error={error} />
                            )}
                          >
                            {totalPackages && totalPackages > 0 ? (
                              <Link
                                to={getPackageFilteredByLicenseUrl([
                                  item.license,
                                ])}
                              >
                                {totalPackages} Package
                                {totalPackages > 1 ? "s" : ""}
                              </Link>
                            ) : (
                              "0 Packages"
                            )}
                          </LoadingWrapper>
                        )}
                      </WithPackagesByLicense>
                    </Td>
                    <Td
                      width={15}
                      {...getTdProps({
                        columnKey: "sboms",
                        item: item,
                        rowIndex,
                      })}
                    >
                      <WithSBOMsByLicense
                        key={item.license}
                        licenseId={item.license}
                      >
                        {(totalSBOMs, isFetching, fetchError) => (
                          <LoadingWrapper
                            isFetching={isFetching}
                            fetchError={fetchError}
                            isFetchingState={
                              <Skeleton screenreaderText="Loading contents" />
                            }
                            fetchErrorState={(error) => (
                              <TableCellError error={error} />
                            )}
                          >
                            {totalSBOMs && totalSBOMs > 0 ? (
                              <Link
                                to={getSbomFilteredByLicenseUrl([item.license])}
                              >
                                {totalSBOMs} SBOM{totalSBOMs > 1 ? "s" : ""}
                              </Link>
                            ) : (
                              "0 SBOMs"
                            )}
                          </LoadingWrapper>
                        )}
                      </WithSBOMsByLicense>
                    </Td>
                  </TableRowContentWithControls>
                </Tr>
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="license-table"
        isTop={false}
        paginationProps={paginationProps}
      />
    </>
  );
};
