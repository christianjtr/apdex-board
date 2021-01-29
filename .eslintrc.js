module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["standard", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-plugin-html"],
  rules: {},
};
