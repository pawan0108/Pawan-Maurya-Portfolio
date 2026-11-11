import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
      '**/*.local/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    ...js.configs.recommended,
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['src/**/*.jsx'],
    plugins: { react, 'react-hooks': hooks, 'jsx-a11y': jsxA11y },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...hooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
    },
  },
  {
    files: ['src/hooks/**/*.js'],
    plugins: { 'react-hooks': hooks },
    rules: hooks.configs.recommended.rules,
  },
  {
    files: ['*.config.js', 'scripts/**/*.mjs', 'tests/**/*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: [
      'tests/**/*.js',
      'scripts/capture-project-previews.mjs',
      'scripts/optimize-project-previews.mjs',
      'scripts/generate-sharing-assets.mjs',
      'scripts/check-subpath-release.mjs',
    ],
    languageOptions: { globals: globals.browser },
  },
]
