// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: ["./playground", "./src"],
  },
}).append({
  rules: {
    "@stylistic/semi": ["error", "always"],
    "@stylistic/comma-dangle": ["error", "never"],
    "@stylistic/quotes": [
      "error",
      "single",
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    "quote-props": ["error", "as-needed"],
    "@stylistic/object-property-newline": "off",
    "@stylistic/object-curly-spacing": ["error", "never"],
    "@stylistic/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      },
    ],
    "@stylistic/block-spacing": ["error", "never"],
  },
});
