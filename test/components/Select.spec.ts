import type { FormInputEvents } from '../../src/module';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import theme from '#build/ui/input';
import Select from '../../src/runtime/components/Select.vue';
import { renderEach } from '../component-render';
import { renderForm } from '../utils/form';
import { expectEmitPayloadType } from '../utils/types';

describe('select', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;

  const items = [
    {
      label: 'Backlog',
      value: 'backlog',
      icon: 'i-lucide-circle-help',
    },
    {
      label: 'Todo',
      value: 'todo',
      icon: 'i-lucide-circle-plus',
    },
    {
      label: 'In Progress',
      value: 'in_progress',
      icon: 'i-lucide-circle-arrow-up',
    },
    {
      label: 'Done',
      value: 'done',
      icon: 'i-lucide-circle-check',
    },
    {
      label: 'Canceled',
      value: 'canceled',
      icon: 'i-lucide-circle-x',
    },
  ];

  const itemsWithDescription = [...items.map((item) => ({ ...item, description: 'Description' }))];

  const props = { open: true, portal: false, items };

  renderEach(Select, [
    // Props
    ['with items', { props }],
    ['with items with description', { props: { ...props, items: itemsWithDescription } }],
    ['with modelValue', { props: { ...props, modelValue: items[0]?.value } }],
    ['with defaultValue', { props: { ...props, defaultValue: items[0]?.value } }],
    ['with valueKey', { props: { ...props, valueKey: 'label', defaultValue: 'Backlog' } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    ['with descriptionKey', { props: { ...props, descriptionKey: 'description' } }],
    ['with multiple', { props: { ...props, multiple: true } }],
    ['with multiple and modelValue', { props: { ...props, multiple: true, modelValue: [items[0], items[1]] } }],
    ['with id', { props: { ...props, id: 'id' } }],
    ['with name', { props: { ...props, name: 'name' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with required', { props: { ...props, required: true } }],
    ['with icon', { props: { icon: 'i-lucide-search' } }],
    ['with leading and icon', { props: { leading: true, icon: 'i-lucide-arrow-left' } }],
    ['with leadingIcon', { props: { leadingIcon: 'i-lucide-arrow-left' } }],
    ['with trailing and icon', { props: { trailing: true, icon: 'i-lucide-arrow-right' } }],
    ['with trailingIcon', { props: { trailingIcon: 'i-lucide-arrow-right' } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/praburangki.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/praburangki.png' }, leadingIcon: 'i-lucide-arrow-left' } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/praburangki.png' }, trailingIcon: 'i-lucide-arrow-right' } }],
    ['with loading', { props: { loading: true } }],
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/praburangki.png' } } }],
    ['with loading trailing', { props: { loading: true, trailing: true } }],
    ['with loading trailing and avatar', { props: { loading: true, trailing: true, avatar: { src: 'https://github.com/praburangki.png' } } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: 'i-lucide-loader' } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: 'i-lucide-chevron-down' } }],
    ['with selectedIcon', { props: { ...props, selectedIcon: 'i-lucide-check' } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { ...props, variant } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant} highlight`, { props: { ...props, variant, highlight: true } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { ...props, variant, color: 'neutral' } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant} highlight`, { props: { ...props, variant, color: 'neutral', highlight: true } }]),
    ['with ariaLabel', { props, attrs: { 'aria-label': 'Aria label' } }],
    ['with class', { props: { ...props, class: 'rounded-full' } }],
    ['with ui', { props: { ...props, ui: { group: 'p-2' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-description slot', { props: { ...props, items: itemsWithDescription }, slots: { 'item-description': () => 'Item description slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
  ]);

  renderEach(
    Select,
    [
      ['with .trim modifier', { props: { modelModifiers: { trim: true } } }, { input: 'input  ', expected: 'input' }],
      ['with .number modifier', { props: { modelModifiers: { number: true } } }, { input: '42', expected: 42 }],
      ['with .nullable modifier', { props: { modelModifiers: { nullable: true } } }, { input: null, expected: null }],
      ['with .optional modifier', { props: { modelModifiers: { optional: true } } }, { input: undefined, expected: undefined }],
    ],
    '%s works',
    async (_, options, spec) => {
      const wrapper = mount(Select, {
        ...options,
      });

      const select = wrapper.findComponent({ name: 'SelectRoot' });
      await select.setValue(spec.input);

      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[spec.expected]] });
    },
  );

  it('with trailing false should not render trailing section', () => {
    const wrapper = mount(Select, {
      props: {
        ...props,
        trailing: false,
      },
    });

    expect(wrapper.find('[data-slot="trailing"]').exists()).toBe(false);
    expect(wrapper.find('[data-slot="trailingIcon"]').exists()).toBe(false);
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Select, {
      props: {
        ...props,
        modelValue: items[0]?.value,
        required: true,
        avatar: {
          src: 'https://github.com/praburangki.png',
          alt: 'praburangki',
        },
      },
      attrs: {
        'aria-label': 'Select an item',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe('it should display correct label', () => {
    it.each([null, undefined, ''])('falsy model value %s should display placeholder', (modelValue) => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue,
          placeholder: 'Select an item',
        },
      });

      expect(wrapper.text()).toBe('Select an item');
    });

    it('with string array and string value', () => {
      const wrapper = mount(Select, {
        props: {
          items: ['Apple', 'Banana', 'Cherry'],
          modelValue: 'Banana',
        },
      });

      expect(wrapper.text()).toBe('Banana');
    });

    it('with multiple and empty array value should display placeholder', () => {
      const wrapper = mount(Select, {
        props: {
          items,
          multiple: true,
          modelValue: [],
          placeholder: 'Select items',
        },
      });
      expect(wrapper.text()).toBe('Select items');
    });

    it('with falsy modelValue and options items contain falsy', () => {
      const wrapper = mount(Select, {
        props: {
          items: [
            {
              label: 'John Doe',
              value: null,
            },
            {
              label: 'John Lennon',
              value: 1,
            },
          ],
          valueKey: 'value',
          modelValue: null,
        },
      });
      expect(wrapper.text()).toBe('John Doe');
    });
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = mount(Select, { props: { items: ['Option 1', 'Option 2'] } });
      const input = wrapper.findComponent({ name: 'SelectRoot' });
      await input.setValue('Option 1');
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['Option 1']] });
    });

    it('change event', async () => {
      const wrapper = mount(Select, { props: { items: ['Option 1', 'Option 2'] } });
      const input = wrapper.findComponent({ name: 'SelectRoot' });
      await input.setValue('Option 1');
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] });
    });

    it('blur event', async () => {
      const wrapper = mount(Select, { props: { items: ['Option 1', 'Option 2'] } });
      const input = wrapper.findComponent({ name: 'SelectRoot' });
      await input.vm.$emit('update:open', false);
      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] });
    });
  });

  describe('label', () => {
    it('clicking the FormField label opens the menu', async () => {
      const wrapper = await renderForm({
        slotVars: {
          items: ['Option 1', 'Option 2'],
        },
        slotTemplate: `
        <PFormField name="value" label="Label">
          <PSelect :items="items" :portal="false" />
        </PFormField>
        `,
      });

      const trigger = wrapper.find('[data-slot="base"]');
      expect(trigger.attributes('aria-expanded')).toBe('false');

      // Native `<label for>` clicks forward a `click` to the trigger without a
      // preceding `pointerdown`, so the menu is still closed when the click lands.
      await trigger.trigger('click');
      await flushPromises();

      expect(trigger.attributes('aria-expanded')).toBe('true');
    });
  });

  describe('focus', () => {
    it('keeps the focus moved on select', async () => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      const wrapper = mount(Select, { attachTo: document.body, props: { 'defaultOpen': true, 'portal': false, items, 'onUpdate:modelValue': () => input.focus() } });

      await flushPromises();
      await new Promise((resolve) => {
        setTimeout(resolve);
      });

      await wrapper.findAll('[role="option"]')[1]!.trigger('keydown', { key: 'Enter' });
      await flushPromises();
      await new Promise((resolve) => {
        setTimeout(resolve);
      });

      expect(document.activeElement).toBe(input);

      wrapper.unmount();
      input.remove();
    });
  });

  describe('form integration', async () => {
    async function createForm(validateOn?: Array<FormInputEvents>) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (state.value !== 'Option 2') {
              return [{ name: 'value', message: 'Error message' }];
            }
            return [];
          },
        },
        slotVars: {
          items: ['Option 1', 'Option 2'],
        },
        slotTemplate: `
        <PFormField name="value">
          <PSelect id="input" v-model="state.value" :items="items" />
        </PFormField>
        `,
      });
      const input = wrapper.findComponent({ name: 'SelectRoot' });
      return {
        wrapper,
        input,
      };
    }

    it('validate on blur works', async () => {
      const { input, wrapper } = await createForm(['blur']);
      await input.vm.$emit('update:open', false);
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.setValue('Option 2');
      await input.vm.$emit('update:open', false);
      await flushPromises();

      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change']);

      input.setValue('Option 1');
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      input.setValue('Option 2');
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input']);

      input.setValue('Option 1');
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      input.setValue('Option 2');
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('should have the correct types', () => {
      // with object item
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [{ label: 'foo', value: 'bar' }],
      })).toEqualTypeOf<[string]>();

      // with string item
      expectEmitPayloadType('update:modelValue', () => Select({
        items: ['foo'],
      })).toEqualTypeOf<[string]>();

      // with groups
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [['foo']],
      })).toEqualTypeOf<[string]>();

      // with groups and mixed types
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
      })).toEqualTypeOf<[string | number]>();

      // with groups, multiple, mixed types and valueKey
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
        valueKey: 'value', // TODO: value is already the default valueKey
      })).toEqualTypeOf<[string | number]>();
    });
  });
});
