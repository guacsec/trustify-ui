#!/usr/bin/env bash
set -euo pipefail

# Container name parameter (required)
CONTAINER_NAME="${1:-}"

# Show usage if help is requested or no parameter provided
if [[ -z "${CONTAINER_NAME}" || "${CONTAINER_NAME}" == "-h" || "${CONTAINER_NAME}" == "--help" ]]; then
    echo "Usage: $0 CONTAINER_NAME"
    echo ""
    echo "  CONTAINER_NAME  Name of the Playwright container to stop (required)"
    echo ""
    echo "Example:"
    echo "  $0 claude-playwright"
    exit 0
fi

# Detect available container runtime (prefer podman over docker)
if command -v podman &> /dev/null; then
    CONTAINER_RUNTIME="podman"
elif command -v docker &> /dev/null; then
    CONTAINER_RUNTIME="docker"
else
    echo "Error: Neither podman nor docker is available on this system." >&2
    echo "Please install podman (preferred) or docker to manage containers." >&2
    exit 1
fi

echo "Using container runtime: ${CONTAINER_RUNTIME}"
echo "Stopping container: ${CONTAINER_NAME}"

# Stop the container
if "${CONTAINER_RUNTIME}" stop "${CONTAINER_NAME}"; then
    echo "Container ${CONTAINER_NAME} stopped successfully"
else
    echo "Error: Failed to stop container ${CONTAINER_NAME}" >&2
    exit 1
fi
