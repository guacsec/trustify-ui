import type { Locator, Page } from "@playwright/test";
import { expect } from "../assertions";
import {
  type FilterValueType,
  isDateRangeFilter,
  isMultiSelectFilter,
  isStringFilter,
  isTypeaheadFilter,
  type TDateRange,
  type TFilterValue,
} from "./utils";

export class Toolbar<
  TFilter extends Record<string, TFilterValue>,
  TFilterName extends Extract<keyof TFilter, string>,
  const TKebabActions extends readonly string[],
> {
  private readonly _page: Page;
  _toolbar: Locator;
  readonly _filters: TFilter;

  private readonly _kebabActionButton: Locator | null;
  _kebabActions: TKebabActions | null;

  private constructor(
    page: Page,
    toolbar: Locator,
    filters: TFilter,
    kebabActions: TKebabActions,
    kebabActionButton: Locator | null,
  ) {
    this._page = page;
    this._toolbar = toolbar;
    this._filters = filters;
    this._kebabActions = kebabActions;
    this._kebabActionButton = kebabActionButton;
  }

  /**
   * @param page
   * @param toolbarAriaLabel the unique aria-label that corresponds to the DOM element that contains the Toolbar. E.g. <div aria-label="identifier"></div>
   * @param filters a key value object that represents the filters available for the toolbar
   * @returns a new instance of a Toolbar
   */
  static async build<
    TFilter extends Record<string, TFilterValue>,
    const TKebabActions extends readonly string[] = [],
  >(
    page: Page,
    toolbarAriaLabel: string,
    filters: TFilter = {} as TFilter,
    kebabActions?: {
      buttonAriaLabel: string;
      actions: TKebabActions;
    },
  ) {
    const toolbar = page.locator(`[aria-label="${toolbarAriaLabel}"]`);
    await expect(toolbar).toBeVisible();

    let kebabActionButton: Locator | null = null;
    if (kebabActions?.buttonAriaLabel) {
      kebabActionButton = page.getByRole("button", {
        name: kebabActions.buttonAriaLabel,
      });
      await expect(kebabActionButton).toBeVisible();
    }

    return new Toolbar(
      page,
      toolbar,
      filters,
      kebabActions?.actions ?? [],
      kebabActionButton,
    );
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

      const dropdownOption = this._page.getByRole("menuitem", {
        name: label,
        exact: true,
      });
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

  /**
   * Clears all applied filters by clicking the "Clear all filters" button
   */
  async clearAllFilters() {
    const clearButton = this._toolbar.getByRole("button", {
      name: "Clear all filters",
    });
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    // Verify all filter chips are removed
    await expect(this._toolbar.locator(".pf-m-label-group")).toHaveCount(0);
  }

  /**
   * Removes a specific filter chip by clicking its close button
   * @param filterName the name of the filter category (e.g., "Filter text", "Revision", "Label")
   * @param chipValue the specific value of the chip to remove
   */
  async removeFilterChip(filterName: TFilterName, chipValue: string) {
    const chipGroup = this._toolbar.locator(".pf-m-label-group", {
      hasText: filterName,
    });
    await expect(chipGroup).toBeVisible();

    const chip = chipGroup.locator(".pf-v6-c-label-group__list-item").filter({
      has: this._page.locator(".pf-v6-c-label__content").filter({
        hasText: new RegExp(
          `^${chipValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        ),
      }),
    });

    await expect(chip).toBeVisible();

    const closeButton = chip.getByRole("button", { name: /close/i });
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    // Verify chip is removed
    await expect(chip).not.toBeVisible();
  }

  /**
   * Removes all filters from a specific category/group by clicking the group's close button
   * @param filterName the name of the filter category to remove (e.g., "Filter text", "Revision", "Label")
   */
  async removeFilterGroup(filterName: TFilterName) {
    const chipGroup = this._toolbar.locator(".pf-m-label-group", {
      hasText: filterName,
    });
    await expect(chipGroup).toBeVisible();

    // // Find the close button for the entire group (usually in the chip group header)
    const groupCloseButton = chipGroup
      .locator(".pf-v6-c-label-group__close")
      .getByRole("button");
    await expect(groupCloseButton).toBeVisible();
    await groupCloseButton.click();

    // Verify the entire group is removed
    await expect(chipGroup).not.toBeVisible();
  }

  async clickKebabAction(actionName: TKebabActions[number]) {
    if (this._kebabActionButton) {
      await this._kebabActionButton.click();
    }

    await this._page.getByRole("menuitem", { name: actionName }).click();
  }
}
