import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";

import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  globalIgnores(["**/dist", "**/coverage", "crate/**"]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      ...pluginQuery.configs['flat/recommended-strict'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "e2e/playwright.config.ts",
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TODO: Remove these rules incrementally so we have default and more strict linting
      "@eslint-react/set-state-in-effect": "off",
      "@eslint-react/no-use-context": "off",
      "@eslint-react/no-context-provider": "off",
      "@eslint-react/naming-convention-ref-name": "off",
      "@eslint-react/no-array-index-key": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@eslint-react/exhaustive-deps": "off",
      "@tanstack/query/prefer-query-options": "off",
    },
    ignores: [
      "client/config/**",
      "client/src/app/client/**",
      "client/src/app/specs/**",
      "client/types/**",
    ],
  },
]);
