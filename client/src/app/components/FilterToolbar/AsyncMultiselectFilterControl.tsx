import React from "react";

import {
  Label,
  ToolbarFilter,
  type ToolbarLabel,
} from "@patternfly/react-core";

import { AsyncMultiSelect } from "../AsyncMultiSelect/AsyncMultiSelect";
import type { AsyncMultiSelectOptionProps } from "../AsyncMultiSelect/type-utils";

import type { IFilterControlProps } from "./FilterControl";
import type {
  FilterSelectOptionProps,
  IAsyncMultiselectFilterCategory,
} from "./FilterToolbar";

export interface IMultiselectFilterControlProps<TItem>
  extends IFilterControlProps<TItem, string> {
  category: IAsyncMultiselectFilterCategory<TItem, string>;
}

export const AsyncMultiselectFilterControl = <TItem,>({
  category,
  filterValue,
  setFilterValue,
  showToolbarItem,
  isDisabled = false,
}: React.PropsWithChildren<
  IMultiselectFilterControlProps<TItem>
>): React.JSX.Element | null => {
  const optionMap = React.useRef(
    new Map<string, FilterSelectOptionProps | null>(),
  );

  React.useEffect(() => {
    for (const option of category.selectOptions) {
      optionMap.current.set(option.value, option);
    }
  }, [category.selectOptions]);

  const [selectOptions, setSelectOptions] = React.useState<
    FilterSelectOptionProps[]
  >(Array.isArray(category.selectOptions) ? category.selectOptions : []);

  React.useEffect(() => {
    setSelectOptions(
      Array.isArray(category.selectOptions) ? category.selectOptions : [],
    );
  }, [category.selectOptions]);

  const onFilterClearAll = () => setFilterValue([]);
  const onFilterClear = (chip: string | ToolbarLabel) => {
    const value = typeof chip === "string" ? chip : chip.key;

    if (value) {
      const newValue = filterValue?.filter((val) => val !== value) ?? [];
      setFilterValue(newValue.length > 0 ? newValue : null);
    }
  };

  const getOptionFromOptionValue = (optionValue: string) => {
    return optionMap.current.get(optionValue);
  };

  const filterSelectOptionToAsyncMultiSelectOption = (
    option: FilterSelectOptionProps,
  ): AsyncMultiSelectOptionProps => {
    return {
      id: option.value,
      name: option.label ?? option.value,
    };
  };

  const chips = filterValue?.map((value) => {
    const option = getOptionFromOptionValue(value);
    const { chipLabel, label } = option ?? {};
    return {
      key: value,
      node: (
        <Label isCompact textMaxWidth="200px">
          {chipLabel ?? label ?? value}
        </Label>
      ),
    };
  });

  return (
    <ToolbarFilter
      id={`async-filter-control-${category.categoryKey}`}
      labels={chips}
      deleteLabel={(_, chip) => onFilterClear(chip)}
      deleteLabelGroup={onFilterClearAll}
      categoryName={category.title}
      showToolbarItem={showToolbarItem}
    >
      <AsyncMultiSelect
        showBadgeCount
        isDisabled={isDisabled}
        options={selectOptions.map(filterSelectOptionToAsyncMultiSelectOption)}
        selections={filterValue?.map((value) => {
          const option = getOptionFromOptionValue(value);
          if (option) {
            return filterSelectOptionToAsyncMultiSelectOption(option);
          } else {
            return { id: value, name: value };
          }
        })}
        onChange={(selections) => {
          const newFilterValue = selections.map((option) => {
            return option.id;
          });
          setFilterValue(newFilterValue);
        }}
        noResultsMessage="No search results"
        placeholderText={category.placeholderText}
        searchInputAriaLabel="select-autocomplete-listbox"
        onSearchChange={category.onInputValueChange}
      />
    </ToolbarFilter>
  );
};
