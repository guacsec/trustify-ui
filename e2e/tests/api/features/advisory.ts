import { test } from "../fixtures";
import {
  testBasicSort,
  validateDateSorting,
  validateStringSorting,
} from "../helpers/sorting-helpers";

test.describe("Advisory sorting validation", () => {
  test("Sort advisories by ID ascending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v3/advisory",
      "identifier",
      "asc",
    );
    validateStringSorting(items, "identifier", "ascending");
  });

  test("Sort advisories by ID descending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v3/advisory",
      "identifier",
      "desc",
    );
    validateStringSorting(items, "identifier", "descending");
  });

  test("Sort advisories by modified date ascending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v3/advisory",
      "modified",
      "asc",
    );
    validateDateSorting(items, "modified", "ascending");
  });

  test("Sort advisories by modified date descending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v3/advisory",
      "modified",
      "desc",
    );
    validateDateSorting(items, "modified", "descending");
  });
});
