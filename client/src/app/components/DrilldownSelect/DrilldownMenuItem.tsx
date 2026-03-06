import { Divider, DrilldownMenu, MenuItem } from "@patternfly/react-core";

import type { DrilldownOption } from "./DrilldownSelect";

export const DrilldownMenuItem = <TData = unknown>({
  option,
  onChange,
  getItemId,
}: {
  option: DrilldownOption<TData>;
  onChange?: (option: DrilldownOption<TData>) => void;
  getItemId: (option: DrilldownOption<TData>, hasChildren: boolean) => string;
}) => {
  const hasChildren = !!option.children?.length;
  const itemId = getItemId(option, hasChildren);

  if (!hasChildren) {
    return (
      <MenuItem
        itemId={itemId}
        description={option.description}
        onClick={() => onChange?.(option)}
      >
        {option.name}
      </MenuItem>
    );
  }

  return (
    <MenuItem
      itemId={itemId}
      description={option.description}
      direction="down"
      drilldownMenu={
        <DrilldownMenu id={`drilldown-menu-${option.id}`}>
          <MenuItem itemId={`${itemId}_breadcrumb`} direction="up">
            {option.name}
          </MenuItem>
          <Divider component="li" />
          {option.children?.map((child) => (
            <DrilldownMenuItem
              key={child.id}
              option={child}
              onChange={onChange}
              getItemId={getItemId}
            />
          ))}
        </DrilldownMenu>
      }
    >
      {option.name}
    </MenuItem>
  );
};
