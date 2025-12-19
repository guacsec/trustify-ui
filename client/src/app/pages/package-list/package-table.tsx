import React from "react";
import { generatePath, NavLink } from "react-router-dom";

import { List, ListItem } from "@patternfly/react-core";
import spacing from "@patternfly/react-styles/css/utilities/Spacing/spacing";
import {
  ExpandableRowContent,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

import { PackageQualifiers } from "@app/components/PackageQualifiers";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { Paths } from "@app/Routes";

import { WithPackage } from "../../components/WithPackage";
import { PackageLicenses } from "./components/PackageLicences";
import { PackageVulnerabilities } from "./components/PackageVulnerabilities";
import { PackageSearchContext } from "./package-context";

export const PackageTable: React.FC = () => {
  const { isFetching, fetchError, totalItemCount, tableControls } =
    React.useContext(PackageSearchContext);

  const {
    numRenderedColumns,
    currentPageItems,
    propHelpers: {
      paginationProps,
      tableProps,
      getThProps,
      getTrProps,
      getTdProps,
      getExpandedContentTdProps,
      getColumnVisibility,
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  return (
    <>
      <Table {...tableProps} aria-label="Package table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              {getColumnVisibility("name") && (
                <Th {...getThProps({ columnKey: "name" })} />
              )}
              {getColumnVisibility("namespace") && (
                <Th {...getThProps({ columnKey: "namespace" })} />
              )}
              {getColumnVisibility("version") && (
                <Th {...getThProps({ columnKey: "version" })} />
              )}
              {getColumnVisibility("type") && (
                <Th {...getThProps({ columnKey: "type" })} />
              )}
              {getColumnVisibility("licenses") && (
                <Th {...getThProps({ columnKey: "licenses" })} />
              )}
              {getColumnVisibility("path") && (
                <Th {...getThProps({ columnKey: "path" })} />
              )}
              {getColumnVisibility("qualifiers") && (
                <Th {...getThProps({ columnKey: "qualifiers" })} />
              )}
              {getColumnVisibility("vulnerabilities") && (
                <Th {...getThProps({ columnKey: "vulnerabilities" })} />
              )}
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
              <WithPackage key={item.uuid} packageId={item.uuid}>
                {(pkg, packageIsFetching, packageFetchError) => (
                  <Tbody>
                    <Tr {...getTrProps({ item })}>
                      <TableRowContentWithControls
                        {...tableControls}
                        item={item}
                        rowIndex={rowIndex}
                      >
                        {getColumnVisibility("name") && (
                          <Td
                            width={15}
                            modifier="breakWord"
                            {...getTdProps({ columnKey: "name" })}
                          >
                            <NavLink
                              to={generatePath(Paths.packageDetails, {
                                packageId: item.uuid,
                              })}
                            >
                              {item.decomposedPurl
                                ? item.decomposedPurl?.name
                                : item.purl}
                            </NavLink>
                          </Td>
                        )}
                        {getColumnVisibility("namespace") && (
                          <Td
                            width={15}
                            modifier="truncate"
                            {...getTdProps({ columnKey: "namespace" })}
                          >
                            {item.decomposedPurl?.namespace}
                          </Td>
                        )}
                        {getColumnVisibility("version") && (
                          <Td
                            width={10}
                            modifier="truncate"
                            {...getTdProps({ columnKey: "version" })}
                          >
                            {item.decomposedPurl?.version}
                          </Td>
                        )}
                        {getColumnVisibility("type") && (
                          <Td
                            width={10}
                            modifier="truncate"
                            {...getTdProps({ columnKey: "type" })}
                          >
                            {item.decomposedPurl?.type}
                          </Td>
                        )}
                        {getColumnVisibility("licenses") && (
                          <Td
                            width={10}
                            modifier="truncate"
                            {...getTdProps({
                              columnKey: "licenses",
                              isCompoundExpandToggle: true,
                              item,
                              rowIndex,
                            })}
                          >
                            <PackageLicenses
                              pkg={pkg}
                              isFetching={packageIsFetching}
                              fetchError={packageFetchError}
                            />
                          </Td>
                        )}
                        {getColumnVisibility("path") && (
                          <Td
                            width={10}
                            modifier="truncate"
                            {...getTdProps({ columnKey: "path" })}
                          >
                            {item.decomposedPurl?.path}
                          </Td>
                        )}
                        {getColumnVisibility("qualifiers") && (
                          <Td
                            width={20}
                            {...getTdProps({ columnKey: "qualifiers" })}
                          >
                            {item.decomposedPurl?.qualifiers && (
                              <PackageQualifiers
                                value={item.decomposedPurl?.qualifiers}
                              />
                            )}
                          </Td>
                        )}
                        {getColumnVisibility("vulnerabilities") && (
                          <Td
                            width={10}
                            {...getTdProps({ columnKey: "vulnerabilities" })}
                          >
                            <PackageVulnerabilities
                              pkg={pkg}
                              isFetching={packageIsFetching}
                              fetchError={packageFetchError}
                            />
                          </Td>
                        )}
                      </TableRowContentWithControls>
                    </Tr>
                    {isCellExpanded(item) ? (
                      <Tr isExpanded>
                        <Td
                          {...getExpandedContentTdProps({
                            item,
                          })}
                          className={spacing.pLg}
                        >
                          <ExpandableRowContent>
                            <div className={spacing.ptLg}>
                              {isCellExpanded(item, "licenses") ? (
                                <List isPlain>
                                  {pkg?.licenses?.map((license, idx) => (
                                    <ListItem
                                      key={`${license.license_name}-${idx}`}
                                    >
                                      {license.license_name}
                                    </ListItem>
                                  ))}
                                </List>
                              ) : null}
                            </div>
                          </ExpandableRowContent>
                        </Td>
                      </Tr>
                    ) : null}
                  </Tbody>
                )}
              </WithPackage>
            );
          })}
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="package-table"
        isTop={false}
        paginationProps={paginationProps}
      />
    </>
  );
};
