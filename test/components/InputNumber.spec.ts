import type { FormInputEvents } from '../../src/module';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { reactive } from 'vue';
import theme from '#build/ui/input-number';
import InputNumber from '../../src/runtime/components/InputNumber.vue';
import { renderEach } from '../component-render';
import { renderForm } from '../utils/form';

describe('inputNumber', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;

  renderEach(InputNumber, [
    // Props
    ['with name', { props: { name: 'name' } }],
    ['with placeholder', { props: { placeholder: 'Number...' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with required', { props: { required: true } }],
    ['with orientation vertical', { props: { orientation: 'vertical' } }],
    ['with incrementIcon', { props: { incrementIcon: 'i-lucide-arrow-left' } }],
    ['with decrementIcon', { props: { decrementIcon: 'i-lucide-arrow-right' } }],
    ['without increment', { props: { increment: false } }],
    ['without increment vertical', { props: { increment: false, orientation: 'vertical' } }],
    ['without decrement', { props: { decrement: false } }],
    ['without decrement vertical', { props: { decrement: false, orientation: 'vertical' } }],
    ['without increment and decrement', { props: { increment: false, decrement: false } }],
    ['without increment and decrement vertical', { props: { increment: false, decrement: false, orientation: 'vertical' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { variant } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant} highlight`, { props: { variant, highlight: true } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { variant, color: 'neutral' } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant} highlight`, { props: { variant, color: 'neutral', highlight: true } }]),
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with .optional modifier', { props: { modelModifiers: { optional: true } } }, { input: '', expected: undefined }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'absolute' } }],
    ['with ui', { props: { ui: { base: 'rounded-full' } } }],
    // Slots
    ['with increment slot', { slots: { increment: () => '+' } }],
    ['with decrement slot', { slots: { decrement: () => '-' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(InputNumber, {
      props: {
        placeholder: 'Enter a number',
        required: true,
        incrementIcon: 'i-lucide-plus',
        decrementIcon: 'i-lucide-minus',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = await mountSuspended(InputNumber);
      const input = wrapper.findComponent({ name: 'NumberFieldRoot' });
      await input.setValue(1);
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[1]] });
      expect(1).toBe(1);
    });

    it('increments uncontrolled defaultValue without v-model', async () => {
      const wrapper = await mountSuspended(InputNumber, { props: { defaultValue: 5 }, attachTo: document.body });
      const increment = wrapper.find('[data-slot="increment"] button');

      await increment.trigger('pointerdown');
      await increment.trigger('pointerup');
      await wrapper.find('input').trigger('blur');
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toEqual([[6]]);
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('6');

      wrapper.unmount();
    });

    it('emits once when controlled and blurred', async () => {
      const wrapper = await mountSuspended(InputNumber, {
        attachTo: document.body,
        props: {
          'modelValue': 5,
          'onUpdate:modelValue': (value: number | null | undefined) => wrapper.setProps({ modelValue: value }),
        },
      });
      const increment = wrapper.find('[data-slot="increment"] button');

      await increment.trigger('pointerdown');
      await increment.trigger('pointerup');
      await flushPromises();
      await wrapper.find('input').trigger('blur');
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toEqual([[6]]);
      expect(wrapper.emitted('change')).toHaveLength(1);

      wrapper.unmount();
    });

    it('emits undefined once when cleared with .optional modifier', async () => {
      const wrapper = await mountSuspended(InputNumber, {
        props: {
          'modelValue': 5,
          'modelModifiers': { optional: true },
          'onUpdate:modelValue': (value: number | null | undefined) => wrapper.setProps({ modelValue: value }),
        },
      });
      const input = wrapper.find('input');

      await input.setValue('');
      await input.trigger('blur');
      await flushPromises();
      await input.trigger('blur');
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toEqual([[undefined]]);
    });

    it('does not emit when blurred with a null modelValue', async () => {
      const wrapper = await mountSuspended(InputNumber, { props: { modelValue: null } });

      await wrapper.find('input').trigger('blur');
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('change event', async () => {
      const wrapper = await mountSuspended(InputNumber);
      const input = wrapper.findComponent({ name: 'NumberFieldRoot' });
      await input.setValue(1);
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] });
    });

    it('blur event', async () => {
      const wrapper = await mountSuspended(InputNumber);
      const input = wrapper.findComponent({ name: 'NumberFieldInput' });
      await input.trigger('blur');
      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] });
    });
  });

  describe('form integration', async () => {
    async function createForm(validateOn?: Array<FormInputEvents>) {
      const wrapper = await renderForm({
        state: reactive({ value: 0 }),
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (state.value !== 1) {
              return [{ name: 'value', message: 'Error message' }];
            }
            return [];
          },
        },
        slotTemplate: `
        <PFormField name="value">
          <PInputNumber id="input" v-model="state.value" />
        </PFormField>
        `,
      });
      const input = wrapper.findComponent({ name: 'NumberFieldRoot' });
      return {
        wrapper,
        input,
      };
    }

    it('validate on blur works', async () => {
      const { input, wrapper } = await createForm(['blur']);
      const inputDom = wrapper.find('#input');

      await inputDom.trigger('blur');
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.setValue(1);
      await inputDom.trigger('blur');
      await flushPromises();
      expect(wrapper.html()).not.toContain('Error message');
    });

    it('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change']);

      await input.setValue(2);
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.setValue(1);
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input']);

      await input.setValue(10);
      await flushPromises();
      expect(wrapper.html()).toContain('Error message');

      await input.setValue(1);
      await flushPromises();
      expect(wrapper.html()).not.toContain('Error message');
    });
  });
});
