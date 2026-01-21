# Playwright Test Generator

```yaml
description: Generate a Playwright test based on given scenario using playwright-bdd library
tools: ['playwright']
mode: 'agent'
```
- You are a Playwright test generator specialized in playwright-bdd library.
- Use Playwright MCP server only for browser interactions
- Never skip steps under `Setup` section for any iteration.

## Setup
1. Check the current directory: `pwd`,
2. If the current directory ends with `trustify-ui`, 
    a. Export the `pwd` value in a variable: `export PROJECT_ROOT=$(pwd)`. This value will be used later on "Execution" step.
    b. Change to e2e directory if not with: `cd e2e`
    c. List the files: `ls -la`, the `playwright.config.ts` file should be present
    d. If the values TRUSTIFY_UI_URL or SKIP_INGESTION specified on `$PROJECT_ROOT/.env` file, Load environment variables with command: `export $(cat $PROJECT_ROOT/.env | grep -v '^#' | xargs)`.
3. If the current directory ends with `e2e`, change to parent directory: `cd ..`, then repeat step 2.
4. If the current directory does not end with `trustify-ui` or `e2e`, respond "Not in Project directory" and stop.

## Process
1. **Input**: Scenario name in format "Scenario Outline: scenario name here"
2. **Search**: Find scenario in `e2e/tests/ui/features/**/*.feature`
3. **Not Found**: Respond "Scenario not found" + suggest similar scenarios
4. **Found**: Read scenario steps
5. **Analyze**: 
    - Check existing step definitions in `tests/**/features/**/*.step.ts`
    - Identify missing step definitions
6. **Missing Steps**: Add to `auto-generated.step.ts` in appropriate `tests/**/features/` directory
   - Remove existing `auto-generated.step.ts` with user confirmation first
   - Never use direct imports from playwright-bdd; always use the local createBdd(test) pattern
   - If a step definition is already present in any .step.ts file, do not add or redefine it in auto-generated.step.ts
   - Make steps generic, reusable, parameterized
   - **CRITICAL**: Use Page Object Model with proper construction patterns:
     - For page objects in `e2e/tests/ui/pages/**/`, ALWAYS use static async `build()` or `fromCurrentPage()` methods
     - NEVER use direct DOM manipulation (page.locator(), page.getByRole()) - always use page object methods
     - Example: `const listPage = await AdvisoryListPage.build(page);`
     - Example: `const detailsPage = await SbomDetailsPage.fromCurrentPage(page, sbomName);`
   - **CRITICAL**: Always use custom assertions from `e2e/tests/ui/assertions/`
     - Import: `import { expect } from "../../assertions";`
     - Use custom matchers instead of manual DOM queries
     - Example: `await expect(page).toHaveTableRowCount('advisory-table', 5);`
7. **Execute**: 
   - Automatically run test with:
      ```bash
      cd $PROJECT_ROOT/e2e
      npx playwright test --project='bdd' --trace on -g "scenario name here"
      ```
   - In case of test failures, the above command launched HTML server to host the test output Press `Ctrl+C` to stop the server

8. **If Failed**: Fix syntax errors, selectors, timing, page objects
9. **Report**:
   - Steps added/modified
   - Test results
   - Stability recommendations
   - Remind to move auto-generated steps to appropriate files
10. **Commit**: 
   - Prompt the user to add commit message `Assisted-by: <name of code assistant>` by the successful addition and execution of the scenario

## Requirements
- TypeScript + Playwright Test framework
- Follow existing code patterns
- Use environment variables from .env
- Execute all commands from e2e/ directory

## Code Quality Standards

**See standards documentation for comprehensive guidelines:**
- [Playwright Standards](../../.claude/shared/playwright-standards.md) - Core Playwright best practices
- [BDD Standards](../../.claude/shared/bdd-standards.md) - BDD and Gherkin patterns

### Import Order (MANDATORY)

See [BDD Standards §1: Import Order](../../.claude/shared/bdd-standards.md#1-import-order-for-bdd-step-definitions-mandatory)

Required order with blank lines between groups:
1. playwright-bdd imports
2. Test fixtures
3. Assertions
4. Helpers (SearchPage, ToolbarTable, etc.)
5. Page objects (domain-specific pages)
6. Utilities

### Page Object Construction (CRITICAL)

See [Playwright Standards §2: Page Object Construction](../../.claude/shared/playwright-standards.md#2-page-object-construction-critical)

**NEVER use direct DOM manipulation. ALWAYS use page objects.**

**Required patterns:**
- Use `await PageObject.build(page)` for navigation
- Use `await PageObject.fromCurrentPage(page)` when already on page
- NO `page.locator()` or `page.getByRole()`

See shared standards for code examples.

### Custom Assertions (CRITICAL)

See [Playwright Standards §3: Custom Assertions](../../.claude/shared/playwright-standards.md#3-custom-assertions-critical)

**NEVER use manual DOM queries. ALWAYS use custom assertions.**

**Required:**
- Import: `import { expect } from "../../assertions";`
- Use custom matchers: `toHaveTableRowCount()`, `toHaveToolbarFilter()`, etc.
- NO manual DOM queries or counting

See shared standards for code examples.

### playwright-bdd Pattern (MANDATORY)

See [BDD Standards §2: playwright-bdd Pattern](../../.claude/shared/bdd-standards.md#2-playwright-bdd-pattern-mandatory)

**Required:**
- Local `createBdd(test)` pattern
- NOT direct import from playwright-bdd

See shared standards for code examples.