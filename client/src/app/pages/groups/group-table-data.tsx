import { Stack, StackItem, Flex, FlexItem, LabelGroup } from "@patternfly/react-core"
import { NavLink } from "react-router-dom"
import type { TGroupTreeNode } from "@app/queries/groups";
import { GroupLabels } from './group-labels';
export const GroupTableData = ({ item }: { item: TGroupTreeNode }) => {

  return (
    <Stack hasGutter>
      <StackItem isFilled>
        <Flex
          alignItems={{ default: 'alignItemsCenter' }}
          gap={{ default: 'gapSm' }}
          flexWrap={{ default: "wrap" }}>
          <FlexItem>
            <NavLink
              className="pf-v6-c-button pf-m-link pf-m-inline"
              to={'https://example.com'}
            >
              {item.name}
            </NavLink>
          </FlexItem>
          <FlexItem>
            <GroupLabels labels={item.labels} />
          </FlexItem>
        </Flex>
      </StackItem>
      <StackItem>
        {/*TODO: Update this with an actual description */}
        Page description goes here
      </StackItem>
    </Stack>
  );
}
