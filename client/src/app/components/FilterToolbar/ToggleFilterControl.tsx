import type React from "react";

import { Checkbox, ToolbarFilter, ToolbarItem } from "@patternfly/react-core";

import type { IFilterControlProps } from "./FilterControl";
import type { IToggleFilterCategory } from "./FilterToolbar";

export interface IToggleFilterControlProps<
  TItem,
  TFilterCategoryKey extends string,
> extends IFilterControlProps<TItem, TFilterCategoryKey> {
  category: IToggleFilterCategory<TItem, TFilterCategoryKey>;
}

export const ToggleFilterControl = <TItem, TFilterCategoryKey extends string>({
  category,
  filterValue,
  setFilterValue,
  showToolbarItem,
  isDisabled = false,
}: React.PropsWithChildren<
  IToggleFilterControlProps<TItem, TFilterCategoryKey>
>): React.JSX.Element | null => {
  return (
    <ToolbarFilter
      labels={filterValue?.map((value) => ({ key: value, node: value })) || []}
      deleteLabel={() => setFilterValue(null)}
      categoryName={category.title}
      showToolbarItem={showToolbarItem}
    >
      <Checkbox
        id={`filter-control-${category.categoryKey}`}
        label={category.label}
        isChecked={filterValue?.[0] === "true"}
        onChange={(_e, value) => {
          if (value) {
            setFilterValue(["true"]);
          } else {
            setFilterValue(null);
          }
        }}
        isDisabled={isDisabled}
      />
    </ToolbarFilter>
  );
};
