import { logger } from "../../common/constants";
import { expect, test } from "../fixtures";
import { formatTimeElapsed } from "../helpers/general-helpers";

// This is a set of tests that are designed to run againt an Atlas instance, as they assume that certain data is already ingested.

// This is a list of purl which were reported by Atlas as problematic and not returning a response in time.
const purlsReportedByAtlas = [
  "pkg:oci/quay-builder-qemu-rhcos-rhel8",
  "pkg:pypi/pypdf",
  "pkg:pypi/requests",
  "pkg:rpm/redhat/libsoup",
  "pkg:rpm/redhat/harfbuzz",
  "pkg:rpm/redhat/python-setuptools",
  "pkg:maven/com.fasterxml.jackson.core/jackson-databind",
  "pkg:golang/crypto/x509",
  "pkg:golang/k8s.io/api",
];

const purlsCommon = [
  "glibc",
  "openssl",
  "bash",
  "coreutils",
  "systemd",
  "kernel",
  "zlib",
];

const purlsRare = ["sankit", "nbdkit", "stratisd", "tang", "clevis", "libqb"];

const responseTimeout = 600000; // 10 minutes

const purlSets = [
  { name: "Atlas-reported", purls: purlsReportedByAtlas },
  { name: "Common", purls: purlsCommon },
  { name: "Rare", purls: purlsRare },
];

test.describe("Analysis / Latest / Atlas", () => {
  test.skip(
    !process.env.ATLAS_ENV || process.env.ATLAS_ENV !== "true",
    "Skipping Atlas tests - ATLAS_ENV is not set to true.",
  );

  test.describe.configure({ mode: "serial" });

  purlSets.forEach(({ name, purls }) => {
    test.describe(`${name} purls`, () => {
      purls.forEach((purl) => {
        test(`Check if response is received for ${purl}`, async ({
          axios,
        }, testInfo) => {
          testInfo.setTimeout(responseTimeout);

          const startTime = Date.now();

          const urlEncodedPurl = encodeURIComponent(purl);

          const response = await axios.get(
            `/api/v3/analysis/latest/component?q=purl~${urlEncodedPurl}`,
          );

          const endTime = Date.now();
          const formattedTime = formatTimeElapsed(endTime, startTime);

          logger.info(`API call for purl "${purl}" took ${formattedTime}.`);

          expect(response.status).toBe(200);
          expect(response.data).toHaveProperty("items");
        });
      });
    });
  });
});
