---
description: Analyze API test coverage against the OpenAPI spec
argument-hint: Optional focus (e.g. "advisory" or "GET /api/v3/sbom" — omit for full report)
---

## Context

Parse $ARGUMENTS to get the following values:

- [focus]: Optional endpoint, domain, or mode from $ARGUMENTS (empty = full analysis)

## Task

Analyze API test coverage by invoking the **api-coverage-analyzer** subagent with [focus] as the scope.

Supported modes:
- **No argument** — full report across all endpoints
- **Domain name** (e.g. `advisory`) — analysis scoped to that domain
- **Endpoint** (e.g. `GET /api/v3/advisory`) — deep dive on a single endpoint
- **`summary`** — metrics and top priorities only
- **`gaps`** — prioritized list of untested endpoints
