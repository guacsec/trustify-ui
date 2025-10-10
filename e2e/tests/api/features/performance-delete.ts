import { logger } from "../../common/constants";
import { test } from "../fixtures";
import { deleteSboms } from "../helpers/delete";
import { writeRequestDurationToFile } from "../helpers/report";
import { uploadSboms } from "../helpers/upload";

const SBOM_DIR = "../features/assets/performance/delete"; // The path is relative to the helpers/upload.ts file.
const SBOM_FILES = [
  "1_devspaces_pluginregistry-rhel8.json.bz2",
  "1_devspaces_server-rhel8.json.bz2",
  "1.46.0-26.el9_4-product.json.bz2",
  "1.46.0-26.el9_4-release.json.bz2",
  "1.46.0-27.el9_4-product.json.bz2",
  "1.46.0-27.el9_4-release.json.bz2",
  "3_quarkus-bom-3.2.6.Final-redhat-00002.json.bz2",
  "3_quarkus-bom-3.2.9.Final-redhat-00003.json.bz2",
  "3_quarkus-bom-3.2.10.Final-redhat-00002.json.bz2",
  "3_quarkus-bom-3.2.11.Final-redhat-00001.json.bz2",
  "3_quarkus-bom-3.2.12.Final-redhat-00002.json.bz2",
  "4_RHEL-9-FAST-DATAPATH.json.bz2",
  "jboss-eap-7_eap74-openjdk8-openshift-rhel8.json.bz2",
  "jboss-eap-7_eap74-openjdk11-openshift-rhel8.json.bz2",
  "quay-builder-qemu-rhcos-rhel-8-amd64.json.bz2",
  "quay-builder-qemu-rhcos-rhel-8-image-index.json.bz2",
  "quay-builder-qemu-rhcos-rhel-8-product.json.bz2",
  "quay-builder-qemu-rhcos-rhel8-v3.14.0-4-binary.json.bz2",
  "quay-builder-qemu-rhcos-rhel8-v3.14.0-4-index.json.bz2",
  "quay-v3.14.0-product.json.bz2",
];

var sbomIds: string[] = [];

const REPORT_FILE_PREFIX = "report-perf-delete-";

test.beforeEach(async ({ axios }) => {
  logger.info("Uploading SBOMs before deletion performance tests.");

  var uploads = await uploadSboms(axios, SBOM_FILES, SBOM_DIR);

  uploads.forEach((upload) => sbomIds.push(upload.id));

  sbomIds.forEach((id) => logger.info(id));

  logger.info(`Uploaded ${sbomIds.length} SBOMs.`);
});

test.skip("@performance Delete / All / Sequential", async ({ axios }) => {
  const currentTimeStamp = Date.now();
  const reportFile = `${REPORT_FILE_PREFIX}sequential-${currentTimeStamp}.csv`;
  var index = 1;

  var duration = "";

  writeRequestDurationToFile(reportFile, "No.", "SBOM ID", "Duration [ms]");

  for (const sbomId of sbomIds) {
    try {
      await axios.delete(`/api/v2/sbom/${sbomId}`).then((response) => {
        duration = String(response.duration);
      });
    } catch (error) {
      logger.error(`SBOM with ID ${sbomId} could not be deleted.`, error);
      duration = "n/a";
    }

    writeRequestDurationToFile(reportFile, String(index), sbomId, duration);
    duration = "";
    index++;
  }
});

test("@performance Delete / All / Parallel", async ({ axios }) => {
  const currentTimeStamp = Date.now();
  const reportFile = `${REPORT_FILE_PREFIX}parallel-${currentTimeStamp}.csv`;

  writeRequestDurationToFile(reportFile, "No.", "SBOM ID", "Duration [ms]");

  const deletionPromises = sbomIds.map(async (sbomId) => {
    const deletePromise = axios
      .delete(`/api/v2/sbom/${sbomId}`)
      .then((response) =>
        writeRequestDurationToFile(
          reportFile,
          "n/a",
          response.data.id,
          String(response.duration),
        ),
      )
      .catch((error) => {
        logger.error(`SBOM with ID ${sbomId} could not be deleted.`, error);
      });

    return deletePromise;
  });

  await Promise.all(deletionPromises);
});

// Re-try deletion of all SBOMs in case some of the SBOMs didn't get deleted during the tests.
test.afterEach(async ({ axios }) => {
  logger.info("Cleaning up SBOMs after deletion performance tests.");

  await deleteSboms(axios, sbomIds).then((success) => {
    if (success) {
      logger.info("All SBOMs were deleted successfully.");
    } else {
      logger.warn(
        "One or more SBOMs could not be deleted. Check the logs and/or consider deleting the SBOMs manually.",
      );
    }
  });

  sbomIds = [];
});
