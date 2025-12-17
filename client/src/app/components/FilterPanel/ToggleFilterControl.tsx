import type React from "react";

import { Checkbox } from "@patternfly/react-core";

import type { IToggleFilterCategory } from "../FilterToolbar";
import type { IFilterControlProps } from "./FilterControl";

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
  isDisabled = false,
}: React.PropsWithChildren<
  IToggleFilterControlProps<TItem, TFilterCategoryKey>
>): React.JSX.Element | null => {
  return (
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
  );
};
