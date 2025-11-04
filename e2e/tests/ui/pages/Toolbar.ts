import { expect, type Locator, type Page } from "@playwright/test";

type TFilterValue = "string" | "dateRange" | "multiSelect" | "typeahead";

type TDateRange = { from: string; to: string };
type TMultiValue = string[];

type FilterValueTypeMap = {
  string: string;
  dateRange: TDateRange;
  multiSelect: TMultiValue;
  typeahead: TMultiValue;
};

type FilterValueType<TFilter extends Record<string, TFilterValue>> = {
  [K in keyof TFilter]: FilterValueTypeMap[TFilter[K]];
};

function isStringFilter<K extends string, T extends Record<K, TFilterValue>>(
  type: T[K],
  value: unknown,
): value is string {
  return type === "string";
}

function isDateRangeFilter<K extends string, T extends Record<K, TFilterValue>>(
  type: T[K],
  value: unknown,
): value is TDateRange {
  return type === "dateRange";
}

function isMultiSelectFilter<
  K extends string,
  T extends Record<K, TFilterValue>,
>(type: T[K], value: unknown): value is TMultiValue {
  return type === "multiSelect";
}

function isTypeaheadFilter<K extends string, T extends Record<K, TFilterValue>>(
  type: T[K],
  value: unknown,
): value is TMultiValue {
  return type === "typeahead";
}

export class Toolbar<TFilter extends Record<string, TFilterValue>> {
  private readonly _page: Page;
  _toolbar: Locator;
  private readonly _filters: TFilter;

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
    for (const filterName of Object.keys(filters) as Array<
      Extract<keyof TFilter, string>
    >) {
      const filterValue = filters[filterName];
      const filterType = this._filters[filterName];

      await this.selectFilter(filterName);
      if (isStringFilter(filterType, filterValue)) {
        await this.applyTextFilter(filterName, filterValue);
      } else if (isDateRangeFilter(filterType, filterValue)) {
        await this.applyDateRangeFilter(filterName, filterValue);
      } else if (isMultiSelectFilter(filterType, filterValue)) {
        await this.applyMultiSelectFilter(filterName, filterValue);
      } else if (isTypeaheadFilter(filterType, filterValue)) {
        await this.applyTypeaheadFilter(filterName, filterValue);
      }
    }
  }

  private async applyTextFilter<
    TFilterName extends Extract<keyof TFilter, string>,
  >(filterName: TFilterName, filterValue: string) {
    await this._toolbar.getByRole("textbox").fill(filterValue);
    await this._page.keyboard.press("Enter");

    await this.assertFilterHasLabels(filterName, filterValue);
  }

  private async applyDateRangeFilter<
    TFilterName extends Extract<keyof TFilter, string>,
  >(filterName: TFilterName, dateRange: TDateRange) {
    await this._toolbar
      .locator("input[aria-label='Interval start']")
      .fill(dateRange.from);
    await this._toolbar
      .locator("input[aria-label='Interval end']")
      .fill(dateRange.to);

    await this.assertFilterHasLabels(filterName, [
      dateRange.from,
      dateRange.to,
    ]);
  }

  private async applyMultiSelectFilter<
    TFilterName extends Extract<keyof TFilter, string>,
  >(filterName: TFilterName, selections: string[]) {
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

    await this.assertFilterHasLabels(filterName, selections);
  }

  private async applyTypeaheadFilter<
    TFilterName extends Extract<keyof TFilter, string>,
  >(filterName: TFilterName, labels: string[]) {
    for (const label of labels) {
      await this._toolbar
        .locator("input[aria-label='select-autocomplete-listbox']")
        .fill(label);

      const dropdownOption = this._page.getByRole("option", { name: label });
      await expect(dropdownOption).toBeVisible();
      await dropdownOption.click();
    }

    await this.assertFilterHasLabels(filterName, labels);
  }

  /**
   * Selects the main filter to be applied
   * @param filterName the name of the filter as rendered in the UI
   */
  private async selectFilter<
    TFilterName extends Extract<keyof TFilter, string>,
  >(filterName: TFilterName) {
    await this._toolbar
      .locator(".pf-m-toggle-group button.pf-v6-c-menu-toggle")
      .click();
    await this._page.getByRole("menuitem", { name: filterName }).click();
  }

  private async assertFilterHasLabels<
    TFilterName extends Extract<keyof TFilter, string>,
  >(filterName: TFilterName, filterValue: string | string[]) {
    await expect(
      this._toolbar.locator(".pf-m-label-group", { hasText: filterName }),
    ).toBeVisible();

    const labels = Array.isArray(filterValue) ? filterValue : [filterValue];
    for (const label of labels) {
      await expect(
        this._toolbar.locator(".pf-m-label-group", { hasText: label }),
      ).toBeVisible();
    }
  }
}
