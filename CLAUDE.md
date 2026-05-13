# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Overview

Trustify UI is a React-based web application for software supply chain
security (SBOMs, advisories, vulnerabilities). It uses a monorepo structure with
npm workspaces and connects to the Trustify backend API.

See [CONVENTIONS.md](CONVENTIONS.md) for coding standards (naming conventions,
file organization, import order, page patterns, error handling idioms).

## Workspace Structure

This monorepo uses 4 npm workspaces:

- **`common/`** - Shared ESM module for environment config and branding
  - Exports `TrustificationEnvType`, `encodeEnv`, `decodeEnv`, branding assets
  - Built with Rollup to both ESM (.mjs) and CommonJS (.cjs)
  - Used by both client and server

- **`client/`** - React frontend application
  - Tech: React 19, TypeScript, Rsbuild (Rspack), PatternFly 6
  - Dev server: port 3000 with proxy to backend
  - Build output: `client/dist/` with `index.html.ejs` template

- **`server/`** - Express.js production server
  - Serves static client assets
  - Proxies `/api`, `/auth`, `/openapi` to backend
  - Injects environment variables at runtime via EJS templating

- **`e2e/`** - Playwright end-to-end tests
  - `tests/api/` - API integration tests
  - `tests/ui/` - UI tests with Page Object Model
  - `tests/ui/features/` - BDD tests with Gherkin + playwright-bdd

## Environment Variables

Defined in `common/src/environment.ts`:

- `TRUSTIFY_API_URL` - Backend API URL (default: `http://localhost:8080`)
- `AUTH_REQUIRED` - Enable/disable authentication (default: `"true"`)
- `OIDC_SERVER_URL` - Keycloak/OIDC server URL
- `OIDC_CLIENT_ID` - OIDC client ID (default: `"frontend"`)
- `OIDC_SCOPE` - OIDC scope (default: `"openid"`)

**How env vars work:**

- **Production**: Server injects env as base64 JSON into `index.html.ejs`,
  client decodes from `window._env`
- **Development**: Rsbuild injects env directly into HTML template

## Essential Commands

### Development

```bash
# Install dependencies
npm ci

# Start development server (builds common, runs client on :3000)
npm run start:dev

# Start specific workspaces
npm run start:dev:client  # Client only
npm run start:dev:common  # Common in watch mode
```

### Building

```bash
# Build all workspaces
npm run build

# Regenerate OpenAPI client from spec
npm run generate
```

### Code Quality

```bash
# Lint and format check
npm run check

# Auto-fix lint
npm run check:write

# Auto-fix formatting
npm run format:fix

# Type checking is integrated into builds
```

### Testing

#### Unit Tests

```bash
# Run unit tests (Jest)
npm test

# Run a single test file
npm test -- path/to/test.test.ts
```

#### E2E Tests (Playwright)

```bash
# Run e2e tests (Playwright)
npm run e2e:test

# Run a single e2e test file
npm run e2e:test -- path/to/test.test.ts
```

#### E2E Testing with Custom Assertions

The e2e tests use custom Playwright assertions for better readability and
maintainability. **Always prefer these custom assertions** over manual DOM
queries or counts.

**Custom assertions are located in:** `e2e/tests/ui/assertions/`

**Import from:** `e2e/tests/ui/assertions` (exports typed `expect` with custom
matchers)

## Architecture

### Application Structure

Client app follows this component hierarchy:

```
OidcProvider (auth)
  └─ QueryClientProvider (TanStack Query)
      └─ RouterProvider (React Router 7)
          └─ DefaultLayout
              ├─ HeaderApp (masthead)
              ├─ SidebarApp (nav menu)
              └─ Outlet (page content)
```

### Key Patterns

#### **State Management**

- **Server state**: TanStack Query for all API data
  - Custom hooks in `queries/` (e.g., `useFetchAdvisories`)
  - Automatic cache invalidation on mutations

- **Table UI state**: Sophisticated table controls system
  - State persists to URL params, localStorage, sessionStorage, or React state
  - Use `useTableControlState()` + `useTableControlProps()` pattern
  - Enables shareable URLs with filters/sort/pagination state

- **Page-level state**: React Context providers (per-page contexts)

- **Global state**: React Context
  - `NotificationsProvider` - Toast notifications
  - `PageDrawerContext` - Drawer state

#### **API Integration**

- **Generated client**: `@hey-api/openapi-ts` generates TypeScript client from
  `openapi/trustd.yaml`
  - Output: `client/src/app/client/` (types, SDK methods)
  - Regenerate: `npm run generate` (runs automatically on `npm ci`)

- **Client initialization**: `axios-config/apiInit.ts`
  - Adds Bearer token from OIDC session to all requests
  - Auto-retries on 401 with silent token refresh (max 2 retries)

- **Custom REST helpers**: `api/rest.ts` for special cases (file uploads,
  endpoints not in OpenAPI)

#### **Routing**

- React Router 7 with code-splitting
- Routes defined in `client/src/app/Routes.tsx`
- Lazy-loaded page components
- Type-safe params via `useRouteParams()` hook

### Authentication Flow

1. OIDC via `react-oidc-context` (configured in `OidcProvider.tsx`)
2. If not authenticated → redirect to OIDC server with state preservation
3. On callback → extract relative path from state, navigate back
4. Token stored in sessionStorage
5. Axios interceptor adds Bearer token to all API requests
6. Automatic silent token renewal
7. On 401 → attempt silent refresh, retry request (max 2 times)

## Development Workflows

### Adding a New Page

1. Create folder in `client/src/app/pages/[page-name]/`
2. Create main page component (`[page-name].tsx`)
3. Add route to `client/src/app/Routes.tsx`
4. Update `client/src/app/Constants.ts` for path constants

### Working with the API

1. Update OpenAPI spec in `client/openapi/trustd.yaml` (or get from backend)
2. Run `npm run generate` to regenerate client
3. Create TanStack Query hooks in `client/src/app/queries/[domain].ts`
4. Use hooks in page contexts

### Table with Filters

Use the table controls pattern (see `pages/advisory-list/advisory-context.tsx`):

```tsx
const tableControlState = useTableControlState({
  tableName: "advisory",
  persistTo: "urlParams", // State persists in URL
  columnNames: {identifier: "ID", title: "Title"},
  filterCategories: [...],
  sortableColumns: ["identifier", "modified"],
  isPaginationEnabled: true,
});

const tableControls = useTableControlProps({
  ...tableControlState,
  currentPageItems: advisories,
  totalItemCount,
});
```

### Backend Integration

**Development:**

- Rsbuild proxies `/api` → `TRUSTIFY_API_URL` (default: `http://localhost:8080`)
- Rsbuild proxies `/auth` → `OIDC_SERVER_URL`
- Start local backend: `cargo run --bin trustd` (in trustify [repo](https://github.com/guacsec/trustify))

**Production:**

- Express server proxies requests
- Environment injected at server startup

## Important Notes

- Always read existing files before modifying them
- The OpenAPI client (`client/src/app/client/`) is auto-generated - don't edit
  manually
- Table controls provide URL persistence - users can share filtered/sorted views
- PatternFly 6 is the design system - use PF components for consistency
- Authentication is optional (controlled by `AUTH_REQUIRED` env var)
- **E2E tests**: Always use custom assertions from `e2e/tests/ui/assertions/`
  instead of manual DOM queries for better maintainability and type safety
