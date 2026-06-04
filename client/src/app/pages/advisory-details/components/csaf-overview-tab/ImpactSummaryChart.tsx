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

import { severityOrderOf } from "../../helpers/csaf-utils";

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#C9190B",
  important: "#EC7A08",
  high: "#EC7A08",
  moderate: "#F0AB00",
  medium: "#F0AB00",
  low: "#0066CC",
  unknown: "#8A8D90",
};

interface IImpactSummaryChartProps {
  vulnerabilities: Vulnerability[];
}

export const ImpactSummaryChart: React.FC<IImpactSummaryChartProps> = ({
  vulnerabilities,
}) => {
  const chartData = React.useMemo(() => {
    const rows: {
      severity: string;
      cveCount: number;
      productCount: number;
    }[] = [];

    const seen: Record<string, { cves: number; products: Set<string> }> = {};

    for (const vuln of vulnerabilities) {
      const sev = (
        vuln.scores?.[0]?.cvss_v3?.baseSeverity ?? "unknown"
      ).toLowerCase();
      if (!seen[sev]) seen[sev] = { cves: 0, products: new Set() };
      seen[sev].cves += 1;
      for (const pid of vuln.scores?.[0]?.products ?? []) {
        seen[sev].products.add(pid);
      }
    }

    for (const [severity, data] of Object.entries(seen)) {
      rows.push({
        severity,
        cveCount: data.cves,
        productCount: data.products.size,
      });
    }

    return rows.sort(
      (a, b) => severityOrderOf(a.severity) - severityOrderOf(b.severity),
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
                data={chartData.map(({ severity, cveCount }) => {
                  return {
                    x: capitalize(severity),
                    y: cveCount,
                    label: pluralize(cveCount, "CVE"),
                  };
                })}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      const severity = String(datum.x).toLowerCase();
                      const color = SEVERITY_COLORS[severity]
                        ? SEVERITY_COLORS[severity]
                        : null;
                      return color ?? SEVERITY_COLORS.unknown;
                    },
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
                }))}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      const severity = String(datum.x).toLowerCase();
                      const color = SEVERITY_COLORS[severity]
                        ? SEVERITY_COLORS[severity]
                        : null;
                      return `${color}80`;
                    },
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
