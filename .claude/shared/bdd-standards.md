# BDD Test Standards for Trustify UI

This document contains BDD-specific validation rules and code quality standards for playwright-bdd tests (`.step.ts`) and Gherkin feature files (`.feature`).

**Used by:**
- `.claude/agents/bdd-test-reviewer.md`
- `.claude/agents/e2e-test-generator.md`
- `.github/chatmodes/playwright-tester.chatmode.md`

**For core Playwright standards** (page objects, assertions, waits, test structure), see [playwright-standards.md](./playwright-standards.md).

---

## 1. Import Order for BDD Step Definitions (MANDATORY)

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

import { DataTable } from "@cucumber/cucumber";

export const { Given, When, Then } = createBdd(test);
```

**Note**: playwright-bdd imports MUST come first, before fixtures.

---

## 2. playwright-bdd Pattern (MANDATORY)

Must use local `createBdd(test)` pattern. **NEVER import Given/When/Then directly from playwright-bdd.**

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

// ❌ WRONG - Importing without local test fixtures
import { createBdd, test } from "playwright-bdd";
export const { Given, When, Then } = createBdd(test);
```

### Why?

The local `createBdd(test)` pattern ensures that custom fixtures from `../../fixtures` are available in all step definitions. Direct imports bypass this and cause fixture issues.

**Critical**: ALWAYS verify this pattern in every `.step.ts` file.

---

## 3. Step Quality

Steps should be **generic, reusable, and parameterized**.

### Guidelines

- **Use parameters**: `{string}`, `{int}`, `{float}` instead of hard-coded values
- **Descriptive names**: Follow Gherkin conventions (declarative, not imperative)
- **Atomic**: Focused on single actions
- **Reusable**: Can be used across multiple scenarios and features
- **Generic**: Not tied to specific test data
- **Natural language**: Should read like plain English

### ✅ GOOD - Generic and Parameterized

```typescript
When("User navigates to {string} page",
  async ({ page }, pageName: string) => {
    // Generic navigation step
    await page.goto(`/${pageName.toLowerCase()}`);
  }
);

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

Then("the {string} filter is set to {string}",
  async ({ page }, filterName: string, filterValue: string) => {
    await expect(page).toHaveToolbarFilter(filterName, filterValue);
  }
);
```

### ❌ BAD - Hard-coded and Specific

```typescript
// ❌ Hard-coded value in step text
When("User searches for RHSA-2024:1234 in the search bar",
  async ({ page }) => {
    await page.locator('#search').fill('RHSA-2024:1234');  // Hard-coded!
  }
);

// ❌ Direct DOM manipulation instead of page objects
When("User clicks on the filter button",
  async ({ page }) => {
    await page.locator('[data-testid="filter-button"]').click();
  }
);

// ❌ Hard-coded assertion
Then("the table should display 5 rows",
  async ({ page }) => {
    const rows = await page.locator('tbody tr').count();  // Manual query!
    expect(rows).toBe(5);                                  // Hard-coded!
  }
);

// ❌ Too imperative (UI implementation details)
When("User clicks the dropdown and selects Critical from the Severity menu",
  async ({ page }) => {
    // Too specific to UI implementation
  }
);
```

### Best Practices

- **Declarative** (what to do) over **Imperative** (how to do it)
- Use parameters for all variable data
- Leverage page objects and custom assertions
- Keep steps reusable across features

---

## 4. No Duplicate Step Definitions (CRITICAL)

**Step definitions can be shared across ALL feature directories.**

### Rules

- **Always search ALL** `e2e/tests/ui/features/@*/*.step.ts` files, not just the current feature directory
- A step defined in `@sbom-explorer` can be used by `@vulnerability-explorer` features
- Step definitions are organized in `@*` directories (e.g., `@advisory-explorer/`, `@sbom-explorer/`)
- If a duplicate is found, identify which file has the better implementation
- Recommend removing the duplicate and keeping the better version
- Only create genuinely new steps

### Search Method

Use Grep tool to search for exact step patterns across all .step.ts files in @* directories:

```typescript
// Search for existing step before creating new one
Grep: pattern="User navigates to .* page"
      path="e2e/tests/ui/features"
      glob="@*/*.step.ts"
```

### Example

```
Step: "The Related SBOMs tab loaded with SBOM {string} with status {string}"

Found in: e2e/tests/ui/features/@sbom-explorer/sbom.step.ts

This step can be reused in @vulnerability-explorer without duplication.
```

### Why This Matters

- Reduces maintenance burden
- Ensures consistency across features
- playwright-bdd automatically discovers all steps
- Duplicate steps cause runtime errors

**Critical**: ALWAYS search for duplicates before creating new steps.

---

## 5. Data Tables and Scenario Outlines

### Data Tables

Use for structured data in steps:

```gherkin
Then the table should contain:
  | Name  | Version | License |
  | pkg-a | 1.0.0   | MIT     |
  | pkg-b | 2.0.0   | Apache  |
```

**Implementation:**

```typescript
import { DataTable } from "@cucumber/cucumber";

Then("the table should contain:",
  async ({ page }, dataTable: DataTable) => {
    const rows = dataTable.hashes();  // Array of objects
    for (const row of rows) {
      // Verify each row using page objects and custom assertions
      await expect(page).toHaveTableRow({
        name: row.Name,
        version: row.Version,
        license: row.License
      });
    }
  }
);
```

### Scenario Outlines with Examples

Use for parameterized test scenarios:

```gherkin
Scenario Outline: Filter by <filterType>
  Given User is on the Advisory List page
  When User filters by <filterType> with value "<filterValue>"
  Then the table should display <count> results

  Examples:
    | filterType | filterValue | count |
    | Severity   | Critical    | 5     |
    | Status     | Active      | 10    |
```

**Implementation - Generic parameterized steps:**

```typescript
When("User filters by {string} with value {string}",
  async ({ page }, filterType: string, filterValue: string) => {
    const toolbar = new ToolbarTable(page);
    await toolbar.selectFilter(filterType, filterValue);
  }
);
```

### Best Practices

- Use Data Tables for structured data verification
- Use Scenario Outlines for parameterized scenarios
- Keep Examples concise and meaningful
- Group related examples together
- Ensure step definitions handle all parameter types

---

## 6. Gherkin Standards

### Feature File Structure

```gherkin
@feature-tag
Feature: Feature Name
  As a [role]
  I want to [action]
  So that [benefit]

  Background:
    Given [common setup for all scenarios]

  @scenario-tag
  Scenario: Scenario Name
    Given [context]
    When [action]
    Then [outcome]

  @outline-tag
  Scenario Outline: Parameterized Scenario
    Given [context with <parameter>]
    When [action with <parameter>]
    Then [outcome with <parameter>]

    Examples:
      | parameter | expected |
      | value1    | result1  |
      | value2    | result2  |
```

### Declarative vs Imperative Steps

**✅ GOOD - Declarative (Business Language)**

```gherkin
Scenario: User filters advisories by severity
  Given User is on the Advisory List page
  When User filters by severity "Critical"
  Then the table displays 5 advisories
  And the "Severity" filter shows "Critical"
```

**❌ BAD - Imperative (Implementation Details)**

```gherkin
Scenario: User filters advisories by severity
  Given User navigates to "/advisories"
  When User clicks the "Filter" dropdown
  And User clicks the "Severity" option
  And User clicks the "Critical" checkbox
  And User clicks the "Apply" button
  Then the page shows a table with 5 rows
  And the filter button text is "Severity: Critical"
```

**Why Declarative is Better:**
- Focuses on WHAT, not HOW
- More maintainable (UI changes don't break scenarios)
- Easier to read and understand
- Aligns with business requirements

### Scenario vs Scenario Outline

**Use Scenario Outline when:**
- Testing same behavior with different inputs
- Multiple similar test cases
- Data-driven testing is beneficial

**Use Scenario when:**
- Unique test case
- Complex setup/teardown
- Better readability for single case

**Example - Good use of Scenario Outline:**

```gherkin
Scenario Outline: Filter advisories by different criteria
  Given User is on the Advisory List page
  When User filters by <filterType> with value "<value>"
  Then the table displays <count> results

  Examples:
    | filterType | value    | count |
    | Severity   | Critical | 5     |
    | Severity   | High     | 15    |
    | Status     | Active   | 20    |
```

### Background vs Before Each

**Use Background when:**
- Setup is part of the feature's narrative
- Visible to stakeholders in feature file
- Simple, readable setup steps

**Use Before Each Hook when:**
- Technical setup (database, API mocks)
- Not relevant to feature narrative
- Complex programmatic setup

**Example:**

```gherkin
Feature: Advisory List Filtering

  Background:
    Given User is on the Advisory List page
    And the page has loaded with 50 advisories

  Scenario: Filter by severity
    When User filters by severity "Critical"
    Then the table displays 5 results
```

### Tag Usage

**Common tags:**
- `@slow` - Tests that take longer to run
- `@skip` - Temporarily disabled tests
- `@wip` - Work in progress
- `@smoke` - Smoke tests for CI
- `@regression` - Full regression suite
- `@[feature-name]` - Feature categorization

**Example:**

```gherkin
@advisory-explorer @smoke
Feature: Advisory List

  @filtering @slow
  Scenario: Filter by multiple criteria
    ...

  @skip @wip
  Scenario: Export filtered results
    ...
```

### Gherkin Anti-Patterns

**❌ Avoid These:**

1. **UI Implementation Details in Scenarios**
   ```gherkin
   # ❌ BAD
   When User clicks the button with id "submit-btn"

   # ✅ GOOD
   When User submits the form
   ```

2. **Hard-coded Wait Times**
   ```gherkin
   # ❌ BAD
   And User waits 3 seconds

   # ✅ GOOD - Handle in step definition with proper waits
   Then the results should be displayed
   ```

3. **Brittle Selectors in Step Text**
   ```gherkin
   # ❌ BAD
   When User clicks the element with class "btn-primary"

   # ✅ GOOD
   When User clicks the submit button
   ```

4. **Over-parameterization**
   ```gherkin
   # ❌ BAD
   When User performs "<action>" on "<element>" with "<method>" using "<selector>"

   # ✅ GOOD
   When User filters by severity "Critical"
   ```

5. **Dependent Scenarios**
   ```gherkin
   # ❌ BAD - Scenario 2 depends on Scenario 1
   Scenario: Create advisory
     ...

   Scenario: Edit the advisory created in previous scenario
     ...

   # ✅ GOOD - Each scenario is independent
   Scenario: Create advisory
     ...

   Scenario: Edit advisory
     Given an advisory "RHSA-2024:1234" exists
     When User edits the advisory
     ...
   ```

### Feature File Best Practices

- **One feature per file**
- **Clear, descriptive feature names**
- **User story format** (As a... I want... So that...)
- **Logical scenario organization** (group related scenarios)
- **Meaningful examples** (not just "value1", "value2")
- **Consistent terminology** (use same terms throughout)
- **Avoid technical jargon** (business language)

---

## 7. Severity Levels for Issues

When reviewing BDD code and feature files, classify issues by severity:

### CRITICAL (Must fix)

- Missing custom assertions import
- Direct playwright-bdd imports (not using local `createBdd`)
- Duplicate step definitions across files
- Direct DOM manipulation in steps (instead of page objects)
- Not using static async `build()` or `fromCurrentPage()` for page objects
- Imperative scenarios with UI implementation details

### HIGH (Should fix)

- Wrong import order (playwright-bdd not first)
- Hard-coded values in step definitions
- Missing page object usage
- Steps that are not reusable or generic
- Incorrect TypeScript types
- Scenario outlines that should be regular scenarios (or vice versa)

### MEDIUM (Nice to fix)

- Step names could be more declarative
- Scenarios could be more readable
- Missing TypeScript types (when not critical)
- Code style issues in step definitions
- Examples could be more meaningful
- Tag usage could be improved

### LOW (Optional)

- Minor formatting inconsistencies
- Could use better variable names in steps
- Scenario organization could be improved
- Non-critical comment improvements

---

## 8. Quick Reference Checklist

Use this checklist when generating or reviewing BDD tests:

### For .step.ts Files

- [ ] **Import order**: playwright-bdd first, then fixtures, assertions, helpers, page objects, utilities
- [ ] **playwright-bdd pattern**: Using local `createBdd(test)`, not direct imports
- [ ] **Custom assertions**: Imported from `../../assertions`
- [ ] **Page objects**: Using static async `build()` or `fromCurrentPage()`
- [ ] **No direct DOM**: No `page.locator()` or `page.getByRole()` in steps
- [ ] **Generic steps**: Using parameters `{string}`, `{int}`, not hard-coded values
- [ ] **No duplicates**: Searched ALL .step.ts files for existing steps
- [ ] **TypeScript**: Proper types, no `any`, no unused imports
- [ ] **Code style**: Double quotes, spaces, clean code
- [ ] **Step quality**: Declarative, reusable, atomic

### For .feature Files

- [ ] **Feature structure**: Clear feature name, user story format
- [ ] **Declarative scenarios**: Focus on WHAT, not HOW
- [ ] **No UI details**: No technical implementation in scenario text
- [ ] **Proper Given/When/Then**: Correct use of Gherkin keywords
- [ ] **Scenario Outlines**: Used appropriately with meaningful examples
- [ ] **Background**: Used for common setup, not technical details
- [ ] **Tags**: Appropriate tags (@slow, @smoke, etc.)
- [ ] **Independent scenarios**: No dependencies between scenarios
- [ ] **Consistent terminology**: Same terms used throughout
- [ ] **Readable**: Non-technical stakeholders can understand

---

## 9. Integration with Core Playwright Standards

BDD tests must also follow core Playwright standards from [playwright-standards.md](./playwright-standards.md):

### Core Standards Applied to BDD

1. **Page Object Construction** - All step definitions MUST use page objects with `build()` or `fromCurrentPage()`
2. **Custom Assertions** - All verifications MUST use custom assertions from `../../assertions`
3. **Code Quality** - TypeScript strict mode, proper types, clean code
4. **Wait Strategies** - No hard-coded timeouts, use page object waits
5. **Test Independence** - Each scenario must be independent

### When to Reference Core Standards

- Page object usage → [playwright-standards.md §2](./playwright-standards.md#2-page-object-construction-critical)
- Custom assertions → [playwright-standards.md §3](./playwright-standards.md#3-custom-assertions-critical)
- Code quality → [playwright-standards.md §4](./playwright-standards.md#4-code-quality-standards)
- Wait strategies → [playwright-standards.md §5](./playwright-standards.md#5-wait-strategies)
- Test structure → [playwright-standards.md §6](./playwright-standards.md#6-test-structure-and-best-practices)

**Note**: The bdd-test-reviewer agent will automatically invoke playwright-test-reviewer to check core standards before applying BDD-specific checks.

---

## Additional Resources

- **Playwright Standards**: See [playwright-standards.md](./playwright-standards.md) for core test standards
- **Test Architecture**: See `CLAUDE.md` for full project context
- **Page Objects**: Located in `e2e/tests/ui/pages/`
- **Custom Assertions**: Located in `e2e/tests/ui/assertions/`
- **Helpers**: Located in `e2e/tests/ui/helpers/`
- **Fixtures**: Located in `e2e/tests/ui/fixtures/`
- **Feature Files**: Located in `e2e/tests/ui/features/@*/*.feature` (organized by domain in @* directories)
- **Step Definitions**: Located in `e2e/tests/ui/features/@*/*.step.ts` (same @* directories as feature files)

---

**Last Updated**: 2026-01-21
**Version**: 2.0.0 (Split from e2e-test-standards.md)
