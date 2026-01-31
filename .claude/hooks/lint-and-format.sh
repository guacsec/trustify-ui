#!/usr/bin/env bash
set -euo pipefail

npm run format:fix
npm run check:write

npm run check
