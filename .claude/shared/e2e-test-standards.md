# E2E Test Standards for Trustify UI

This document contains shared validation rules and code quality standards used across E2E test generation and review workflows.

**Used by:**
- `.claude/agents/e2e-test-reviewer.md`
- `.claude/agents/e2e-test-generator.md`
- `.github/chatmodes/playwright-reviewer.chatmode.md`
- `.github/chatmodes/playwright-tester.chatmode.md`

---

## 1. Import Order (MANDATORY)

Required order with blank lines between groups:

1. **playwright-bdd block**: `createBdd` and related imports
2. **Test fixtures block**: Test fixtures from local fixtures
3. **Assertions block**: Custom expect from assertions
4. **Helpers block**: Helper classes (SearchPage, ToolbarTable, DetailsPage, etc.)
5. **Page objects block**: Specific page objects (AdvisoryListPage, SBOMListPage, etc.)
6. **Utilities block**: Other utilities (DataTable, etc.)

### Example

```typescript
import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

import { ToolbarTable } from "../../helpers/ToolbarTable";
import { SearchPage } from "../../helpers/SearchPage";

import { AdvisoryListPage } from "../../pages/advisory-list/AdvisoryListPage";

export const { Given, When, Then } = createBdd(test);
```

---

## 2. Page Object Construction (CRITICAL)

**NEVER use direct DOM manipulation. ALWAYS use page objects.**

For page objects in `e2e/tests/ui/pages/**/`, ALWAYS use static async `build()` or `fromCurrentPage()` methods.

### Why This Pattern?

- Page object constructors are **private** by design
- Static `build()` methods navigate to the page AND wait for it to load
- `fromCurrentPage()` verifies the page is already loaded and ready
- This pattern ensures pages are fully initialized before interactions
- Prevents flaky tests from race conditions
- Centralizes selectors and makes tests maintainable

### Pattern A: Static Async Build Method

Use when navigating to a page:

```typescript
import { AdvisoryListPage } from "../../pages/advisory-list/AdvisoryListPage";
import { SbomDetailsPage } from "../../pages/sbom-details/SbomDetailsPage";

// ✅ GOOD - List pages via build()
When("User navigates to Advisories page",
  async ({ page }) => {
    const listPage = await AdvisoryListPage.build(page);
    // listPage is now ready to use
  }
);

// ✅ GOOD - Details pages via build()
When("User navigates to SBOM {string} details page",
  async ({ page }, sbomName: string) => {
    const detailsPage = await SbomDetailsPage.build(page, sbomName);
    // detailsPage is now ready to use
  }
);
```

### Pattern B: fromCurrentPage Method

Use when already on the page (e.g., after clicking from a list):

```typescript
import { SbomDetailsPage } from "../../pages/sbom-details/SbomDetailsPage";

// ✅ GOOD - Use when you clicked from a list or are already on the page
When("User is on the SBOM details page",
  async ({ page }) => {
    const detailsPage = await SbomDetailsPage.fromCurrentPage(page);
    // detailsPage is now ready to use
  }
);

// ✅ GOOD - With optional verification parameter
When("User is on the SBOM {string} details page",
  async ({ page }, sbomName: string) => {
    const detailsPage = await SbomDetailsPage.fromCurrentPage(page, sbomName);
    // Verifies page header matches sbomName
  }
);
```

### ❌ BAD - Direct DOM Manipulation

**NEVER do this:**

```typescript
// ❌ BAD - Direct navigation without page object
When("User navigates to Advisories page",
  async ({ page }) => {
    await page.getByRole("tab", { name: "Advisories" }).click();
  }
);

// ❌ BAD - Direct locator queries instead of page object
When("User clicks on advisory {string}",
  async ({ page }, advisoryID: string) => {
    const table = page.locator(`table[aria-label="Advisory table"]`);
    const row = table.locator("tbody tr").filter({ hasText: advisoryID });
    await row.click();
  }
);

// ❌ BAD - Manual element selection
await page.getByRole("tab", { name: "Advisories" }).click();
const table = page.locator(`table[aria-label="Advisory table"]`);
```

---

## 3. Custom Assertions (CRITICAL)

**NEVER use manual DOM queries. ALWAYS use custom assertions from `e2e/tests/ui/assertions/`**

### Import

```typescript
import { expect } from "../../assertions";
```

**NEVER import from `@playwright/test`** - always use the typed custom expect.

### Usage

```typescript
// ✅ GOOD - Custom assertion for table row count
await expect(page).toHaveTableRowCount('advisory-table', 5);

// ✅ GOOD - Custom assertion for toolbar filter
await expect(page).toHaveToolbarFilter('Status', 'Active');

// ✅ GOOD - Custom assertion for pagination
await expect(page).toHavePagination(1, 10, 50);
```

### ❌ BAD - Manual DOM Queries

**NEVER do this:**

```typescript
// ❌ BAD - Manual counting
const rows = await page.locator('tr').count();
expect(rows).toBe(5);

// ❌ BAD - Manual element checking
const filterButton = await page.locator('[data-testid="filter-button"]');
expect(await filterButton.isVisible()).toBe(true);

// ❌ BAD - Using Playwright's base expect
import { expect } from '@playwright/test';  // Wrong!
```

### If Custom Assertion Doesn't Exist

If you need an assertion that doesn't exist, **recommend creating one** rather than writing inline verification logic.

---

## 4. playwright-bdd Pattern (MANDATORY)

Must use local `createBdd(test)` pattern. **NEVER import directly from playwright-bdd.**

### ✅ REQUIRED Pattern

```typescript
import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures";

export const { Given, When, Then } = createBdd(test);
```

### ❌ NEVER DO THIS

```typescript
// ❌ WRONG - Direct import from playwright-bdd
import { Given, When, Then } from "playwright-bdd";
```

### Why?

The local `createBdd(test)` pattern ensures that custom fixtures from `../../fixtures` are available in all step definitions. Direct imports bypass this and cause fixture issues.

---

## 5. Code Quality Standards

### TypeScript Requirements

- **Strict mode enabled**
- Proper TypeScript types (avoid `any`)
- Use proper types for parameters: `string`, `number`, `DataTable`, etc.
- Async/await patterns for all asynchronous operations
- No unused imports or variables
- Clear, descriptive variable names

**Example:**

```typescript
When("User searches for {string} in dedicated search",
  async ({ page }, searchTerm: string) => {  // ✅ Typed parameter
    const searchPage = new SearchPage(page, "Advisories");
    await searchPage.dedicatedSearch(searchTerm);
  }
);
```

### Linting and Formatting

- **Linter**: Biome (config: `biome.json` in project root)
- **String quotes**: Double quotes for all strings
- **Indentation**: Spaces (not tabs)
- **Import organization**: Manual control (not auto-sorted, follow order above)

### Code Style

- Use `const` for variables that don't change
- Use `let` for variables that change (avoid `var`)
- Prefer arrow functions for callbacks
- Use template literals for string interpolation
- Proper error handling with try/catch where appropriate
- Clear variable names (e.g., `searchPage` not `sp`)

---

## 6. Wait Strategies

### Best Practices

- **Use page object methods** that handle waits internally
- **Avoid hard-coded timeouts**: No `page.waitForTimeout(5000)`
- Use `waitFor()` or `waitForLoadState()` when necessary
- Trust page object async methods to handle timing

### ✅ GOOD

```typescript
// Page object methods handle waits internally
const listPage = await AdvisoryListPage.build(page);  // Waits for page load
const table = await listPage.getTable();              // Waits for table

// Explicit wait when needed
await page.waitForLoadState('networkidle');
```

### ❌ BAD

```typescript
// ❌ Hard-coded timeout
await page.waitForTimeout(3000);

// ❌ Unnecessary explicit waits
await page.waitForSelector('table');
const table = page.locator('table');
```

---

## 7. Step Quality

Steps should be **generic, reusable, and parameterized**.

### Guidelines

- **Use parameters**: `{string}`, `{int}` instead of hard-coded values
- **Descriptive names**: Follow Gherkin conventions
- **Atomic**: Focused on single actions
- **Reusable**: Can be used across multiple scenarios
- **Generic**: Not tied to specific test data

### ✅ GOOD - Generic and Parameterized

```typescript
When("User searches for {string} in the dedicated search bar",
  async ({ page }, searchTerm: string) => {
    const searchPage = new SearchPage(page, "Advisories");
    await searchPage.dedicatedSearch(searchTerm);
  }
);

Then("the table should display {int} rows",
  async ({ page }, rowCount: number) => {
    await expect(page).toHaveTableRowCount('main-table', rowCount);
  }
);
```

### ❌ BAD - Hard-coded and Specific

```typescript
When("User searches for RHSA-2024:1234 in the search bar",
  async ({ page }) => {
    await page.locator('#search').fill('RHSA-2024:1234');  // Hard-coded!
  }
);

Then("the table should display 5 rows",
  async ({ page }) => {
    const rows = await page.locator('tbody tr').count();  // Manual query!
    expect(rows).toBe(5);                                  // Hard-coded!
  }
);
```

---

## 8. No Duplicate Step Definitions

**CRITICAL**: Step definitions can be shared across feature directories.

### Rules

- **Always search ALL** `e2e/tests/ui/features/**/*.step.ts` files, not just the current feature directory
- A step defined in `@sbom-explorer` can be used by `@vulnerability-explorer` features
- If a duplicate is found, identify which file has the better implementation
- Recommend removing the duplicate and keeping the better version
- Only create genuinely new steps

### Search Method

Use grep to search for exact step patterns across all .step.ts files:

```bash
grep -r "The Related SBOMs tab loaded with SBOM" e2e/tests/ui/features/**/*.step.ts
```

### Example

```
Step: "The Related SBOMs tab loaded with SBOM {string} with status {string}"

Found in: e2e/tests/ui/features/@sbom-explorer/sbom.step.ts

This step can be reused in @vulnerability-explorer without duplication.
```

---

## 9. Test Structure and Best Practices

### Test Structure

- Use descriptive test names that clearly state what is being verified
- Follow the **Arrange-Act-Assert** pattern
- Group related tests in describe blocks
- Use `beforeEach`/`afterEach` for common setup/teardown

### BDD Tests (playwright-bdd)

- Tests in `e2e/tests/ui/features/` use Gherkin + playwright-bdd
- Step definitions should use page objects and custom assertions
- Keep steps reusable and atomic
- Steps should read naturally in Gherkin format

### Quality Standards

- Tests must be **deterministic** (not rely on timing or order)
- Tests should be **independent** and runnable in any order
- Tests should **fail with clear, actionable error messages**
- Avoid test interdependencies
- No flaky tests - use proper wait strategies

---

## 10. Data Tables and Scenario Outlines

### Data Tables

```gherkin
Then the table should contain:
  | Name  | Version |
  | pkg-a | 1.0.0   |
```

**Implementation:**

```typescript
import { DataTable } from "@cucumber/cucumber";

Then("the table should contain:",
  async ({ page }, dataTable: DataTable) => {
    const data = dataTable.hashes();
    // Verify each row using page objects and custom assertions
  }
);
```

### Scenario Outlines with Examples

```gherkin
Scenario Outline: Filter by <type>
  Examples:
    | type     |
    | severity |
    | status   |
```

**Implementation - Generic parameterized step:**

```typescript
When("User filters by {string}",
  async ({ page }, filterType: string) => {
    const toolbar = new ToolbarTable(page);
    await toolbar.selectFilter(filterType);
  }
);
```

---

## Severity Levels for Issues

When reviewing code, classify issues by severity:

### CRITICAL (Must fix)

- Missing custom assertions import
- Direct playwright-bdd imports (not using local `createBdd`)
- Duplicate step definitions
- Direct DOM manipulation (`page.locator()`, `page.getByRole()`) instead of page objects
- Not using static async `build()` or `fromCurrentPage()` for page objects
- Security issues or unsafe patterns

### HIGH (Should fix)

- Wrong import order
- Manual element counting without custom assertions
- Hard-coded values in steps
- Missing page object usage
- Incorrect TypeScript types

### MEDIUM (Nice to fix)

- Step names could be more generic
- Missing TypeScript types (when not critical)
- Code style issues
- Could be more concise

### LOW (Optional)

- Minor formatting inconsistencies
- Could use better variable names
- Non-critical optimizations

---

## Quick Reference Checklist

Use this checklist when generating or reviewing tests:

- [ ] **Import order**: Correct groups with blank lines
- [ ] **Custom assertions**: Imported from `../../assertions`
- [ ] **Page objects**: Using static async `build()` or `fromCurrentPage()`
- [ ] **No direct DOM**: No `page.locator()` or `page.getByRole()`
- [ ] **playwright-bdd**: Using local `createBdd(test)` pattern
- [ ] **No duplicates**: Searched all .step.ts files
- [ ] **Generic steps**: Using parameters, not hard-coded values
- [ ] **TypeScript**: Proper types, no `any`
- [ ] **Code style**: Double quotes, spaces, clean code
- [ ] **Wait strategies**: No hard-coded timeouts

---

## Additional Resources

- **Test Architecture**: See `CLAUDE.md` for full project context
- **Page Objects**: Located in `e2e/tests/ui/pages/`
- **Custom Assertions**: Located in `e2e/tests/ui/assertions/`
- **Helpers**: Located in `e2e/tests/ui/helpers/`
- **Fixtures**: Located in `e2e/tests/ui/fixtures/`
- **Feature Files**: Located in `e2e/tests/ui/features/**/*.feature`

---

**Last Updated**: 2026-01-21
**Version**: 1.0.0
