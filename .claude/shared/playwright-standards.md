# Playwright Test Standards for Trustify UI

This document contains core Playwright test validation rules and code quality standards for vanilla Playwright tests (`.spec.ts`, `.test.ts`).

**Used by:**
- `.claude/agents/playwright-test-reviewer.md`
- `.claude/agents/bdd-test-reviewer.md` (via playwright-test-reviewer)
- `.github/chatmodes/playwright-tester.chatmode.md`

**For BDD-specific standards** (playwright-bdd, step definitions, Gherkin), see [bdd-standards.md](./bdd-standards.md).

---

## 1. Import Order (MANDATORY)

Required order with blank lines between groups:

1. **Playwright core block**: `@playwright/test` imports (test, expect)
2. **Assertions block**: Custom expect from assertions (overrides base expect)
3. **Helpers block**: Helper classes (SearchPage, ToolbarTable, DetailsPage, etc.)
4. **Page objects block**: Specific page objects (AdvisoryListPage, SBOMListPage, etc.)
5. **Utilities block**: Other utilities, types, constants

### Example

```typescript
import { test } from "@playwright/test";

import { expect } from "../assertions";

import { ToolbarTable } from "../helpers/ToolbarTable";
import { SearchPage } from "../helpers/SearchPage";

import { AdvisoryListPage } from "../pages/advisory-list/AdvisoryListPage";
import { SbomListPage } from "../pages/sbom-list/SbomListPage";

import type { FilterCategory } from "../types";
```

**Note**: If using custom fixtures, import `test` from fixtures instead:

```typescript
import { test } from "../fixtures";
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
import { AdvisoryListPage } from "../pages/advisory-list/AdvisoryListPage";
import { SbomDetailsPage } from "../pages/sbom-details/SbomDetailsPage";

test("should display advisory list", async ({ page }) => {
  // ✅ GOOD - List pages via build()
  const listPage = await AdvisoryListPage.build(page);
  // listPage is now ready to use
});

test("should display SBOM details", async ({ page }) => {
  // ✅ GOOD - Details pages via build()
  const detailsPage = await SbomDetailsPage.build(page, "example-sbom");
  // detailsPage is now ready to use
});
```

### Pattern B: fromCurrentPage Method

Use when already on the page (e.g., after clicking from a list):

```typescript
import { SbomDetailsPage } from "../pages/sbom-details/SbomDetailsPage";

test("should navigate to details page", async ({ page }) => {
  const listPage = await SbomListPage.build(page);
  await listPage.clickRow("example-sbom");

  // ✅ GOOD - Use when you clicked from a list or are already on the page
  const detailsPage = await SbomDetailsPage.fromCurrentPage(page);
  // detailsPage is now ready to use
});

test("should verify SBOM name in details", async ({ page }) => {
  // ✅ GOOD - With optional verification parameter
  const detailsPage = await SbomDetailsPage.fromCurrentPage(page, "example-sbom");
  // Verifies page header matches "example-sbom"
});
```

### ❌ BAD - Direct DOM Manipulation

**NEVER do this:**

```typescript
// ❌ BAD - Direct navigation without page object
test("should navigate to advisories", async ({ page }) => {
  await page.goto("/advisories");
  await page.waitForSelector("table");
});

// ❌ BAD - Direct locator queries instead of page object
test("should click on advisory", async ({ page }) => {
  const table = page.locator(`table[aria-label="Advisory table"]`);
  const row = table.locator("tbody tr").filter({ hasText: "RHSA-2024:1234" });
  await row.click();
});

// ❌ BAD - Manual element selection
await page.getByRole("tab", { name: "Advisories" }).click();
const table = page.locator(`table[aria-label="Advisory table"]`);
```

---

## 3. Custom Assertions (CRITICAL)

**NEVER use manual DOM queries. ALWAYS use custom assertions from `e2e/tests/ui/assertions/`**

### Import

```typescript
import { expect } from "../assertions";
```

**NEVER import expect from `@playwright/test`** when custom assertions are available - always use the typed custom expect.

### Usage

```typescript
// ✅ GOOD - Custom assertion for table row count
await expect(page).toHaveTableRowCount('advisory-table', 5);

// ✅ GOOD - Custom assertion for toolbar filter
await expect(page).toHaveToolbarFilter('Status', 'Active');

// ✅ GOOD - Custom assertion for pagination
await expect(page).toHavePagination(1, 10, 50);

// ✅ GOOD - Custom assertion for tab selection
await expect(page).toHaveSelectedTab('Overview');

// ✅ GOOD - Custom assertion for breadcrumb
await expect(page).toHaveBreadcrumb(['Home', 'SBOMs', 'Details']);
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

// ❌ BAD - Using Playwright's base expect instead of custom
import { expect } from '@playwright/test';  // Wrong!

// ❌ BAD - Manual text verification
const text = await page.locator('.header').textContent();
expect(text).toBe('Expected Text');
```

### If Custom Assertion Doesn't Exist

If you need an assertion that doesn't exist, **recommend creating one** rather than writing inline verification logic. Custom assertions:
- Improve test readability
- Provide better error messages
- Centralize verification logic
- Make tests more maintainable

---

## 4. Code Quality Standards

### TypeScript Requirements

- **Strict mode enabled**
- Proper TypeScript types (avoid `any`)
- Use proper types for parameters: `string`, `number`, `boolean`, etc.
- Async/await patterns for all asynchronous operations
- No unused imports or variables
- Clear, descriptive variable names

**Example:**

```typescript
test("should filter advisories by severity", async ({ page }) => {
  const listPage = await AdvisoryListPage.build(page);  // ✅ Typed variable
  const severity: string = "Critical";                   // ✅ Explicit type
  await listPage.filterBySeverity(severity);
  await expect(page).toHaveToolbarFilter('Severity', severity);
});
```

### Linting and Formatting

- **Linter**: Biome (config: `biome.json` in project root)
- **String quotes**: Double quotes for all strings
- **Indentation**: Spaces (not tabs)
- **Import organization**: Manual control (follow order above)

### Code Style

- Use `const` for variables that don't change
- Use `let` for variables that change (avoid `var`)
- Prefer arrow functions for callbacks
- Use template literals for string interpolation
- Proper error handling with try/catch where appropriate
- Clear variable names (e.g., `listPage` not `lp`)
- Avoid unnecessary comments (code should be self-documenting)

---

## 5. Wait Strategies

### Best Practices

- **Use page object methods** that handle waits internally
- **Avoid hard-coded timeouts**: No `page.waitForTimeout(5000)`
- Use `waitFor()` or `waitForLoadState()` when necessary
- Trust page object async methods to handle timing
- Rely on Playwright's auto-waiting for most interactions

### ✅ GOOD

```typescript
// Page object methods handle waits internally
const listPage = await AdvisoryListPage.build(page);  // Waits for page load
const table = await listPage.getTable();              // Waits for table

// Explicit wait when needed (rare cases)
await page.waitForLoadState('networkidle');
await page.waitForURL('**/advisories');

// Let page objects handle timing
await listPage.filterBySeverity("Critical");  // Internal waits
```

### ❌ BAD

```typescript
// ❌ Hard-coded timeout
await page.waitForTimeout(3000);
await page.click("button");

// ❌ Unnecessary explicit waits (Playwright auto-waits)
await page.waitForSelector('table');
const table = page.locator('table');

// ❌ Multiple sequential waits
await page.waitForLoadState('load');
await page.waitForLoadState('domcontentloaded');
await page.waitForSelector('tbody');
```

---

## 6. Test Structure and Best Practices

### Test Structure

- Use descriptive test names that clearly state what is being verified
- Follow the **Arrange-Act-Assert** pattern
- Group related tests in `test.describe` blocks
- Use `test.beforeEach`/`test.afterEach` for common setup/teardown
- Keep tests focused on a single behavior

**Example:**

```typescript
test.describe("Advisory List - Filtering", () => {
  test.beforeEach(async ({ page }) => {
    // Arrange - common setup
    await AdvisoryListPage.build(page);
  });

  test("should filter by severity", async ({ page }) => {
    // Arrange
    const listPage = await AdvisoryListPage.fromCurrentPage(page);

    // Act
    await listPage.filterBySeverity("Critical");

    // Assert
    await expect(page).toHaveToolbarFilter('Severity', 'Critical');
    await expect(page).toHaveTableRowCount('advisory-table', 5);
  });

  test("should clear filters", async ({ page }) => {
    const listPage = await AdvisoryListPage.fromCurrentPage(page);
    await listPage.filterBySeverity("Critical");

    // Act
    await listPage.clearFilters();

    // Assert
    await expect(page).toHaveToolbarFilter('Severity', undefined);
  });
});
```

### Quality Standards

- Tests must be **deterministic** (not rely on timing or order)
- Tests should be **independent** and runnable in any order
- Tests should **fail with clear, actionable error messages**
- Avoid test interdependencies
- No flaky tests - use proper wait strategies
- Clean up test data if needed (use afterEach hooks)

### Test Organization

```
e2e/tests/ui/pages/
├── advisory-list/
│   ├── AdvisoryListPage.ts        # Page object
│   ├── columns.spec.ts            # Column tests
│   ├── filters.spec.ts            # Filter tests
│   ├── pagination.spec.ts         # Pagination tests
│   └── sorting.spec.ts            # Sorting tests
```

- Group related tests by feature (columns, filters, pagination, sorting)
- One `describe` block per feature being tested
- Clear test names that describe the expected behavior

---

## 7. Severity Levels for Issues

When reviewing code, classify issues by severity:

### CRITICAL (Must fix)

- Missing custom assertions import
- Direct DOM manipulation (`page.locator()`, `page.getByRole()`) instead of page objects
- Not using static async `build()` or `fromCurrentPage()` for page objects
- Manual element counting without custom assertions
- Security issues or unsafe patterns
- Hard-coded timeouts (`waitForTimeout`)

### HIGH (Should fix)

- Wrong import order
- Missing page object usage in some places
- Not using custom assertions where available
- Incorrect TypeScript types
- Unused imports or variables

### MEDIUM (Nice to fix)

- Could use more descriptive variable names
- Missing TypeScript types (when not critical)
- Code style inconsistencies
- Could be more concise
- Test structure could be improved

### LOW (Optional)

- Minor formatting inconsistencies
- Could use better test organization
- Non-critical optimizations
- Comment improvements

---

## 8. Quick Reference Checklist

Use this checklist when generating or reviewing vanilla Playwright tests:

- [ ] **Import order**: Correct groups with blank lines (Playwright core, assertions, helpers, page objects, utilities)
- [ ] **Custom assertions**: Imported from `../assertions` (not `@playwright/test`)
- [ ] **Page objects**: Using static async `build()` or `fromCurrentPage()`
- [ ] **No direct DOM**: No `page.locator()` or `page.getByRole()` for main interactions
- [ ] **TypeScript**: Proper types, no `any`, no unused imports
- [ ] **Code style**: Double quotes, spaces, clean code
- [ ] **Wait strategies**: No hard-coded timeouts (`waitForTimeout`)
- [ ] **Test structure**: Arrange-Act-Assert, clear names, focused tests
- [ ] **Test independence**: Tests can run in any order
- [ ] **Error messages**: Failures provide clear, actionable information

---

## Additional Resources

- **BDD Standards**: See [bdd-standards.md](./bdd-standards.md) for playwright-bdd, step definitions, and Gherkin
- **Test Architecture**: See `CLAUDE.md` for full project context
- **Page Objects**: Located in `e2e/tests/ui/pages/`
- **Custom Assertions**: Located in `e2e/tests/ui/assertions/`
- **Helpers**: Located in `e2e/tests/ui/helpers/`
- **Fixtures**: Located in `e2e/tests/ui/fixtures/`

---

**Last Updated**: 2026-01-21
**Version**: 2.0.0 (Split from e2e-test-standards.md)
