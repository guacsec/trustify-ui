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
  Title,
} from "@patternfly/react-core";
import ArrowRightIcon from "@patternfly/react-icons/dist/esm/icons/arrow-right-icon";

import {
  extendedSeverityFromSeverity,
  type HubRequestParams,
} from "@app/api/models";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { SeverityShieldAndText } from "@app/components/SeverityShieldAndText";
import { VulnerabilityDescription } from "@app/components/VulnerabilityDescription";
import { useFetchVulnerabilities } from "@app/queries/vulnerabilities";
import { Paths } from "@app/Routes";

import { HomeSectionCard } from "./HomeSectionCard";

const MAX_ATTENTION_ITEMS = 3;

const getLastSevenDaysRequestParams = (): HubRequestParams => {
  const publishedAfter = new Date();
  publishedAfter.setDate(publishedAfter.getDate() - 7);
  publishedAfter.setHours(0, 0, 0, 0);

  return {
    page: { pageNumber: 1, itemsPerPage: 10 },
    sort: { field: "base_score", direction: "desc" },
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
    <HomeSectionCard className="vulnerability-attention-section">
      <div className="home-section-card__header">
        <Title headingLevel="h2" size="lg">
          Highest vulnerabilities (last 7 days)
        </Title>
        <Content className="home-section-card__subtitle" component="p">
          Highest severity CVEs published in the last seven days, ranked by CVSS
          score.
        </Content>
      </div>

      <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
        {attentionVulnerabilities.length > 0 ? (
          <div className="home-section-card__columns">
            {attentionVulnerabilities.map((vulnerability, index) => (
              <React.Fragment key={vulnerability.identifier}>
                {index > 0 && (
                  <Divider
                    className="home-section-card__divider"
                    orientation={{ default: "vertical" }}
                  />
                )}
                <div className="home-section-card__column">
                  <div className="home-section-card__column-content">
                    <Flex
                      alignItems={{ default: "alignItemsCenter" }}
                      justifyContent={{
                        default: "justifyContentSpaceBetween",
                      }}
                      spaceItems={{ default: "spaceItemsSm" }}
                      wrap={{ default: "wrap" }}
                    >
                      <FlexItem>
                        <SeverityShieldAndText
                          value={extendedSeverityFromSeverity(
                            vulnerability.base_score?.severity,
                          )}
                          score={vulnerability.base_score?.score ?? null}
                          showLabel
                          showScore
                        />
                      </FlexItem>
                      <FlexItem>
                        <Link
                          to={generatePath(Paths.vulnerabilityDetails, {
                            vulnerabilityId: vulnerability.identifier,
                          })}
                        >
                          {vulnerability.identifier}
                        </Link>
                      </FlexItem>
                    </Flex>
                    <Content
                      className="home-section-card__column-description"
                      component="p"
                    >
                      <VulnerabilityDescription vulnerability={vulnerability} />
                    </Content>
                  </div>
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
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <EmptyState
            headingLevel="h4"
            titleText="No vulnerabilities in the last 7 days"
            variant={EmptyStateVariant.sm}
          >
            <EmptyStateBody>
              Newly published vulnerabilities will appear here as they arrive.
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
    </HomeSectionCard>
  );
};
