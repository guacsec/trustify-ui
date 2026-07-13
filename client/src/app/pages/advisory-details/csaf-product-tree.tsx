import React from "react";

import {
  Card,
  CardBody,
  Content,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Label,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import {
  BRANCH_CATEGORY_COLORS,
  transformBranchesToTreeData,
} from "./helpers/csaf-tree-helpers";
import { CsafTreeChart } from "./components/CsafTreeChart";
import { CsafContext } from "./csaf-context";
import { ThemeContext } from "@tsd-ui/core";

const CATEGORY_LABELS = [
  "vendor",
  "product_name",
  "product_version",
  "product_version_range",
  "product_family",
  "architecture",
  "language",
  "patch_level",
  "service_pack",
  "host_name",
  "legacy",
  "specification",
];

const CategoryLegend: React.FC = () => {
  return (
    <Flex gap={{ default: "gapSm" }} flexWrap={{ default: "wrap" }}>
      {CATEGORY_LABELS.map((cat) => (
        <FlexItem key={cat}>
          <Label
            variant="outline"
            isCompact
            icon={
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: BRANCH_CATEGORY_COLORS[cat] ?? "#8A8D90",
                }}
              />
            }
          >
            {cat.replace(/_/g, " ")}
          </Label>
        </FlexItem>
      ))}
    </Flex>
  );
};

export const CsafProductTree: React.FC = () => {
  const { csaf } = React.useContext(CsafContext);
  const { isDark } = React.useContext(ThemeContext);
  const treeData = React.useMemo(() => {
    const branches = csaf?.product_tree?.branches;
    if (!branches || branches.length === 0) return null;
    return transformBranchesToTreeData(branches);
  }, [csaf?.product_tree?.branches]);

  if (!treeData) {
    return (
      <EmptyState
        titleText="No product tree available"
        headingLevel="h2"
        icon={CubesIcon}
        variant={EmptyStateVariant.sm}
      >
        <EmptyStateBody>
          This advisory does not contain product tree data.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <Card>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h3" size="md">
              Product tree
            </Title>
            <Content component="small">
              Click a node to expand or collapse. Scroll to zoom, drag to pan.
            </Content>
          </StackItem>
          <StackItem>
            <CategoryLegend />
          </StackItem>
          <StackItem>
            <CsafTreeChart
              treeData={treeData}
              initialTreeDepth={3}
              chartMinHeight={500}
              leafMultiplier={28}
              chartPadding={{ left: "8%", right: "24%" }}
              lineColor={isDark ? "#5c5c5c" : "#C9C9C9"}
            />
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};
