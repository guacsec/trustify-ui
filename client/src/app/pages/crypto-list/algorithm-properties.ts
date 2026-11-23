import type { CryptoAlgorithm } from "./crypto-context";

// Display the same persisted properties that algorithmColumnFilters queries.
// The API's top-level primitive is derived from properties.primitive; neither
// that duplicate nor legacy detectionContext adds a searchable column value.
export const getAlgorithmPrimitive = (
  item: CryptoAlgorithm,
): string | undefined => {
  const primitive = item.properties?.primitive;
  return typeof primitive === "string" ? primitive : undefined;
};

export const getAlgorithmUsage = (
  item: CryptoAlgorithm,
): string | undefined => {
  const functions = item.properties?.cryptoFunctions;
  return Array.isArray(functions) && functions.length > 0
    ? functions.join(", ")
    : undefined;
};
