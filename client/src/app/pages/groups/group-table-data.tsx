import { Stack, StackItem, Flex, FlexItem, Label, LabelGroup } from "@patternfly/react-core"
import { NavLink } from "react-router-dom"

export const GroupTableData = ({ item }: { item: any }) => {

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
            <LabelGroup>
              {/* TODO: Update this actual labels */}
              <Label color="purple">Product</Label>
              <Label color="blue">Label</Label>
              <Label color="teal">Another label</Label>
            </LabelGroup>
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
