import React from "react";

import { AsyncMultiSelect } from "../AsyncMultiSelect/AsyncMultiSelect";
import type { AsyncMultiSelectOptionProps } from "../AsyncMultiSelect/type-utils";
import type {
  FilterSelectOptionProps,
  IAsyncMultiselectFilterCategory,
} from "../FilterToolbar";
import type { IFilterControlProps } from "./FilterControl";

export interface IAutocompleteLabelFilterControlProps<TItem>
  extends IFilterControlProps<TItem, string> {
  category: IAsyncMultiselectFilterCategory<TItem, string>;
}

export const AsyncMultiselectFilterControl = <TItem,>({
  category,
  filterValue,
  setFilterValue,
  isDisabled = false,
}: React.PropsWithChildren<
  IAutocompleteLabelFilterControlProps<TItem>
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

  return (
    <AsyncMultiSelect
      showChips
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
  );
};
