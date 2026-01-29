#!/usr/bin/env bash
set -euo pipefail

# PostToolUse hook to auto-execute Playwright tests when test files are written/edited
# This hook detects test file writes and runs only those specific tests immediately

# ============================================================================
# Prerequisites
# ============================================================================

# Check if jq is available for JSON parsing
if ! command -v jq &> /dev/null; then
    echo "[ERROR] jq is not installed. Please install jq to use this hook." >&2
    echo "[ERROR] Install with: brew install jq (macOS) or apt-get install jq (Ubuntu/Debian)" >&2
    exit 0  # Non-blocking - allow operation to continue
fi

# ============================================================================
# Configuration
# ============================================================================

# Script directory
readonly HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Test file patterns
readonly PLAYWRIGHT_PATTERN="e2e/tests/ui/pages/.*\.spec\.ts$"
readonly API_TEST_PATTERN="e2e/tests/api/features/.*\.ts$"

# Timeout for test execution (5 minutes)
readonly TEST_TIMEOUT=300

# ============================================================================
# Helper Functions
# ============================================================================

log_debug() {
    echo "[DEBUG] $*" >&2
}

log_error() {
    echo "[ERROR] $*" >&2
}

parse_hook_input() {
    input="$1"

    # Validate JSON and extract fields
    if ! echo "$input" | jq -e . >/dev/null 2>&1; then
        log_error "Invalid JSON input"
        return 1
    fi

    # Extract all fields in one jq call for efficiency
    # Note: file_path comes from tool_input.file_path (nested field)
    # Use // "" for default empty strings if fields are null/missing
    echo "$input" | jq -r '[
        .tool_name // "",
        .tool_input.file_path // "",
        .session_id // ""
    ] | @tsv'
}

# Check if file matches any test pattern
is_test_file() {
    local file_path="$1"

    if [[ "$file_path" =~ $PLAYWRIGHT_PATTERN ]]; then
        echo "playwright"
    elif [[ "$file_path" =~ $API_TEST_PATTERN ]]; then
        echo "api"
    else
        echo ""
    fi
}

# Get tracking file path for this session
get_tracking_file() {
    local session_id="$1"
    echo "/tmp/claude-test-files-${session_id}.txt"
}

# Check if file has already been tested in this session
is_already_tested() {
    local file_path="$1"
    local tracking_file="$2"

    if [[ ! -f "$tracking_file" ]]; then
        return 1  # File doesn't exist, not tested
    fi

    if grep -Fxq "$file_path" "$tracking_file"; then
        return 0  # Already tested
    else
        return 1  # Not tested yet
    fi
}

# Mark file as tested
mark_as_tested() {
    local file_path="$1"
    local tracking_file="$2"

    echo "$file_path" >> "$tracking_file"
}

# Clear tracking file (on successful test run)
clear_tracking_file() {
    local tracking_file="$1"

    if [[ -f "$tracking_file" ]]; then
        rm -f "$tracking_file"
    fi
}

# Extract test names from JSON structuredPatch
# Looks for patterns like: +  test("TestName", async ({ page }) => {
# Returns: newline-separated test names
extract_test_names() {
    local json_input="$1"

    # Extract lines from structuredPatch and find test definitions
    echo "$json_input" | jq -r '
        .tool_response.structuredPatch[]?.lines[]? // empty
        | select(startswith("+") and contains("test("))
        | gsub("^\\+\\s*test\\(\""; "")
        | gsub("\",\\s*async.*"; "")
    ' 2>/dev/null | sort -u
}

# Build grep pattern from test names
# Returns: grep pattern string for Playwright --grep flag
build_grep_pattern() {
    local test_names="$1"

    if [[ -z "$test_names" ]]; then
        echo ""
        return
    fi

    # Count test names
    local count
    count=$(echo "$test_names" | wc -l | tr -d ' ')

    if [[ $count -eq 0 ]]; then
        echo ""
    elif [[ $count -eq 1 ]]; then
        # Single test: exact match
        echo "$test_names"
    else
        # Multiple tests: regex OR pattern
        # Escape special regex characters and join with |
        echo "$test_names" | sed 's/[.[\*^$()+?{|]/\\&/g' | paste -sd '|' -
    fi
}

# Get test command for the file type
get_test_command() {
    local tool_name="$1"
    local file_path="$2"
    local test_type="$3"
    local file_patch="$4"

    case "$tool_name" in
        Write)
            echo "npx playwright test $file_path"
            ;;
        Edit)
            case "$test_type" in
                playwright)
                    # Extract test names from JSON and build grep pattern
                    local test_names
                    test_names=$(extract_test_names "$file_patch")

                    local grep_pattern
                    grep_pattern=$(build_grep_pattern "$test_names")

                    if [[ -n "$grep_pattern" ]]; then
                        echo "npx playwright test $file_path --grep \"$grep_pattern\""
                    else
                        echo "npx playwright test $file_path"
                    fi
                    ;;
                api)
                    echo "npm run e2e:test:api -- $file_path"
                    ;;
                *)
                    log_error "Unknown test type: $test_type"
                    return 1
                    ;;
            esac
            ;;
        *)
            log_error "Unknown tool name: $tool_name"
            return 1
            ;;
    esac
}

# Run tests for the file
run_tests() {
    local file_path="$1"
    local test_command="$2"

    log_debug "Running tests with command: $test_command"

    # Change to project directory (use cwd from JSON as fallback)
    local project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
    cd "$project_dir" || {
        log_error "Failed to change to project directory: $project_dir"
        return 1
    }

    # Run the test command and capture output
    local test_output
    local exit_code

    if test_output=$(timeout "$TEST_TIMEOUT" bash -c "$test_command" 2>&1); then
        exit_code=0
    else
        exit_code=$?
    fi

    echo "$test_output"
    return "$exit_code"
}

# Output success message
output_success() {
    local file_path="$1"
    local test_output="$2"

    # Format output as JSON for structured feedback
    cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "✅ Tests passed for $file_path\n\n$test_output"
  }
}
EOF
}

# Output failure message
output_failure() {
    local file_path="$1"
    local test_output="$2"

    # Send to stderr to block and provide feedback
    cat >&2 <<EOF
❌ Tests failed for $file_path:

$test_output

Fix the test errors and try again.
EOF
}

# ============================================================================
# Main Logic
# ============================================================================

main() {
    local input
    input=$(cat)

    # Parse JSON input from stdin and extract fields
    local tool_name file_path session_id

    if ! read -r tool_name file_path session_id < <(parse_hook_input "$input"); then
        log_error "Failed to parse hook input"
        exit 0  # Non-blocking
    fi

    log_debug "Tool: $tool_name, Session: $session_id, File: $file_path"

    # Validate that we have required fields
    if [[ -z "$file_path" ]]; then
        log_debug "No file_path in input, exiting"
        exit 0
    fi

    # Check if this is a test file
    local test_type
    test_type=$(is_test_file "$file_path")

    if [[ -z "$test_type" ]]; then
        log_debug "Not a test file, exiting"
        exit 0
    fi

    log_debug "Detected test type: $test_type"

    # Get absolute path for tracking
    local abs_file_path
    if [[ "$file_path" = /* ]]; then
        abs_file_path="$file_path"
    else
        abs_file_path="$CLAUDE_PROJECT_DIR/$file_path"
    fi

    # Get tracking file
    local tracking_file
    tracking_file=$(get_tracking_file "$session_id")

    # Check if already tested
    if is_already_tested "$abs_file_path" "$tracking_file"; then
        log_debug "File already tested in this session, skipping"
        exit 0
    fi

    # Get test command
    local test_command

    if ! test_command=$(get_test_command "$tool_name" "$file_path" "$test_type" "$input"); then
        log_error "Failed to get test command"
        exit 0  # Non-blocking
    fi

    log_debug "Test command: $test_command"

    ## Enable Playwright
    log_debug "Starting Playwright remote server"
    if ! "${HOOKS_DIR}/playwright-remote-start.sh" "claude-playwright-${session_id}"; then
        log_error "Failed to start Playwright remote server"
        exit 0  # Non-blocking
    fi

    # Run tests
    local test_output
    local exit_code

    if test_output=$(run_tests "$file_path" "PW_TEST_CONNECT_WS_ENDPOINT=ws://localhost:5000/ $test_command"); then
        exit_code=0
    else
        exit_code=$?
    fi

    ## Stop Playwright
    log_debug "Stopping Playwright remote server"
    if ! "${HOOKS_DIR}/playwright-remote-stop.sh" "claude-playwright-${session_id}"; then
        log_error "Failed to stop Playwright remote server"
        exit 0  # Non-blocking
    fi

    # Handle results
    if [[ $exit_code -eq 0 ]]; then
        # Tests passed - mark as tested and clear tracking
        mark_as_tested "$abs_file_path" "$tracking_file"
        clear_tracking_file "$tracking_file"
        output_success "$file_path" "$test_output"
        exit 0
    else
        # Tests failed - provide feedback but don't mark as tested
        output_failure "$file_path" "$test_output"
        exit 2  # Block and provide feedback
    fi
}

# Execute main function
main
