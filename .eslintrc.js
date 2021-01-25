module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "airbnb",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-hooks",
        "prettier"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".tsx"
                ]
            }
        ],
        "import/prefer-default-export": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "ts": "never",
                "tsx": "never"
            }
        ],
        "prettier/prettier": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/jsx-one-expression-per-line": "off",
        "no-use-before-define":"off",
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
        ]
    },
    // "settings": {
    //     "import/resolver": {
    //         "typescript": {}
    //     }
    // }
};
