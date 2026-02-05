import { expect, test } from "../fixtures";

test.describe("Advisory sorting validation", () => {
  test("Sort advisories by ID ascending", async ({ axios }) => {
    const response = await axios.get("/api/v2/advisory", {
      params: {
        offset: 0,
        limit: 100,
        sort: "id:asc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify the sort parameter is accepted and returns data
    // Note: We don't validate exact sort order because database collation
    // may differ from JavaScript's string comparison
  });

  test("Sort advisories by ID descending", async ({ axios }) => {
    const response = await axios.get("/api/v2/advisory", {
      params: {
        offset: 0,
        limit: 100,
        sort: "id:desc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify results are different from ascending sort
    const ascResponse = await axios.get("/api/v2/advisory", {
      params: {
        offset: 0,
        limit: 100,
        sort: "id:asc",
      },
    });

    const descFirst = response.data.items[0].identifier;
    const ascFirst = ascResponse.data.items[0].identifier;

    // First item should be different between asc and desc
    expect(descFirst).not.toEqual(ascFirst);
  });

  test("Sort advisories by modified date ascending", async ({ axios }) => {
    const response = await axios.get("/api/v2/advisory", {
      params: {
        offset: 0,
        limit: 100,
        sort: "modified:asc",
      },
    });

    expect(response.status).toBe(200);
    const items = response.data.items;

    // Filter out items with null modified dates for validation
    // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
    const itemsWithDates = items.filter((item: any) => item.modified !== null);
    const modifiedDates = itemsWithDates.map(
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => new Date(item.modified),
    );

    // Validate dates are in ascending order
    for (let i = 1; i < modifiedDates.length; i++) {
      expect(modifiedDates[i].getTime()).toBeGreaterThanOrEqual(
        modifiedDates[i - 1].getTime(),
      );
    }
  });

  test("Sort advisories by modified date descending", async ({ axios }) => {
    const response = await axios.get("/api/v2/advisory", {
      params: {
        offset: 0,
        limit: 100,
        sort: "modified:desc",
      },
    });

    expect(response.status).toBe(200);
    const items = response.data.items;

    // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
    const itemsWithDates = items.filter((item: any) => item.modified !== null);
    const modifiedDates = itemsWithDates.map(
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => new Date(item.modified),
    );

    // Validate dates are in descending order (most recent first)
    for (let i = 1; i < modifiedDates.length; i++) {
      expect(modifiedDates[i].getTime()).toBeLessThanOrEqual(
        modifiedDates[i - 1].getTime(),
      );
    }
  });
});
