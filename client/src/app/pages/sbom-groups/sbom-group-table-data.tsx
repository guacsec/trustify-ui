import { generatePath, NavLink } from "react-router-dom";

import {
  Content,
  Flex,
  FlexItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { Paths } from "@app/Routes";

import { SbomGroupLabels } from "./sbom-group-labels";
import type { SbomGroupItem } from "./sbom-groups-context";

export const SbomGroupTableData = ({ item }: { item: SbomGroupItem }) => {
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
              to={generatePath(Paths.sbomGroupDetails, {
                sbomGroupId: item.id,
              })}
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
