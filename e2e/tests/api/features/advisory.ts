import { test } from "../fixtures";
import {
  testBasicSort,
  validateDateSorting,
  validateSortDirectionDiffers,
} from "../helpers/sorting-helpers";

test.describe("Advisory sorting validation", () => {
  test("Sort advisories by ID ascending", async ({ axios }) => {
    await testBasicSort(axios, "/api/v2/advisory", "id", "asc");
  });

  test("Sort advisories by ID descending", async ({ axios }) => {
    await validateSortDirectionDiffers(
      axios,
      "/api/v2/advisory",
      "id",
      (item) => item.identifier,
    );
  });

  test("Sort advisories by modified date ascending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v2/advisory",
      "modified",
      "asc",
    );
    validateDateSorting(items, "modified", "ascending");
  });

  test("Sort advisories by modified date descending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v2/advisory",
      "modified",
      "desc",
    );
    validateDateSorting(items, "modified", "descending");
  });
});
