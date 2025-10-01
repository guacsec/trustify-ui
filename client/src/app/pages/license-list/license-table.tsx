import React from "react";
import { generatePath, NavLink } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { Paths } from "@app/Routes";
import { LicenseSearchContext } from "./license-context";
import { WithSBOMsByLicense } from "@app/components/WithSBOMsByLicense";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { Skeleton } from "@patternfly/react-core";
import { TableCellError } from "@app/components/TableCellError";
import { WithPackagesByLicense } from "@app/components/WithPackagesByLicense";

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
                      width={35}
                      modifier="breakWord"
                      {...getTdProps({
                        columnKey: "name",
                        item: item,
                        rowIndex,
                      })}
                    >
                      {item.license}
                    </Td>
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
                          <Td
                            width={15}
                            {...getTdProps({
                              columnKey: "packages",
                              item: item,
                              rowIndex,
                            })}
                          >
                            {totalPackages && totalPackages > 0 ? (
                              <NavLink
                                to={generatePath(Paths.packagesFilter, {
                                  licenseName: item.license,
                                })}
                              >
                                {`${totalPackages} Package${totalPackages > 1 ? "s" : ""}`}
                              </NavLink>
                            ) : (
                              "0 Packages"
                            )}
                          </Td>
                        </LoadingWrapper>
                      )}
                    </WithPackagesByLicense>
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
                          <Td
                            width={50}
                            {...getTdProps({
                              columnKey: "sboms",
                              item: item,
                              rowIndex,
                            })}
                          >
                            {totalSBOMs && totalSBOMs > 0 ? (
                              <NavLink
                                to={generatePath(Paths.packagesFilter, {
                                  licenseName: item.license,
                                })}
                              >
                                {`${totalSBOMs} Package${totalSBOMs > 1 ? "s" : ""}`}
                              </NavLink>
                            ) : (
                              "0 Packages"
                            )}
                          </Td>
                        </LoadingWrapper>
                      )}
                    </WithSBOMsByLicense>
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
