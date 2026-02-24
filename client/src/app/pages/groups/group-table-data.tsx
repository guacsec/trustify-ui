import {
  Stack,
  StackItem,
  Flex,
  FlexItem,
  Content,
} from "@patternfly/react-core";
import { NavLink } from "react-router-dom";
import { GroupLabels } from "./group-labels";
import type { TGroupTreeNode } from "./groups-context";
export const GroupTableData = ({ item }: { item: TGroupTreeNode }) => {
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
            <GroupLabels labels={item.labels} />
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
