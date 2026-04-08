import { expect, test } from "../fixtures";
import {
  testBasicSort,
  validateStringSorting,
} from "../helpers/sorting-helpers";

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
    const items = await testBasicSort(axios, "/api/v2/purl", "name", "asc");
    validateStringSorting(
      items,
      "purl",
      "ascending",
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => {
        // Extract name from purl string
        // Format: pkg:type/[namespace/]name@version[?qualifiers][#subpath]
        // Namespace is optional, may be empty (indicated by //)
        const match = item.purl.match(/pkg:[^/]+\/(?:[^/]*\/)?([^@?#]+)/);
        return match ? match[1] : item.purl;
      },
    );
  });

  test("Sort PURLs by name descending", async ({ axios }) => {
    const items = await testBasicSort(axios, "/api/v2/purl", "name", "desc");
    validateStringSorting(
      items,
      "purl",
      "descending",
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => {
        // Extract name from purl string
        // Format: pkg:type/[namespace/]name@version[?qualifiers][#subpath]
        // Namespace is optional, may be empty (indicated by //)
        const match = item.purl.match(/pkg:[^/]+\/(?:[^/]*\/)?([^@?#]+)/);
        return match ? match[1] : item.purl;
      },
    );
  });

  test("Sort PURLs by namespace ascending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v2/purl",
      "namespace",
      "asc",
    );
    validateStringSorting(
      items,
      "purl",
      "ascending",
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => {
        // Extract namespace from purl string
        // Format: pkg:type/[namespace/]name - if no / after first /, namespace is the name
        // If there's a second /, the first part is namespace
        const parts = item.purl.split("/");
        if (parts.length >= 3) {
          // Has namespace: parts[0] = "pkg:type", parts[1] = namespace, parts[2] = name...
          return parts[1];
        }
        // No namespace (only type and name): return empty string
        return "";
      },
    );
  });

  test("Sort PURLs by namespace descending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v2/purl",
      "namespace",
      "desc",
    );
    validateStringSorting(
      items,
      "purl",
      "descending",
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => {
        // Extract namespace from purl string
        // Format: pkg:type/[namespace/]name - if no / after first /, namespace is the name
        // If there's a second /, the first part is namespace
        const parts = item.purl.split("/");
        if (parts.length >= 3) {
          // Has namespace: parts[0] = "pkg:type", parts[1] = namespace, parts[2] = name...
          return parts[1];
        }
        // No namespace (only type and name): return empty string
        return "";
      },
    );
  });

  test("Sort PURLs by version ascending", async ({ axios }) => {
    const items = await testBasicSort(axios, "/api/v2/purl", "version", "asc");
    validateStringSorting(
      items,
      "version",
      "ascending",
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => item.version.version,
    );
  });

  test("Sort PURLs by version descending", async ({ axios }) => {
    const items = await testBasicSort(axios, "/api/v2/purl", "version", "desc");
    validateStringSorting(
      items,
      "version",
      "descending",
      // biome-ignore lint/suspicious/noExplicitAny: API response types are not strictly typed in tests
      (item: any) => item.version.version,
    );
  });
});
