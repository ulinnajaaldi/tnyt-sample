import js from "@eslint/js";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist", "dev-dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: { "@tanstack/query": tanstackQuery },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    ignores: [
      "**/*.test.{ts,tsx,js,jsx}",
      "**/*.spec.{ts,tsx,js,jsx}",
      "**/__tests__/**",
      "**/__test__/**",
      "**/tests/**",
      "src/setupTests.ts",
      "vitest.config.ts",
    ],
  },
]);
