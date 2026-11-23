# 4. Serve the UI through the embedded Trustify backend

Date: 2026-11-23

## Status

Accepted

## Context

The Trustify UI is a frontend for the Trustify backend. The production application embeds the UI through the `trustify-ui` Rust crate in the Trustify server, whose Actix server serves the UI and API from the same origin. A separate Express server and container duplicated this serving/proxying role and created a second production path to maintain.

## Decision

Remove the standalone Express UI server and its container image. Keep Vite as the local development server; it serves the client with HMR and proxies API/auth requests to Trustify and the configured OIDC provider. Production builds are embedded in `trustd` via the Rust crate.

## Consequences

- Developers run Trustify and `npm run start:dev` when working locally.
- The production UI and API share the Trustify backend origin and port.
- End-to-end CI tests the UI embedded in the Trustify image rather than a separate UI image.
- There is no `npm start` command or standalone Node UI image to publish.
