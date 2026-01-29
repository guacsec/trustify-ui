---
name: playwright-test-generator
description: |
  Generates Playwright E2E tests for new code and already existing code.
model: sonnet
tools: Read, Grep
skills:
  - playwright
---

# Playwright Test Generator

## Gather context

- Explore `client/src/app/` to gather information of the code that generates the
  page we want to test
- Use `Playwright MCP` to define which pages the test will cover; if it is not
  clear then ask questions until it is clear
- Explore `e2e/tests/ui/` to gather common patterns

## Take action

- Generate Playwright tests for given requirement

## Verify results

- Short summary of coverage and potential gaps.
