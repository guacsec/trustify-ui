# Trustify-ui

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/guacsec/trustify-ui/pulls)

Trustify UI Component

# Build and Test Status

| branch | last merge CI | nightly CI | nightly backend build |
| :----- | :------------ | :--------- | :-------------------- |
| main   | [![CI (repo level)](https://github.com/guacsec/trustify-ui/actions/workflows/ci-repo.yaml/badge.svg?branch=main&event=push)](https://github.com/guacsec/trustify-ui/actions/workflows/ci-repo.yaml?query=branch%3Amain+event%3Apush) | [![Nightly CI (repo level @main)](https://github.com/guacsec/trustify-ui/actions/workflows/nightly-ci-repo.yaml/badge.svg?branch=main&event=schedule)](https://github.com/guacsec/trustify-ui/actions/workflows/nightly-ci-repo.yaml?query=branch%3Amain+event%3Aschedule) | [![CI (test server image build)](https://github.com/guacsec/trustify-ui/actions/workflows/ci-server-image-build.yaml/badge.svg?branch=main&event=schedule)](https://github.com/guacsec/trustify-ui/actions/workflows/ci-server-image-build.yaml?query=branch%3Amain+event%3Aschedule) |

| branch | last merge e2e CI | nightly e2e CI |
| :----- | :---------------- | :------------- |
| main   | [![CI (e2e Trustify CI)](https://github.com/guacsec/trustify-ui/actions/workflows/ci-e2e.yaml/badge.svg?branch=main&event=push)](https://github.com/guacsec/trustify-ui/actions/workflows/ci-e2e.yaml?query=branch%3Amain+event%3Apush)               | [![Nightly CI (e2e trustify CI @main)](https://github.com/guacsec/trustify-ui/actions/workflows/nightly-ci-e2e.yaml/badge.svg?branch=main&event=schedule)](https://github.com/guacsec/trustify-ui/actions/workflows/nightly-ci-e2e.yaml?query=branch%3Amain+event%3Aschedule)            |

## Usage

Trustify UI provides a web interface for software supply chain security:

- **Advisories** — Browse, search, and filter security advisories (CVE, RHSA, GHSA) with severity and status tracking
- **Vulnerabilities** — View vulnerability details, related advisories, and affected products
- **SBOMs** — Upload and inspect Software Bills of Materials; explore package dependencies
- **Packages** — Search packages across ecosystems and view associated SBOMs and vulnerabilities
- **Products** — Manage product definitions and track their security posture
- **Importers** — Configure and monitor data import jobs from external vulnerability and SBOM sources

Access the application at `http://localhost:3000` (development) or your deployed URL. Authentication is optional and controlled by the `AUTH_REQUIRED` environment variable.

## Development

### Requisites

[NodeJS](https://nodejs.org) >= 24. Use [nvm](https://nodejs.org/en/download) to install NodeJS

```shell
nvm install 24
nvm use 24
```

- Backend. Clone [trustify](https://github.com/guacsec/trustify) and there execute:

```shell
cargo run --bin trustd
```

It will start the backend in http://localhost:8080

### Install dependencies

```shell
npm ci
```

### Init the dev server

Start a Trustify backend (which serves the production UI through its embedded Actix server) and then run the Vite development server in this repository:

```shell
npm run start:dev
```

Open <http://localhost:3000>. Vite provides HMR and proxies API requests to the backend at `TRUSTIFY_API_URL` (default `http://localhost:8080`). The production UI is built into Trustify through the `crate/` Rust crate; there is no separate Express UI server or standalone UI image.

## Environment variables

| ENV VAR          | Description                           | Default value                           |
| ---------------- | ------------------------------------- | --------------------------------------- |
| TRUSTIFY_API_URL | Backend URL used by the Vite API proxy | `http://localhost:8080`                |
| AUTH_REQUIRED    | Enable/Disable authentication         | true                                    |
| OIDC_CLIENT_ID   | Set OIDC client                       | frontend                                |
| OIDC_SERVER_URL  | Set OIDC server URL                   | `http://localhost:8090/realms/trustify` |
| OIDC_SCOPE       | Set OIDC scope                        | openid                                  |

## Production serving

The production client bundle is embedded into the Trustify backend using this repository's Rust crate and served by Trustify's Actix server alongside the API. Build the UI in production mode when building the crate; no standalone Node/Express server is part of the deployment.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting changes.
