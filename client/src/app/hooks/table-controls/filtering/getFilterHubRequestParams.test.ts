import type { HubRequestParams } from "@app/api/models";
import { FilterType } from "@app/components/FilterToolbar";

import { requestParamsQuery } from "../getHubRequestParams";
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

  /** Verifies that no `filters` property is returned when every restored value is empty or unknown, so no empty `q` is serialized. */
  it("omits filters when all values are empty or unknown", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { stale: ["x"], status: [], name: null },
        setFilterValues: () => {},
      },
      filterCategories,
    });

    expect(result).toEqual({});
    expect("filters" in result).toBe(false);
    expect(requestParamsQuery(result as HubRequestParams).q).toBeUndefined();
  });

  /** Verifies that implicit filters are still returned when all user filters are empty. */
  it("keeps implicit filters when all user filters are empty", () => {
    const implicit = { field: "sbom_id", operator: "=" as const, value: "1" };
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { status: [] },
        setFilterValues: () => {},
      },
      filterCategories,
      implicitFilters: [implicit],
    });

    expect(result.filters).toEqual([implicit]);
  });

  /** Verifies that blank (empty string) selections are skipped and never serialized as an empty query term. */
  it("skips select and multiselect categories restored with blank values", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { status: [""], tags: ["", ""], name: ["rsa"] },
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

  /** Verifies that blank entries are dropped from a multiselect while real selections are kept. */
  it("drops blank entries from a multiselect but keeps real ones", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { tags: ["", "a"] },
        setFilterValues: () => {},
      },
      filterCategories: [
        {
          categoryKey: "tags",
          title: "Tags",
          type: FilterType.multiselect,
          selectOptions: [{ value: "a", label: "A" }],
        },
      ],
    });

    expect(result.filters).toEqual([
      { field: "tags", operator: "=", value: { list: ["a"], operator: "OR" } },
    ]);
  });

  /** Verifies that only blank selections leave no filters and no empty `q`. */
  it("omits filters and q when the only selection is blank", () => {
    const result = getFilterHubRequestParams({
      filterState: {
        filterValues: { status: [""] },
        setFilterValues: () => {},
      },
      filterCategories,
    });

    expect(result).toEqual({});
    expect(requestParamsQuery(result as HubRequestParams).q).toBeUndefined();
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
