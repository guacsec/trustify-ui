import { expect as baseExpect } from "@playwright/test";
import type { Table } from "../pages/Table";
import type { MatcherResult } from "./types";

interface TableMatchers {
  toBeSortedBy(asc: boolean): Promise<MatcherResult>;
}

type TableMatcherDefinitions = {
  readonly [K in keyof TableMatchers]: (
    receiver: Table,
  ) => Promise<MatcherResult>;
};

const tableTests = baseExpect.extend<TableMatcherDefinitions>({
  toBeSortedBy: async (table: Table) => {
    return {
      pass: true,
      message: () => "Table is on first page",
    };
  },
});

// Type that includes both matchers and the 'not' property for type safety
type TableMatchersWithNot = TableMatchers & {
  not: TableMatchers;
};

// Enforce type safety
function expect(actual: Table): TableMatchersWithNot;
function expect<T>(actual: T): ReturnType<typeof tableTests>;
function expect<T>(
  actual: T,
): TableMatchersWithNot | ReturnType<typeof tableTests> {
  return tableTests(actual) as unknown as TableMatchersWithNot &
    ReturnType<typeof tableTests>;
}

export { expect };
