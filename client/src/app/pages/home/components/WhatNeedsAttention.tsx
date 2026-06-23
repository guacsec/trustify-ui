import type React from "react";
import { NavLink, generatePath } from "react-router-dom";

import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import type { HubRequestParams } from "@app/api/models";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { SeverityShieldAndText } from "@app/components/SeverityShieldAndText";
import { StateNoData } from "@app/components/StateNoData";
import { Paths } from "@app/Routes";
import { useFetchVulnerabilities } from "@app/queries/vulnerabilities";

const hubRequestParams: HubRequestParams = {
  filters: [
    {
      field: "base_severity",
      operator: "=",
      value: {
        list: ["critical", "high"],
        operator: "OR",
      },
    },
  ],
  sort: {
    field: "base_score",
    direction: "desc",
  },
  page: {
    pageNumber: 1,
    itemsPerPage: 3,
  },
};

export const WhatNeedsAttention: React.FC = () => {
  const { result, isFetching, fetchError } =
    useFetchVulnerabilities(hubRequestParams);

  return (
    <Card>
      <CardTitle>What needs attention</CardTitle>
      <CardBody>
        <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
          {result.data.length === 0 ? (
            <StateNoData />
          ) : (
            <Stack hasGutter>
              {result.data.map((vulnerability) => (
                <StackItem key={vulnerability.identifier}>
                  <DescriptionList isHorizontal isCompact>
                    <DescriptionListGroup>
                      <DescriptionListTerm>
                        <SeverityShieldAndText
                          value={
                            vulnerability.base_score?.severity ?? "unknown"
                          }
                          score={vulnerability.base_score?.score ?? null}
                          showScore
                          showLabel
                        />
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        <NavLink
                          to={generatePath(Paths.vulnerabilityDetails, {
                            vulnerabilityId: vulnerability.identifier,
                          })}
                        >
                          {vulnerability.identifier}
                          {vulnerability.title
                            ? ` — ${vulnerability.title}`
                            : ""}
                        </NavLink>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </StackItem>
              ))}
            </Stack>
          )}
        </LoadingWrapper>
      </CardBody>
    </Card>
  );
};
