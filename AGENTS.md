# AGENTS.md

Repository-specific guidance for AI coding agents working on Trustify UI.

## Project Overview

Trustify UI is a React-based web application for software supply chain security (SBOMs, advisories, vulnerabilities). It uses a monorepo structure with npm workspaces and connects to the Trustify backend API.

## Repository Floorplan

Four npm workspaces:

- **`common/`** — Shared ESM module for environment config and branding
  - Exports `TrustificationEnvType`, `encodeEnv`, `decodeEnv`, branding assets
  - Built with Rollup to both ESM (.mjs) and CommonJS (.cjs)
- **`client/`** — React SPA
  - Tech: ReactJS, TypeScript, Vite, PatternFly
  - Dev server: port 3000 with proxy to backend
  - Key paths (with `@app` alias mapping to `client/src/app/`):
    - `@app/Routes.tsx` — route definitions with lazy() imports
    - `@app/pages/` — page components, one directory per page
    - `@app/queries/` — TanStack Query hooks, one file per domain
    - `@app/components/` — shared UI components
    - `@app/hooks/` — custom hooks (table-controls, domain-controls)
    - `@app/api/` — custom REST calls (uploads, downloads)
    - `@app/client/` — **auto-generated API client (DO NOT EDIT)**
    - `@app/axios-config/` — Axios instance and interceptors
- **`server/`** — Express.js production server (proxying, env injection)
- **`e2e/`** — Playwright end-to-end tests
  - `tests/ui/features/` — BDD .feature files (Gherkin)
  - `tests/ui/pages/` — Page Object Model classes
  - `tests/api/` — API-level tests

## Key Commands

```bash
# Install dependencies (always after clone or pulling dependency updates)
npm ci

# Development server (builds common, runs client on :3000)
npm run start:dev

# Type check and lint
npm run lint

# Auto-fix lint and format
npm run lint:fix
npm run format:fix

# Unit tests (Jest)
npm test

# E2E tests (Playwright)
npm run e2e:test:ui      # UI tests
npm run e2e:test:api     # API tests
npm run e2e:test         # Both

# Regenerate OpenAPI client from spec
npm run generate

# Production builds
npm run build
```

## Golden Rules

- **Prefer small, focused changes.** One feature or fix per PR.
- **Follow existing architecture and naming conventions.** Match surrounding code.
- **Do not introduce new dependencies** unless there is a clear, justified reason. Check for existing solutions first.
- **Remove obsolete code** instead of leaving commented-out or dead code behind.
- **Always read files before modifying them.** Context matters.
- **Read [CONVENTIONS.md](CONVENTIONS.md) for detailed coding standards** (naming, imports, file organization, error handling).

## Generated-File Boundaries

**DO NOT EDIT** files in `client/src/app/client/` directly — this directory is auto-generated from the OpenAPI spec.

To update the API client:

1. Update `client/openapi/trustd.yaml` with the new backend spec
2. Run `npm run generate -w client`
3. Follow the [CONVENTIONS.md § Adapting to upstream API changes](CONVENTIONS.md#adapting-to-upstream-api-changes) checklist

## Domain Concepts

- **SBOM (Software Bill of Materials)**: Inventory of software components and dependencies
- **Advisory**: Security advisory (CVE, CSAF, etc.)
- **Vulnerability**: Known security weakness (CVE)
- **Package**: Software package referenced in SBOMs
- **Importer**: Backend job that ingests external data sources

## API and Data-Fetching

- **All list pages use server-side pagination.** Frontend requests one page at a time.
- **Add `total: true`** to request params when calling query hooks that need total counts for pagination.
- **Query hooks** in `queries/` bridge generated SDK functions and normalize responses into `{ result: { data, total }, isFetching, fetchError, refetch }`.
- **Mutations** invalidate related queries automatically via `queryClient.invalidateQueries`.
- **Error handling**: Errors propagate via `fetchError` return value. Use `StateError` component to display.
- **Axios interceptors** (in `axios-config/apiInit.ts`):
  - Read-only mode detection (503)
  - Auth token refresh (401) with silent retry

See [CONVENTIONS.md § API Client Pipeline](CONVENTIONS.md#api-client-pipeline) and [§ Server-Side Pagination](CONVENTIONS.md#server-side-pagination) for full details.

## UI and PatternFly Expectations

- **Use PatternFly 6 components** for all UI (`@patternfly/react-core`, `@patternfly/react-table`).
- **Table controls pattern**: Use `useTableControlState()` + `useTableControlProps()` for pagination/sorting/filtering.
  - State persists to URL params, localStorage, sessionStorage, or React state.
  - Enables shareable URLs with filters/sort/pagination state.
- **List pages** follow: Context provider → Page component → Toolbar + Table.
- **Detail pages** use tab-based layouts. Tab content components **must not** include their own `<PageSection>` wrapper (see [CONVENTIONS.md § Tab content components](CONVENTIONS.md#tab-content-components)).
- **Forms**: Use `react-hook-form` + `yup` validation.
- **Empty states**: Use `StateNoData` and `StateNoResults` components.

See [CONVENTIONS.md § Page Patterns](CONVENTIONS.md#page-patterns) for canonical examples.

## Testing Expectations

### Unit Tests

- Run with `npm test`
- Test files colocated with source code (`.test.ts`, `.test.tsx`)
- Mock API calls and use React Testing Library for component tests

### E2E Tests

- **Two test styles**:
  1. BDD features (`.feature` files + `.step.ts` step definitions)
  2. Spec files (`.spec.ts` organized by concern: columns, filter, sort, pagination, actions)
- **Page Object Model**: Each page has a class (e.g., `SbomListPage`) with `static build()` factory.
- **Custom assertions**: Always prefer custom assertions from `e2e/tests/ui/assertions/` over manual DOM queries.
- **Tags for tiers**: `{ tag: "@tier1" }` for critical paths.

See [CONVENTIONS.md § Testing Conventions](CONVENTIONS.md#testing-conventions) for details.

## Common Pitfalls

- **Forgetting `total: true`**: Server-side pagination requires `total: true` in request params. Omitting it returns `total: null`.
- **Editing generated files**: Never edit `client/src/app/client/` manually. Always regenerate with `npm run generate`.
- **Incorrect import order**: Follow the 5-block import order in [CONVENTIONS.md § Code Style](CONVENTIONS.md#code-style).
- **Wrapping tab content in `<PageSection>`**: Tab content components should not include their own `PageSection` wrapper (detail page provides it).
- **Using `URLSearchParams` for new paginated endpoints**: Use `requestParamsQuery` (plain object) instead of legacy `serializeRequestParamsForHub`.
- **Hardcoding pagination limits**: Use `MAX_ITEMS_PER_PAGE` from `Constants.ts` (mirrors server default).
- **Not running `npm ci` after dependency changes**: Always run after pulling updates to ensure workspace links are correct.

## Authentication Flow

1. OIDC via `react-oidc-context` (configured in `OidcProvider.tsx`)
2. If not authenticated → redirect to OIDC server with state preservation
3. On callback → extract relative path from state, navigate back
4. Token stored in sessionStorage
5. Axios interceptor adds Bearer token to all API requests
6. Automatic silent token renewal on 401 (max 2 retries)

Authentication is optional (controlled by `AUTH_REQUIRED` env var).

## Before Finishing Work

- [ ] Run `npm run lint` — must pass with no warnings
- [ ] Run `npm run format:fix` if formatting issues exist
- [ ] Run `npm test` if touching shared code or hooks
- [ ] Run `npm run e2e:test:ui` if touching UI flows (or relevant subset)
- [ ] Verify no changes to auto-generated `client/src/app/client/` files
- [ ] Check import order follows 5-block convention
- [ ] Ensure commit message follows Conventional Commits format
- [ ] Review PR against Definition of Done below

## PR Definition of Done

- [ ] Code follows existing architecture and naming conventions
- [ ] All linting and formatting checks pass (`npm run lint`)
- [ ] Tests pass (unit and/or E2E as appropriate)
- [ ] No new dependencies added without justification
- [ ] Auto-generated files not manually edited
- [ ] Import order follows convention
- [ ] Commit messages follow Conventional Commits
- [ ] Documentation updated if public API or behavior changes
- [ ] Tab content components do not wrap themselves in `<PageSection>`
- [ ] Server-side paginated endpoints include `total: true` in request params
- [ ] Query hooks handle nullable fields with `?? defaultValue` guards

## Best Practices

- **Read before writing**: Always read existing files to understand patterns
- **Match surrounding code**: Consistency > personal preference
- **Leverage existing patterns**: Table controls, query hooks, page patterns are battle-tested
- **Test the golden path**: Verify the primary user flow works end-to-end
- **Document the why, not the what**: Comments explain non-obvious logic, not syntax
- **Keep PRs focused**: One feature/fix per PR makes review easier
- **Link to conventions**: When unsure, check [CONVENTIONS.md](CONVENTIONS.md) for detailed guidance
