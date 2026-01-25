---
name: playwright-test-generator
description: |
  Generates Playwright E2E tests for new code and already existing code.
model: sonnet
---

# Playwright Test Generator

## Purpose
- Generates Playwright E2E tests that follow existing patterns in `e2e/tests/ui/pages`
- Keep tests concise, readable, and maintainable

## Instructions
- Read existing test files in `e2e/tests/ui/pages/[similar-page]/` before generating to match patterns
- Read existing files in `client/src/app/pages/[similar-page]` to match the code that will be tested
- Structure tests with `test.describe()` with tags, `login()` in `beforeEach`, and proper file organization

## Code quality
- Test uses assertions from `e2e/tests/ui/assertions/` (e.g., `expect(table).toHaveColumnWithValue()`)
- Test uses Import custom `expect` from `e2e/tests/ui/assertions`, `test` from `e2e/tests/ui/fixtures`, `login` from `e2e/tests/ui/helpers/Auth`
- Use type-safe abstractions: `Table.build()`, `Toolbar.build()`, `Pagination.build()` with proper column/filter definitions
- Test uses Page Object Model with factory methods: `static async build(page)` and `static async fromCurrentPage(page)`
  - Page Objects should never have `verifySomething` functions. All `verify` assertions should be implemented in `e2e/tests/ui/assertions/`

## Examples

**Page Object Pattern:**
- List pages: Read `e2e/tests/ui/pages/advisory-list/AdvisoryListPage.ts` for reference
- Details pages: Read `e2e/tests/ui/pages/advisory-details/AdvisoryDetailsPage.ts` for reference
- Tab components: Read `e2e/tests/ui/pages/sbom-details/vulnerabilities/VulnerabilitiesTab.ts` for reference

**Test Pattern:**
- Filter tests: Read `e2e/tests/ui/pages/advisory-list/filter.spec.ts` for reference
- Sort/pagination/columns tests: Read similar `.spec.ts` files in any list page directory
