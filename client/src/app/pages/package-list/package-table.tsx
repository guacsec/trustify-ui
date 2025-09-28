import React from "react";
import { generatePath, NavLink } from "react-router-dom";
import {
  ExpandableRowContent,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import spacing from "@patternfly/react-styles/css/utilities/Spacing/spacing";

import { PackageQualifiers } from "@app/components/PackageQualifiers";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { Paths } from "@app/Routes";
import { PackageSearchContext } from "./package-context";
import { PackageVulnerabilities } from "./components/PackageVulnerabilities";
import { List, ListItem } from "@patternfly/react-core";
import { WithPackage } from "../../components/WithPackage";

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
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  return (
    <>
      <Table {...tableProps} aria-label="Package table">
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "name" })} />
              <Th {...getThProps({ columnKey: "namespace" })} />
              <Th {...getThProps({ columnKey: "version" })} />
              <Th {...getThProps({ columnKey: "type" })} />
              <Th {...getThProps({ columnKey: "licenses" })} />
              <Th {...getThProps({ columnKey: "path" })} />
              <Th {...getThProps({ columnKey: "qualifiers" })} />
              <Th {...getThProps({ columnKey: "vulnerabilities" })} />
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
              <Tbody key={item.uuid}>
                <Tr {...getTrProps({ item })}>
                  <TableRowContentWithControls
                    {...tableControls}
                    item={item}
                    rowIndex={rowIndex}
                  >
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
                    <Td
                      width={15}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "namespace" })}
                    >
                      {item.decomposedPurl?.namespace}
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "version" })}
                    >
                      {item.decomposedPurl?.version}
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "type" })}
                    >
                      {item.decomposedPurl?.type}
                    </Td>
                    <WithPackage packageId={item.uuid}>
                      {(pkg) => (
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
                          {pkg?.licenses?.length ?? 0}{" "}
                          {(pkg?.licenses?.length ?? 0) > 1
                            ? "Licenses"
                            : "License"}
                        </Td>
                      )}
                    </WithPackage>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "path" })}
                    >
                      {item.decomposedPurl?.path}
                    </Td>
                    <Td width={20} {...getTdProps({ columnKey: "qualifiers" })}>
                      {item.decomposedPurl?.qualifiers && (
                        <PackageQualifiers
                          value={item.decomposedPurl?.qualifiers}
                        />
                      )}
                    </Td>
                    <WithPackage packageId={item.uuid}>
                      {(pkg) => (
                        <Td
                          width={20}
                          {...getTdProps({ columnKey: "vulnerabilities" })}
                        >
                          <PackageVulnerabilities pkg={pkg} />
                        </Td>
                      )}
                    </WithPackage>
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
                            <WithPackage packageId={item.uuid}>
                              {(pkg) => (
                                <List isPlain>
                                  {pkg?.licenses?.map((license, idx) => (
                                    <ListItem
                                      key={`${license.license_name}-${idx}`}
                                    >
                                      {license.license_name}
                                    </ListItem>
                                  ))}
                                </List>
                              )}
                            </WithPackage>
                          ) : null}
                        </div>
                      </ExpandableRowContent>
                    </Td>
                  </Tr>
                ) : null}
              </Tbody>
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
