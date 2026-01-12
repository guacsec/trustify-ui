---
description: Create E2E test in e2e/tests/ui
argument-hint: Test summary
---

## Context

Parse $ARGUMENTS to get the following values:

- [summary]: Test summary from $ARGUMENTS

## Task

Create E2E Playwright tests based on [summary] and following these guidelines:

- Tests are written under `e2e/tests/ui`

## Review the work

- **Invoke the e2e-test-reviewer subagent** to review your work and implement suggestions where needed/
- Iterate on the review process when needed

## Execute the work

- Execute the generated tests using the command below:
```bash
# Run a single e2e test file (ALWAYS use this format)
CONSOLE_UI_URL=http://localhost:3000 PW_TEST_CONNECT_WS_ENDPOINT=ws://localhost:5001/ npm run e2e:test -- path/to/test.test.ts
```
- Iterate to make the tests pass successfully
