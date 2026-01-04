import { expect as baseExpect } from "@playwright/test";
import {
  isDateRangeFilter,
  isMultiSelectFilter,
  isStringFilter,
  isTypeaheadFilter,
  type FilterValueType,
  type TFilterValue,
  type Toolbar,
} from "../pages/Toolbar";
import type { MatcherResult } from "./types";

export interface ToolbarMatchers<
  TFilter extends Record<string, TFilterValue>,
  _TFilterName extends Extract<keyof TFilter, string>,
> {
  toHaveLabels(
    filters: Partial<FilterValueType<TFilter>>,
  ): Promise<MatcherResult>;
}

type ToolbarMatcherDefinitions = {
  readonly [K in keyof ToolbarMatchers<Record<string, TFilterValue>, string>]: <
    TFilter extends Record<string, TFilterValue>,
    TFilterName extends Extract<keyof TFilter, string>,
  >(
    receiver: Toolbar<TFilter, TFilterName>,
    ...args: Parameters<ToolbarMatchers<TFilter, TFilterName>[K]>
  ) => Promise<MatcherResult>;
};

export const toolbarAssertions = baseExpect.extend<ToolbarMatcherDefinitions>({
  toHaveLabels: async <
    TFilter extends Record<string, TFilterValue>,
    TFilterName extends Extract<keyof TFilter, string>,
  >(
    toolbar: Toolbar<TFilter, TFilterName>,
    filters: Partial<FilterValueType<TFilter>>,
  ): Promise<MatcherResult> => {
    try {
      for (const filterName of Object.keys(filters) as Array<TFilterName>) {
        const filterValue = filters[filterName];
        if (!filterValue) continue;

        const filterType = toolbar._filters[filterName];

        const labels: string[] = [];
        if (isStringFilter(filterType, filterValue)) {
          labels.push(filterValue);
        }
        if (isDateRangeFilter(filterType, filterValue)) {
          labels.push(filterValue.from);
          labels.push(filterValue.to);
        }
        if (isMultiSelectFilter(filterType, filterValue)) {
          labels.push(...filterValue);
        }
        if (isTypeaheadFilter(filterType, filterValue)) {
          labels.push(...filterValue);
        }

        for (const label of labels) {
          await baseExpect(
            toolbar._toolbar.locator(".pf-m-label-group", { hasText: label }),
          ).toBeVisible();
        }
      }

      return {
        pass: true,
        message: () => "Toolbar has labels",
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
});
