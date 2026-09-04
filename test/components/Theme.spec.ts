import type { ThemeProps, ThemeSlots } from '../../src/runtime/components/Theme.vue';
import type { ButtonProps } from '../../src/runtime/types';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { TooltipProvider } from 'akar';
import { describe, expect, it } from 'vitest';
import { h, nextTick, ref } from 'vue';
import Alert from '../../src/runtime/components/Alert.vue';
import Avatar from '../../src/runtime/components/Avatar.vue';
import AvatarGroup from '../../src/runtime/components/AvatarGroup.vue';
import Badge from '../../src/runtime/components/Badge.vue';
import Button from '../../src/runtime/components/Button.vue';
import Checkbox from '../../src/runtime/components/Checkbox.vue';
import CheckboxGroup from '../../src/runtime/components/CheckboxGroup.vue';
import FieldGroup from '../../src/runtime/components/FieldGroup.vue';
import FileUpload from '../../src/runtime/components/FileUpload.vue';
import Form from '../../src/runtime/components/Form.vue';
import FormField from '../../src/runtime/components/FormField.vue';
import Input from '../../src/runtime/components/Input.vue';
import Theme from '../../src/runtime/components/Theme.vue';
import Tooltip from '../../src/runtime/components/Tooltip.vue';
import { componentRender, renderEach } from '../component-render';

type CaseOptions = { props?: ThemeProps; slots?: ThemeSlots };

describe('theme', () => {
  renderEach(
    Theme,
    [
    // Props
      [
        'with empty ui',
      {
        props: { ui: {} },
        slots: { default: () => [h(Button, { label: 'Button' })] },
      } satisfies CaseOptions,
      [],
      ],
      [
        'with theme applied to button base slot',
      {
        props: { ui: { button: { label: 'text-[#ff0]', base: 'px-[1.234rem]' } } },
        slots: { default: () => [h(Button, { label: 'Button' })] },
      } satisfies CaseOptions,
      ['px-[1.234rem]', 'text-[#ff0]'],
      ],
      [
        'with ui prop taking priority over theme',
      {
        props: { ui: { button: { label: 'text-[#ff0]', base: 'px-[1.234rem]' } } },
        slots: { default: () => [h(Button, { label: 'Button', ui: { base: 'px-[2.234rem]' } })] },
      } satisfies CaseOptions,
      ['px-[2.234rem]'],
      ],
      [
        'with nested theme overriding outer theme',
      {
        props: { ui: { button: { label: 'text-[#ff0]', base: 'px-[1.234rem]' } } },
        slots: { default: () => [h(Theme, { ui: { button: { label: 'text-[#000]', base: 'px-[2.234rem]' } } }, () => [h(Button, { label: 'Button' })])] },
      } satisfies CaseOptions,
      ['px-[2.234rem]', 'text-[#000]'],
      ],
      [
        'with theme applied to badge',
      {
        props: { ui: { badge: { base: 'rounded-[1.234rem]' } } },
        slots: { default: () => [h(Badge, { label: 'Badge' })] },
      } satisfies CaseOptions,
      ['rounded-[1.234rem]'],
      ],
      [
        'with theme applied to alert',
      {
        props: { ui: { alert: { root: 'border-[3px]' } } },
        slots: { default: () => [h(Alert, { title: 'Alert' })] },
      } satisfies CaseOptions,
      ['border-[3px]'],
      ],
      [
        'with theme applied to multiple component types',
      {
        props: { ui: { button: { base: 'px-[1.234rem]' }, badge: { base: 'rounded-[1.234rem]' } } },
        slots: {
          default: () => [
            h(Button, { label: 'Button' }),
            h(Badge, { label: 'Badge' }),
          ],
        },
      } satisfies CaseOptions,
      ['px-[1.234rem]', 'rounded-[1.234rem]'],
      ],
      [
        'with theme not affecting unrelated component',
      {
        props: { ui: { badge: { base: 'rounded-[1.234rem]' } } },
        slots: { default: () => [h(Button, { label: 'Button' })] },
      } satisfies CaseOptions,
      [],
      ],
    ],
    async (nameOrHtml, options, contains) => {
      const html = await componentRender(nameOrHtml, options, Theme);
      expect(html).toMatchSnapshot();
      contains.forEach((c) => {
        expect(html).toContain(c);
      });
    },
  );

  it('applies theme classes to child component', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :ui="{ button: { base: 'test-theme-class' } }">
          <Button label="Themed" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('test-theme-class');
  });

  it('child ui prop takes priority over theme', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :ui="{ button: { base: 'theme-class' } }">
          <Button label="Themed" :ui="{ base: 'ui-prop-class' }" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('ui-prop-class');
    expect(wrapper.find('button').classes()).not.toContain('theme-class');
  });

  it('nested theme overrides outer theme', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :ui="{ button: { base: 'outer-theme-class' } }">
          <Theme :ui="{ button: { base: 'inner-theme-class' } }">
            <Button label="Themed" />
          </Theme>
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('inner-theme-class');
    expect(wrapper.find('button').classes()).not.toContain('outer-theme-class');
  });

  it('deeply nested themes (3 levels)', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :ui="{ button: { base: 'level-1-class' } }">
          <Theme :ui="{ button: { base: 'level-2-class' } }">
            <Theme :ui="{ button: { base: 'level-3-class' } }">
              <Button label="Themed" />
            </Theme>
          </Theme>
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('level-3-class');
    expect(wrapper.find('button').classes()).not.toContain('level-2-class');
    expect(wrapper.find('button').classes()).not.toContain('level-1-class');
  });

  it('applies theme to multiple children of same type', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :ui="{ button: { base: 'shared-theme-class' } }">
          <Button label="First" />
          <Button label="Second" />
        </Theme>
      `,
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => {
      expect(button.classes()).toContain('shared-theme-class');
    });
  });

  it('applies theme to different component types simultaneously', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button, Badge },
      template: `
        <Theme :ui="{ button: { base: 'button-theme-class' }, badge: { base: 'badge-theme-class' } }">
          <Button label="Themed Button" />
          <Badge label="Themed Badge" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('button-theme-class');
    expect(wrapper.find('span').classes()).toContain('badge-theme-class');
  });

  it('theme does not leak outside its scope', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <div>
          <Theme :ui="{ button: { base: 'inside-theme-class' } }">
            <Button label="Inside" class="inside-btn" />
          </Theme>
          <Button label="Outside" class="outside-btn" />
        </div>
      `,
    });

    expect(wrapper.find('.inside-btn').classes()).toContain('inside-theme-class');
    expect(wrapper.find('.outside-btn').classes()).not.toContain('inside-theme-class');
  });

  it('reacts to theme prop changes', async () => {
    const ui = ref<any>({ button: { base: 'initial-class' } });

    const wrapper = await mountSuspended({
      components: { Theme, Button },
      setup: () => ({ ui }),
      template: `
        <Theme :ui="ui">
          <Button label="Themed" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('initial-class');

    ui.value = { button: { base: 'updated-class' } };
    await nextTick();

    expect(wrapper.find('button').classes()).toContain('updated-class');
    expect(wrapper.find('button').classes()).not.toContain('initial-class');
  });

  it('applies theme to input component', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Input },
      template: `
        <Theme :ui="{ input: { root: 'input-theme-class' } }">
          <Input placeholder="Themed input" />
        </Theme>
      `,
    });

    expect(wrapper.find('[data-slot="root"]').classes()).toContain('input-theme-class');
  });

  it(':props applies prop defaults to child', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { color: 'error', variant: 'soft' } }">
          <Button label="Themed" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('bg-error/10');
    expect(wrapper.find('button').classes()).not.toContain('bg-primary');
  });

  it('explicit prop wins over :props (other theme props still flow through)', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { color: 'error', variant: 'soft' } }">
          <Button label="Override" color="primary" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('bg-primary/10');
    expect(wrapper.find('button').classes()).not.toContain('bg-error/10');
  });

  it(':props applies to multiple component types simultaneously', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button, Checkbox },
      template: `
        <Theme :props="{ button: { color: 'error', variant: 'soft' }, checkbox: { color: 'success' } }">
          <Button label="Themed Button" />
          <Checkbox model-value label="Themed Checkbox" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('bg-error/10');
    expect(wrapper.html()).toContain('focus-visible:ring-success');
  });

  it(':props does not leak outside scope', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <div>
          <Theme :props="{ button: { color: 'error', variant: 'soft' } }">
            <Button label="Inside" class="inside-btn" />
          </Theme>
          <Button label="Outside" class="outside-btn" />
        </div>
      `,
    });

    expect(wrapper.find('.inside-btn').classes()).toContain('bg-error/10');
    expect(wrapper.find('.outside-btn').classes()).not.toContain('bg-error/10');
  });

  it('nested :props inherits non-overridden keys from outer', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { color: 'error', variant: 'soft' } }">
          <Button label="Outer" class="outer-btn" />
          <Theme :props="{ button: { color: 'success' } }">
            <Button label="Inner" class="inner-btn" />
          </Theme>
        </Theme>
      `,
    });

    expect(wrapper.find('.outer-btn').classes()).toContain('bg-error/10');
    expect(wrapper.find('.inner-btn').classes()).toContain('bg-success/10');
    expect(wrapper.find('.inner-btn').classes()).not.toContain('bg-error/10');
  });

  // Real-world layout: an outer `<PTheme :props>` set near the root configures
  // a "global" component (e.g. tooltip), and an inner `<Theme :props>` further
  // down the tree only overrides a different component (e.g. button). Both
  // should compose: tooltips below the inner theme still inherit the outer's
  // tooltip defaults, and the inner's button override applies only locally.
  it('nested :props inherits across different components', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, TooltipProvider, Tooltip, Button },
      template: `
        <Theme :props="{ tooltip: { arrow: true }, button: { color: 'error', variant: 'soft' } }">
          <TooltipProvider>
            <Theme :props="{ button: { color: 'success' } }">
              <Tooltip text="Inner tooltip" :open="true" :portal="false">
                <Button label="Inner" class="inner-btn" />
              </Tooltip>
            </Theme>
          </TooltipProvider>
        </Theme>
      `,
    });

    // Inner button picks up the inner theme's color override, but inherits
    // `variant: 'soft'` from the outer theme (proven by `bg-success/10` —
    // the soft variant of success).
    expect(wrapper.find('.inner-btn').classes()).toContain('bg-success/10');
    expect(wrapper.find('.inner-btn').classes()).not.toContain('bg-error/10');

    // Tooltip below the inner theme inherits the outer theme's `arrow: true`
    // because the inner theme didn't touch the `tooltip` key.
    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(true);
  });

  it('reacts to :props changes', async () => {
    const themeProps = ref<{ button: Partial<ButtonProps> }>({ button: { color: 'error', variant: 'soft' } });

    const wrapper = await mountSuspended({
      components: { Theme, Button },
      setup: () => ({ themeProps }),
      template: `
        <Theme :props="themeProps">
          <Button label="Themed" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('bg-error/10');

    themeProps.value = { button: { color: 'success', variant: 'soft' } };
    await nextTick();

    expect(wrapper.find('button').classes()).toContain('bg-success/10');
    expect(wrapper.find('button').classes()).not.toContain('bg-error/10');
  });

  it(':props and :ui work together', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme
          :props="{ button: { color: 'error', variant: 'soft' } }"
          :ui="{ button: { base: 'rounded-full' } }"
        >
          <Button label="Both" />
        </Theme>
      `,
    });

    expect(wrapper.find('button').classes()).toContain('bg-error/10');
    expect(wrapper.find('button').classes()).toContain('rounded-full');
  });

  // A `class` inside `:props` is concatenated with the component's own `class`
  // instead of being replaced by it, otherwise any component setting a class
  // would lose the theme class entirely.
  it(':props class is concatenated with an explicit class on the component', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { class: 'rounded-full' } }">
          <Button label="Themed" class="hidden lg:inline-flex" />
        </Theme>
      `,
    });

    const classes = wrapper.find('button').classes();
    expect(classes).toContain('rounded-full');
    expect(classes).toContain('hidden');
    expect(classes).toContain('lg:inline-flex');
  });

  it(':props class preserves conflicting explicit classes for the CSS cascade', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { class: 'rounded-full' } }">
          <Button label="Themed" class="rounded-none" />
        </Theme>
      `,
    });

    const classes = wrapper.find('button').classes();
    expect(classes).toContain('rounded-none');
    expect(classes).toContain('rounded-full');
  });

  // Boolean values supplied via `:props` must reach a Reka primitive root through
  // `useForwardProps`. This is the path where Vue's auto-casting of unset Boolean
  // props would otherwise turn the proxy result into `false` and silently swallow
  // the theme value — the test pins down that the proxy + forwarder cooperate.
  it(':props forwards a boolean to a reka primitive root (tooltip arrow)', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, TooltipProvider, Tooltip },
      template: `
        <Theme :props="{ tooltip: { arrow: true } }">
          <TooltipProvider>
            <Tooltip text="Themed" :open="true" :portal="false" />
          </TooltipProvider>
        </Theme>
      `,
    });

    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(true);
  });

  // Without a `<PTheme :props>` ancestor, an unset Boolean prop must stay unset
  // so the underlying akar primitive's own default applies. The proxy gates the
  // `_props` fallback on `withDefaults` having a real default, otherwise Vue's
  // auto-cast `false` would leak through.
  it('bare component does not pass Vue auto-cast `false` to akar primitive', async () => {
    const wrapper = await mountSuspended({
      components: { TooltipProvider, Tooltip },
      template: `
        <TooltipProvider>
          <Tooltip text="Bare" :open="true" :portal="false" />
        </TooltipProvider>
      `,
    });

    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(false);
  });

  // `useFormField` must receive the raw `_props` rather than the
  // `useComponentProps` proxy, otherwise `<PTheme :props>` defaults would shadow
  // values injected by `<PFormField>` (size, name, disabled, error...). This test
  // locks down the precedence: explicit FormField context > `<PTheme :props>`.
  it(':props on a child of <PFormField> still honors field injection', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, FormField, Checkbox },
      template: `
        <Theme :props="{ checkbox: { color: 'success', size: 'xs' } }">
          <FormField label="Accept" size="xl">
            <Checkbox model-value />
          </FormField>
        </Theme>
      `,
    });

    // theme `color` flows through the proxy onto the checkbox
    expect(wrapper.html()).toContain('focus-visible:ring-success');
    // FormField label is wired up
    expect(wrapper.text()).toContain('Accept');
    // FormField-injected `size` (xl) wins over `<PTheme :props>` size (xs).
    // `useFormField` reads `_props.size` (raw, undefined here) so it falls back
    // to the FormField context — proving the proxy isn't shadowing field injection.
    expect(wrapper.find('button[role="checkbox"]').classes()).toContain('size-5');
    expect(wrapper.find('button[role="checkbox"]').classes()).not.toContain('size-3');
  });

  // FormField validation errors must always win over `<PTheme :props>` color.
  // `useFormField` reads raw `_props` and short-circuits to `'error'` when a
  // validation message is present, so the proxy fallback in
  // `color: color.value ?? props.color` never runs.
  it('formField validation error overrides :props color', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, FormField, Checkbox },
      template: `
        <Theme :props="{ checkbox: { color: 'success' } }">
          <FormField label="Required" error="This field is required">
            <Checkbox model-value />
          </FormField>
        </Theme>
      `,
    });

    expect(wrapper.html()).toContain('focus-visible:ring-error');
    expect(wrapper.html()).not.toContain('focus-visible:ring-success');
  });

  // `highlight` and `disabled` are Boolean props, which Vue auto-casts to
  // `false` when unset. `useFormField` normalizes them back to `undefined` so
  // the `highlight.value ?? props.highlight` fallback isn't short-circuited on
  // `false` — otherwise `<PTheme :props>` never reaches any form control.
  it(':props highlight reaches a form control', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Checkbox },
      template: `
        <Theme :props="{ checkbox: { highlight: true } }">
          <Checkbox label="Accept" />
        </Theme>
      `,
    });

    expect(wrapper.find('button[role="checkbox"]').classes()).toContain('ring-primary');
  });

  // A theme-provided `disabled` must disable the control, not only paint it as
  // disabled. Regressed when only the `uv()` call read the resolved value while
  // the template kept binding the raw `useFormField` ref.
  it(':props disabled disables a control instead of only styling it', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, FileUpload },
      template: `
        <Theme :props="{ fileUpload: { disabled: true } }">
          <FileUpload />
        </Theme>
      `,
    });

    expect(wrapper.html()).toContain('cursor-not-allowed');
    expect(wrapper.find('input[type="file"]').attributes('disabled')).toBeDefined();
    expect(wrapper.find('[data-slot="base"]').attributes('tabindex')).toBe('-1');
  });

  // `<PForm disabled>` is the closer context and must keep winning over an
  // explicit `:disabled="false"` resolved through the proxy.
  it('form disabled wins over :props disabled', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Form, Checkbox },
      template: `
        <Theme :props="{ checkbox: { disabled: false } }">
          <Form :state="{}" disabled>
            <Checkbox label="Accept" />
          </Form>
        </Theme>
      `,
    });

    expect(wrapper.find('button[role="checkbox"]').attributes('disabled')).toBeDefined();
  });

  // CheckboxGroup resolves `color`/`size`/`highlight` once and forwards them to
  // every child Checkbox, so a theme set on the group has to reach the items.
  it(':props color on a checkbox group reaches its items', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, CheckboxGroup },
      template: `
        <Theme :props="{ checkboxGroup: { color: 'success' } }">
          <CheckboxGroup :items="[{ label: 'A', value: 'a' }]" :model-value="['a']" />
        </Theme>
      `,
    });

    expect(wrapper.html()).toContain('outline-success/25');
    expect(wrapper.html()).not.toContain('outline-primary/25');
  });

  // The group resolves `color` once and hands it to every child, so a FormField
  // validation error has to beat `<PTheme :props>` on the items too, not just on
  // the group root.
  it('formField error overrides :props color on a checkbox group', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, FormField, CheckboxGroup },
      template: `
        <Theme :props="{ checkboxGroup: { color: 'success' } }">
          <FormField label="Pick one" error="This field is required">
            <CheckboxGroup :items="[{ label: 'A', value: 'a' }]" :model-value="['a']" />
          </FormField>
        </Theme>
      `,
    });

    expect(wrapper.html()).toContain('outline-error/25');
    expect(wrapper.html()).not.toContain('outline-success/25');
  });

  // `useFieldGroup` shares the same closer-context-wins fallback as
  // `useFormField` (`_props.size ?? fieldGroup.size`). A child Button inside
  // `<PFieldGroup>` must take its size from the wrapping group, not from
  // `<PTheme :props="{ button: { size } }">`. Regressed once when components
  // were passing the proxy `props` to `useFieldGroup` instead of `_props`.
  it('fieldGroup size wins over :props button size', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, FieldGroup, Button },
      template: `
        <Theme :props="{ button: { size: 'xs' } }">
          <FieldGroup size="xl">
            <Button label="Save" />
          </FieldGroup>
        </Theme>
      `,
    });

    const btn = wrapper.find('button');
    expect(btn.classes()).toContain('text-base');
    expect(btn.classes()).not.toContain('text-xs');
  });

  // `useAvatarGroup` follows the same pattern: `<PAvatarGroup size>` is the
  // closer context and must beat `<PTheme :props="{ avatar: { size } }">`.
  it('avatarGroup size wins over :props avatar size', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, AvatarGroup, Avatar },
      template: `
        <Theme :props="{ avatar: { size: 'xs' } }">
          <AvatarGroup size="xl">
            <Avatar src="https://example.com/a.png" />
            <Avatar src="https://example.com/b.png" />
          </AvatarGroup>
        </Theme>
      `,
    });

    const avatars = wrapper.findAll('span[data-slot="base"]');
    expect(avatars.length).toBeGreaterThan(0);
    avatars.forEach((avatar) => {
      expect(avatar.classes()).toContain('size-10');
      expect(avatar.classes()).not.toContain('size-6');
    });
  });

  it('reactivity: toggling a boolean in :props re-renders the akar primitive', async () => {
    const themeProps = ref<{ tooltip: { arrow?: boolean } }>({ tooltip: { arrow: false } });

    const wrapper = await mountSuspended({
      components: { Theme, TooltipProvider, Tooltip },
      setup: () => ({ themeProps }),
      template: `
        <Theme :props="themeProps">
          <TooltipProvider>
            <Tooltip text="Themed" :open="true" :portal="false" />
          </TooltipProvider>
        </Theme>
      `,
    });

    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(false);

    themeProps.value = { tooltip: { arrow: true } };
    await nextTick();

    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(true);
  });
});
