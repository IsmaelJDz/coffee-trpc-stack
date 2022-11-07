module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "simple-import-sort"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always", { omitLastInOneLineBlock: true }],
    "space-before-function-paren": "off",
    "comma-dangle": ["warn", "only-multiline"],
    "max-len": [
      "error",
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreStrings: true,
        comments: 65,
        ignoreUrls: true
      }
    ],
    // "sort-imports": [
    //   "warn",
    //   {
    //     ignoreCase: false,
    //     ignoreDeclarationSort: false,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
    //     allowSeparatedGroups: false
    //   }
    // ],
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [["^\\u0000"], ["^@?\\w"], ["^"], ["^\\."]]
      }
    ],
    "import/no-duplicates": [
      "error",
      {
        considerQueryString: true
      }
    ],
    // "multiline-ternary": ["warn", "never"],
    "multiline-ternary": "off",
    "no-undef": "warn",
    "n/handle-callback-err": "warn",
    "@typescript-eslint/no-empty-interface": "warn"
  },
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true
  }
};
