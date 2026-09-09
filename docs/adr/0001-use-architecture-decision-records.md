# 1. Use Architecture Decision Records

Date: 2026-05-20

## Status

Accepted

## Context

As the project grows and contributors change over time, architectural decisions lose context. New team members and AI coding agents need to understand not just what the codebase does, but why specific technical choices were made.

## Decision

We will use Architecture Decision Records (ADRs) as described by Michael Nygard to document significant architectural decisions. ADRs will be stored in `docs/adr/` and numbered sequentially.

## Consequences

- Decisions are documented with context and rationale
- Future contributors and AI agents can understand trade-offs without archaeology
- ADRs are lightweight, version-controlled, and co-located with the code
- Each ADR is immutable once accepted; new decisions supersede old ones
