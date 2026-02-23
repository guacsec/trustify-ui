#!/usr/bin/env bash
set -euo pipefail

# Check if jq is available, exit gracefully if not
if ! command -v jq &> /dev/null; then
  echo "⚠️  jq is not installed, skipping lint and format checks" >&2
  exit 0
fi

# Read hook input from stdin
INPUT=$(cat)

# Extract the modified file path
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Skip if no file path provided
[[ -z "$FILE_PATH" ]] && exit 0

# Navigate to project root
cd "$CLAUDE_PROJECT_DIR" || exit 0

# Run Biome on the specific modified file (handles filtering via biome.json)
echo "🎨 Formatting and linting: $FILE_PATH" >&2
if ! npx biome check --write "$FILE_PATH" 2>&1; then
  echo "⚠️  Biome found issues in $FILE_PATH" >&2
fi

# Determine workspace based on file path
WORKSPACE=""
if [[ "$FILE_PATH" == */client/* ]]; then
  WORKSPACE="client"
elif [[ "$FILE_PATH" == */e2e/* ]]; then
  WORKSPACE="e2e"
elif [[ "$FILE_PATH" == */common/* ]]; then
  WORKSPACE="common"
elif [[ "$FILE_PATH" == */server/* ]]; then
  WORKSPACE="server"
fi

# Run TypeScript type checking on the specific workspace
if [[ -n "$WORKSPACE" && -f "$WORKSPACE/tsconfig.json" ]]; then
  echo "🔍 Type checking $WORKSPACE workspace..." >&2
  if ! npx tsc --noEmit --project "$WORKSPACE/tsconfig.json" 2>&1; then
    echo "⚠️  Type errors found in $WORKSPACE workspace" >&2
  fi
fi

# Always exit 0 (non-blocking - Claude sees all output and can fix issues iteratively)
exit 0
