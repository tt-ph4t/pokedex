import nextVitals from "eslint-config-next/core-web-vitals";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  perfectionist.configs["recommended-natural"],
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "import/no-anonymous-default-export": "off",
      "react/display-name": "off",
      "react/jsx-key": "off",
    },
  },
]);
