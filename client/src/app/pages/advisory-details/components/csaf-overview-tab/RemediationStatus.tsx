import React from "react";

import { Stack } from "@patternfly/react-core";
import { ChartDonut } from "@patternfly/react-charts/victory";

import { Vulnerability } from "@app/specs/csaf/csaf-v2.0-schema";

interface IRemediationStatusProps {
  totalProducts: number;
  vulnerabilities: Vulnerability[];
}

export const RemediationStatus: React.FC<IRemediationStatusProps> = ({
  totalProducts,
  vulnerabilities,
}) => {
  const remediationCounts = React.useMemo(() => {
    const counts: Record<string, Set<string>> = {};
    for (const vulnerability of vulnerabilities) {
      if (vulnerability.remediations) {
        for (const remediation of vulnerability.remediations) {
          if (!counts[remediation.category]) {
            counts[remediation.category] = new Set();
          }
          if (remediation.product_ids) {
            for (const productId of remediation.product_ids) {
              counts[remediation.category].add(productId);
            }
          }
        }
      }
    }
    return Object.entries(counts).map(([category, productSet]) => ({
      category: category.replace(/_/g, " "),
      count: productSet.size,
    }));
  }, [vulnerabilities]);

  const donutData = React.useMemo(() => {
    if (remediationCounts.length === 0) {
      return {
        data: [{ x: "Known affected", y: totalProducts }],
        legendData: [{ name: `Known affected: ${totalProducts}` }],
        colorScale: ["#C9190B"],
        total: totalProducts,
      };
    }

    const colors = ["#C9190B", "#EC7A08", "#F0AB00", "#0066CC", "#8A8D90"];
    return {
      data: remediationCounts.map((r) => ({ x: r.category, y: r.count })),
      legendData: remediationCounts.map((r) => ({
        name: `${r.category}: ${r.count}`,
      })),
      colorScale: remediationCounts.map((_, i) => colors[i % colors.length]),
      total: remediationCounts.reduce((sum, r) => sum + r.count, 0),
    };
  }, [remediationCounts, totalProducts]);

  return (
    <Stack hasGutter>
      <div
        style={{
          height: "230px",
          width: "100%",
          maxWidth: "350px",
          margin: "0 auto",
        }}
      >
        <ChartDonut
          constrainToVisibleArea
          legendOrientation="vertical"
          legendPosition="right"
          padding={{
            bottom: 20,
            left: 20,
            right: 160,
            top: 20,
          }}
          title={`${donutData.total}`}
          subTitle="entries"
          width={350}
          height={230}
          legendData={donutData.legendData}
          data={donutData.data}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          colorScale={donutData.colorScale}
        />
      </div>
    </Stack>
  );
};
