import { expect, test } from "../fixtures";
import { deleteSboms, getFullSbomPaths, uploadFiles } from "../helpers";

// SBOMs to upload
const sbomDir = "tests/common/assets/sbom";
// CDX
const sbomsCdxOlder = [
  "cnv-4.17-product-older.json.bz2",
  "cnv-4.17-index-older.json.bz2",
  "cnv-4.17-binary-1-older.json.bz2",
  "cnv-4.17-binary-2-older.json.bz2",
];
const sbomsCdxLatest = [
  "cnv-4.17-product-latest.json.bz2",
  "cnv-4.17-index-latest.json.bz2",
  "cnv-4.17-binary-1-latest.json.bz2",
  "cnv-4.17-binary-2-latest.json.bz2",
];
// SPDX
const sbomsSpdxOlder = [
  "mariadb-9.7-product-older.json.bz2",
  "mariadb-9.7-binary-older.json.bz2",
];
const sbomsSpdxLatest = [
  "mariadb-9.7-product-latest.json.bz2",
  "mariadb-9.7-binary-latest.json.bz2",
];

// Query items
// CDX queries
const productCdxCpe = "cpe:/a:redhat:container_native_virtualization:4.17::el9";
const componentCdxPurlExact = "pkg:golang/github.com/google/uuid@v1.3.1";
const componentCdxPurlPartial = "google/uuid";
const componentCdxNameExact = "github.com/google/uuid";
const componentCdxNamePartial = "google/uuid";
// SPDX queries
const productSpdxCpe = "cpe:/a:redhat:enterprise_linux:9::appstream";
// const componentSpdxPurlExact = "pkg:golang/github.com/google/uuid@v1.3.1"; // We don't have a good candidate here.
const componentSpdxPurlPartial = "pkg:oci/mariadb-1011";
// const componentSpdxNameExact = "mariadb-1011-9-7";
const componentSpdxNamePartial = "mariadb";

// Published dates & times
// CDX
const cdxExpectedPublishedDateProductOlder = "2025-11-25 11:21:36+00";
const cdxExpectedPublishedDateIndexOlder = "2025-11-25 09:03:29+00";
const cdxExpectedPublishedDateBinaryOlder = "2025-11-25 09:02:40+00";
const cdxExpectedPublishedDateProductLatest = "2025-12-02 12:05:38+00";
const cdxExpectedPublishedDateIndexLatest = "2025-12-02 09:05:59+00";
const cdxExpectedPublishedDateBinaryLatest = "2025-12-02 09:05:12+00";
// SPDX
const spdxExpectedPublishedDateProductOlder = "2025-11-17 17:22:07+00";
const spdxExpectedPublishedDateBinaryOlder = "2025-11-17 16:38:55+00";
const spdxExpectedPublishedDateProductLatest = "2025-12-22 17:55:59+00";
const spdxExpectedPublishedDateBinaryLatest = "2025-12-22 17:21:45+00";

test.describe("Analysis / Latest / Basic", () => {
  test.describe.configure({ mode: "serial" });

  const sbomIdsLatestBasicOlder: string[] = [];

  test.afterAll(async ({ axios }) => {
    await deleteSboms(axios, sbomIdsLatestBasicOlder);
  });

  test.describe("CDX", () => {
    test.describe("Older SBOM", () => {
      test.beforeAll(async ({ axios }) => {
        const fullSbomPaths = getFullSbomPaths(sbomDir, sbomsCdxOlder);
        const ids = await uploadFiles(axios, "sbom", fullSbomPaths);
        sbomIdsLatestBasicOlder.push(...ids);
      });

      test("Check all published dates / Get product by CPE", async ({
        axios,
      }) => {
        const urlEncodedProductCpe = encodeURIComponent(productCdxCpe);

        const response = await axios.get(
          `/api/v2/analysis/latest/component/${urlEncodedProductCpe}?descendants=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateProductOlder,
              descendants: expect.arrayContaining([
                expect.objectContaining({
                  descendants: expect.arrayContaining([
                    expect.objectContaining({
                      descendants: expect.arrayContaining([
                        expect.objectContaining({
                          published: cdxExpectedPublishedDateIndexOlder,
                          descendants: expect.arrayContaining([
                            expect.objectContaining({
                              descendants: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateBinaryOlder,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by pURL / Exact match", async ({
        axios,
      }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          componentCdxPurlExact,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=purl=${urlEncodedComponentPurl}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryOlder,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexOlder,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductOlder,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by pURL / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          componentCdxPurlPartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=purl~${urlEncodedComponentPurl}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryOlder,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexOlder,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductOlder,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by name / Exact match", async ({
        axios,
      }) => {
        const urlEncodedComponentName = encodeURIComponent(
          componentCdxNameExact,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=name=${urlEncodedComponentName}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryOlder,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexOlder,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductOlder,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by name / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentName = encodeURIComponent(
          componentCdxNamePartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=name~${urlEncodedComponentName}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryOlder,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexOlder,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductOlder,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });
    });

    test.describe("Latest SBOM", () => {
      const sbomIdsLatestBasicLatest: string[] = [];

      test.beforeAll(async ({ axios }) => {
        const fullSbomPaths = getFullSbomPaths(sbomDir, sbomsCdxLatest);
        const ids = await uploadFiles(axios, "sbom", fullSbomPaths);
        sbomIdsLatestBasicLatest.push(...ids);
      });

      test.afterAll(async ({ axios }) => {
        await deleteSboms(axios, sbomIdsLatestBasicLatest);
      });

      test("Check all published dates / Get product by CPE", async ({
        axios,
      }) => {
        const urlEncodedProductCpe = encodeURIComponent(productCdxCpe);

        const response = await axios.get(
          `/api/v2/analysis/latest/component/${urlEncodedProductCpe}?descendants=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateProductLatest,
              descendants: expect.arrayContaining([
                expect.objectContaining({
                  descendants: expect.arrayContaining([
                    expect.objectContaining({
                      descendants: expect.arrayContaining([
                        expect.objectContaining({
                          published: cdxExpectedPublishedDateIndexLatest,
                          descendants: expect.arrayContaining([
                            expect.objectContaining({
                              descendants: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateBinaryLatest,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by pURL / Exact match", async ({
        axios,
      }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          componentCdxPurlExact,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=purl=${urlEncodedComponentPurl}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryLatest,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexLatest,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductLatest,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by pURL / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          componentCdxPurlPartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=purl~${urlEncodedComponentPurl}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryLatest,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexLatest,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductLatest,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by name / Exact match", async ({
        axios,
      }) => {
        const urlEncodedComponentName = encodeURIComponent(
          componentCdxNameExact,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=name=${urlEncodedComponentName}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryLatest,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexLatest,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductLatest,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by name / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentName = encodeURIComponent(
          componentCdxNamePartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=name~${urlEncodedComponentName}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: cdxExpectedPublishedDateBinaryLatest,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      published: cdxExpectedPublishedDateIndexLatest,
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  published:
                                    cdxExpectedPublishedDateProductLatest,
                                }),
                              ]),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });
    });
  });

  test.describe("SPDX", () => {
    test.describe.configure({ mode: "serial" });

    const sbomIdsLatestBasicOlderSpdx: string[] = [];

    test.describe("Older SBOM", () => {
      test.beforeAll(async ({ axios }) => {
        const fullSbomPaths = getFullSbomPaths(sbomDir, sbomsSpdxOlder);
        const ids = await uploadFiles(axios, "sbom", fullSbomPaths);
        sbomIdsLatestBasicOlderSpdx.push(...ids);
      });

      test("Check all published dates / Get product by CPE", async ({
        axios,
      }) => {
        const urlEncodedProductCpe = encodeURIComponent(productSpdxCpe);

        const response = await axios.get(
          `/api/v2/analysis/latest/component/${urlEncodedProductCpe}?descendants=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: spdxExpectedPublishedDateProductOlder,
              descendants: expect.arrayContaining([
                expect.objectContaining({
                  descendants: expect.arrayContaining([
                    expect.objectContaining({
                      descendants: expect.arrayContaining([
                        expect.objectContaining({
                          published: spdxExpectedPublishedDateBinaryOlder,
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by pURL / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          componentSpdxPurlPartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=purl~${urlEncodedComponentPurl}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: spdxExpectedPublishedDateBinaryOlder,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          published: spdxExpectedPublishedDateProductOlder,
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by name / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentName = encodeURIComponent(
          componentSpdxNamePartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=name~${urlEncodedComponentName}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: spdxExpectedPublishedDateBinaryOlder,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          published: spdxExpectedPublishedDateProductOlder,
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });
    });

    test.describe("Latest SBOM", () => {
      const sbomIdsLatestBasicLatestSpdx: string[] = [];

      test.beforeAll(async ({ axios }) => {
        const fullSbomPaths = getFullSbomPaths(sbomDir, sbomsSpdxLatest);
        const ids = await uploadFiles(axios, "sbom", fullSbomPaths);
        sbomIdsLatestBasicLatestSpdx.push(...ids);
      });

      test.afterAll(async ({ axios }) => {
        await deleteSboms(axios, sbomIdsLatestBasicLatestSpdx);
      });

      test("Check all published dates / Get product by CPE", async ({
        axios,
      }) => {
        const urlEncodedProductCpe = encodeURIComponent(productSpdxCpe);

        const response = await axios.get(
          `/api/v2/analysis/latest/component/${urlEncodedProductCpe}?descendants=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: spdxExpectedPublishedDateProductLatest,
              descendants: expect.arrayContaining([
                expect.objectContaining({
                  descendants: expect.arrayContaining([
                    expect.objectContaining({
                      descendants: expect.arrayContaining([
                        expect.objectContaining({
                          published: spdxExpectedPublishedDateBinaryLatest,
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by pURL / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          componentSpdxPurlPartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=purl~${urlEncodedComponentPurl}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: spdxExpectedPublishedDateBinaryLatest,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          published: spdxExpectedPublishedDateProductLatest,
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });

      test("Check all published dates / Get component by name / Partial match", async ({
        axios,
      }) => {
        const urlEncodedComponentName = encodeURIComponent(
          componentSpdxNamePartial,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=name~${urlEncodedComponentName}&ancestors=10`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              published: spdxExpectedPublishedDateBinaryLatest,
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          published: spdxExpectedPublishedDateProductLatest,
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });
    });
  });
});
