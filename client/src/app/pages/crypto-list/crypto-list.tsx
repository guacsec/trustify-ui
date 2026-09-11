import React, { useState } from "react";

import {
  Card,
  CardBody,
  Content,
  Grid,
  GridItem,
  PageSection,
  Tab,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";

import { DocumentMetadata } from "@app/components/DocumentMetadata";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import {
  useFetchCryptoAlgorithms,
  useFetchCryptoPolicySummary,
} from "@app/queries/crypto";

import { CryptoSearchProvider } from "./crypto-provider";
import { CryptoTable } from "./crypto-table";
import { CryptoToolbar } from "./crypto-toolbar";

/** Formats a ratio as a percentage string. Returns "0%" when the total is zero. */
const formatPercent = (count: number, total: number): string => {
  if (total === 0) return "0%";
  return `${Math.round((count / total) * 100)}%`;
};

/** Cryptography page showing policy evaluation KPI cards and the algorithm list. */
export const CryptoList: React.FC = () => {
  const {
    result: summary,
    isFetching,
    fetchError,
  } = useFetchCryptoPolicySummary();
  const [activeTabKey, setActiveTabKey] = useState<string>("algorithms");

  const {
    result: { total: algorithmsTotal },
  } = useFetchCryptoAlgorithms({ total: true }, false, "algorithm");
  const {
    result: { total: keysTotal },
  } = useFetchCryptoAlgorithms(
    { total: true },
    false,
    "related-crypto-material",
  );

  const compliant = summary?.compliant ?? 0;
  const warning = summary?.warning ?? 0;
  const nonCompliant = summary?.non_compliant ?? 0;
  const total = summary?.total ?? 0;

  const compliantPercent = formatPercent(compliant, total);
  const nonCompliantPercent = formatPercent(nonCompliant, total);
  const warningPercent = formatPercent(warning, total);

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
              <Card data-testid="kpi-compliant">
                <CardBody>
                  <Content component="p">
                    <strong
                      style={{
                        fontSize: "var(--pf-t--global--font--size--2xl)",
                      }}
                    >
                      {compliantPercent}
                    </strong>
                  </Content>
                  <Content component="small">
                    {compliant} of {total} algorithms
                  </Content>
                  <Content component="p">Compliant algorithms</Content>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4}>
              <Card data-testid="kpi-warning">
                <CardBody>
                  <Content component="p">
                    <strong
                      style={{
                        fontSize: "var(--pf-t--global--font--size--2xl)",
                      }}
                    >
                      {warningPercent}
                    </strong>
                  </Content>
                  <Content component="small">
                    {warning} of {total} algorithms
                  </Content>
                  <Content component="p">Algorithms with warnings</Content>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4}>
              <Card data-testid="kpi-non-compliant">
                <CardBody>
                  <Content component="p">
                    <strong
                      style={{
                        fontSize: "var(--pf-t--global--font--size--2xl)",
                      }}
                    >
                      {nonCompliantPercent}
                    </strong>
                  </Content>
                  <Content component="small">
                    {nonCompliant} of {total} algorithms
                  </Content>
                  <Content component="p">Non-compliant algorithms</Content>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </LoadingWrapper>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <Tabs
          activeKey={activeTabKey}
          onSelect={(_event, tabKey) => setActiveTabKey(String(tabKey))}
        >
          <Tab
            eventKey="algorithms"
            title={<TabTitleText>Algorithms ({algorithmsTotal})</TabTitleText>}
          >
            <CryptoSearchProvider assetType="algorithm">
              <CryptoToolbar showFilters />
              <CryptoTable assetType="algorithm" />
            </CryptoSearchProvider>
          </Tab>
          <Tab
            eventKey="keys"
            title={<TabTitleText>Keys ({keysTotal})</TabTitleText>}
          >
            <CryptoSearchProvider assetType="related-crypto-material">
              <CryptoToolbar />
              <CryptoTable assetType="related-crypto-material" />
            </CryptoSearchProvider>
          </Tab>
        </Tabs>
      </PageSection>
    </>
  );
};
