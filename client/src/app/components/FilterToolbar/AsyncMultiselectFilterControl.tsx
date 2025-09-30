import React from "react";

import { Label, ToolbarFilter, type ToolbarLabel } from "@patternfly/react-core";

import { getString } from "@app/utils/utils";

import { MultiSelect } from "../MultiSelect/MultiSelect";
import type { MultiSelectOptionProps } from "../MultiSelect/type-utils";

import type { IFilterControlProps } from "./FilterControl";
import type {
  FilterSelectOptionProps,
  IMultiselectFilterCategory,
} from "./FilterToolbar";

export interface IMultiselectFilterControlProps<TItem>
  extends IFilterControlProps<TItem, string> {
  category: IMultiselectFilterCategory<TItem, string>;
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

  const chips = filterValue?.map((value) => {
    const option = getOptionFromOptionValue(value);
    const { chipLabel, label } = option ?? {};
    return {
      key: value,
      node: <Label isCompact textMaxWidth="400px">{chipLabel ?? label ?? value}</Label>,
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
      <MultiSelect
        isDisabled={isDisabled}
        options={selectOptions.map((option) => ({
          id: option.value,
          name: option.label ?? option.value,
        }))}
        selections={filterValue?.map((value) => {
          const option: MultiSelectOptionProps = {
            id: value,
            name: value,
          };
          return option;
        })}
        onChange={(selections) => {
          const newFilterValue = selections.map((option) => {
            return getString(option.name);
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
