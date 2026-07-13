import React from "react";

import ReactECharts from "echarts-for-react";
import { ThemeContext } from "@tsd-ui/core";

import type {
  EChartsInternalNode,
  EChartsTreeNode,
} from "../helpers/csaf-tree-helpers";
import {
  countExpandedNodes,
  countVisibleLeaves,
} from "../helpers/csaf-tree-helpers";

interface EChartsChartInstance {
  getModel(): {
    getSeriesByIndex(index: number): {
      getData(): { tree: { root: EChartsInternalNode } };
    };
  };
}

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
  const { isDark } = React.useContext(ThemeContext);

  const initialLeafCount = React.useMemo(
    () => countVisibleLeaves(treeData),
    [treeData],
  );

  const [dynamicLeafCount, setDynamicLeafCount] = React.useState<number | null>(
    null,
  );

  React.useEffect(() => {
    setDynamicLeafCount(null);
  }, [treeData]);

  const chartHeight = Math.max(
    chartMinHeight,
    (dynamicLeafCount ?? initialLeafCount) * leafMultiplier,
  );

  const onEvents = React.useMemo(
    () => ({
      treeExpandAndCollapse: (
        _params: unknown,
        chartInstance: EChartsChartInstance,
      ) => {
        try {
          const seriesModel = chartInstance.getModel().getSeriesByIndex(0);
          const root = seriesModel.getData().tree.root;
          if (root) {
            setDynamicLeafCount(countExpandedNodes(root));
          }
        } catch {
          // ECharts internal API; degrade gracefully
        }
      },
    }),
    [],
  );

  const option = React.useMemo(
    () => ({
      tooltip: {
        trigger: "item" as const,
        triggerOn: "mousemove" as const,
        formatter: (params: { name: string; value?: string }) => {
          const secondaryColor = isDark ? "#ccc" : "#999";
          let html = `<strong>${params.name}</strong>`;
          if (params.value) {
            html += `<br/><span style="color:${secondaryColor}">ID:</span> ${params.value}`;
          }
          return html;
        },
        backgroundColor: isDark ? "#1b1d21" : undefined,
        borderColor: isDark ? "#444" : undefined,
        textStyle: {
          color: isDark ? "#e0e0e0" : "#333",
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
            color: isDark ? "#e0e0e0" : "#151515",
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
    }),
    [
      isDark,
      treeData,
      chartPadding.left,
      chartPadding.right,
      lineColor,
      fontSize,
      initialTreeDepth,
    ],
  );

  return (
    <ReactECharts
      option={option}
      style={{ height: `${chartHeight}px`, width: "100%", overflow: "hidden" }}
      notMerge
      lazyUpdate
      onEvents={onEvents}
    />
  );
};
