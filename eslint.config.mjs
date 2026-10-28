import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Flat config for Next 16 (replaces .eslintrc.json and `next lint`).
// Same rule sets as before: core-web-vitals plus the TypeScript rules.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // New in eslint-config-next 16 (React Compiler rules). They flag working
    // code in CookieBanner, Header and the motion components. Kept as warnings
    // so the upgrade doesn't also rewrite those; fix them as separate work.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
