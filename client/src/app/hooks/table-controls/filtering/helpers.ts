import type { FilterValue, IFilterValues } from "@app/components/FilterToolbar";
import { objectKeys } from "@app/utils/utils";

/**
 * Helper function for useFilterState
 * Given a structured filter values object, returns a string to be stored in the feature's PersistTarget (URL params, localStorage, etc).
 */
export const serializeFilterUrlParams = <TFilterCategoryKey extends string>(
  filterValues: IFilterValues<TFilterCategoryKey>,
): { filters?: string | null } => {
  // If a filter value is empty/cleared, don't put it in the object in URL params
  const trimmedFilterValues = { ...filterValues };
  for (const filterCategoryKey of objectKeys(trimmedFilterValues)) {
    if (
      !trimmedFilterValues[filterCategoryKey] ||
      trimmedFilterValues[filterCategoryKey]?.length === 0
    ) {
      delete trimmedFilterValues[filterCategoryKey];
    }
  }
  return {
    filters:
      objectKeys(trimmedFilterValues).length > 0
        ? JSON.stringify(trimmedFilterValues)
        : null, // If there are no filters, remove the filters param from the URL entirely.
  };
};

/**
 * Normalizes filter values restored from a persisted source (URL params, localStorage, etc), which may be stale or malformed.
 * - Drops values that are not arrays (e.g. `{"name": "rsa"}` or `{"name": 5}`).
 * - Drops entries that are not strings, and blank (empty string) entries.
 * - Drops categories left with no entries.
 * - Returns an empty object if the input is not a plain object.
 * Returns the same object when it is already clean so that memoized consumers keep a stable reference.
 */
export const sanitizeFilterValues = <TFilterCategoryKey extends string>(
  filterValues: unknown,
): IFilterValues<TFilterCategoryKey> => {
  if (
    typeof filterValues !== "object" ||
    filterValues === null ||
    Array.isArray(filterValues)
  ) {
    return {};
  }
  const input = filterValues as Record<string, unknown>;
  const result: Record<string, FilterValue> = {};
  let isClean = true;
  for (const [key, value] of Object.entries(input)) {
    if (!Array.isArray(value)) {
      isClean = false;
      continue;
    }
    const entries = value.filter(
      (entry): entry is string => typeof entry === "string" && entry !== "",
    );
    if (entries.length === 0) {
      isClean = false;
      continue;
    }
    if (entries.length !== value.length) isClean = false;
    result[key] = entries;
  }
  return (isClean ? filterValues : result) as IFilterValues<TFilterCategoryKey>;
};

/**
 * Helper function for useFilterState
 * Given a string retrieved from the feature's PersistTarget (URL params, localStorage, etc), converts it back to the structured filter values object.
 */
export const deserializeFilterUrlParams = <
  TFilterCategoryKey extends string,
>(serializedParams: {
  filters?: string | null;
}): Partial<Record<TFilterCategoryKey, FilterValue>> => {
  try {
    return sanitizeFilterValues(JSON.parse(serializedParams.filters || "{}"));
  } catch (_e) {
    return {};
  }
};
