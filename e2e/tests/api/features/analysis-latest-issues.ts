import { expect, test } from "../fixtures";
import {
  deleteSboms,
  getFullSbomPaths,
  uploadFiles,
} from "../helpers/general-helpers";

// SBOMs to upload
const sbomDir = "tests/common/assets/sbom";

test.describe("Analysis / Latest / Issues", () => {
  test.describe.configure({ mode: "serial" });

  test.describe("Top-level ancestor is 'upstream'", () => {
    const sbomIdsTopLevelAncestorIsUpstream: string[] = [];

    const topLevelAncestorIsUpstreamSboms = [
      "jboss-eap-7.4-els-on-rhel8-product.json.bz2",
      "jboss-eap-7.4-els-on-rhel8-index.json.bz2",
      "jboss-eap-7.4-els-on-rhel8-binary.json.bz2",
    ];
    const topLevelAncestorIsUpstreamComponentPurl = "pkg:maven/antlr/antlr";
    const topLevelAncestorIsUpstreamComponentPurlFull =
      "pkg:maven/antlr/antlr@2.7.7.redhat-7?type=jar";
    const topLevelAncestorIsUpstreamProductCpe =
      "cpe:/a:redhat:jboss_enterprise_application_platform_els:7.4::el8";
    const topLevelAncestorIsUpstreamProductCpeFull =
      "cpe:/a:redhat:jboss_enterprise_application_platform_els:7.4:*:el8:*";

    test.beforeAll(async ({ axios }) => {
      const fullSbomPaths = getFullSbomPaths(
        sbomDir,
        topLevelAncestorIsUpstreamSboms,
      );
      const ids = await uploadFiles(axios, "sbom", fullSbomPaths);
      sbomIdsTopLevelAncestorIsUpstream.push(...ids);
    });

    test.afterAll(async ({ axios }) => {
      await deleteSboms(axios, sbomIdsTopLevelAncestorIsUpstream);
    });

    test(
      "Get product by CPE",
      {
        annotation: {
          type: "issue",
          description: "https://issues.redhat.com/browse/TC-3624",
        },
      },
      async ({ axios }) => {
        const urlEncodedComponentCpe = encodeURIComponent(
          topLevelAncestorIsUpstreamProductCpe,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component/${urlEncodedComponentCpe}?descendants=100`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              cpe: expect.arrayContaining([
                topLevelAncestorIsUpstreamProductCpeFull,
              ]),
              descendants: expect.arrayContaining([
                expect.objectContaining({
                  descendants: expect.arrayContaining([
                    expect.objectContaining({
                      descendants: expect.arrayContaining([
                        expect.objectContaining({
                          descendants: expect.arrayContaining([
                            expect.objectContaining({
                              descendants: expect.arrayContaining([
                                expect.objectContaining({
                                  purl: expect.arrayContaining([
                                    topLevelAncestorIsUpstreamComponentPurlFull,
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
            }),
          ]),
        );
      },
    );

    test(
      "Get component by pURL",
      {
        annotation: {
          type: "issue",
          description: "https://issues.redhat.com/browse/TC-3624",
        },
      },
      async ({ axios }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          topLevelAncestorIsUpstreamComponentPurl,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?ancestors=100&q=purl~${urlEncodedComponentPurl}&limit=100&offset=0`,
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              purl: expect.arrayContaining([
                topLevelAncestorIsUpstreamComponentPurlFull,
              ]),
              ancestors: expect.arrayContaining([
                expect.objectContaining({
                  ancestors: expect.arrayContaining([
                    expect.objectContaining({
                      ancestors: expect.arrayContaining([
                        expect.objectContaining({
                          ancestors: expect.arrayContaining([
                            expect.objectContaining({
                              ancestors: expect.arrayContaining([
                                expect.objectContaining({
                                  cpe: expect.arrayContaining([
                                    topLevelAncestorIsUpstreamProductCpeFull,
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
            }),
          ]),
        );
      },
    );
  });

  test.describe("Creator is 'Red Hat'", () => {
    const sbomIdsCreatorIsRedHat: string[] = [];

    const creatorIsRedHatSboms = [
      "ocp-tools-4.12.json.bz2",
      "ocp-tools-4.13.json.bz2",
      "ocp-tools-4.14.json.bz2",
    ];
    const creatorIsRedHatComponentPurl = "pkg:rpm/redhat/jenkins-2-plugins";
    const creatorIsRedHatComponentProductName1 = "ocp-tools-4.14";
    const creatorIsRedHatComponentProductName2 = "ocp-tools-4.13";
    const creatorIsRedHatComponentProductName3 = "ocp-tools-4.12";

    test.beforeAll(async ({ axios }) => {
      const fullSbomPaths = getFullSbomPaths(sbomDir, creatorIsRedHatSboms);
      const ids = await uploadFiles(axios, "sbom", fullSbomPaths);
      sbomIdsCreatorIsRedHat.push(...ids);
    });

    test.afterAll(async ({ axios }) => {
      await deleteSboms(axios, sbomIdsCreatorIsRedHat);
    });

    test(
      "Get component by pURL",
      {
        annotation: {
          type: "issue",
          description: "https://issues.redhat.com/browse/TC-3278",
        },
      },
      async ({ axios }) => {
        const urlEncodedComponentPurl = encodeURIComponent(
          creatorIsRedHatComponentPurl,
        );

        const response = await axios.get(
          `/api/v2/analysis/latest/component?q=purl~${urlEncodedComponentPurl}&limit=100&ancestors=100`,
        );

        // The SBOM containing this product has incorrect creator data and therefore should not be included in the results.
        expect(response.data.items).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              product_name: creatorIsRedHatComponentProductName1,
            }),
          ]),
        );

        expect(response.data.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              product_name: creatorIsRedHatComponentProductName2,
            }),
            expect.objectContaining({
              product_name: creatorIsRedHatComponentProductName3,
            }),
          ]),
        );
      },
    );
  });
});
