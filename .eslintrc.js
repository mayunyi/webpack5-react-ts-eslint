module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {

    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "arrow-body-style": ["error", "always"],
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    "indent": [
      "error",
      4
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    'jsx-quotes': [2, 'prefer-single'],  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
