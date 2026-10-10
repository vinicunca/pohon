import { vinicuncaESLint } from '@vinicunca/eslint-config';
import { noUnresolvedFormFieldRefs } from './lint/form-fields';
import { noBarePropRefs } from './lint/no-bare-props';

export default vinicuncaESLint(
  {
    ignores: [
      '.github/**/*.md',
      'graphify-out/**',
      'skills/**/*.md',
    ],
    unocss: {
      configPath: 'playgrounds/nuxt/uno.config.ts',
    },
    antislop: false,
  },
  {
    rules: {
      'import/first': 'off',
      'import/order': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-restricted-syntax': 'off',
      'node/prefer-global/process': 'off',
      'no-await-in-loop': 'off',
      'no-nested-ternary': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/method-signature-style': 'off',
      'pnpm/yaml-enforce-settings': 'off',

      'unocss/order': [
        'warn',
        {
          unoVariables: ['^theme'],
        },
      ],
    },
  },

  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/max-attributes-per-line': ['error', { singleline: 5 }],
    },
  },

  {
    files: [
      'playgrounds/**',
      'test/**',
    ],
    rules: {
      'no-console': 'off',
    },
  },

  {
    // Class order in themes and components is part of the rendered output, and
    // snapshots and `uv` tests assert it, so `--fix` must not reorder it
    files: ['src/**', 'test/**'],
    rules: {
      'unocss/order': 'off',
    },
  },

  {
    // Node scripts that measure the bundle size
    files: ['test/bundle/*.mjs'],
    rules: {
      'antfu/no-top-level-await': 'off',
    },
  },

  {
    files: ['src/runtime/components/**/*.vue'],
    plugins: {
      'pohon-ui': {
        rules: {
          'no-bare-prop-refs': noBarePropRefs,
          'no-unresolved-form-field-refs': noUnresolvedFormFieldRefs,
        },
      },
    },
    rules: {
      'pohon-ui/no-bare-prop-refs': 'error',
      'pohon-ui/no-unresolved-form-field-refs': 'error',
    },
  },

  {
    files: [
      'src/runtime/components/**/*.vue',
      'src/runtime/composables/**/*.ts',
    ],
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          { name: '../types', message: 'Import cross-component types from their source file (e.g. \'./Button.vue\') or a specific \'../types/*\' module, not the \'../types\' barrel: it re-exports every component, so one import eagerly loads the whole library into a consumer\'s type graph.' },
          { name: '../../types', message: 'Import cross-component types from their source file (e.g. \'./Button.vue\') or a specific \'../../types/*\' module, not the \'../../types\' barrel: it re-exports every component, so one import eagerly loads the whole library into a consumer\'s type graph.' },
        ],
      }],
    },
  },

  {
    files: [
      'src/runtime/locale/**/*.ts',
    ],
    rules: {
      camelcase: 'off',
    },
  },
);
