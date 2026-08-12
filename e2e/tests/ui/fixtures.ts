import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { test as base } from "playwright-bdd";

const istanbulCLIOutput = join(__dirname, "../../.nyc_output");

export const test = base.extend<{ selectedSbomNames: string[] }>({
  // eslint-disable-next-line no-empty-pattern
  selectedSbomNames: async ({}, use) => {
    // eslint-disable-next-line @eslint-react/rules-of-hooks
    await use([]);
  },
  context: async ({ context }, use, testInfo) => {
    await context.addInitScript(() =>
      window.addEventListener("beforeunload", () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).collectIstanbulCoverage(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          JSON.stringify((window as any).__coverage__),
        ),
      ),
    );

    if (!existsSync(istanbulCLIOutput)) {
      mkdirSync(istanbulCLIOutput, { recursive: true });
    }

    await context.exposeFunction(
      "collectIstanbulCoverage",
      (coverageJSON: string) => {
        if (coverageJSON) {
          const filename = `coverage-${testInfo.workerIndex}-${Date.now()}.json`;
          writeFileSync(join(istanbulCLIOutput, filename), coverageJSON);
        }
      },
    );

    // eslint-disable-next-line @eslint-react/rules-of-hooks
    await use(context);

    for (const page of context.pages()) {
      await page.evaluate(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).collectIstanbulCoverage(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          JSON.stringify((window as any).__coverage__),
        ),
      );
    }
  },
});
