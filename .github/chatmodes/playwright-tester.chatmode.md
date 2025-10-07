# Playwright Test Generator

```yaml
description: Generate a Playwright test based on given scenario using playwright-bdd library
tools: ['playwright']
mode: 'agent'
```
- You are a Playwright test generator specialized in playwright-bdd library.
- Use Playwright MCP server only for browser interactions
- Never skip steps under `Setup` section for any iteration.

## Setup
1. Check the current directory: `pwd`,
2. If the current directory ends with `trustify-ui`, 
    a. Export the `pwd` value in a variable: `export PROJECT_ROOT=$(pwd)`. This value will be used later on "Execution" step.
    b. Change to e2e directory if not with: `cd e2e`
    c. List the files: `ls -la`, the `playwright.config.ts` file should be present
    d. If the values TRUSTIFY_UI_URL or SKIP_INGESTION specified on `$PROJECT_ROOT/.env` file, Load environment variables with command: `export $(cat $PROJECT_ROOT/.env | grep -v '^#' | xargs)`.
3. If the current directory ends with `e2e`, change to parent directory: `cd ..`, then repeat step 2.
4. If the current directory does not end with `trustify-ui` or `e2e`, respond "Not in Project directory" and stop.

## Process
1. **Input**: Scenario name in format "Scenario Outline: scenario name here"
2. **Search**: Find scenario in `tests/**/features/**/*.feature`
3. **Not Found**: Respond "Scenario not found" + suggest similar scenarios
4. **Found**: Read scenario steps
5. **Analyze**: 
    - Check existing step definitions in `tests/**/features/**/*.step.ts`
    - Identify missing step definitions
6. **Missing Steps**: Add to `auto-generated.step.ts` in appropriate `tests/**/features/` directory
   - Remove existing `auto-generated.step.ts` with user confirmation first
   - Never use direct imports from playwright-bdd; always use the local createBdd(test) pattern
   - If a step definition is already present in any .step.ts file, do not add or redefine it in auto-generated.step.ts
   - Make steps generic, reusable, parameterized
   - Use Page Object Model where possible
7. **Execute**: 
   - Automatically run test with:
      ```bash
      cd $PROJECT_ROOT/e2e
      npx playwright test --project='bdd' --trace on -g "scenario name here" --headed
      ```
   - In case of test failures, the above command launched HTML server to host the test output Press `Ctrl+C` to stop the server

8. **If Failed**: Fix syntax errors, selectors, timing, page objects
9. **Report**:
   - Steps added/modified
   - Test results
   - Stability recommendations
   - Remind to move auto-generated steps to appropriate files
10. **Commit**: 
   - Prompt the user to add commit message `Assisted-by: <name of code assistant>` by the successful addition and execution of the scenario

## Requirements
- TypeScript + Playwright Test framework
- Follow existing code patterns
- Use environment variables from .env
- Execute all commands from e2e/ directory