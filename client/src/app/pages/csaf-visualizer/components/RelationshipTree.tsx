import React from "react";

import ReactECharts from "echarts-for-react";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Label,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import type { CsafDocument, Relationship } from "..";
import { collectProducts } from "..";

interface RelationshipTreeProps {
  csafDocument: CsafDocument;
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
  lineStyle?: {
    color: string;
    type: string;
    width: number;
  };
}

const RELATIONSHIP_STYLES: Record<
  string,
  { color: string; type: string; label: string }
> = {
  default_component_of: {
    color: "#C9190B",
    type: "solid",
    label: "Default Component Of",
  },
  external_component_of: {
    color: "#0066CC",
    type: "solid",
    label: "External Component Of",
  },
  installed_on: { color: "#3E8635", type: "dashed", label: "Installed On" },
  installed_with: { color: "#6753AC", type: "dotted", label: "Installed With" },
  optional_component_of: {
    color: "#EC7A08",
    type: "dashed",
    label: "Optional Component Of",
  },
};

const MIN_CHART_HEIGHT = 400;
const PX_PER_NODE = 25;

function buildRelationshipTree(
  relationships: Relationship[],
  productMap: Map<string, string>,
): TreeNode {
  const grouped = new Map<string, { rel: Relationship; childName: string }[]>();

  for (const rel of relationships) {
    const targetId = rel.relates_to_product_reference;
    if (!grouped.has(targetId)) {
      grouped.set(targetId, []);
    }
    grouped.get(targetId)!.push({
      rel,
      childName: productMap.get(rel.product_reference) ?? rel.product_reference,
    });
  }

  const rootChildren: TreeNode[] = [];

  for (const [targetId, items] of grouped) {
    const targetName = productMap.get(targetId) ?? targetId;
    const children: TreeNode[] = items.map((item) => {
      const style = RELATIONSHIP_STYLES[item.rel.category];
      return {
        name: item.childName,
        lineStyle: style
          ? { color: style.color, type: style.type, width: 2 }
          : undefined,
      };
    });

    rootChildren.push({ name: targetName, children });
  }

  return { name: "Relationships", children: rootChildren };
}

/** Renders CSAF product relationships as an interactive tree grouped by target product. */
export const RelationshipTree: React.FC<RelationshipTreeProps> = ({
  csafDocument,
}) => {
  const relationships = csafDocument.product_tree?.relationships;
  const hasRelationships =
    relationships !== undefined &&
    relationships !== null &&
    relationships.length > 0;

  const productMap = React.useMemo(
    () => collectProducts(csafDocument.product_tree?.branches ?? []),
    [csafDocument],
  );

  const rootNode = React.useMemo(() => {
    if (!hasRelationships) return null;
    return buildRelationshipTree(relationships, productMap);
  }, [hasRelationships, relationships, productMap]);

  const usedCategories = React.useMemo(() => {
    if (!hasRelationships) return [];
    const categories = new Set<string>();
    for (const rel of relationships) {
      categories.add(rel.category);
    }
    return Object.entries(RELATIONSHIP_STYLES).filter(([key]) =>
      categories.has(key),
    );
  }, [hasRelationships, relationships]);

  if (!hasRelationships || !rootNode) {
    return (
      <EmptyState
        headingLevel="h2"
        icon={CubesIcon}
        titleText="No relationships found"
        variant={EmptyStateVariant.sm}
      >
        <EmptyStateBody>
          This advisory does not contain product relationship information.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  const nodeCount =
    rootNode.children?.reduce(
      (sum, group) => sum + 1 + (group.children?.length ?? 0),
      0,
    ) ?? 0;
  const chartHeight = Math.max(MIN_CHART_HEIGHT, nodeCount * PX_PER_NODE);

  const option = {
    tooltip: { trigger: "item" as const },
    series: [
      {
        type: "tree" as const,
        data: [rootNode],
        orient: "LR" as const,
        initialTreeDepth: 3,
        roam: true,
        label: {
          position: "right" as const,
          verticalAlign: "middle" as const,
          align: "left" as const,
          fontSize: 12,
        },
        leaves: {
          label: {
            position: "left" as const,
            verticalAlign: "middle" as const,
            align: "right" as const,
          },
        },
        emphasis: { focus: "descendant" as const },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };

  return (
    <>
      <div style={{ height: chartHeight }}>
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          notMerge
        />
      </div>
      <Flex
        gap={{ default: "gapMd" }}
        style={{ paddingTop: "var(--pf-t--global--spacer--sm)" }}
      >
        {usedCategories.map(([key, style]) => (
          <FlexItem key={key}>
            <Label
              style={{
                backgroundColor: style.color,
                color: "#fff",
              }}
            >
              {style.label}
            </Label>
          </FlexItem>
        ))}
      </Flex>
    </>
  );
};
