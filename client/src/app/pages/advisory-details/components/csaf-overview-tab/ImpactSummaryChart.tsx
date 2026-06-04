import React from "react";

import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartStack,
  ChartTooltip,
} from "@patternfly/react-charts/victory";
import {
  capitalize,
  Content,
  Flex,
  FlexItem,
  pluralize,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { Vulnerability } from "@app/specs/csaf/csaf-v2.0-schema";

import { getSeverityPriority, severityList } from "@app/api/model-utils";
import type { ExtendedSeverity } from "@app/api/models";

import { normalizeCsafSeverityText } from "../../helpers/csaf-utils";

interface IImpactSummaryChartProps {
  vulnerabilities: Vulnerability[];
}

export const ImpactSummaryChart: React.FC<IImpactSummaryChartProps> = ({
  vulnerabilities,
}) => {
  const chartData = React.useMemo(() => {
    const rows: {
      severity: ExtendedSeverity;
      cveCount: number;
      productCount: number;
    }[] = [];

    const severityMap: Record<string, { cves: number; products: Set<string> }> =
      {};

    for (const vulnerability of vulnerabilities) {
      const severity: ExtendedSeverity = normalizeCsafSeverityText(
        vulnerability.scores?.[0]?.cvss_v3?.baseSeverity,
      );

      if (!severityMap[severity]) {
        severityMap[severity] = { cves: 0, products: new Set() };
      }
      severityMap[severity].cves += 1;

      const products = vulnerability.product_status?.known_affected ?? [];
      for (const productId of products) {
        severityMap[severity].products.add(productId);
      }
    }

    for (const [severity, data] of Object.entries(severityMap)) {
      rows.push({
        severity,
        cveCount: data.cves,
        productCount: data.products.size,
      });
    }

    return rows.sort(
      (a, b) =>
        getSeverityPriority(a.severity) - getSeverityPriority(b.severity),
    );
  }, [vulnerabilities]);

  return (
    <Stack hasGutter>
      <StackItem>
        <div
          style={{
            height: Math.max(120, chartData.length * 50 + 40),
            width: "100%",
          }}
        >
          <Chart
            height={Math.max(120, chartData.length * 50 + 40)}
            padding={{
              top: 10,
              bottom: 35,
              left: 90,
              right: 30,
            }}
            domainPadding={{ x: 15 }}
          >
            <ChartAxis
              style={{
                tickLabels: { fontSize: 12 },
                axis: { stroke: "transparent" },
              }}
            />
            <ChartAxis
              dependentAxis
              style={{
                tickLabels: { fontSize: 10 },
                axis: { stroke: "transparent" },
                grid: {
                  stroke: "#D2D2D2",
                  strokeDasharray: "3,3",
                },
              }}
            />
            <ChartStack horizontal>
              <ChartBar
                data={chartData.map(({ severity, cveCount }) => ({
                  x: capitalize(severity),
                  y: cveCount,
                  label: pluralize(cveCount, "CVE"),
                  _severity: severity,
                }))}
                style={{
                  data: {
                    fill: ({ datum }) =>
                      severityList[datum._severity as ExtendedSeverity].color
                        .value,
                  },
                }}
                barWidth={20}
                labelComponent={<ChartTooltip constrainToVisibleArea />}
              />
              <ChartBar
                data={chartData.map(({ severity, productCount }) => ({
                  x: capitalize(severity),
                  y: productCount,
                  label: `${pluralize(productCount, "Product")} affected`,
                  _severity: severity,
                }))}
                style={{
                  data: {
                    fill: ({ datum }) =>
                      `${severityList[datum._severity as ExtendedSeverity].color.value}80`,
                  },
                }}
                barWidth={20}
                labelComponent={<ChartTooltip constrainToVisibleArea />}
              />
            </ChartStack>
          </Chart>
        </div>
      </StackItem>
      <StackItem>
        <Flex gap={{ default: "gapMd" }}>
          <FlexItem>
            <Flex
              gap={{ default: "gapXs" }}
              alignItems={{ default: "alignItemsCenter" }}
            >
              <FlexItem>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    backgroundColor: "#8A8D90",
                    borderRadius: 2,
                  }}
                />
              </FlexItem>
              <FlexItem>
                <Content
                  component="small"
                  style={{
                    color: "var(--pf-v6-global--Color--200)",
                  }}
                >
                  CVEs
                </Content>
              </FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem>
            <Flex
              gap={{ default: "gapXs" }}
              alignItems={{ default: "alignItemsCenter" }}
            >
              <FlexItem>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    backgroundColor: "#8A8D9080",
                    borderRadius: 2,
                  }}
                />
              </FlexItem>
              <FlexItem>
                <Content
                  component="small"
                  style={{
                    color: "var(--pf-v6-global--Color--200)",
                  }}
                >
                  Products affected
                </Content>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </StackItem>
    </Stack>
  );
};
