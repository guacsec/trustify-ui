import { FilterType } from "@app/components/FilterToolbar";

import { getFilterHubRequestParams } from "./getFilterHubRequestParams";

const filterCategories = [
  {
    categoryKey: "name",
    title: "Name",
    type: FilterType.search,
  },
  {
    categoryKey: "status",
    title: "Status",
    type: FilterType.select,
    selectOptions: [{ value: "a", label: "A" }],
  },
];

describe("getFilterHubRequestParams", () => {
  /** Verifies that known filters are converted to hub filters. */
  it("builds hub filters for known categories", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { name: ["rsa"], status: ["a"] },
        setFilterValues: () => {},
      },
      filterCategories,
    });

    expect(result.filters).toEqual([
      { field: "name", operator: "~", value: "rsa" },
      { field: "status", operator: "=", value: "a" },
    ]);
  });

  /** Verifies that an unknown (e.g. stale, URL-restored) category does not prevent later valid filters from being sent. */
  it("skips unknown categories without dropping later filters", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { stale: ["x"], name: ["rsa"] },
        setFilterValues: () => {},
      },
      filterCategories,
    });

    expect(result.filters).toEqual([
      { field: "name", operator: "~", value: "rsa" },
    ]);
  });

  /** Verifies that a known select category restored with an empty array does not build a malformed filter. */
  it("skips known select categories with an empty value array", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { status: [], name: ["rsa"] },
        setFilterValues: () => {},
      },
      filterCategories,
    });

    expect(result.filters).toEqual([
      { field: "name", operator: "~", value: "rsa" },
    ]);
  });

  /** Verifies that a known multiselect category restored with an empty array does not build a malformed filter. */
  it("skips known multiselect categories with an empty value array", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { tags: [], name: ["rsa"] },
        setFilterValues: () => {},
      },
      filterCategories: [
        ...filterCategories,
        {
          categoryKey: "tags",
          title: "Tags",
          type: FilterType.multiselect,
          selectOptions: [{ value: "a", label: "A" }],
        },
      ],
    });

    expect(result.filters).toEqual([
      { field: "name", operator: "~", value: "rsa" },
    ]);
  });

  /** Verifies that an empty filter value does not prevent later valid filters from being sent. */
  it("skips empty values without dropping later filters", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { status: null, name: ["rsa"] },
        setFilterValues: () => {},
      },
      filterCategories,
    });

    expect(result.filters).toEqual([
      { field: "name", operator: "~", value: "rsa" },
    ]);
  });
});
