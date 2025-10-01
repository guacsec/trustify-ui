import type React from "react";
import { useRef } from "react";

import {
  Flex,
  FlexItem,
  Label,
  type LabelProps,
  MenuToggle,
  type MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  Truncate,
} from "@patternfly/react-core";

import { getString } from "@app/utils/utils";

import { LabelToolip } from "../LabelTooltip";
import { SearchInputComponent } from "./SearchInput";
import type { AsyncMultiSelectOptionProps } from "./type-utils";
import { useAutocompleteHandlers } from "./useMultiSelectHandlers";

export interface IAsyncMultiSelectProps {
  id?: string;
  onChange: (selections: AsyncMultiSelectOptionProps[]) => void;
  options?: AsyncMultiSelectOptionProps[];
  selections?: AsyncMultiSelectOptionProps[];
  placeholderText?: string;
  searchString?: string;
  searchInputAriaLabel?: string;
  labelColor?: LabelProps["color"];
  noResultsMessage?: string;
  showChips?: boolean;
  onSearchChange?: (value: string) => void;
  showBadgeCount?: boolean;
  isDisabled?: boolean;
}

/**
 * Multiple type-ahead with table complete and selection labels
 */
export const AsyncMultiSelect: React.FC<IAsyncMultiSelectProps> = ({
  id = "",
  onChange,
  options = [],
  placeholderText = "Search",
  searchString = "",
  searchInputAriaLabel = "Search input",
  labelColor,
  selections = [],
  noResultsMessage,
  showChips,
  onSearchChange,
  showBadgeCount,
  isDisabled,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    inputValue,
    isDropdownOpen,
    setIsDropdownOpen,
    removeSelectionById,
    handleOnSelect,
    handleInputChange,
    handleKeyDown,
    handleClearSearchInput,
    handleClickSearchInput,
    handleClickToggle,
    activeItem,
    focusedItemIndex,
  } = useAutocompleteHandlers({
    options,
    searchString,
    selections,
    onChange,
    menuRef,
    searchInputRef,
    onSearchChange,
  });

  const createItemId = (value: string) =>
    `select-typeahead-${value.replace(" ", "-")}`;

  const inputGroup = (
    <SearchInputComponent
      id={id}
      placeholder={placeholderText}
      ariaLabel={searchInputAriaLabel}
      onSearchChange={handleInputChange}
      onClear={handleClearSearchInput}
      onKeyHandling={handleKeyDown}
      onClick={handleClickSearchInput}
      inputValue={inputValue}
      inputRef={searchInputRef}
      selections={selections}
      isDropdownOpen={isDropdownOpen}
      activeItem={activeItem}
      showBadgeCount={showBadgeCount}
    />
  );

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      variant="typeahead"
      onClick={handleClickToggle}
      isExpanded={isDropdownOpen}
      isDisabled={isDisabled}
      isFullWidth
    >
      {inputGroup}
    </MenuToggle>
  );

  return (
    <Flex direction={{ default: "column" }}>
      <FlexItem key="input">
        <Select
          role="menu"
          isOpen={
            isDropdownOpen &&
            (options.length > 0 || !!noResultsMessage || inputValue.length > 0)
          }
          selected={selections}
          onOpenChange={setIsDropdownOpen}
          toggle={toggle}
          variant="typeahead"
        >
          <SelectList aria-label="select-create-typeahead-listbox">
            {noResultsMessage && options.length === 0 ? (
              <SelectOption isAriaDisabled>{noResultsMessage}</SelectOption>
            ) : (
              options.map((option, index) => (
                <SelectOption
                  key={option.id}
                  id={createItemId(option.id)}
                  isFocused={focusedItemIndex === index}
                  ref={null}
                  onClick={() => handleOnSelect(option)}
                  hasCheckbox
                  isSelected={selections.some(
                    (selection) => selection.id === option.id,
                  )}
                  style={{
                    maxWidth: 500,
                  }}
                  {...option.optionProps}
                >
                  <Truncate content={getString(option.name)} />
                </SelectOption>
              ))
            )}
          </SelectList>
        </Select>
      </FlexItem>
      {showChips && (
        <FlexItem key="chips">
          <Flex spaceItems={{ default: "spaceItemsXs" }}>
            {selections.map((option) => (
              <FlexItem key={option.id}>
                <LabelToolip content={option.tooltip}>
                  <Label
                    color={labelColor}
                    onClose={() => removeSelectionById(option.id)}
                  >
                    {getString(option.labelName || option.name)}
                  </Label>
                </LabelToolip>
              </FlexItem>
            ))}
          </Flex>
        </FlexItem>
      )}
    </Flex>
  );
};
