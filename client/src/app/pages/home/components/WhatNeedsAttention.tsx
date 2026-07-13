import React from "react";
import { generatePath, Link } from "react-router-dom";

import {
  Button,
  Content,
  Divider,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import ArrowRightIcon from "@patternfly/react-icons/dist/esm/icons/arrow-right-icon";

import {
  extendedSeverityFromSeverity,
  type HubRequestParams,
} from "@app/api/models";
import { LoadingWrapper } from "@tsd-ui/core";
import { SeverityShieldAndText } from "@app/components/SeverityShieldAndText";
import { VulnerabilityDescription } from "@app/components/VulnerabilityDescription";
import { useFetchVulnerabilities } from "@app/queries/vulnerabilities";
import { Paths } from "@app/Routes";

import { HomeSectionCard } from "./PortfolioMetricsSection";

const MAX_ATTENTION_ITEMS = 3;

const getLastSevenDaysRequestParams = (): HubRequestParams => {
  const publishedAfter = new Date();
  publishedAfter.setDate(publishedAfter.getDate() - 7);
  publishedAfter.setHours(0, 0, 0, 0);

  return {
    page: { pageNumber: 1, itemsPerPage: MAX_ATTENTION_ITEMS },
    sort: { field: "base_score", direction: "desc" },
    total: false,
    filters: [
      {
        field: "published",
        operator: ">",
        value: publishedAfter.toISOString(),
      },
      {
        field: "base_severity",
        operator: "=",
        value: { list: ["critical", "high"], operator: "OR" },
      },
    ],
  };
};

export const VulnerabilityAttentionSection: React.FC = () => {
  const requestParams = React.useMemo(
    () => getLastSevenDaysRequestParams(),
    [],
  );

  const {
    result: { data: vulnerabilities },
    isFetching,
    fetchError,
  } = useFetchVulnerabilities(requestParams);

  const attentionVulnerabilities = React.useMemo(
    () => vulnerabilities.slice(0, MAX_ATTENTION_ITEMS),
    [vulnerabilities],
  );

  return (
    <HomeSectionCard>
      <Stack hasGutter>
        <StackItem>
          <Title headingLevel="h2" size="lg">
            Highest vulnerabilities (last 7 days)
          </Title>
          <Content component="p">
            Highest severity vulnerabilities published in the last seven days,
            ranked by CVSS score.
          </Content>
        </StackItem>
        <StackItem>
          <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
            {attentionVulnerabilities.length > 0 ? (
              <Flex
                direction={{ default: "column", md: "row" }}
                alignItems={{ default: "alignItemsStretch" }}
              >
                {attentionVulnerabilities.map((vulnerability, index) => (
                  <React.Fragment key={vulnerability.identifier}>
                    {index > 0 && (
                      <Divider
                        orientation={{
                          default: "horizontal",
                          md: "vertical",
                        }}
                      />
                    )}
                    <FlexItem flex={{ default: "flex_1" }}>
                      <Stack hasGutter>
                        <StackItem isFilled>
                          <Stack>
                            <StackItem>
                              <Flex
                                alignItems={{
                                  default: "alignItemsCenter",
                                }}
                                justifyContent={{
                                  default: "justifyContentSpaceBetween",
                                }}
                                spaceItems={{ default: "spaceItemsSm" }}
                                flexWrap={{ default: "wrap" }}
                              >
                                <FlexItem>
                                  <SeverityShieldAndText
                                    value={extendedSeverityFromSeverity(
                                      vulnerability.base_score?.severity,
                                    )}
                                    score={
                                      vulnerability.base_score?.score ?? null
                                    }
                                    showLabel
                                    showScore
                                  />
                                </FlexItem>
                                <FlexItem>
                                  <Link
                                    to={generatePath(
                                      Paths.vulnerabilityDetails,
                                      {
                                        vulnerabilityId:
                                          vulnerability.identifier,
                                      },
                                    )}
                                  >
                                    {vulnerability.identifier}
                                  </Link>
                                </FlexItem>
                              </Flex>
                            </StackItem>
                            <StackItem>
                              <VulnerabilityDescription
                                vulnerability={vulnerability}
                              />
                            </StackItem>
                          </Stack>
                        </StackItem>
                        <StackItem>
                          <Link
                            to={generatePath(Paths.vulnerabilityDetails, {
                              vulnerabilityId: vulnerability.identifier,
                            })}
                          >
                            <Button
                              variant="link"
                              isInline
                              icon={<ArrowRightIcon />}
                              iconPosition="end"
                            >
                              View vulnerability
                            </Button>
                          </Link>
                        </StackItem>
                      </Stack>
                    </FlexItem>
                  </React.Fragment>
                ))}
              </Flex>
            ) : (
              <EmptyState
                headingLevel="h4"
                titleText="No vulnerabilities in the last 7 days"
                variant={EmptyStateVariant.sm}
              >
                <EmptyStateBody>
                  Newly published vulnerabilities will appear here as they
                  arrive.
                </EmptyStateBody>
                <EmptyStateFooter>
                  <Link to={Paths.vulnerabilities}>
                    <Button variant="link" isInline>
                      View all vulnerabilities
                    </Button>
                  </Link>
                </EmptyStateFooter>
              </EmptyState>
            )}
          </LoadingWrapper>
        </StackItem>
      </Stack>
    </HomeSectionCard>
  );
};
