# AGENTS.md

Repository-specific guidance for AI coding agents working on Trustify UI.

## Project Overview

Trustify UI is a React-based web application for software supply chain security (SBOMs, advisories, vulnerabilities). It uses a monorepo structure with npm workspaces and connects to the Trustify backend API. See [CONVENTIONS.md](CONVENTIONS.md) for detailed coding standards (naming, imports, file organization, error handling).

## Domain Concepts

- **SBOM (Software Bill of Materials)**: Inventory of software components and dependencies
- **Advisory**: Security advisory (CVE, CSAF, etc.)
- **Vulnerability**: Known security weakness (CVE)
- **Package**: Software package referenced in SBOMs
- **Importer**: Backend job that ingests external data sources

## Repository Architecture

Four npm workspaces (`@app` alias maps to `client/src/app/`):

```
├── common/                   # shared ESM module (branding, env config)
│                             #   built with Rollup → ESM (.mjs) + CJS (.cjs)
├── client/                   # React SPA (Vite, TypeScript, PatternFly)
│   └── src/app/              #   dev server: port 3000 with proxy to backend
│       ├── Routes.tsx        # route definitions with lazy() imports
│       ├── pages/            # page components, one directory per page
│       ├── queries/          # TanStack Query hooks, one file per domain
│       ├── components/       # shared UI components
│       ├── hooks/            # custom hooks (table-controls, domain-controls)
│       ├── api/              # custom REST calls (uploads, downloads)
│       ├── client/           # auto-generated API client (DO NOT EDIT)
│       └── axios-config/     # Axios instance and interceptors
├── server/                   # Express.js production server (proxying, env injection)
└── e2e/                      # Playwright end-to-end tests
    └── tests/
        ├── ui/features/      # BDD .feature files (Gherkin)
        ├── ui/pages/         # Page Object Model classes
        └── api/              # API-level tests
```

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

# Unit tests (Vitest)
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

## Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/docs/)
- **UI framework**: [React](https://react.dev/learn)
- **Component library**: [PatternFly](https://www.patternfly.org/) (`@patternfly/react-core`, `@patternfly/react-table`)
- **Build**: [Vite](https://vite.dev/guide/) (client), [Rollup](https://rollupjs.org/) (common, server)
- **Routing**: [react-router-dom](https://reactrouter.com/) with lazy-loaded routes
- **Data fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **HTTP client**: [Axios](https://axios-http.com/)
- **API client codegen**: [@hey-api/openapi-ts](https://heyapi.dev/)
- **Forms**: [react-hook-form](https://react-hook-form.com/) + [yup](https://github.com/jquense/yup)
- **Auth**: [react-oidc-context](https://github.com/authts/react-oidc-context) + [oidc-client-ts](https://github.com/authts/oidc-client-ts)
- **Unit testing**: [Vitest](https://vitest.dev/)
- **E2E testing**: [Playwright](https://playwright.dev/) + [playwright-bdd](https://vitalets.github.io/playwright-bdd/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Package manager**: [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)

### PatternFly & UI Patterns

- **Use PatternFly components** for all UI.
- **Table controls pattern**: Use `useTableControlState()` + `useTableControlProps()` for pagination/sorting/filtering.
  - State persists to URL params, localStorage, sessionStorage, or React state.
  - Enables shareable URLs with filters/sort/pagination state.
- **List pages** follow: Context provider → Page component → Toolbar + Table.
- **Detail pages** use tab-based layouts. Tab content components **must not** include their own `<PageSection>` wrapper.
- **Forms**: Use `react-hook-form` + `yup` validation.
- **Empty states**: Use `StateNoData` and `StateNoResults` components.

### API & Data Fetching

- **Generated SDK**: `@hey-api/openapi-ts` generates types and SDK functions from the OpenAPI spec into `client/src/app/client/` (DO NOT EDIT).
- **Query hooks** in `queries/` wrap generated SDK calls with TanStack React Query (`useQuery`/`useMutation`) and normalize responses into `{ result: { data, total, params }, isFetching, fetchError, refetch }`.
- **Mutations** invalidate related queries automatically via `queryClient.invalidateQueries`.
- **Server-side pagination**: all list pages request one page at a time.
- **Axios interceptors** (`axios-config/apiInit.ts`): read-only mode detection (503), auth token refresh (401) with silent retry.

## Testing

### Unit Tests (Vitest)

- Run with `npm test`
- Test files colocated with source code (`.test.ts`, `.test.tsx`)
- Config in `client/vite.config.ts` (test block)
- Mock API calls and use React Testing Library for component tests

### E2E Tests (Playwright)

- **Two test styles**:
  1. BDD features (`.feature` files + `.step.ts` step definitions via `playwright-bdd`)
  2. Spec files (`.spec.ts` organized by concern: columns, filter, sort, pagination, actions)
- **Page Object Model**: Each page has a class (e.g., `SbomListPage`) with `static build()` factory.
- **Custom assertions**: Prefer custom assertions from `e2e/tests/ui/assertions/` over manual DOM queries.
