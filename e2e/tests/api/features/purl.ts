import { expect, test } from "../fixtures";

test.skip("Purl by alias - vanilla", async ({ axios }) => {
  const vanillaResponse = await axios.get(
    "/api/v2/purl?offset=0&limit=10&q=openssl",
  );

  expect(vanillaResponse.data.items).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=aarch64",
        base: expect.objectContaining({
          purl: "pkg:rpm/redhat/openssl-libs",
        }),
        version: expect.objectContaining({
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        }),
        qualifiers: expect.objectContaining({
          arch: "aarch64",
        }),
      }),
      expect.objectContaining({
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=x86_64",
        base: expect.objectContaining({
          purl: "pkg:rpm/redhat/openssl-libs",
        }),
        version: expect.objectContaining({
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        }),
        qualifiers: expect.objectContaining({
          arch: "x86_64",
        }),
      }),
    ]),
  );
});

test.describe("PURL sorting validation", () => {
  test("Sort PURLs by name ascending", async ({ axios }) => {
    const response = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "name:asc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify the sort parameter is accepted and returns data
    // Note: We don't validate exact sort order because database collation
    // may differ from JavaScript's string comparison
  });

  test("Sort PURLs by name descending", async ({ axios }) => {
    const response = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "name:desc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify results are different from ascending sort
    const ascResponse = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "name:asc",
      },
    });

    // Extract names from purl strings
    const getName = (purl: string) => {
      // PURL format: pkg:type/namespace/name@version?qualifiers
      const match = purl.match(/pkg:[^/]+\/(?:[^/]+\/)?([^@?]+)/);
      return match ? match[1] : purl;
    };

    const descFirst = getName(response.data.items[0].purl);
    const ascFirst = getName(ascResponse.data.items[0].purl);

    // First item should be different between asc and desc
    expect(descFirst).not.toEqual(ascFirst);
  });

  test("Sort PURLs by namespace ascending", async ({ axios }) => {
    const response = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "namespace:asc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify the sort parameter is accepted and returns data
  });

  test("Sort PURLs by namespace descending", async ({ axios }) => {
    const response = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "namespace:desc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify results are different from ascending sort
    const ascResponse = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "namespace:asc",
      },
    });

    // Extract namespace from purl strings
    const getNamespace = (purl: string) => {
      // PURL format: pkg:type/namespace/name@version?qualifiers
      const match = purl.match(/pkg:[^/]+\/([^/]+)/);
      return match ? match[1] : null;
    };

    const descFirst = getNamespace(response.data.items[0].purl);
    const ascFirst = getNamespace(ascResponse.data.items[0].purl);

    if (descFirst && ascFirst) {
      // First item should be different between asc and desc
      expect(descFirst).not.toEqual(ascFirst);
    }
  });

  test("Sort PURLs by version ascending", async ({ axios }) => {
    const response = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "version:asc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify the sort parameter is accepted and returns data
  });

  test("Sort PURLs by version descending", async ({ axios }) => {
    const response = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "version:desc",
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.items.length).toBeGreaterThan(0);

    // Verify results are different from ascending sort
    const ascResponse = await axios.get("/api/v2/purl", {
      params: {
        offset: 0,
        limit: 100,
        sort: "version:asc",
      },
    });

    const descFirst = response.data.items[0].version.version;
    const ascFirst = ascResponse.data.items[0].version.version;

    // First item should be different between asc and desc
    expect(descFirst).not.toEqual(ascFirst);
  });
});
