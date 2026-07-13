import type React from "react";
import { generatePath, Link } from "react-router-dom";

import {
  Card,
  CardBody,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { LoadingWrapper } from "@tsd-ui/core";
import { useFetchAdvisories } from "@app/queries/advisories";
import { useFetchSBOMs } from "@app/queries/sboms";
import { Paths } from "@app/Routes";
import { formatDateTime } from "@app/utils/utils";

interface HomeSectionCardProps {
  children: React.ReactNode;
}

export const HomeSectionCard: React.FC<HomeSectionCardProps> = ({
  children,
}) => {
  return (
    <Card>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export const PortfolioMetricsSection: React.FC = () => {
  const {
    result: { data: sboms, total: totalSboms },
    isFetching: isFetchingSboms,
    fetchError: fetchErrorSboms,
  } = useFetchSBOMs(null, {
    page: { pageNumber: 1, itemsPerPage: 1 },
    sort: { field: "ingested", direction: "desc" },
    total: true,
  });

  const {
    result: { data: advisories, total: totalAdvisories },
    isFetching: isFetchingAdvisories,
    fetchError: fetchErrorAdvisories,
  } = useFetchAdvisories({
    page: { pageNumber: 1, itemsPerPage: 1 },
    sort: { field: "ingested", direction: "desc" },
    total: true,
  });

  const latestSbom = sboms[0] ?? null;
  const latestAdvisory = advisories[0] ?? null;

  return (
    <HomeSectionCard>
      <LoadingWrapper
        isFetching={isFetchingSboms || isFetchingAdvisories}
        fetchError={fetchErrorSboms || fetchErrorAdvisories}
      >
        <Grid hasGutter>
          <GridItem md={6}>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>Last SBOM ingested</DescriptionListTerm>
                <DescriptionListDescription>
                  <Stack>
                    <StackItem>
                      {formatDateTime(latestSbom?.ingested)}
                    </StackItem>
                    <StackItem>
                      {latestSbom && (
                        <Link
                          to={generatePath(Paths.sbomDetails, {
                            sbomId: latestSbom.id,
                          })}
                        >
                          {latestSbom.name}
                        </Link>
                      )}
                    </StackItem>
                  </Stack>
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </GridItem>
          <GridItem md={6}>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>
                  Last Advisory ingested
                </DescriptionListTerm>
                <DescriptionListDescription>
                  <Stack>
                    <StackItem>
                      {formatDateTime(latestAdvisory?.ingested)}
                    </StackItem>
                    <StackItem>
                      {latestAdvisory && (
                        <Link
                          to={generatePath(Paths.advisoryDetails, {
                            advisoryId: latestAdvisory.uuid,
                          })}
                        >
                          {latestAdvisory.document_id}
                        </Link>
                      )}
                    </StackItem>
                  </Stack>
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </GridItem>
          <GridItem md={6}>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>Total SBOMs</DescriptionListTerm>
                <DescriptionListDescription>
                  {totalSboms}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </GridItem>
          <GridItem md={6}>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>Total Advisories</DescriptionListTerm>
                <DescriptionListDescription>
                  {totalAdvisories}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </GridItem>
        </Grid>
      </LoadingWrapper>
    </HomeSectionCard>
  );
};
