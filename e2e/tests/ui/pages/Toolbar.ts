import type { Locator, Page } from "@playwright/test";
import { expect } from "../assertions";

export type TFilterValue = "string" | "dateRange" | "multiSelect" | "typeahead";

type TDateRange = { from: string; to: string };
type TMultiValue = string[];

type FilterValueTypeMap = {
  string: string;
  dateRange: TDateRange;
  multiSelect: TMultiValue;
  typeahead: TMultiValue;
};

export type FilterValueType<TFilter extends Record<string, TFilterValue>> = {
  [K in keyof TFilter]: FilterValueTypeMap[TFilter[K]];
};

export function isStringFilter<
  K extends string,
  T extends Record<K, TFilterValue>,
>(type: T[K], value: unknown): value is string {
  return type === "string";
}

export function isDateRangeFilter<
  K extends string,
  T extends Record<K, TFilterValue>,
>(type: T[K], value: unknown): value is TDateRange {
  return type === "dateRange";
}

export function isMultiSelectFilter<
  K extends string,
  T extends Record<K, TFilterValue>,
>(type: T[K], value: unknown): value is TMultiValue {
  return type === "multiSelect";
}

export function isTypeaheadFilter<
  K extends string,
  T extends Record<K, TFilterValue>,
>(type: T[K], value: unknown): value is TMultiValue {
  return type === "typeahead";
}

export class Toolbar<
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
> {
  private readonly _page: Page;
  _toolbar: Locator;
  readonly _filters: TFilter;

  private constructor(page: Page, toolbar: Locator, filters: TFilter) {
    this._page = page;
    this._toolbar = toolbar;
    this._filters = filters;
  }

  /**
   * @param page
   * @param toolbarAriaLabel the unique aria-label that corresponds to the DOM element that contains the Toolbar. E.g. <div aria-label="identifier"></div>
   * @param filters a key value object that represents the filters available for the toolbar
   * @returns a new instance of a Toolbar
   */
  static async build<TFilter extends Record<string, TFilterValue>>(
    page: Page,
    toolbarAriaLabel: string,
    filters: TFilter = {} as TFilter,
  ) {
    const toolbar = page.locator(`[aria-label="${toolbarAriaLabel}"]`);
    await expect(toolbar).toBeVisible();
    return new Toolbar(page, toolbar, filters);
  }

  async applyFilter(filters: Partial<FilterValueType<TFilter>>) {
    for (const filterName of Object.keys(filters) as Array<TFilterName>) {
      const filterValue = filters[filterName];
      if (!filterValue) continue;

      const filterType = this._filters[filterName];

      await this.selectFilter(filterName);
      if (isStringFilter(filterType, filterValue)) {
        await this.applyTextFilter(filterName, filterValue);
      }
      if (isDateRangeFilter(filterType, filterValue)) {
        await this.applyDateRangeFilter(filterName, filterValue);
      }
      if (isMultiSelectFilter(filterType, filterValue)) {
        await this.applyMultiSelectFilter(filterName, filterValue);
      }
      if (isTypeaheadFilter(filterType, filterValue)) {
        await this.applyTypeaheadFilter(filterName, filterValue);
      }
    }

    await expect(this).toHaveLabels(filters);
  }

  private async applyTextFilter(_filterName: TFilterName, filterValue: string) {
    await this._toolbar.getByRole("textbox").fill(filterValue);
    await this._page.keyboard.press("Enter");
  }

  private async applyDateRangeFilter(
    _filterName: TFilterName,
    dateRange: TDateRange,
  ) {
    await this._toolbar
      .locator("input[aria-label='Interval start']")
      .fill(dateRange.from);
    await this._toolbar
      .locator("input[aria-label='Interval end']")
      .fill(dateRange.to);
  }

  private async applyMultiSelectFilter(
    _filterName: TFilterName,
    selections: string[],
  ) {
    for (const option of selections) {
      const inputText = this._toolbar.locator(
        "input[aria-label='Type to filter']",
      );
      await inputText.clear();
      await inputText.fill(option);

      const dropdownOption = this._page.getByRole("menuitem", {
        name: option,
        exact: true,
      });
      await expect(dropdownOption).toBeVisible();
      await dropdownOption.click();
    }
  }

  private async applyTypeaheadFilter(
    _filterName: TFilterName,
    labels: string[],
  ) {
    for (const label of labels) {
      await this._toolbar
        .locator("input[aria-label='select-autocomplete-listbox']")
        .fill(label);

      const dropdownOption = this._page.getByRole("option", { name: label });
      await expect(dropdownOption).toBeVisible();
      await dropdownOption.click();
    }
  }

  /**
   * Selects the main filter to be applied
   * @param filterName the name of the filter as rendered in the UI
   */
  private async selectFilter(filterName: TFilterName) {
    await this._toolbar
      .locator(".pf-m-toggle-group button.pf-v6-c-menu-toggle")
      .click();
    await this._page.getByRole("menuitem", { name: filterName }).click();
  }
}
