import { MenuItem, MenuItemAction } from "@patternfly/react-core";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";

import type { DrilldownOption, SearchQuery } from "./DrilldownSelect";

export const DrilldownMenuItem = ({
  searchQuery,
  option,
  hasChildren,
  onDrillIn,
}: {
  searchQuery: SearchQuery;
  option: DrilldownOption;
  hasChildren: boolean;
  onDrillIn: (option: DrilldownOption) => void;
}) => {
  switch (searchQuery.type) {
    case "filterText":
      return (
        <MenuItem {...option.itemProps} itemId={option.id}>
          {option.name}
        </MenuItem>
      );
    case "drillIn":
      return (
        <MenuItem
          {...option.itemProps}
          itemId={option.id}
          actions={
            hasChildren && (
              <MenuItemAction
                icon={<AngleRightIcon />}
                actionId="drillIn"
                aria-label="Drill in"
                onClick={(e) => {
                  e.stopPropagation();
                  onDrillIn(option);
                }}
              />
            )
          }
        >
          {option.name}
        </MenuItem>
      );
  }
};
