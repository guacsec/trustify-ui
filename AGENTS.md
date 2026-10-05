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

## Development

### `npm run start:dev` (development mode)

Builds `common` once, then concurrently watches `common` (rollup rebuild on change) and runs the Vite dev server on port 3000 with HMR.

The **`server/` workspace is not started** in dev mode — Vite handles both static serving and API proxying directly:

| Path | Proxied to | Default |
|------|-----------|---------|
| `/api` | `TRUSTIFY_API_URL` | `http://localhost:8080` |
| `/auth` | `OIDC_SERVER_URL` | `http://localhost:8090` |
| `/.well-known/trustify` | `TRUSTIFY_API_URL` | `http://localhost:8080` |

Environment variables are injected into `index.html` via `ViteEjsPlugin` at startup.

### `npm run start` (production mode)

Builds `common` and `client`, then starts the Express server from `server/` on port 8080.

The Express server (`server/src/index.ts`):
- Serves `client/dist/` as static files
- Renders `index.html.ejs` per-request via EJS, injecting runtime env vars

Use this mode only if you want to see how you app behaves with minified JS, CSS, etc. resources, just like when it will be deployed in production.

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

## Rust Crate (Backend Embedding)

The `crate/` directory is a Rust crate (`trustify-ui`) that embeds the built frontend into the Trustify backend binary (`trustd`). The frontend is not a standalone deployment — it ships inside the Rust server.

**How it works:**

The backend points to this Rust Crate in [Cargo.toml](https://github.com/guacsec/trustify/blob/main/Cargo.toml) using something similar to:

```toml
trustify-ui = { git = "https://github.com/guacsec/trustify-ui.git", branch = "publish/main" }
```

## Branding

Branding (logo, application name, URLs) is selected at **build time** via the `BRANDING` environment variable and baked into the output. There is no runtime branding switch.

**Default branding directory** (`./branding`):

```
branding/
  strings.json          # primary branding config
  manifest.json         # PWA web app manifest
  favicon.ico           # browser tab icon
  images/
    masthead-logo.svg   # masthead header logo
    logo.png            # full-size logo
    logo192.png         # 192px PWA icon
    logo512.png         # 512px PWA icon
```

**`strings.json` structure:**

```json
{
  "application": {
    "title": "Trustification",
    "name": "Trustification UI",
    "description": "Trustification UI"
  },
  "about": {
    "displayName": "Trustification",
    "imageSrc": "<%= brandingRoot %>/images/masthead-logo.svg",
    "documentationUrl": "https://trustification.io/"
  },
  "masthead": {
    "leftBrand": { "src": "<%= brandingRoot %>/images/masthead-logo.svg", "alt": "brand", "height": "40px" },
    "leftTitle": null,
    "rightBrand": null,
    "supportUrl": "https://github.com/trustification/trustify/issues"
  }
}
```

Image paths must use `<%= brandingRoot %>` — this is resolved to `branding` at build time via EJS.

**Creating a custom-branded build:**

1. Create a directory (e.g., `branding-custom/`) with the same structure as `branding/`.
2. Customize `strings.json` and replace image assets.
3. Build with: `BRANDING=./branding-custom npm run build`

**What branding controls:** tab title, HTML meta tags, masthead logo/text, About modal, Get Started section, support URL, favicon, and PWA manifest.

**What branding does not control:** colors/theme (PatternFly), layout, routes, or behavior.

## Common Pitfalls

- **Forgetting `total: true`**: Server-side pagination requires `total: true` in request params. Omitting it returns `total: null`.
- **Editing generated files**: Never edit `client/src/app/client/` manually. Always regenerate with `npm run generate`.
- **Incorrect import order**: Follow the 5-block import order in [CONVENTIONS.md § Code Style](CONVENTIONS.md#code-style).
- **Wrapping tab content in `<PageSection>`**: Tab content components should not include their own PageSection wrapper (detail page provides it).
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
