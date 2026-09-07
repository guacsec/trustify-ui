import type React from "react";

import {
  Card,
  CardBody,
  Content,
  Grid,
  GridItem,
  PageSection,
} from "@patternfly/react-core";

import { DocumentMetadata } from "@app/components/DocumentMetadata";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { useFetchCryptoSummary } from "@app/queries/crypto";

import { CryptoSearchProvider } from "./crypto-provider";

/** Formats a ratio as a percentage string. Returns "0%" when the total is zero. */
const formatPercent = (count: number, total: number): string => {
  if (total === 0) return "0%";
  return `${Math.round((count / total) * 100)}%`;
};

/** Cryptography page showing PQC readiness KPI cards and the algorithm list. */
export const CryptoList: React.FC = () => {
  const { result: summary, isFetching, fetchError } = useFetchCryptoSummary();

  const pqcPercent = formatPercent(
    summary?.pqcAlgorithms ?? 0,
    summary?.totalAlgorithms ?? 0,
  );
  const classicalPercent = formatPercent(
    summary?.classicalAlgorithms ?? 0,
    summary?.totalAlgorithms ?? 0,
  );
  const sbomPercent = formatPercent(
    summary?.pqcSboms ?? 0,
    summary?.totalSboms ?? 0,
  );

  return (
    <>
      <DocumentMetadata title="Cryptography" />
      <PageSection hasBodyWrapper={false}>
        <Content>
          <Content component="h1">Cryptography</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
          <Grid hasGutter>
            <GridItem md={4}>
              <Card data-testid="kpi-pqc-algorithms">
                <CardBody>
                  <Content component="p">
                    <strong
                      style={{
                        fontSize: "var(--pf-t--global--font--size--2xl)",
                      }}
                    >
                      {pqcPercent}
                    </strong>
                  </Content>
                  <Content component="small">
                    {summary?.pqcAlgorithms ?? 0} of{" "}
                    {summary?.totalAlgorithms ?? 0} algorithms
                  </Content>
                  <Content component="p">Algorithms meeting PQC</Content>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4}>
              <Card data-testid="kpi-classical-algorithms">
                <CardBody>
                  <Content component="p">
                    <strong
                      style={{
                        fontSize: "var(--pf-t--global--font--size--2xl)",
                      }}
                    >
                      {classicalPercent}
                    </strong>
                  </Content>
                  <Content component="small">
                    {summary?.classicalAlgorithms ?? 0} of{" "}
                    {summary?.totalAlgorithms ?? 0} algorithms
                  </Content>
                  <Content component="p">Classical algorithm share</Content>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4}>
              <Card data-testid="kpi-pqc-sboms">
                <CardBody>
                  <Content component="p">
                    <strong
                      style={{
                        fontSize: "var(--pf-t--global--font--size--2xl)",
                      }}
                    >
                      {sbomPercent}
                    </strong>
                  </Content>
                  <Content component="small">
                    {summary?.pqcSboms ?? 0} of {summary?.totalSboms ?? 0} SBOMs
                  </Content>
                  <Content component="p">SBOMs meeting PQC</Content>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </LoadingWrapper>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <div>
          <CryptoSearchProvider>
            <></>
          </CryptoSearchProvider>
        </div>
      </PageSection>
    </>
  );
};
