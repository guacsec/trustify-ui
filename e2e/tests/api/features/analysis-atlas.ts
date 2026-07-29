import { logger } from "../../common/constants";
import { expect, test } from "../fixtures";
import { formatTimeElapsed } from "../helpers/general-helpers";

// This is a set of tests that are designed to run against an Atlas instance, as they assume that certain data is already ingested.

const responseTimeout = 1200000; // 20 minutes

test.describe("Analysis / Atlas", () => {
  test.skip(
    !process.env.ATLAS_ENV || process.env.ATLAS_ENV !== "true",
    "Skipping Atlas tests - ATLAS_ENV is not set to true.",
  );

  test(
    `Check if response is received for art-images`,
    {
      annotation: {
        type: "issue",
        description: "https://redhat.atlassian.net/browse/TC-4487",
      },
    },
    async ({ axios }, testInfo) => {
      testInfo.setTimeout(responseTimeout);

      const startTime = Date.now();

      const plainTestName = "art-images";
      const urlEncodedName = encodeURIComponent(plainTestName);

      const response = await axios.get(
        `/api/v3/analysis/latest/component?q=name=${urlEncodedName}&limit=10`,
      );

      const endTime = Date.now();
      const formattedTime = formatTimeElapsed(endTime, startTime);

      logger.info(
        `API call for name "${plainTestName}" took ${formattedTime}.`,
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("items");
    },
  );
});
