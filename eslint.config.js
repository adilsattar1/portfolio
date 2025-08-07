import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^_|^React$|^motion$',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/jsx-uses-vars': 'error', // This should catch JSX usage
      'react/prop-types': 'off', // Disable prop-types validation for modern React
      'react/no-unknown-property': ['error', { ignore: ['intensity', 'position', 'castShadow', 'shadow-mapSize-width', 'shadow-mapSize-height', 'object', 'args', 'roughness', 'metalness', 'transmission', 'ior', 'thickness', 'emissive', 'emissiveIntensity', 'whileHover', 'whileTap'] }],
      'react/no-unescaped-entities': 'off', // Allow unescaped entities
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
