import {
  Stack,
  StackItem,
  Flex,
  FlexItem,
  Content,
} from "@patternfly/react-core";
import { NavLink } from "react-router-dom";
import { SbomGroupLabels } from "./sbom-group-labels";
import type { SbomGroupTreeNode } from "./sbom-groups-context";
export const SbomGroupTableData = ({ item }: { item: SbomGroupTreeNode }) => {
  return (
    <Stack hasGutter>
      <StackItem isFilled>
        <Flex
          alignItems={{ default: "alignItemsCenter" }}
          gap={{ default: "gapSm" }}
          flexWrap={{ default: "wrap" }}
        >
          <FlexItem>
            <NavLink
              className="pf-v6-c-button pf-m-link pf-m-inline"
              to={"https://example.com"}
            >
              {item.name}
            </NavLink>
          </FlexItem>
          <FlexItem>
            <SbomGroupLabels labels={item.labels} />
          </FlexItem>
        </Flex>
      </StackItem>
      {item.description && (
        <StackItem>
          <Content component="p">{item.description}</Content>
        </StackItem>
      )}
      {item.number_of_sboms != null && item.number_of_sboms > 0 && (
        <StackItem>
          <Content component="small">{item.number_of_sboms} SBOMs</Content>
        </StackItem>
      )}
    </Stack>
  );
};
