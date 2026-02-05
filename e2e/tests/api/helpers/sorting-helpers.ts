import type { AxiosInstance } from "axios";
import { expect } from "../fixtures";

/**
 * Helper to validate that dates in an array are sorted in the specified order
 */
export function validateDateSorting(
  // biome-ignore lint/suspicious/noExplicitAny: Generic helper accepts any API response type
  items: any[],
  dateField: string,
  order: "ascending" | "descending",
) {
  // Extract date values and convert to timestamps for comparison
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const dates = items.map((item: any) =>
    item[dateField] !== null ? new Date(item[dateField]).getTime() : null,
  );

  // Create sorted copy
  const sorted = [...dates].sort((a, b) => {
    // Handle null values
    if (a === null && b === null) return 0;

    if (order === "ascending") {
      // Ascending: nulls at end
      if (a === null) return 1;
      if (b === null) return -1;
      return a - b;
    }

    // Descending: nulls at beginning
    if (a === null) return -1;
    if (b === null) return 1;
    return b - a;
  });

  expect(dates).toEqual(sorted);
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
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const scores = items.map((item: any) => item[scoreField]);

  // Create sorted copy
  const sorted = [...scores].sort((a, b) => {
    // Handle null values
    if (a === null && b === null) return 0;

    if (order === "ascending") {
      // Ascending: nulls at end
      if (a === null) return 1;
      if (b === null) return -1;
      return a - b;
    }

    // Descending: nulls at beginning
    if (a === null) return -1;
    if (b === null) return 1;
    return b - a;
  });

  expect(scores).toEqual(sorted);
}

/**
 * Helper to validate that string values are sorted using localeCompare
 */
export function validateStringSorting(
  // biome-ignore lint/suspicious/noExplicitAny: Generic helper accepts any API response type
  items: any[],
  field: string,
  order: "ascending" | "descending",
) {
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const values = items.map((item: any) => item[field]);

  const sorted = [...values].sort((a, b) => {
    if (order === "ascending") {
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    }
    return b.localeCompare(a, undefined, { sensitivity: "base" });
  });

  expect(values).toEqual(sorted);
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
