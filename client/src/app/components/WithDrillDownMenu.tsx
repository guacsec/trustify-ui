import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  MenuContent,
  MenuList,
  MenuItem,
  Divider,
  DrilldownMenu,
  MenuSearchInput,
  SearchInput,
  MenuSearch,
  debounce,
} from "@patternfly/react-core";

type SelectOption = {
  id: string;
  name: string;
  description?: string | null;
  children?: SelectOption[];
};

interface MenuWithDrilldownProps {
  options: SelectOption[];
  onSelect?: (option: SelectOption) => void;
  onInputChange?: (value: string) => void;
  inputValue?: string;
}

const TOGGLE_ICON_CLASS = "pf-v6-c-menu__item-toggle-icon";

/** Build a flat map of itemId → option for quick lookup */
function buildOptionMap(
  options: SelectOption[],
  map = new Map<string, SelectOption>(),
): Map<string, SelectOption> {
  for (const opt of options) {
    map.set(`group:${opt.id}`, opt);
    map.set(opt.id, opt);
    if (opt.children?.length) {
      buildOptionMap(opt.children, map);
    }
  }
  return map;
}

export const MenuWithDrilldown: React.FunctionComponent<
  MenuWithDrilldownProps
> = ({ options, onSelect, onInputChange, inputValue }) => {
  const [menuDrilledIn, setMenuDrilledIn] = useState<string[]>([]);
  const [drilldownPath, setDrilldownPath] = useState<string[]>([]);
  const [menuHeights, setMenuHeights] = useState<Record<string, number>>({});
  const [activeMenu, setActiveMenu] = useState<string>("drilldown-rootMenu");

  const optionMap = useMemo(() => buildOptionMap(options), [options]);

  const drillIn = (
    event: React.KeyboardEvent | React.MouseEvent,
    fromMenuId: string,
    toMenuId: string,
    pathId: string,
  ) => {
    const target = event.target as HTMLElement;
    const clickedOnArrow = target.closest(`.${TOGGLE_ICON_CLASS}`);

    if (clickedOnArrow) {
      // Arrow clicked → drill into children
      setMenuDrilledIn((prev) => [...prev, fromMenuId]);
      setDrilldownPath((prev) => [...prev, pathId]);
      setActiveMenu(toMenuId);
    } else {
      // Text clicked → select the item
      const option = optionMap.get(pathId);
      if (option) {
        onSelect?.(option);
      }
    }
  };

  const handleInputChange = debounce((value: string) => {
    setMenuDrilledIn([]);
    setDrilldownPath([]);
    setActiveMenu("drilldown-rootMenu");
    onInputChange?.(value);
  }, 300);

  const drillOut = (
    _event: React.KeyboardEvent | React.MouseEvent,
    toMenuId: string,
  ) => {
    setMenuDrilledIn((prev) => prev.slice(0, -1));
    setDrilldownPath((prev) => prev.slice(0, -1));
    setActiveMenu(toMenuId);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: options is intentionally a dependency to re-trigger menu height
  useEffect(() => {
    setMenuHeights({});
  }, [options]);

  const setHeight = (menuId: string, height: number) => {
    if (
      menuHeights[menuId] === undefined ||
      (menuId !== "drilldown-rootMenu" && menuHeights[menuId] !== height)
    ) {
      setMenuHeights((prev) => ({ ...prev, [menuId]: height }));
    }
  };

  return (
    <Menu
      id="drilldown-rootMenu"
      containsDrilldown
      drilldownItemPath={drilldownPath}
      drilledInMenus={menuDrilledIn}
      activeMenu={activeMenu}
      onDrillIn={drillIn}
      onDrillOut={drillOut}
      onGetMenuHeight={setHeight}
    >
      <MenuSearch>
        <MenuSearchInput>
          <SearchInput
            value={inputValue}
            aria-label="Filter menu items"
            onChange={(_event, value) => handleInputChange(value)}
            onClear={() => handleInputChange("")}
          />
        </MenuSearchInput>
      </MenuSearch>
      <Divider />
      <MenuContent menuHeight={`${menuHeights[activeMenu]}px`}>
        <MenuList>
          {options.length ? (
            options.map((option) => (
              <DrilldownMenuItem
                key={option.id}
                option={option}
                onSelect={onSelect}
              />
            ))
          ) : (
            <MenuItem isDisabled>No results</MenuItem>
          )}
        </MenuList>
      </MenuContent>
    </Menu>
  );
};

function DrilldownMenuItem({
  option,
  onSelect,
}: {
  option: SelectOption;
  onSelect?: (option: SelectOption) => void;
}) {
  const hasChildren = !!option.children?.length;

  if (!hasChildren) {
    return (
      <MenuItem
        itemId={option.id}
        description={option.description}
        onClick={() => onSelect?.(option)}
      >
        {option.name}
      </MenuItem>
    );
  }

  return (
    <MenuItem
      itemId={`group:${option.id}`}
      description={option.description}
      direction="down"
      drilldownMenu={
        <DrilldownMenu id={`drilldown-menu-${option.id}`}>
          <MenuItem itemId={`group:${option.id}_breadcrumb`} direction="up">
            {option.name}
          </MenuItem>
          <Divider component="li" />
          {option.children?.map((child) => (
            <DrilldownMenuItem
              key={child.id}
              option={child}
              onSelect={onSelect}
            />
          ))}
        </DrilldownMenu>
      }
    >
      {option.name}
    </MenuItem>
  );
}
