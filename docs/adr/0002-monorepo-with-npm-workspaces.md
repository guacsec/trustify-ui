# 2. Monorepo with npm Workspaces

Date: 2026-05-20

## Status

Accepted

## Context

The application has three distinct concerns: a React frontend (client), an Express production server, and shared configuration/branding logic. These need to share code (environment config, types) while remaining independently buildable. We also need end-to-end tests that span the full stack.

## Decision

Use a single repository with npm workspaces to manage four packages:

- `common/` — shared ESM module for environment config and branding
- `client/` — React frontend application
- `server/` — Express.js production server
- `e2e/` — Playwright end-to-end tests

## Consequences

- Single `npm ci` installs all dependencies with correct hoisting
- Shared code in `common/` avoids duplication between client and server
- Changes across packages can be reviewed and tested in a single PR
- CI runs against all workspaces, catching cross-package breakage early
- Trade-off: root `package.json` scripts must coordinate workspace builds in correct order
