import { tanstackConfig } from "@tanstack/eslint-config"

import eslint from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"

const config = [
    ...tanstackConfig,
    eslint.configs.recommended,
    reactHooks.configs.flat["recommended-latest"],
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },

        rules: {
            "@typescript-eslint/array-type": ["error", { default: "array" }],
            "react/react-in-jsx-scope": "off",
            "sort-imports": "off",
            "import/order": "off",
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["^\\u0000"],
                        ["^.+\\u0000$"],
                        [
                            "^node:",
                            "^react",
                            "@tanstack/*",
                            "react-aria-components",
                        ],
                        ["^@?\\w"],
                        ["^~/lib", "^"],
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    ],
                },
            ],
        },

        settings: {
            react: {
                version: "detect",
            },
        },
    },
]

export default config
