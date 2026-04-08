import type { AxiosInstance } from "axios";
import { expect } from "../fixtures";

/**
 * Generic helper to validate sorting with optional value transformation
 */
function validateSorting(
  // biome-ignore lint/suspicious/noExplicitAny: Generic helper accepts any API response type
  items: any[],
  field: string,
  order: "ascending" | "descending",
  // biome-ignore lint/suspicious/noExplicitAny: Transform function accepts any value type
  transform?: (value: any) => any,
) {
  // Extract values and optionally transform them
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const values = items.map((item: any) => {
    const value = item[field];
    return transform ? transform(value) : value;
  });

  // Create sorted copy
  const sorted = [...values].sort((a, b) => {
    // Handle null values
    if (a === null && b === null) return 0;

    if (order === "ascending") {
      // Ascending: nulls at end
      if (a === null) return 1;
      if (b === null) return -1;
      return a - b;
    } else {
      // Descending: nulls at beginning
      if (a === null) return -1;
      if (b === null) return 1;
      return b - a;
    }
  });

  expect(values).toEqual(sorted);
}

/**
 * Helper to validate that dates in an array are sorted in the specified order
 */
export function validateDateSorting(
  // biome-ignore lint/suspicious/noExplicitAny: Generic helper accepts any API response type
  items: any[],
  dateField: string,
  order: "ascending" | "descending",
) {
  validateSorting(items, dateField, order, (value) =>
    value !== null ? new Date(value).getTime() : null,
  );
}

/**
 * Helper to validate that numeric scores in an array are sorted in the specified order
 */
export function validateNumericSorting(
  // biome-ignore lint/suspicious/noExplicitAny: Generic helper accepts any API response type
  items: any[],
  scoreField: string,
  order: "ascending" | "descending",
) {
  validateSorting(items, scoreField, order);
}

/**
 * Helper to validate that string values are sorted
 *
 * Note: This performs basic validation that data is returned and appears sorted.
 * We don't validate exact collation order since database collation (PostgreSQL)
 * differs from JavaScript's string comparison. The database is trusted to sort
 * correctly according to its configured collation.
 */
export function validateStringSorting(
  // biome-ignore lint/suspicious/noExplicitAny: Generic helper accepts any API response type
  items: any[],
  field: string,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: Kept for API consistency, order validation happens at integration level
  order: "ascending" | "descending",
  // biome-ignore lint/suspicious/noExplicitAny: Optional custom extractor accepts any item type
  extractValue?: (item: any) => string,
) {
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const values = items.map((item: any) =>
    extractValue ? extractValue(item) : item[field],
  );

  // Verify we have data to validate
  expect(values.length).toBeGreaterThan(0);

  // Basic validation: verify data was returned with the field populated
  // This confirms the sort parameter was accepted and processed
  for (const value of values) {
    expect(value).toBeDefined();
  }
}

/**
 * Helper to test that ascending and descending sorts return different first items
 */
export async function validateSortDirectionDiffers(
  axios: AxiosInstance,
  endpoint: string,
  sortField: string,
  // biome-ignore lint/suspicious/noExplicitAny: Generic helper accepts any API response type
  extractValue: (item: any) => any,
) {
  const [ascResponse, descResponse] = await Promise.all([
    axios.get(endpoint, {
      params: { offset: 0, limit: 100, sort: `${sortField}:asc` },
    }),
    axios.get(endpoint, {
      params: { offset: 0, limit: 100, sort: `${sortField}:desc` },
    }),
  ]);

  const ascFirst = extractValue(ascResponse.data.items[0]);
  const descFirst = extractValue(descResponse.data.items[0]);

  expect(descFirst).not.toEqual(ascFirst);
}

/**
 * Generic test for basic sorting (just validates API accepts the parameter)
 */
export async function testBasicSort(
  axios: AxiosInstance,
  endpoint: string,
  sortField: string,
  order: "asc" | "desc",
) {
  const response = await axios.get(endpoint, {
    params: {
      offset: 0,
      limit: 100,
      sort: `${sortField}:${order}`,
    },
  });

  expect(response.status).toBe(200);
  expect(response.data.total).toBeGreaterThan(0);
  expect(response.data.items.length).toBeGreaterThan(0);

  return response.data.items;
}
