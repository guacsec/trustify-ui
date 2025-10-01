import type React from "react";

import {
  Badge,
  Button,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";

import type { AsyncMultiSelectOptionProps } from "./type-utils";

export interface SearchInputProps {
  id: string;
  placeholder: string;
  ariaLabel: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onKeyHandling: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: () => void;
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement | null>;

  selections: AsyncMultiSelectOptionProps[];

  isDropdownOpen: boolean;
  activeItem: AsyncMultiSelectOptionProps | null;

  showBadgeCount?: boolean;
}

export const SearchInputComponent: React.FC<SearchInputProps> = ({
  id,
  placeholder,
  ariaLabel,
  onSearchChange,
  onClear,
  onKeyHandling,
  onClick,
  selections,
  inputValue,
  inputRef,
  isDropdownOpen,
  activeItem,
  showBadgeCount,
}) => {
  return (
    <TextInputGroup isPlain>
      <TextInputGroupMain
        id={id}
        value={inputValue}
        onClick={onClick}
        onChange={(_e, value) => onSearchChange(value)}
        onKeyDown={onKeyHandling}
        autoComplete="off"
        innerRef={inputRef}
        placeholder={placeholder}
        {...(activeItem && { "aria-activedescendant": activeItem.id })}
        role="combobox"
        isExpanded={isDropdownOpen}
        aria-label={ariaLabel}
        aria-controls="select-typeahead-listbox"
        icon={<SearchIcon />}
      />

      <TextInputGroupUtilities>
        {!!inputValue && (
          <Button
            icon={<TimesIcon aria-hidden />}
            variant="plain"
            onClick={onClear}
            aria-label="Clear input value"
          />
        )}
        {showBadgeCount && selections?.length ? (
          <Badge isRead>{selections.length}</Badge>
        ) : null}
      </TextInputGroupUtilities>
    </TextInputGroup>
  );
};
