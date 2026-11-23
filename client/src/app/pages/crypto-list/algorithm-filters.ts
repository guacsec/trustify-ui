import { type FilterCategory, FilterType } from "@app/components/FilterToolbar";

import type { CryptoAlgorithm } from "./crypto-context";

export type CryptoAlgorithmFilterKey = "" | "primitive" | "usage";

/** Shared column filters for the global and SBOM-scoped Algorithms tables. */
export const algorithmColumnFilters: FilterCategory<
  CryptoAlgorithm,
  CryptoAlgorithmFilterKey
>[] = [
  {
    categoryKey: "primitive",
    title: "Primitive",
    placeholderText: "Search by primitive",
    type: FilterType.search,
    serverFilterField: "properties:primitive",
  },
  {
    categoryKey: "usage",
    title: "Usage",
    placeholderText: "Search by usage",
    type: FilterType.search,
    // Usage is stored as cryptoFunctions, not a top-level API field.
    serverFilterField: "properties:cryptoFunctions",
  },
];
