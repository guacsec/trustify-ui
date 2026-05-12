# Coding Conventions

## Language and Framework

- TypeScript 5.7, React 19
- UI component library: PatternFly 6 (`@patternfly/react-core`, `@patternfly/react-table`)
- Build tool: Rsbuild (client), Rollup (common, server)
- Routing: react-router-dom v7 with lazy-loaded routes
- Data fetching: TanStack React Query v5
- API client: auto-generated from OpenAPI spec via `@hey-api/openapi-ts` with Axios
- Forms: react-hook-form + yup validation
- E2E testing: Playwright with playwright-bdd (Gherkin features)
- Unit testing: Jest
- Linting/formatting: Biome (not ESLint/Prettier)
- Package manager: npm workspaces (Node.js >= 22)

## Code Style

- Formatter: Biome with space indentation (2 spaces), double quotes
- Line length: 80 characters (`.editorconfig`)
- Line endings: LF
- Run `npm run check` (biome check with `--error-on-warnings`) before committing
- Run `npm run format:fix` to auto-format
- Organize imports: disabled in Biome config (manual ordering)
- The `client/src/app/client/` directory is auto-generated — never edit directly; regenerate with `npm run generate -w client`
- CSS modules enabled for `.module.css` files

## Naming Conventions

- React components: PascalCase (`SbomList`, `SbomTable`, `SbomToolbar`, `ErrorFallback`)
- Component files: kebab-case for page files (`sbom-list.tsx`, `sbom-table.tsx`, `sbom-context.tsx`), PascalCase for reusable components (`SBOMEditLabelsForm.tsx`, `SbomVulnerabilities.tsx`)
- Custom hooks: camelCase with `use` prefix (`useFetchSBOMs`, `useDeleteSbomMutation`, `useUpload`)
- Query key constants: PascalCase with `QueryKey` suffix (`SBOMsQueryKey`, `AdvisoriesQueryKey`, `VulnerabilitiesQueryKey`)
- Query hooks: `useFetch<Resource>` for reads, `use<Action><Resource>Mutation` for writes
- Context providers: `<Domain>SearchProvider` wrapping a `<Domain>SearchContext`
- Page directories: kebab-case matching the domain (`sbom-list/`, `advisory-details/`, `vulnerability-list/`)
- Route paths: kebab-case (`/sboms`, `/advisories`, `/vulnerabilities`)
- Path alias: `@app/` maps to `client/src/app/`
- E2E page objects: PascalCase classes (`SbomListPage`, `AdvisoryListPage`)

## File Organization

### Monorepo structure

```
package.json            # workspace root
common/                 # shared ESM module (branding, environment config)
client/                 # React SPA
server/                 # Express.js production server (proxying, env injection)
e2e/                    # Playwright end-to-end tests
biome.json              # root Biome config
```

### Client structure (`client/src/app/`)

```
Routes.tsx              # route definitions with lazy() imports
Constants.ts            # app-wide constants
env.ts                  # environment config
oidc.ts                 # OIDC auth config
dayjs.ts                # dayjs setup

pages/                  # page components, one directory per page
  <domain>-list/        # list page for a domain
    index.ts            # re-export: `export { Component as default } from "./component"`
    <domain>-list.tsx   # main page component
    <domain>-table.tsx  # table component
    <domain>-toolbar.tsx # toolbar with filters/actions
    <domain>-context.tsx # search/filter context provider
    helpers.ts          # page-specific helpers
    components/         # page-specific sub-components

  <domain>-details/     # detail page for a domain
    <domain>-details.tsx
    overview.tsx
    <sub-tab>.tsx       # tab content components
    components/         # detail-specific sub-components
    index.ts

queries/                # TanStack Query hooks, one file per domain
  sboms.ts              # useFetchSBOMs, useDeleteSbomMutation, etc.
  advisories.ts
  vulnerabilities.ts
  packages.ts
  ...

components/             # shared UI components
  FilterToolbar/        # complex components get their own directory
  SimplePagination/
  ConfirmDialog.tsx     # simple components are single files
  ...

hooks/                  # custom hooks
  table-controls/       # table state management (pagination, sorting, filtering)
  domain-controls/      # domain-specific data hooks
  useUpload.ts
  useUrlParams.ts
  ...

api/                    # custom REST calls (uploads, downloads)
  rest.ts

client/                 # auto-generated API client (DO NOT EDIT)
axios-config/           # Axios instance and interceptors
  apiInit.ts
```

### E2E test structure (`e2e/tests/`)

```
ui/
  features/             # BDD .feature files (Gherkin)
    @<domain>/          # feature + step definitions grouped by domain
  pages/                # Page Object Model classes
    <domain>-list/
      <Domain>ListPage.ts   # page object class
      columns.spec.ts       # spec per concern
      filter.spec.ts
      sort.spec.ts
      pagination.spec.ts
      actions.spec.ts
    <domain>-details/
      <Domain>DetailsPage.ts
      ...
  helpers/              # shared test utilities
  steps/                # shared step definitions
  fixtures.ts           # test fixtures

api/                    # API-level tests
  features/             # API test files
  dependencies/         # setup (global.setup.ts)

common/                 # shared test assets
  assets/sbom/          # test SBOM files
  assets/csaf/          # test CSAF files
  constants.ts
```

## Error Handling

- API errors are typed as `AxiosError` and propagated through query hooks via `fetchError` return values
- Mutation hooks accept `onSuccess` and `onError` callbacks, handling query invalidation internally
- Top-level error boundary via `react-error-boundary` with `ErrorFallback` component
- Query hooks return a normalized shape: `{ result: { data, total, params }, isFetching, fetchError, refetch }`
- Components display errors using `StateError` component for failed data fetches
- `StateNoData` and `StateNoResults` for empty states

## Testing Conventions

### Unit tests (Jest)

- Run with `npm run test` (from root or `client` workspace)
- Config at `client/config/jest.config.ts`
- CI runs: `npm run test -- --coverage --watchAll=false`

### E2E tests (Playwright)

- Two test styles coexist:
  1. **BDD features**: `.feature` files in `e2e/tests/ui/features/` with step definitions in `.step.ts` files
  2. **Spec files**: `.spec.ts` files in `e2e/tests/ui/pages/<domain>/` organized by concern (columns, filter, sort, pagination, actions)
- Page Object Model pattern: each page has a class (e.g., `SbomListPage`) with a static `build()` factory, encapsulating navigation and element access
- Shared page objects: `Table`, `Toolbar`, `Pagination`, `Navigation` in `e2e/tests/ui/pages/`
- Tags for test tiers: `{ tag: "@tier1" }`
- Run e2e: `npm run e2e:test:ui` (full), `npm run e2e:test:api` (API only)

## Commit Messages

- Follow Conventional Commits: `<type>[optional scope]: <description>`
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Reference the Jira issue in the commit footer (e.g., `Implements TC-123`)
- AI-assisted commits include `--trailer="Assisted-by: Claude Code"`

## Dependencies

- All workspaces managed via npm workspaces in root `package.json`
- Use caret ranges (`^`) for dependencies in `client/package.json`
- Key dependencies: `react` 19, `@patternfly/react-core` 6, `@tanstack/react-query` 5, `axios`, `react-router-dom` 7, `react-hook-form`, `yup`
- API client generated from `client/openapi/trustd.yaml` — update the spec, then `npm run generate -w client`
- Dependabot configured for automated dependency updates (groups `@biomejs/*`)

## Page Patterns

### List pages

Each list page follows a consistent architecture:

1. **Context provider** (`<domain>-context.tsx`): creates a `<Domain>SearchContext` that manages table state via `useTableControlState`, fetches data with the domain query hook, and provides `tableControls` to children
2. **Page component** (`<domain>-list.tsx`): renders `PageSection` with title, wraps content in the context provider, renders toolbar and table
3. **Toolbar** (`<domain>-toolbar.tsx`): consumes context for pagination and filter props
4. **Table** (`<domain>-table.tsx`): consumes context for data, columns, sorting, and row rendering

### Detail pages

- Main component fetches by ID from route params
- Content organized into tabs (overview, packages, vulnerabilities, etc.)
- Sub-components for each tab content area

#### Layout structure

Detail pages use a sequence of PatternFly `PageSection` blocks:

```
<PageSection type="breadcrumb">  — breadcrumb navigation
<PageSection>                    — page header (title, actions)
<PageSection>                    — tab bar (Tabs)
<PageSection>                    — tab content panels (TabContent)
```

#### Tab content components

Components rendered inside `<TabContent>` **must not** include their own
`<PageSection>` wrapper. The parent detail page provides the `PageSection` that
wraps all tab content panels.

Canonical example — `client/src/app/pages/sbom-details/sbom-details.tsx`:

```tsx
{/* Parent provides the PageSection */}
<PageSection>
  <TabContent {...getTabContentProps("info")}>
    {sbom && <Overview sbom={sbom} />}       {/* no PageSection inside */}
  </TabContent>
  <TabContent {...getTabContentProps("packages")}>
    {sbomId && <PackagesBySbom sbomId={sbomId} />}
  </TabContent>
</PageSection>
```

This keeps spacing and background styling consistent across all tabs and avoids
double-nesting `PageSection` elements.

### Query hooks

- One file per domain in `queries/`
- Export a query key constant (e.g., `export const SBOMsQueryKey = "sboms"`)
- Fetch hooks use `useQuery` with the shared `client` Axios instance
- Mutation hooks use `useMutation` with `queryClient.invalidateQueries` on success/error
- Fetch hooks return `{ result: { data, total }, isFetching, fetchError, refetch }`

### Routing

- Routes defined in `Routes.tsx` with a `Paths` constant object
- Pages lazy-loaded via `React.lazy(() => import("./pages/<domain>"))`
- Each page directory has an `index.ts` that re-exports the default component: `export { SbomList as default } from "./sbom-list"`
