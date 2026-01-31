---
name: e2e-test
description: Generates Playwright E2E tests
argument-hint: [ message ]
---

# E2E Test

Generate Playwright tests for given requirement defined by $ARGUMENTS

## Phase 1: Gather context

Gather context information and be extremelly concise and sacrifice grammar for the sake of concision:

- Explore `client/src/app/` to gather information of the code that generates the page we want to test
- Explore `e2e/tests/ui/` to gather common patterns

## Phase 2: Take action

- First: Spawn a `playwright-test-planner` sub-agent to draft a plan. Provide the data gathered at "Phase 1" to enrich plan.
  - Ask questions if needed to clarify plan
  - The plan should be extremelly concise and sacrifice grammar for the sake of concision.
- Second: Spawn a `playwright-test-generator` and use the plan from the previous step

## Phase 3: Verify results

- First: Spawn a `playwright-test-healer` sub-agent against the new tests
- Second: Spawn `playwright-test-executor` for executing the tests; provide the generated test file paths and test names as input
  - Execute only new or edited tests. Do not execute untouched tests
  - Verify all tests pass successfully
  - Report final status with test coverage summary
- Third: Final output:
  - Short summary of coverage and potential gaps
  - List of generated test files with pass/fail status
  - Recommendations for additional test scenarios if needed
