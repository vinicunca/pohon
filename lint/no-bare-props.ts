import type { Rule } from 'eslint';

type IdentifierNode = Extract<Rule.Node, { type: 'Identifier' }>;
type VariableDeclaratorNode = Extract<Rule.Node, { type: 'VariableDeclarator' }>;
type FunctionDeclarationNode = Extract<Rule.Node, { type: 'FunctionDeclaration' }>;
type ClassDeclarationNode = Extract<Rule.Node, { type: 'ClassDeclaration' }>;
type ImportDeclarationNode = Extract<Rule.Node, { type: 'ImportDeclaration' }>;
type CallExpressionNode = Extract<Rule.Node, { type: 'CallExpression' }>;
type BindingPattern
  = { type: 'Identifier'; name: string }
    | { type: 'ObjectPattern'; properties: Array<ObjectPatternProperty | RestElementPattern> }
    | { type: 'ArrayPattern'; elements: Array<BindingPattern | RestElementPattern | null> }
    | { type: 'AssignmentPattern'; left: BindingPattern }
    | RestElementPattern;

interface ObjectPatternProperty {
  type: 'Property';
  value: BindingPattern;
}

interface RestElementPattern {
  type: 'RestElement';
  argument: BindingPattern;
}

interface TemplateExpressionContainer {
  references?: Array<{
    variable?: unknown;
    id: IdentifierNode;
  }>;
}

interface TemplateParserServices {
  defineTemplateBodyVisitor(
    templateBodyVisitor: {
      VExpressionContainer(node: TemplateExpressionContainer): void;
    },
    scriptVisitor: Rule.RuleListener,
  ): Rule.RuleListener;
}

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

export const noBarePropRefs: Rule.RuleModule = {
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
    const parserServices = context.sourceCode.parserServices as Partial<TemplateParserServices>;
    if (!parserServices?.defineTemplateBodyVisitor) {
      return {};
    }

    let usesComponentProps = false;
    let propsVar = 'props';
    let rawPropsVar = '_props';
    const setupBindings = new Set();

    function collectIdsFromPattern(pattern: unknown) {
      if (!isBindingPattern(pattern)) {
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

    function isBindingPattern(value: unknown): value is BindingPattern {
      return typeof value === 'object'
        && value !== null
        && 'type' in value
        && typeof value.type === 'string'
        && ['Identifier', 'ObjectPattern', 'ArrayPattern', 'AssignmentPattern', 'RestElement'].includes(value.type);
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
        'Program > VariableDeclaration > VariableDeclarator': function (node: VariableDeclaratorNode) {
          collectIdsFromPattern(node.id);
        },
        'Program > FunctionDeclaration': function (node: FunctionDeclarationNode) {
          if (node.id?.type === 'Identifier') {
            setupBindings.add(node.id.name);
          }
        },
        'Program > ClassDeclaration': function (node: ClassDeclarationNode) {
          if (node.id?.type === 'Identifier') {
            setupBindings.add(node.id.name);
          }
        },
        ImportDeclaration(node: ImportDeclarationNode) {
          for (const spec of node.specifiers) {
            if (spec.local?.type === 'Identifier') {
              setupBindings.add(spec.local.name);
            }
          }
        },
        'CallExpression[callee.name="useComponentProps"]': function (node: CallExpressionNode) {
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
