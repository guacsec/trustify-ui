import React from "react";

import ReactECharts from "echarts-for-react";

import type { EChartsTreeNode } from "../helpers/csaf-tree-helpers";
import { countTreeLeaves } from "../helpers/csaf-tree-helpers";

interface ICsafTreeChartProps {
  treeData: EChartsTreeNode;
  initialTreeDepth?: number;
  chartMinHeight?: number;
  leafMultiplier?: number;
  chartPadding?: { left: string; right: string };
  lineColor?: string;
  fontSize?: number;
}

export const CsafTreeChart: React.FC<ICsafTreeChartProps> = ({
  treeData,
  initialTreeDepth = 3,
  chartMinHeight = 500,
  leafMultiplier = 28,
  chartPadding = { left: "8%", right: "24%" },
  lineColor,
  fontSize = 12,
}) => {
  const leafCount = React.useMemo(() => countTreeLeaves(treeData), [treeData]);

  const chartHeight = Math.max(chartMinHeight, leafCount * leafMultiplier);

  const option = {
    tooltip: {
      trigger: "item" as const,
      triggerOn: "mousemove" as const,
      formatter: (params: { name: string; value?: string }) => {
        let html = `<strong>${params.name}</strong>`;
        if (params.value) {
          html += `<br/><span style="color:#999">ID:</span> ${params.value}`;
        }
        return html;
      },
    },
    series: [
      {
        type: "tree" as const,
        data: [treeData],
        left: chartPadding.left,
        right: chartPadding.right,
        top: "2%",
        bottom: "2%",
        orient: "LR" as const,
        roam: true,
        symbol: "circle" as const,
        symbolSize: 10,
        edgeShape: "curve" as const,
        lineStyle: {
          width: 1.5,
          curveness: 0.5,
          ...(lineColor ? { color: lineColor } : {}),
        },
        initialTreeDepth,
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        label: {
          position: "right" as const,
          verticalAlign: "middle" as const,
          align: "left" as const,
          fontSize,
          fontFamily:
            "RedHatText, Overpass, overpass, helvetica, arial, sans-serif",
          color: "#151515",
          distance: 8,
        },
        leaves: {
          label: {
            position: "right" as const,
            verticalAlign: "middle" as const,
            align: "left" as const,
          },
        },
        emphasis: {
          focus: "descendant" as const,
          lineStyle: { width: 3 },
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${chartHeight}px`, width: "100%" }}
      notMerge
      lazyUpdate
    />
  );
};
