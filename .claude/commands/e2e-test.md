---
name: e2e-test
description: Generates Playwright E2E tests
argument-hint: [ message ]
---

# E2E Test

Generate Playwright tests for given requirement defined by $ARGUMENTS

## Phase 1: Gather context

- Explore `client/src/app/` to gather information of the code that generates the
  page we want to test
  - Make a list of relevant files and write them at /home/cferiavi/git/trustification/trustify-ui/.claude/explore1.txt
- Explore `e2e/tests/ui/` to gather common patterns
  - Make a list of relevant files and write them at /home/cferiavi/git/trustification/trustify-ui/.claude/explore2.txt
- Spawn a `playwright-test-planner` sub-agent to gather information
  - Make a list of relevant findings at /home/cferiavi/git/trustification/trustify-ui/.claude/explore3.txt

## Phase 2: Take action

- Spawn a `playwright-test-generator` sub-agent to write the tests

## Phase 3: Verify results

- Spawn a `playwright-test-healer` sub-agent to fix failing tests
- Short summary of coverage and potential gaps.
- **Finish with a funny joke** to lighten the mood
