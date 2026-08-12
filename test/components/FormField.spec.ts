import type { FormFieldProps } from '../../src/runtime/components/FormField.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import theme from '#build/ui/form-field';
import {
  PCheckbox,
  PFileUpload,
  PFormField,
  PInput,
  PInputMenu,
  PInputNumber,
  PPinInput,
  PRadioGroup,
  PSelect,
  PSelectMenu,
  PSlider,
  PSwitch,
  PTextarea,
} from '#components';
import { renderEach } from '../component-render';

// Mock useId to force a consistent return value in Nuxt and Vue. This is required to test aria attributes.
// `vi.mock` is hoisted to the top of the module, so it must live at the top level to reflect its actual execution order.
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    useId: () => 'v-0-0', // Static value matching Nuxt's format
  };
});

const inputComponents = [PInput, PRadioGroup, PTextarea, PCheckbox, PSelect, PSelectMenu, PInputMenu, PInputNumber, PSwitch, PSlider, PPinInput, PFileUpload];

async function renderFormField(options: {
  props: Partial<FormFieldProps>;
  inputComponent: typeof inputComponents[number];
}) {
  return await mountSuspended(PFormField, {
    props: options.props,
    slots: {
      default: {
        // @ts-expect-error - Object literal may only specify known properties, and setup does not exist in type
        setup: () => ({ inputComponent: options.inputComponent }),
        components: {
          PFormField,
          ...inputComponents,
        },
        template: `
          <component :is="inputComponent" />
        `,
      },
    },
  });
}

// A wrapper component is needed here because of a conflict with the error prop / expose.
// See: https://github.com/nuxt/test-utils/issues/684
const FormFieldWrapper = defineComponent({
  components: {
    PFormField,
  },
  template: `
<PFormField>
  <template v-for="(_, name) in $slots" #[name]="slotData">
    <slot :name="name" v-bind="slotData" />
  </template>
</PFormField>`,
});

describe('formField', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const orientations = Object.keys(theme.variants.orientation) as any;

  renderEach(FormFieldWrapper, [
    // Props
    ['with label and description', { props: { label: 'Username', description: 'Enter your username' } }],
    ['with required', { props: { label: 'Username', required: true } }],
    ['with help', { props: { help: 'Username must be unique' } }],
    ['with error', { props: { error: 'Username is already taken' } }],
    ['with hint', { props: { hint: 'Use letters, numbers, and special characters' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Username', description: 'Enter your username', size } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { label: 'Username', description: 'Enter your username', orientation } }]),
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'relative' } }],
    ['with ui', { props: { ui: { label: 'text-highlighted' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with label slot', { slots: { label: () => 'Label slot' } }],
    ['with description slot', { slots: { description: () => 'Description slot' } }],
    ['with error slot', { slots: { error: () => 'Error slot' } }],
    ['with hint slot', { slots: { hint: () => 'Hint slot' } }],
    ['with help slot', { slots: { help: () => 'Help slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(FormFieldWrapper, {
      props: {
        label: 'Username',
        description: 'Enter your username',
        help: 'Username must be unique',
        hint: 'Use letters, numbers, and special characters',
        error: 'Username is already taken',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe.each(inputComponents.map((inputComponent) => [(inputComponent as any).__name, inputComponent]))('%s integration', async (name: string, inputComponent: any) => {
    if (name === 'PRadioGroup') {
      it('unbinds label for', async () => {
        const wrapper = await renderFormField({
          props: { label: 'Label' },
          inputComponent,
        });

        const label = wrapper.find('label[for=v-0-0]');
        expect(label.exists()).toBe(false);
      });
    } else {
      it('binds label for', async () => {
        const wrapper = await renderFormField({
          props: { label: 'Label' },
          inputComponent,
        });
        const label = wrapper.find('label[for=v-0-0]');
        expect(label.exists()).toBe(true);

        const input = wrapper.find('[id=v-0-0]');
        expect(input.exists()).toBe(true);
      });
    }

    it('binds hints with aria-describedby', async () => {
      const wrapper = await renderFormField({
        props: { hint: 'somehint' },
        inputComponent,
      });

      const attr = wrapper.find('[aria-describedby=v-0-0-hint]');
      expect(attr.exists()).toBe(true);
    });

    it('binds description with aria-describedby', async () => {
      const wrapper = await renderFormField({
        props: { description: 'somedescription' },
        inputComponent,
      });

      const attr = wrapper.find('[aria-describedby=v-0-0-description]');
      expect(attr.exists()).toBe(true);
    });

    it('binds error with aria-describedby', async () => {
      const wrapper = await renderFormField({
        props: { error: 'someerror' },
        inputComponent,
      });

      const attr = wrapper.find('[aria-describedby=v-0-0-error]');
      expect(attr.exists()).toBe(true);
    });

    it('binds aria-invalid on error', async () => {
      const wrapper = await renderFormField({
        props: { error: 'someerror' },
        inputComponent,
      });

      const attr = wrapper.find('[aria-invalid=true]');
      expect(attr.exists()).toBe(true);
    });

    it('renders id for aria describedby when help prop is provided', async () => {
      const wrapper = await renderFormField({
        props: { help: 'somehelp' },
        inputComponent,
      });

      const attr = wrapper.find('[id=v-0-0-help]');
      expect(attr.exists()).toBe(true);
    });

    it('renders no id for aria describedby when no help prop is provided', async () => {
      const wrapper = await renderFormField({
        props: { label: 'Username', description: 'Enter your username' },
        inputComponent,
      });

      const attr = wrapper.find('[id=v-0-0-help]');
      expect(attr.exists()).toBe(false);
    });
  });
});
