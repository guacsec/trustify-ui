import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react";

import { FilterType } from "@app/components/FilterToolbar";

import { getFilterHubRequestParams } from "./getFilterHubRequestParams";
import { getLocalFilterDerivedState } from "./getLocalFilterDerivedState";
import { useFilterState } from "./useFilterState";

const filterCategories = [
  { categoryKey: "name", title: "Name", type: FilterType.search },
  {
    categoryKey: "status",
    title: "Status",
    type: FilterType.select,
    selectOptions: [{ value: "a", label: "A" }],
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("useFilterState with persisted values", () => {
  afterEach(() => {
    window.history.replaceState({}, "", "/");
  });

  /** Verifies that a persisted URL holding non-array filter values neither throws nor reaches the request parameters. */
  it("survives a malformed URL filter and still sends the valid filters", () => {
    const filters = encodeURIComponent(
      JSON.stringify({ status: "a", stale: 5, name: ["rsa"] }),
    );
    window.history.replaceState({}, "", `/?t:filters=${filters}`);

    const { result } = renderHook(
      () =>
        useFilterState({
          isFilterEnabled: true,
          filterCategories,
          persistTo: "urlParams",
          persistenceKeyPrefix: "t",
        }),
      { wrapper },
    );

    expect(result.current.filterValues).toEqual({ name: ["rsa"] });
    expect(() =>
      getFilterHubRequestParams({
        filterState: result.current,
        filterCategories,
      }),
    ).not.toThrow();
    expect(
      getFilterHubRequestParams({
        filterState: result.current,
        filterCategories,
      }).filters,
    ).toEqual([{ field: "name", operator: "~", value: "rsa" }]);
  });

  /** Verifies that a restored blank selection does not hide rows with falsy fields in local tables. */
  it("does not let a restored blank selection hide rows in local tables", () => {
    const filters = encodeURIComponent(JSON.stringify({ status: [""] }));
    window.history.replaceState({}, "", `/?t:filters=${filters}`);

    const { result } = renderHook(
      () =>
        useFilterState({
          isFilterEnabled: true,
          filterCategories,
          persistTo: "urlParams",
          persistenceKeyPrefix: "t",
        }),
      { wrapper },
    );

    const items = [
      { name: "with-status", status: "a" },
      { name: "no-status", status: "" },
      { name: "null-status", status: null },
    ];
    const { filteredItems } = getLocalFilterDerivedState({
      items,
      filterCategories,
      filterState: result.current,
    });
    expect(filteredItems).toEqual(items);
  });

  /** Verifies that sanitizing initial values in plain state mode works too. */
  it("sanitizes initial values for non-URL persistence", () => {
    const { result } = renderHook(
      () =>
        useFilterState({
          isFilterEnabled: true,
          filterCategories,
          initialFilterValues: { status: [""], name: ["rsa"] },
        }),
      { wrapper },
    );

    expect(result.current.filterValues).toEqual({ name: ["rsa"] });
  });
});
