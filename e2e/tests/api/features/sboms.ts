import { expect, test } from "../fixtures";

test.skip("List first 10 sboms by name - vanilla", async ({ axios }) => {
  const vanillaResponse = await axios.get(
    "/api/v2/sbom?limit=10&offset=0&sort=name:asc",
  );
  expect(vanillaResponse.data).toEqual(
    expect.objectContaining({
      total: 6,
    }),
  );
});

test("Sort SBOMs by name ascending", async ({ axios }) => {
  const response = await axios.get("/api/v2/sbom", {
    params: {
      offset: 0,
      limit: 100,
      sort: "name:asc",
    },
  });

  expect(response.status).toBe(200);
  expect(response.data.total).toBeGreaterThan(0);

  const items = response.data.items;
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const names = items.map((item: any) => item.name);

  // Validate that names are actually sorted in ascending order
  const sortedNames = [...names].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );

  expect(names).toEqual(sortedNames);
});

test("Sort SBOMs by name descending", async ({ axios }) => {
  const response = await axios.get("/api/v2/sbom", {
    params: {
      offset: 0,
      limit: 100,
      sort: "name:desc",
    },
  });

  expect(response.status).toBe(200);
  const items = response.data.items;
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const names = items.map((item: any) => item.name);

  // Validate that names are sorted in descending order
  const sortedNames = [...names].sort((a, b) =>
    b.localeCompare(a, undefined, { sensitivity: "base" }),
  );

  expect(names).toEqual(sortedNames);
});

test("Sort SBOMs by published date ascending", async ({ axios }) => {
  const response = await axios.get("/api/v2/sbom", {
    params: {
      offset: 0,
      limit: 100,
      sort: "published:asc",
    },
  });

  expect(response.status).toBe(200);
  expect(response.data.total).toBeGreaterThan(0);

  const items = response.data.items;

  // Filter out items with null published dates for validation
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const itemsWithDates = items.filter((item: any) => item.published !== null);
  const publishedDates = itemsWithDates.map(
    // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
    (item: any) => new Date(item.published),
  );

  // Validate dates are in ascending order
  for (let i = 1; i < publishedDates.length; i++) {
    expect(publishedDates[i].getTime()).toBeGreaterThanOrEqual(
      publishedDates[i - 1].getTime(),
    );
  }
});

test("Sort SBOMs by published date descending", async ({ axios }) => {
  const response = await axios.get("/api/v2/sbom", {
    params: {
      offset: 0,
      limit: 100,
      sort: "published:desc",
    },
  });

  expect(response.status).toBe(200);
  const items = response.data.items;

  // Filter out items with null published dates for validation
  // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
  const itemsWithDates = items.filter((item: any) => item.published !== null);
  const publishedDates = itemsWithDates.map(
    // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
    (item: any) => new Date(item.published),
  );

  // Validate dates are in descending order
  for (let i = 1; i < publishedDates.length; i++) {
    expect(publishedDates[i].getTime()).toBeLessThanOrEqual(
      publishedDates[i - 1].getTime(),
    );
  }
});
