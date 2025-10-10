import {
  expect,
  type Download,
  type Locator,
  type Page,
} from "@playwright/test";

export const sortArray = (arr: string[], asc: boolean) => {
  let sorted = [...arr].sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true }),
  );
  if (!asc) {
    sorted = sorted.reverse();
  }
  const isSorted = arr.every((val, i) => val === sorted[i]);
  return {
    isSorted,
    sorted,
  };
};

export const expectSort = (arr: string[], asc: boolean) => {
  const { isSorted, sorted } = sortArray(arr, asc);
  expect(
    isSorted,
    `Received: ${arr.join(", ")} \nExpected: ${sorted.join(", ")}`,
  ).toBe(true);
};

/**
 * Verifies a download was successful and optionally checks the filename
 * @param download The Playwright Download object
 * @param expectedFilenamePattern Optional pattern to match in the filename (e.g., ".csv")
 * @param savePath Optional path to save the download (defaults to /tmp/<filename>)
 * @returns The suggested filename
 */
export const verifyDownload = async (
  download: Download,
  savePath?: string,
): Promise<string> => {
  // Get the suggested filename
  const suggestedFilename = download.suggestedFilename();
  // Save the download to verify it completed successfully
  const downloadPath = savePath || `/tmp/${suggestedFilename}`;
  await download.saveAs(downloadPath);
  return suggestedFilename;
};

/**
 * Handles click action that triggers a download and verifies it
 * @param page The Playwright Page object
 * @param clickAction The async function that performs the click
 * @param expectedFilenamePattern Optional pattern to match in the filename (e.g., ".csv")
 * @returns The downloaded filename
 */
export const clickAndVerifyDownload = async (
  page: Page,
  clickAction: () => Promise<void>,
): Promise<string> => {
  // Set up download listener and perform click simultaneously
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }),
    clickAction(),
  ]);
  // Verify the download
  return await verifyDownload(download);
};

/**
 * Verifies comma-delimited expected values against individually rendered elements
 * Useful for comparing lists like qualifiers, tags, labels, severity values, etc.
 * @param containerLocator The container locator (can be a cell, row, or page)
 * @param expectedCsv Comma-delimited string of expected values
 * @param elementSelector Optional selector for elements within container (if not provided, uses containerLocator itself)
 * @param matchMode 'contains' (default) allows partial matches, 'exact' requires exact matches
 * @returns Object with result and collected values for debugging
 */
export const verifyCommaDelimitedValues = async (
  containerLocator: Locator,
  expectedCsv: string,
  elementSelector?: string,
  matchMode: "contains" | "exact" = "contains",
) => {
  // If expected is empty, verify the container is empty
  if (!expectedCsv || expectedCsv.trim() === "") {
    const cellText = await containerLocator.textContent();
    await expect(cellText?.trim() || "").toBe("");
    return { ok: true, actualValues: [] };
  }

  // Parse comma-delimited expected values
  const expectedValues = expectedCsv
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  // Get elements - either from selector or use container directly
  const elements = elementSelector
    ? containerLocator.locator(elementSelector)
    : containerLocator;
  const elementCount = await elements.count();

  // Collect actual values text
  const actualValues: string[] = [];
  for (let i = 0; i < elementCount; i++) {
    const text = await elements.nth(i).textContent();
    if (text?.trim()) {
      actualValues.push(text.trim());
    }
  }

  // Check which expected values are present
  const missing: string[] = [];
  for (const expectedVal of expectedValues) {
    const found =
      matchMode === "exact"
        ? actualValues.includes(expectedVal)
        : actualValues.some(
            (actual) =>
              actual.includes(expectedVal) || expectedVal.includes(actual),
          );

    if (!found) {
      missing.push(expectedVal);
    }
  }

  // Verify all expected values are present
  const result = {
    ok: missing.length === 0,
    actualValues,
    missing: missing.length > 0 ? missing : undefined,
  };

  await expect
    .soft(
      result.ok,
      result.missing?.length
        ? `Missing expected values: ${result.missing.join(", ")}. Actual values: [${actualValues.join(", ")}]`
        : "Values did not match expected pattern",
    )
    .toBeTruthy();
};
