---
name: playwright
description: Ensures Playwright code follows minimal code standards and patterns
argument-hint: [ message ]
disable-model-invocation: false
---

# Playwright

## Overview

Verifies Playwright code given requirement defined by $ARGUMENTS

## Common patterns

- Test uses Import custom `expect` from `e2e/tests/ui/assertions` and `test`
  from `e2e/tests/ui/fixtures`
- UI tests with `test.describe()` should have `beforeEach` with `login()`
  defined
- Test uses assertions from `e2e/tests/ui/assertions/` (e.g.,
  `expect(table).toHaveColumnWithValue()`)
- Use type-safe abstractions: `Table.build()`, `Toolbar.build()`,
  `Pagination.build()`

## Anti patterns

- Page Objects have `verifySomething` functions. All `verify`
  assertions should be implemented in `e2e/tests/ui/assertions/`
