import type { FormInputEvents } from '../../src/module';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import theme from '#build/ui/slider';
import Slider from '../../src/runtime/components/Slider.vue';
import { renderEach } from '../component-render';
import { renderForm } from '../utils/form';

describe('slider', () => {
  const sizes = Object.keys(theme.variants.size) as any;

  renderEach(Slider, [
    // Props
    ['with modelValue', { props: { modelValue: 10 } }],
    ['with defaultValue', { props: { defaultValue: 10 } }],
    ['with multiple thumbs', { props: { defaultValue: [0, 10] } }],
    ['with name', { props: { name: 'custom-name' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with inverted', { props: { inverted: true } }],
    ['with orientation vertical', { props: { orientation: 'vertical' } }],
    ['with min max step', { props: { min: 4, max: 12, step: 2 } }],
    ['with min steps between thumbs', { props: { defaultValue: [0, 30], minStepsBetweenThumbs: 30 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with color neutral', { props: { color: 'neutral', defaultValue: 10 } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'w-48' } }],
    ['with ui', { props: { ui: { track: 'bg-elevated' } } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Slider, {
      props: {
        modelValue: 10,

      },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = mount(Slider);

      const input = wrapper.findComponent({ name: 'SliderRoot' });
      input.vm.$emit('update:modelValue', 1);

      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[1], [1]] });
    });

    it('change event', async () => {
      const wrapper = mount(Slider);

      const input = wrapper.findComponent({ name: 'SliderRoot' });
      input.vm.$emit('valueCommit');

      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] });
    });
  });

  describe('form integration', async () => {
    async function createForm(validateOn?: Array<FormInputEvents>) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (state.value < 20) {
              return [{ name: 'value', message: 'Error message' }];
            }
            return [];
          },
        },
        slotTemplate: `
        <PFormField name="value">
          <PSlider v-model="state.value" />
        </PFormField>
        `,
      });
      const input = wrapper.findComponent({ name: 'SliderRoot' });
      return {
        wrapper,
        input,
      };
    }

    it('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change']);

      await input.setValue(10);
      input.vm.$emit('valueCommit');
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.setValue(40);
      input.vm.$emit('valueCommit');
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input']);
      await input.setValue(10);
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.setValue(40);
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });
  });
});
