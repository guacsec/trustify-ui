import { expect, test } from "../fixtures";

const analyzeEndpoint = "/api/v3/vulnerability/analyze";
// const recommendEndpoint = "/api/v3/purl/recommend";
const syntheticAdvisoryId = "SYNTHETIC-REMEDIATION-ALL-CATEGORIES";
const multiRemediationPurl =
  "pkg:maven/io.quarkus/quarkus-smallrye-mutiny@3.2.12.Final-redhat-00001";
// const multiRemediationCommunityPurl =
//   "pkg:maven/io.quarkus/quarkus-smallrye-mutiny@3.2.12.Final";
const syntheticCve = "CVE-2024-99999";

const remediationCases = [
  {
    category: "vendor_fix",
    purl: "pkg:maven/io.quarkus/quarkus-core@3.2.12.Final-redhat-00001",
    communityPurl: "pkg:maven/io.quarkus/quarkus-core@3.2.12.Final",
    url: "https://access.redhat.com/errata/SYNTHETIC-2024-0001",
  },
  {
    category: "workaround",
    purl: "pkg:maven/io.quarkus/quarkus-arc@3.2.12.Final-redhat-00001",
    communityPurl: "pkg:maven/io.quarkus/quarkus-arc@3.2.12.Final",
  },
  {
    category: "mitigation",
    purl: "pkg:maven/io.quarkus/quarkus-vertx@3.2.12.Final-redhat-00001",
    communityPurl: "pkg:maven/io.quarkus/quarkus-vertx@3.2.12.Final",
  },
  {
    category: "no_fix_planned",
    purl: "pkg:maven/io.quarkus/quarkus-resteasy@3.2.12.Final-redhat-00001",
    communityPurl: "pkg:maven/io.quarkus/quarkus-resteasy@3.2.12.Final",
  },
  {
    category: "none_available",
    purl: "pkg:maven/io.quarkus/quarkus-hibernate-orm@3.2.12.Final-redhat-00001",
    communityPurl: "pkg:maven/io.quarkus/quarkus-hibernate-orm@3.2.12.Final",
  },
] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findSyntheticPurlStatus(data: Record<string, any>, purl: string) {
  const result = data[purl];
  expect(result, `No result for PURL ${purl}`).toBeDefined();

  const cveEntry = result.details.find(
    (d: { identifier: string }) => d.identifier === syntheticCve,
  );
  expect(cveEntry, `${syntheticCve} not found in response`).toBeDefined();

  const purlStatus = cveEntry.purl_statuses.find(
    (ps: { advisory: { document_id: string } }) =>
      ps.advisory.document_id === syntheticAdvisoryId,
  );
  expect(purlStatus, `Advisory ${syntheticAdvisoryId} not found`).toBeDefined();

  return purlStatus;
}

// function findSyntheticVulnInRecommend(
//   recs: Record<string, any>,
//   communityPurl: string,
// ) {
//   const key = Object.keys(recs).find((k) => k.startsWith(communityPurl));
//   expect(key, `No recommendation key for ${communityPurl}`).toBeDefined();
//
//   const vulnerabilities = recs[key!].flatMap(
//     (e: { vulnerabilities: { id: string; status: string }[] }) =>
//       e.vulnerabilities,
//   );
//   const syntheticVuln = vulnerabilities.find(
//     (v: { id: string }) => v.id === syntheticCve,
//   );
//   expect(
//     syntheticVuln,
//     `${syntheticCve} not found in recommend response for ${communityPurl}`,
//   ).toBeDefined();
//
//   return syntheticVuln;
// }

test.describe("Remediations - POST /v3/vulnerability/analyze", () => {
  for (const { category, purl } of remediationCases) {
    test(`returns ${category} remediation for ${syntheticCve}`, async ({
      axios,
    }) => {
      const res = await axios.post(analyzeEndpoint, { purls: [purl] });

      expect(res.status).toBe(200);
      const ps = findSyntheticPurlStatus(res.data, purl);

      expect(ps.status).toBe("affected");
      expect(ps.remediations).toHaveLength(1);
      expect(ps.remediations[0].category).toBe(category);
    });
  }

  test("url is null when not present in the CSAF remediation", async ({
    axios,
  }) => {
    const { purl } = remediationCases[1]; // workaround — no url field in CSAF
    const res = await axios.post(analyzeEndpoint, { purls: [purl] });

    expect(res.status).toBe(200);
    const ps = findSyntheticPurlStatus(res.data, purl);
    expect(ps.remediations[0].url).toBeNull();
  });

  test("PURL listed in two remediation entries returns both", async ({
    axios,
  }) => {
    const res = await axios.post(analyzeEndpoint, {
      purls: [multiRemediationPurl],
    });

    expect(res.status).toBe(200);
    const ps = findSyntheticPurlStatus(res.data, multiRemediationPurl);

    expect(ps.remediations).toHaveLength(2);
    const categories = ps.remediations.map(
      (r: { category: string }) => r.category,
    );
    expect(categories).toContain("vendor_fix");
    expect(categories).toContain("workaround");
  });

  test("vendor_fix remediation includes the errata URL", async ({ axios }) => {
    const { purl, url } = remediationCases[0];
    const res = await axios.post(analyzeEndpoint, { purls: [purl] });

    expect(res.status).toBe(200);
    const ps = findSyntheticPurlStatus(res.data, purl);
    expect(ps.remediations[0].url).toBe(url);
  });

  test("vendor_fix remediation data field contains the raw CSAF fields", async ({
    axios,
  }) => {
    const { purl, url } = remediationCases[0];
    const res = await axios.post(analyzeEndpoint, { purls: [purl] });

    expect(res.status).toBe(200);
    const ps = findSyntheticPurlStatus(res.data, purl);

    expect(ps.remediations[0]).toMatchObject({
      category: "vendor_fix",
      details: "Update to a patched release of Red Hat build of Quarkus.",
      url,
      data: {
        category: "vendor_fix",
        url,
        details: "Update to a patched release of Red Hat build of Quarkus.",
      },
    });
  });

  test("workaround remediation has null url and non-null data", async ({
    axios,
  }) => {
    const { purl } = remediationCases[1];
    const res = await axios.post(analyzeEndpoint, { purls: [purl] });

    expect(res.status).toBe(200);
    const ps = findSyntheticPurlStatus(res.data, purl);

    expect(ps.remediations[0]).toMatchObject({
      category: "workaround",
      details:
        "Disable the affected CDI extension in the application configuration as a temporary workaround.",
      url: null,
      data: {
        category: "workaround",
        details:
          "Disable the affected CDI extension in the application configuration as a temporary workaround.",
      },
    });
    expect(ps.remediations[0].data.url).toBeUndefined();
  });

  test("all five categories are returned in a single multi-PURL request", async ({
    axios,
  }) => {
    const allPurls = remediationCases.map((c) => c.purl);
    const res = await axios.post(analyzeEndpoint, { purls: allPurls });

    expect(res.status).toBe(200);
    expect(Object.keys(res.data)).toHaveLength(allPurls.length);

    for (const { purl, category } of remediationCases) {
      const ps = findSyntheticPurlStatus(res.data, purl);
      expect(ps.remediations[0].category).toBe(category);
    }
  });

  test("version_range reflects the exact affected version", async ({
    axios,
  }) => {
    const res = await axios.post(analyzeEndpoint, {
      purls: [remediationCases[0].purl],
    });

    expect(res.status).toBe(200);
    const ps = findSyntheticPurlStatus(res.data, remediationCases[0].purl);

    expect(ps.version_range).toMatchObject({
      low_version: "3.2.12.Final-redhat-00001",
      high_version: "3.2.12.Final-redhat-00001",
      low_inclusive: true,
      high_inclusive: true,
    });
  });
});

// test.describe("Remediations - POST /v3/purl/recommend", () => {
//   const communityPurl = remediationCases[0].communityPurl;
//   const rhPurl = remediationCases[0].purl;
//
//   test("recommendation entry package field is the RH-versioned PURL", async ({
//     axios,
//   }) => {
//     const res = await axios.post(recommendEndpoint, {
//       purls: [communityPurl],
//     });
//
//     expect(res.status).toBe(200);
//
//     const recs = res.data.recommendations;
//     const key = Object.keys(recs).find((k) => k.startsWith(communityPurl));
//     expect(key).toBeDefined();
//
//     const entry = recs[key!][0];
//     expect(entry.package).toBe(rhPurl);
//   });
//
//   test(`${syntheticCve} appears with Affected status for a known_affected PURL`, async ({
//     axios,
//   }) => {
//     const res = await axios.post(recommendEndpoint, {
//       purls: [communityPurl],
//     });
//
//     expect(res.status).toBe(200);
//
//     const syntheticVuln = findSyntheticVulnInRecommend(
//       res.data.recommendations,
//       communityPurl,
//     );
//
//     expect(syntheticVuln).toMatchObject({
//       id: syntheticCve,
//       status: "Affected",
//     });
//   });
//
//   for (const { category, communityPurl: cpurl } of remediationCases) {
//     test(`returns ${category} remediation for ${syntheticCve}`, async ({
//       axios,
//     }) => {
//       const res = await axios.post(recommendEndpoint, { purls: [cpurl] });
//
//       expect(res.status).toBe(200);
//
//       const syntheticVuln = findSyntheticVulnInRecommend(
//         res.data.recommendations,
//         cpurl,
//       );
//
//       expect(syntheticVuln.remediations).toHaveLength(1);
//       expect(syntheticVuln.remediations[0].category).toBe(category);
//     });
//   }
//
//   test("url is null when not present in the CSAF remediation", async ({
//     axios,
//   }) => {
//     const { communityPurl: cpurl } = remediationCases[1]; // workaround — no url field in CSAF
//     const res = await axios.post(recommendEndpoint, { purls: [cpurl] });
//
//     expect(res.status).toBe(200);
//
//     const syntheticVuln = findSyntheticVulnInRecommend(
//       res.data.recommendations,
//       cpurl,
//     );
//     expect(syntheticVuln.remediations[0].url).toBeNull();
//   });
//
//   test("PURL listed in two remediation entries returns both", async ({
//     axios,
//   }) => {
//     const res = await axios.post(recommendEndpoint, {
//       purls: [multiRemediationCommunityPurl],
//     });
//
//     expect(res.status).toBe(200);
//
//     const syntheticVuln = findSyntheticVulnInRecommend(
//       res.data.recommendations,
//       multiRemediationCommunityPurl,
//     );
//
//     expect(syntheticVuln.remediations).toHaveLength(2);
//     const categories = syntheticVuln.remediations.map(
//       (r: { category: string }) => r.category,
//     );
//     expect(categories).toContain("vendor_fix");
//     expect(categories).toContain("workaround");
//   });
//
//   test("vendor_fix remediation includes the errata URL", async ({ axios }) => {
//     const { communityPurl: cpurl, url } = remediationCases[0];
//     const res = await axios.post(recommendEndpoint, { purls: [cpurl] });
//
//     expect(res.status).toBe(200);
//
//     const syntheticVuln = findSyntheticVulnInRecommend(
//       res.data.recommendations,
//       cpurl,
//     );
//     expect(syntheticVuln.remediations[0].url).toBe(url);
//   });
//
//   test("all five categories are returned in a single multi-PURL request", async ({
//     axios,
//   }) => {
//     const allCommunityPurls = remediationCases.map((c) => c.communityPurl);
//     const res = await axios.post(recommendEndpoint, {
//       purls: allCommunityPurls,
//     });
//
//     expect(res.status).toBe(200);
//
//     for (const { communityPurl: cpurl, category } of remediationCases) {
//       const syntheticVuln = findSyntheticVulnInRecommend(
//         res.data.recommendations,
//         cpurl,
//       );
//       expect(syntheticVuln.remediations[0].category).toBe(category);
//     }
//   });
// });
