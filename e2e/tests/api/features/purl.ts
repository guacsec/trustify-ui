import { expect, test } from "../fixtures";
import {
  testBasicSort,
  validateSortDirectionDiffers,
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
    await testBasicSort(axios, "/api/v2/purl", "name", "asc");
  });

  test("Sort PURLs by name descending", async ({ axios }) => {
    await validateSortDirectionDiffers(
      axios,
      "/api/v2/purl",
      "name",
      (item) => {
        // Extract name from purl string
        const match = item.purl.match(/pkg:[^/]+\/(?:[^/]+\/)?([^@?]+)/);
        return match ? match[1] : item.purl;
      },
    );
  });

  test("Sort PURLs by namespace ascending", async ({ axios }) => {
    await testBasicSort(axios, "/api/v2/purl", "namespace", "asc");
  });

  test("Sort PURLs by namespace descending", async ({ axios }) => {
    await validateSortDirectionDiffers(
      axios,
      "/api/v2/purl",
      "namespace",
      (item) => {
        // Extract namespace from purl string
        const match = item.purl.match(/pkg:[^/]+\/([^/]+)/);
        return match ? match[1] : null;
      },
    );
  });

  test("Sort PURLs by version ascending", async ({ axios }) => {
    await testBasicSort(axios, "/api/v2/purl", "version", "asc");
  });

  test("Sort PURLs by version descending", async ({ axios }) => {
    await validateSortDirectionDiffers(
      axios,
      "/api/v2/purl",
      "version",
      (item) => item.version.version,
    );
  });
});
