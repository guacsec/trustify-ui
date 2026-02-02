#!/usr/bin/env bash
set -euo pipefail

# Container name parameter (default: claude-playwright)
CONTAINER_NAME="${1:-claude-playwright}"

# Show usage if help is requested
if [[ "${CONTAINER_NAME}" == "-h" || "${CONTAINER_NAME}" == "--help" ]]; then
    echo "Usage: $0 [CONTAINER_NAME]"
    echo ""
    echo "  CONTAINER_NAME  Name for the Playwright container (default: claude-playwright)"
    echo ""
    echo "Example:"
    echo "  $0 my-playwright-server"
    exit 0
fi

# Detect available container runtime (prefer podman over docker)
if command -v podman &> /dev/null; then
    CONTAINER_RUNTIME="podman"
elif command -v docker &> /dev/null; then
    CONTAINER_RUNTIME="docker"
else
    echo "Error: Neither podman nor docker is available on this system." >&2
    echo "Please install podman (preferred) or docker to run Playwright remotely." >&2
    exit 1
fi

echo "Using container runtime: ${CONTAINER_RUNTIME}"
echo "Starting container: ${CONTAINER_NAME}"

"${CONTAINER_RUNTIME}" run --name "${CONTAINER_NAME}" -d --rm --init -it --network host --workdir /home/pwuser --user pwuser mcr.microsoft.com/playwright:v1.57.0-noble /bin/sh -c "npx -y playwright@1.57.0 run-server --port 5000"
sleep 2
