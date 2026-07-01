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

import {
  csafBaseSeverityList,
  CsafBaseSeverityType,
  severityOrderOf,
} from "../../helpers/csaf-utils";

type SeverityMap = Record<string, { cves: number; products: Set<string> }>;
type ChartData = {
  baseSeverity: string;
  cveCount: number;
  productCount: number;
  baseColor: string;
};

interface IImpactSummaryChartProps {
  vulnerabilities: Vulnerability[];
}

export const ImpactSummaryChart: React.FC<IImpactSummaryChartProps> = ({
  vulnerabilities,
}) => {
  const severityMap = React.useMemo(() => {
    const result: SeverityMap = {};

    for (const vulnerability of vulnerabilities) {
      const baseSeverity = (
        vulnerability.scores?.[0]?.cvss_v3?.baseSeverity ?? "unknown"
      ).toLowerCase();

      if (!result[baseSeverity]) {
        result[baseSeverity] = {
          cves: 0,
          products: new Set(),
        };
      }
      result[baseSeverity].cves += 1;

      if (vulnerability.product_status?.known_affected) {
        for (const productId of vulnerability.product_status.known_affected) {
          result[baseSeverity].products.add(productId);
        }
      }
    }
    return result;
  }, [vulnerabilities]);

  const chartData = React.useMemo(() => {
    const rows: ChartData[] = [];

    for (const [baseSeverity, data] of Object.entries(severityMap)) {
      const baseColor = csafBaseSeverityList[
        baseSeverity as CsafBaseSeverityType
      ]
        ? csafBaseSeverityList[baseSeverity as CsafBaseSeverityType].color
        : csafBaseSeverityList.unknown.color;

      rows.push({
        baseSeverity,
        baseColor,
        cveCount: data.cves,
        productCount: data.products.size,
      });
    }

    return rows.sort((a, b) => {
      return severityOrderOf(a.baseSeverity) - severityOrderOf(b.baseSeverity);
    });
  }, [severityMap]);

  const chartHeight = React.useMemo(() => {
    return Math.max(120, chartData.length * 50 + 40);
  }, [chartData]);

  return (
    <Stack hasGutter>
      <StackItem>
        <div
          style={{
            height: chartHeight,
            width: "100%",
          }}
        >
          <Chart
            height={chartHeight}
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
                data={chartData.map(
                  ({ baseSeverity, cveCount, baseColor: color }) => {
                    return {
                      x: capitalize(baseSeverity),
                      y: cveCount,
                      label: pluralize(cveCount, "CVE"),
                      color: color,
                    };
                  },
                )}
                style={{
                  data: {
                    fill: ({ datum }) => datum.color,
                  },
                }}
                barWidth={20}
                labelComponent={<ChartTooltip constrainToVisibleArea />}
              />
              <ChartBar
                data={chartData.map(
                  ({ baseSeverity, productCount, baseColor: color }) => ({
                    x: capitalize(baseSeverity),
                    y: productCount,
                    label: `${pluralize(productCount, "Product")} affected`,
                    color: color,
                  }),
                )}
                style={{
                  data: {
                    fill: ({ datum }) => `${datum.color}80`,
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
