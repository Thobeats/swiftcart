import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import typescript from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    ...typescript.configs.recommended,

    // ✅ React + React Hooks (plugins FIRST, no overwrite)
    {
        plugins: {
            react,
            'react-hooks': reactHooks,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            // React
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat['jsx-runtime'].rules,

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',

            // React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },

    // Import rules
    {
        ...importPlugin.flatConfigs.recommended,
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
                node: true,
            },
        },
        rules: {
            ...importPlugin.flatConfigs.recommended.rules,
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },

    {
        ...importPlugin.flatConfigs.typescript,
        files: ['**/*.{ts,tsx}'],
    },

    {
        ignores: [
            'vendor',
            'node_modules',
            'public',
            'bootstrap/ssr',
            'tailwind.config.js',
        ],
    },

    prettier,
];
