import { type SyntheticEvent, useMemo, useRef, useState } from "react";

import {
  Divider,
  DrilldownMenu,
  Menu,
  MenuContainer,
  MenuContent,
  MenuItem,
  MenuList,
  MenuSearch,
  MenuSearchInput,
  MenuToggle,
  SearchInput,
  debounce,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

/**
 * Option type for DrilldownSelect component
 * @template TData - Optional data type to attach to each option
 */
export type DrilldownOption<TData = unknown> = {
  /** Unique identifier for the option */
  id: string;
  /** Display name for the option */
  name: string;
  /** Optional description shown below the name */
  description?: string | null;
  /** Child options for hierarchical menus */
  children?: DrilldownOption<TData>[];
  /** Arbitrary data attached to this option */
  data?: TData;
};

/**
 * Props for DrilldownSelect component
 */
export interface DrilldownSelectProps<TData = unknown> {
  /** Available options to select from */
  options: DrilldownOption<TData>[];
  /** Currently selected option */
  value?: DrilldownOption<TData> | null;
  /** Callback when selection changes */
  onChange: (option: DrilldownOption<TData>) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Callback when search input changes */
  onInputChange?: (value: string) => void;
  /** Current search input value */
  inputValue?: string;
  /** Callback when clear button is clicked */
  onClear?: (event: SyntheticEvent) => void;
  /** Whether the menu is open (controlled mode) */
  isOpen?: boolean;
  /** Set menu open state (controlled mode) */
  setIsOpen?: (value: boolean) => void;
  /** Default open state (uncontrolled mode) */
  defaultIsOpen?: boolean;
  /** Whether the select is disabled */
  isDisabled?: boolean;
  /** Whether the select is in loading state */
  isLoading?: boolean;
  /** Text to show when loading */
  loadingText?: string;
  /** Text to show when no results found */
  emptyStateText?: string;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** ARIA label for clear button */
  clearButtonAriaLabel?: string;
  /** Debounce delay for search input in milliseconds */
  searchDebounceMs?: number;
  /** Custom function to generate itemId for menu items */
  getItemId?: (option: DrilldownOption<TData>, hasChildren: boolean) => string;
}

const TOGGLE_ICON_CLASS = "pf-v6-c-menu__item-toggle-icon";

/**
 * Build a flat map of itemId → option for quick lookup
 */
function buildOptionMap<TData>(
  options: DrilldownOption<TData>[],
  getItemId: (option: DrilldownOption<TData>, hasChildren: boolean) => string,
  map = new Map<string, DrilldownOption<TData>>(),
): Map<string, DrilldownOption<TData>> {
  for (const opt of options) {
    const hasChildren = !!opt.children?.length;
    const itemId = getItemId(opt, hasChildren);
    map.set(itemId, opt);
    // Also set the base ID for backwards compatibility
    map.set(opt.id, opt);
    if (opt.children?.length) {
      buildOptionMap(opt.children, getItemId, map);
    }
  }
  return map;
}

/**
 * DrilldownSelect - A hierarchical menu select component with search and keyboard navigation
 *
 * @example
 * ```tsx
 * <DrilldownSelect
 *   options={[
 *     { id: '1', name: 'Parent', children: [
 *       { id: '1-1', name: 'Child', description: 'Optional description' }
 *     ]}
 *   ]}
 *   value={selectedGroup}
 *   onChange={(option) => setSelectedGroup(option)}
 *   placeholder="Select a group"
 *   onClear={() => setSelectedGroup(undefined)}
 * />
 * ```
 */
export const DrilldownSelect = <TData = unknown>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  onInputChange,
  inputValue,
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  defaultIsOpen = false,
  onClear,
  isDisabled = false,
  isLoading = false,
  loadingText = "Loading...",
  emptyStateText = "No results",
  searchPlaceholder = "Filter menu items",
  clearButtonAriaLabel = "Clear selection",
  searchDebounceMs = 300,
  getItemId = (opt, hasChildren) =>
    hasChildren ? `drilldown:${opt.id}` : opt.id,
}: DrilldownSelectProps<TData>) => {
  // Support both controlled and uncontrolled modes
  const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = controlledSetIsOpen ?? setInternalIsOpen;

  const [menuDrilledIn, setMenuDrilledIn] = useState<string[]>([]);
  const [drilldownPath, setDrilldownPath] = useState<string[]>([]);
  const [menuHeights, setMenuHeights] = useState<Record<string, number>>({});
  const [activeMenu, setActiveMenu] = useState<string>("drilldown-rootMenu");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionMap = useMemo(
    () => buildOptionMap(options, getItemId),
    [options, getItemId],
  );

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
        onChange(option);
      }
    }
  };

  const handleInputChange = useMemo(
    () =>
      debounce((value: string) => {
        setMenuDrilledIn([]);
        setDrilldownPath([]);
        setActiveMenu("drilldown-rootMenu");
        onInputChange?.(value);
      }, searchDebounceMs),
    [onInputChange, searchDebounceMs],
  );

  const drillOut = (
    _event: React.KeyboardEvent | React.MouseEvent,
    toMenuId: string,
  ) => {
    setMenuDrilledIn((prev) => prev.slice(0, -1));
    setDrilldownPath((prev) => prev.slice(0, -1));
    setActiveMenu(toMenuId);
  };

  const setHeight = (menuId: string, height: number) => {
    if (
      menuHeights[menuId] === undefined ||
      (menuId !== "drilldown-rootMenu" && menuHeights[menuId] !== height)
    ) {
      setMenuHeights((prev) => ({ ...prev, [menuId]: height }));
    }
  };

  const onToggle = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const onToggleArrowKeydown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();

    const listItems = Array.from(menuRef.current?.querySelectorAll("li") ?? []);
    const searchInput = menuRef.current?.querySelector("input");
    const focusableElements = [
      searchInput,
      ...listItems.map((li) =>
        li.querySelector(
          'button:not(:disabled),input:not(:disabled),a:not([aria-disabled="true"])',
        ),
      ),
    ].filter((el) => el !== null && el !== undefined);

    let focusableElement: Element;
    if (event.key === "ArrowDown") {
      focusableElement = focusableElements[0];
    } else {
      focusableElement = focusableElements[focusableElements.length - 1];
    }

    if (focusableElement && focusableElement instanceof HTMLElement)
      focusableElement.focus();
  };

  const handleClear = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClear?.(event);
  };

  // Auto-show clear button when value exists and onClear is provided
  const showClearButton = !!value && !!onClear;

  const toggle = () => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggle}
      isExpanded={isOpen}
      isFullWidth
      isDisabled={isDisabled}
      icon={
        showClearButton ? (
          <span
            onClick={handleClear}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClear(e as unknown as React.SyntheticEvent);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={clearButtonAriaLabel}
          >
            <TimesIcon />
          </span>
        ) : null
      }
    >
      {isLoading ? loadingText : value?.name || placeholder}
    </MenuToggle>
  );

  const menu = (
    <Menu
      id="drilldown-rootMenu"
      containsDrilldown
      isScrollable
      drilldownItemPath={drilldownPath}
      drilledInMenus={menuDrilledIn}
      activeMenu={activeMenu}
      onDrillIn={drillIn}
      onDrillOut={drillOut}
      onGetMenuHeight={setHeight}
      ref={menuRef}
    >
      <MenuContent menuHeight={`${menuHeights[activeMenu]}px`}>
        <MenuList>
          {onInputChange && activeMenu === "drilldown-rootMenu" ? (
            <MenuSearch>
              <MenuSearchInput>
                <SearchInput
                  value={inputValue}
                  aria-label={searchPlaceholder}
                  onChange={(_event, value) => handleInputChange(value)}
                  onClear={() => handleInputChange("")}
                />
              </MenuSearchInput>
            </MenuSearch>
          ) : null}
          <Divider />
          {isLoading ? (
            <MenuItem isDisabled>{loadingText}</MenuItem>
          ) : options.length ? (
            options.map((option) => (
              <DrilldownMenuItem
                key={option.id}
                option={option}
                onChange={onChange}
                getItemId={getItemId}
              />
            ))
          ) : (
            <MenuItem isDisabled>{emptyStateText}</MenuItem>
          )}
        </MenuList>
      </MenuContent>
    </Menu>
  );

  return (
    <MenuContainer
      toggle={toggle()}
      toggleRef={toggleRef}
      menu={menu}
      menuRef={menuRef}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onToggleKeydown={onToggleArrowKeydown}
      popperProps={{ appendTo: "inline" }}
    />
  );
};

function DrilldownMenuItem<TData>({
  option,
  onChange,
  getItemId,
}: {
  option: DrilldownOption<TData>;
  onChange?: (option: DrilldownOption<TData>) => void;
  getItemId: (option: DrilldownOption<TData>, hasChildren: boolean) => string;
}) {
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
}
