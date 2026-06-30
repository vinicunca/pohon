import { vinicuncaESLint } from '@vinicunca/eslint-config';

/**
 * Flag bare prop references in templates of components that use
 * `useComponentProps`. Bare refs auto-resolve to the raw `defineProps` result
 * via Vue's compiler-generated `__props.X`, bypassing the proxy that resolves
 * `<PTheme :props>` and `app.config` defaults.
 *
 * Auto-fixes by rewriting `arrow` → `props.arrow`.
 *
 * In `<script setup>`, every free identifier in a template expression resolves
 * to either (a) a setup-scope binding or (b) `__props.X`. So if an identifier
 * isn't a known setup binding, slot-scoped variable, or JS global, it must be
 * a prop access — and therefore needs the `props.` prefix to flow through the
 * proxy. This catches inherited props (extended/picked from imported types)
 * that no static interface walk would find.
 */
const KNOWN_GLOBALS = new Set([
  'undefined',
  'null',
  'true',
  'false',
  'NaN',
  'Infinity',
  'console',
  'window',
  'document',
  'navigator',
  'location',
  'history',
  'Math',
  'JSON',
  'Object',
  'Array',
  'String',
  'Number',
  'Boolean',
  'Date',
  'RegExp',
  'Promise',
  'Symbol',
  'Error',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'Proxy',
  'Reflect',
  'parseInt',
  'parseFloat',
  'isNaN',
  'isFinite',
  'encodeURIComponent',
  'decodeURIComponent',
]);
const noBarePropRefs = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require `props.X` access in templates of components using `useComponentProps`',
    },
    fixable: 'code',
    schema: [],
    messages: {
      bareRef: 'Bare prop reference `{{ name }}` bypasses the `useComponentProps` proxy. Use `{{ propsVar }}.{{ name }}` so `<PTheme :props>` defaults flow through.',
    },
  },
  create(context) {
    const parserServices = context.sourceCode?.parserServices ?? context.parserServices;
    if (!parserServices?.defineTemplateBodyVisitor) {
      return {};
    }

    let usesComponentProps = false;
    let propsVar = 'props';
    let rawPropsVar = '_props';
    const setupBindings = new Set();

    function collectIdsFromPattern(pattern) {
      if (!pattern) {
        return;
      }
      if (pattern.type === 'Identifier') {
        setupBindings.add(pattern.name);
      } else if (pattern.type === 'ObjectPattern') {
        for (const prop of pattern.properties) {
          if (prop.type === 'Property') {
            collectIdsFromPattern(prop.value);
          } else if (prop.type === 'RestElement') {
            collectIdsFromPattern(prop.argument);
          }
        }
      } else if (pattern.type === 'ArrayPattern') {
        for (const el of pattern.elements) {
          if (el) {
            collectIdsFromPattern(el);
          }
        }
      } else if (pattern.type === 'AssignmentPattern') {
        collectIdsFromPattern(pattern.left);
      } else if (pattern.type === 'RestElement') {
        collectIdsFromPattern(pattern.argument);
      }
    }

    return parserServices.defineTemplateBodyVisitor(
      {
        VExpressionContainer(node) {
          if (!usesComponentProps) {
            return;
          }
          const refs = node.references ?? [];
          for (const ref of refs) {
            if (ref.variable) {
              continue;
            }
            const id = ref.id;
            const name = id.name;
            if (!name) {
              continue;
            }
            if (name === propsVar || name === rawPropsVar) {
              continue;
            }
            if (setupBindings.has(name)) {
              continue;
            }
            if (KNOWN_GLOBALS.has(name)) {
              continue;
            }
            if (name.startsWith('$') || name.startsWith('_')) {
              continue;
            }
            // Skip PascalCase identifiers — they're TypeScript type references
            // inside `as TypeName` casts, generic params (`T`), or `keyof X`,
            // not runtime prop reads. Vue components / props are camelCase by
            // convention; type names are PascalCase.
            if (/^[A-Z]/.test(name)) {
              continue;
            }
            context.report({
              node: id,
              messageId: 'bareRef',
              data: { name, propsVar },
              fix(fixer) {
                // Handle object literal shorthand: `{ to, target }` should
                // become `{ to: props.to, target: props.target }`, not the
                // syntactically-broken `{ props.to, props.target }`.
                const parent = id.parent;
                if (
                  parent
                  && parent.type === 'Property'
                  && parent.shorthand
                  && parent.key === id
                ) {
                  return fixer.replaceText(parent, `${name}: ${propsVar}.${name}`);
                }
                return fixer.replaceText(id, `${propsVar}.${name}`);
              },
            });
          }
        },
      },
      {
        'Program > VariableDeclaration > VariableDeclarator': function (node) {
          collectIdsFromPattern(node.id);
        },
        'Program > FunctionDeclaration': function (node) {
          if (node.id?.type === 'Identifier') {
            setupBindings.add(node.id.name);
          }
        },
        'Program > ClassDeclaration': function (node) {
          if (node.id?.type === 'Identifier') {
            setupBindings.add(node.id.name);
          }
        },
        ImportDeclaration(node) {
          for (const spec of node.specifiers) {
            if (spec.local?.type === 'Identifier') {
              setupBindings.add(spec.local.name);
            }
          }
        },
        'CallExpression[callee.name="useComponentProps"]': function (node) {
          usesComponentProps = true;
          const decl = node.parent?.type === 'VariableDeclarator' ? node.parent : null;
          if (decl?.id?.type === 'Identifier') {
            propsVar = decl.id.name;
          }
          const rawArg = node.arguments[1];
          if (rawArg?.type === 'Identifier') {
            rawPropsVar = rawArg.name;
          }
        },
      },
    );
  },
};

export default vinicuncaESLint(
  {
    ignores: [
      '.github/**/*.md',
      'skills/**/*.md',
      // TODO: remove when docs is ready
      'docs/**',
    ],
    unocss: {
      configPath: 'playgrounds/nuxt/uno.config.ts',
    },
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

      'sonar/no-nested-template-literals': 'off',
      'sonar/no-nested-functions': 'off',
      'sonar/use-type-alias': 'off',
      'sonar/redundant-type-aliases': 'off',
      'sonar/no-nested-conditional': 'off',
      'sonar/void-use': 'off',
      'sonar/no-empty-test-file': 'off',
      'sonar/no-hardcoded-passwords': 'off',
      'sonar/fixme-tag': 'off',
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
    files: ['src/runtime/components/**/*.vue'],
    plugins: {
      'pohon-ui': {
        rules: {
          'no-bare-prop-refs': noBarePropRefs,
        },
      },
    },
    rules: {
      'pohon-ui/no-bare-prop-refs': 'error',
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
);
