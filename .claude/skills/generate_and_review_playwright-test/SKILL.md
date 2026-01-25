---
name: generate_and_review_playwright_test
description: Generate and Review Tests (Playwright)
argument-hint: [action] [arguments]
disable-model-invocation: false
allowed-tools: Bash(gh *)
---

# Skill: Generate and Review Tests (Playwright)

Purpose:
- Automatically generate Playwright tests for given code.
- Review the generated tests for quality and coverage.

Workflow:
1. Call agent: `test_writer`
   - Input: target source code or feature description.
   - Output: Playwright test files.

2. Call agent: `test_reviewer`
   - Input: generated test code + original source code.
   - Output: feedback and suggested improvements.

3. If improvements are suggested:
   - Apply minimal changes to tests based on reviewer feedback.

Output:
- Final Playwright test code ready to run.
- Short summary of coverage and potential gaps.

Constraints:
- Do not modify production code.
- Prefer minimal, maintainable tests.
- Avoid over-testing UI flows unless critical.
- Do not execute Playwright tests unless explicitly requested.
