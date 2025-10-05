import { tanstackConfig } from '@tanstack/eslint-config'

import simpleImportSort from 'eslint-plugin-simple-import-sort'

const config = [
  ...tanstackConfig,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'sort-imports': 'off',
      'import/order': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^.+\\u0000$'],
            ['^node:', '^react', '@tanstack/*', 'react-aria-components'],
            ['^@?\\w'],
            ['^~/lib', '^'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
    },
  },
]

export default config
