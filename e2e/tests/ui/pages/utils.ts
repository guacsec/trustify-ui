export type TFilterValue = "string" | "dateRange" | "multiSelect" | "typeahead";

export type TDateRange = { from: string; to: string };
export type TMultiValue = string[];

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
