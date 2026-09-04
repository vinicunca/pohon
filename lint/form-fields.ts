import type { Rule } from 'eslint';

type IdentifierNode = Extract<Rule.Node, { type: 'Identifier' }>;
type FormFieldKey = 'size' | 'color' | 'highlight' | 'disabled';

interface TemplateExpressionContainer {
  references?: Array<{
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
 * Flag reads of a `useFormField` / `useFieldGroup` ref that don't fall back to
 * the `useComponentProps` proxy.
 *
 * `size`, `color`, `highlight` and `disabled` come back holding only what the
 * wrapping `<PForm>` / `<PFormField>` / `<PFieldGroup>` supplied, so a bare
 * `size.value` silently drops `<PTheme :props>` and `app.config` defaults. The
 * fix is always the same shape, either inline or hoisted into a computed:
 *
 * ```ts
 * size: formFieldSize.value ?? props.size
 * const disabled = computed(() => formFieldDisabled.value ?? props.disabled)
 * ```
 *
 * So the rule allows a read only when it sits in a `??` chain that ends in a
 * `props.<key>` member access, and reports it everywhere else. Chaining two
 * refs (`fieldGroupSize.value ?? formFieldSize.value ?? props.size`) is fine.
 *
 * Templates are checked too, and more strictly: refs auto-unwrap there, so an
 * unresolved `:size="formFieldSize"` has no `.value` to key off and reads
 * exactly like the resolved `:size="size"`. Since the resolution always belongs
 * in setup anyway, any appearance of one of these refs in a template is
 * reported outright.
 *
 * Not auto-fixable: the right landing spot is often a shared computed rather
 * than the use site, and appending `?? props.x` to the wrong branch of a
 * ternary would change behavior silently.
 */
const RESOLVABLE_FORM_FIELD_KEYS = new Set<string>(['size', 'color', 'highlight', 'disabled']);

export const noUnresolvedFormFieldRefs: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require `<ref>.value ?? props.X` when reading a `useFormField` / `useFieldGroup` ref',
    },
    schema: [],
    messages: {
      unresolved: 'Reading `{{ local }}` without a `?? {{ propsVar }}.{{ key }}` fallback drops `<PTheme :props>` and `app.config` defaults. Chain it, or read a computed that already does.',
      inTemplate: 'Binding the raw `{{ local }}` in the template drops `<PTheme :props>` and `app.config` defaults, and refs auto-unwrap here so it is indistinguishable from a resolved one. Resolve it in setup with `computed(() => {{ local }}.value ?? {{ propsVar }}.{{ key }})` and bind that.',
    },
  },
  create(context) {
    const parserServices = context.sourceCode.parserServices as Partial<TemplateParserServices>;
    let propsVar = 'props';
    // local binding name -> the prop key it must fall back to
    const formFieldRefs = new Map<string, FormFieldKey>();

    function isPropsAccess(node: unknown, key: FormFieldKey) {
      if (!isRecord(node) || node.type !== 'MemberExpression' || node.computed) {
        return false;
      }
      return isRecord(node.object)
        && node.object.type === 'Identifier'
        && node.object.name === propsVar
        && isRecord(node.property)
        && node.property.type === 'Identifier'
        && node.property.name === key;
    }

    function isFormFieldKey(value: string): value is FormFieldKey {
      return RESOLVABLE_FORM_FIELD_KEYS.has(value);
    }

    // `a ?? b ?? props.size` parses as `(a ?? b) ?? props.size`, so the fallback
    // can sit at any depth on either spine. Flatten the whole chain and accept
    // it if `props.<key>` shows up anywhere in it — that also covers the
    // `?? props.size ?? 'md'` shape used for virtualizer estimates.
    function chainOperands(node: unknown, out: Array<unknown> = []) {
      if (isRecord(node) && node.type === 'LogicalExpression' && node.operator === '??') {
        chainOperands(node.left, out);
        chainOperands(node.right, out);
      } else {
        out.push(node);
      }
      return out;
    }

    function isRecord(value: unknown): value is Record<string, unknown> {
      return typeof value === 'object' && value !== null;
    }

    const scriptVisitor: Rule.RuleListener = {
      'CallExpression[callee.name="useComponentProps"]': function (node: Rule.Node) {
        if (node.type !== 'CallExpression') {
          return;
        }
        const decl = node.parent?.type === 'VariableDeclarator' ? node.parent : null;
        if (decl?.id?.type === 'Identifier') {
          propsVar = decl.id.name;
        }
      },
      ':matches(CallExpression[callee.name="useFormField"], CallExpression[callee.name="useFieldGroup"])': function (node: Rule.Node) {
        if (node.type !== 'CallExpression') {
          return;
        }
        const decl = node.parent?.type === 'VariableDeclarator' ? node.parent : null;
        if (decl?.id?.type !== 'ObjectPattern') {
          return;
        }

        for (const prop of decl.id.properties) {
          if (prop.type !== 'Property' || prop.key.type !== 'Identifier') {
            continue;
          }
          if (!isFormFieldKey(prop.key.name)) {
            continue;
          }
          if (prop.value.type !== 'Identifier') {
            continue;
          }
          formFieldRefs.set(prop.value.name, prop.key.name);
        }
      },
      // Matches `<local>.value`, the only way these refs are read in script.
      'MemberExpression[computed=false][property.name="value"]': function (node: Rule.Node) {
        if (node.type !== 'MemberExpression') {
          return;
        }
        if (node.object.type !== 'Identifier') {
          return;
        }

        const key = formFieldRefs.get(node.object.name);
        if (!key) {
          return;
        }

        // Climb to the outermost `??` so the whole chain is in scope, then look
        // for the `props.<key>` fallback in the operands that follow this read.
        // Only a fallback placed after it is a fallback: `props.size ?? size.value`
        // reads the other way round and would let a theme default win over the
        // wrapping FormField.
        let top: Rule.Node = node;
        while (top.parent?.type === 'LogicalExpression' && top.parent.operator === '??') {
          top = top.parent;
        }

        const operands = chainOperands(top);
        const index = operands.indexOf(node);

        if (index !== -1 && operands.slice(index + 1).some((operand) => isPropsAccess(operand, key))) {
          return;
        }

        context.report({
          node,
          messageId: 'unresolved',
          data: { local: `${node.object.name}.value`, propsVar, key },
        });
      },
    };

    if (!parserServices?.defineTemplateBodyVisitor) {
      return scriptVisitor;
    }

    // Template visitors run after the script is fully traversed, so
    // `formFieldRefs` is populated by the time this fires.
    return parserServices.defineTemplateBodyVisitor(
      {
        VExpressionContainer(node) {
          for (const ref of node.references ?? []) {
            const name = ref.id?.name;
            if (!name) {
              continue;
            }

            const key = formFieldRefs.get(name);
            if (!key) {
              continue;
            }

            context.report({
              node: ref.id,
              messageId: 'inTemplate',
              data: { local: name, propsVar, key },
            });
          }
        },
      },
      scriptVisitor,
    );
  },
};
