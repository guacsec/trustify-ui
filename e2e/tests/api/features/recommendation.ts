import { expect, test } from "../fixtures";

const recommendationsEndpoint = "/api/v2/purl/recommend";

test("Recommendations - Empty PURL list", async ({ axios }) => {
  const res = await axios.post(recommendationsEndpoint, { purls: [] });

  expect(res.status).toBe(200);
  expect(res.data).toMatchObject({
    recommendations: {},
  });
});

test("Recommendations - Single PURL without recommendations", async ({
  axios,
}) => {
  const body = {
    purls: ["pkg:maven/net.minidev/accessors-smart@2.5.1"],
  };

  const res = await axios.post(recommendationsEndpoint, body);

  expect(res.status).toBe(200);
  expect(res.data).toMatchObject({
    recommendations: {
      "pkg:maven/net.minidev/accessors-smart@2.5.1": [],
    },
  });
});

test("Recommendations - Get recommendation for a single PURL", async ({
  axios,
}) => {
  const body = {
    purls: ["pkg:maven/io.quarkus.arc/arc-processor@3.20.2"],
  };

  const res = await axios.post(recommendationsEndpoint, body);

  expect(res.status).toBe(200);

  const recs = res.data.recommendations;
  const returnedKey = Object.keys(recs)[0];

  expect(
    returnedKey.startsWith("pkg:maven/io.quarkus.arc/arc-processor@3.20.2"),
  ).toBe(true);

  const pkg = recs[returnedKey][0].package;

  expect(pkg.split("?")[0]).toBe(
    "pkg:maven/io.quarkus.arc/arc-processor@3.20.2.redhat-00004",
  );
});

test("Recommendations - No duplicate vulnerabilities", async ({ axios }) => {
  const body = {
    purls: ["pkg:maven/io.quarkus.arc/arc-processor@3.20.2"],
  };
  const res = await axios.post(recommendationsEndpoint, body);

  expect(res.status).toBe(200);

  const recs = res.data.recommendations;
  const key = Object.keys(recs)[0];
  const item = recs[key][0];
  const vulnerabilities = item.vulnerabilities;
  const ids = vulnerabilities.map((v: { id: string }) => v.id);
  const uniqueIds = new Set(ids);

  expect(uniqueIds.size).toBe(ids.length);
});

test("Recommendations - Get recommendation for a PURL, which is not in the database", async ({
  axios,
}) => {
  const body = {
    purls: ["pkg:maven/io.quarkus.arc/arc-processor@3.20.3"],
  };

  const res = await axios.post(recommendationsEndpoint, body);

  expect(res.status).toBe(200);

  const recs = res.data.recommendations;
  const returnedKey = Object.keys(recs)[0];

  expect(
    returnedKey.startsWith("pkg:maven/io.quarkus.arc/arc-processor@3.20.3"),
  ).toBe(true);

  const pkg = recs[returnedKey][0].package;

  expect(pkg.split("?")[0]).toBe(
    "pkg:maven/io.quarkus.arc/arc-processor@3.20.3.redhat-00003",
  );
});

test("Recommendations - Two PURLs return two recommendations with packages", async ({
  axios,
}) => {
  const inputPurls = [
    "pkg:maven/io.quarkus.arc/arc-processor@3.20.3",
    "pkg:maven/io.quarkus.arc/arc-processor@3.20.2",
  ];

  const res = await axios.post(recommendationsEndpoint, { purls: inputPurls });

  expect(res.status).toBe(200);

  const recommendations = res.data.recommendations;
  const keys = Object.keys(recommendations);

  expect(keys.length).toBe(2);

  keys.forEach((key) => {
    const recList = recommendations[key];
    expect(recList.length).toBeGreaterThan(0);

    const pkg = recList[0].package;
    const cleanPkg = pkg.split("?")[0];
    const baseInput = key.split("@")[0];

    expect(cleanPkg.startsWith(baseInput)).toBe(true);

    const pkgVersion = cleanPkg.split("@")[1];

    expect(pkgVersion).toMatch(/\.redhat-\d{5}$/);
  });
});

test("Recommendations - Duplicate PURLs return only one recommendation", async ({
  axios,
}) => {
  const inputPurls = [
    "pkg:maven/io.quarkus.arc/arc-processor@3.20.2",
    "pkg:maven/io.quarkus.arc/arc-processor@3.20.2",
  ];

  const res = await axios.post(recommendationsEndpoint, { purls: inputPurls });

  expect(res.status).toBe(200);

  const recommendations = res.data.recommendations;
  const keys = Object.keys(recommendations);

  expect(keys.length).toBe(1);
  expect(keys[0].startsWith(inputPurls[0])).toBe(true);

  const recList = recommendations[keys[0]];
  expect(recList.length).toBeGreaterThan(0);

  const pkg = recList[0].package;
  const cleanPkg = pkg.split("?")[0];
  const baseInput = inputPurls[0].split("@")[0];

  expect(cleanPkg.startsWith(baseInput)).toBe(true);

  const pkgVersion = cleanPkg.split("@")[1];

  expect(pkgVersion).toMatch(/\.redhat-\d{5}$/);
});

test.describe("Recommendation API - Invalid PURL Format", () => {
  const invalidPurls = [
    "maven/io.quarkus.arc/arc-processor@3.20.2",
    "pkg:/arc-processor@3.20.2",
    "pkg:maven/@3.20.2",
    "not_a_purl",
    "",
  ];

  for (const badPurl of invalidPurls) {
    test(`rejects invalid PURL: "${badPurl}"`, async ({ axios }) => {
      const resOrError = await axios
        .post("/api/v2/purl/recommend", { purls: [badPurl] })
        .catch((err) => err.response);

      expect(resOrError.status).toBe(400);
    });
  }
});
