import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import * as importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignores
  {
    ignores: [
      ".*.{js,cjs}",
      "**/*.{js,cjs}",
      "**/node_modules/**",
      "**/dist/**",
      "eslint.config.ts",
      "**/eslint.config.ts",
      "**/vitest.config.ts"
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  // TypeScript Configuration
  {
    files: ["**/*.{ts,tsx,mts}"],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
        project: true,
      },
    },
    plugins: {
      "unused-imports": unusedImportsPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", "*.mts"],
      },
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...importPlugin.configs?.typescript.rules,

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
      // Note: you must disable the base rule as it can report incorrect errors
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "prefer-const": "warn",
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
      "no-empty": "warn",

      // Add Prettier last to override other formatting rules
      ...eslintConfigPrettier.rules,
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts", "**/test/**/*.ts", "**/mocks.ts"],
    rules: {
      "import/no-unresolved": "off",
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      // ignoring fully for now due to issues
      "import/no-unresolved": "off",
    },
  },
]);
