import type { Reactive } from 'vue';
import type { FormProps } from '../../src/runtime/components/Form.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { reactive } from 'vue';
import {
  PCheckbox,
  PCheckboxGroup,
  PFileUpload,
  PForm,
  PFormField,
  PInput,
  PInputDate,
  PInputMenu,
  PInputNumber,
  PInputRating,
  PInputTime,
  PListbox,
  PPinInput,
  PRadioGroup,
  PSelect,
  PSelectMenu,
  PSlider,
  PSwitch,
  PTextarea,
} from '#components';

export async function renderForm(options: {
  state?: Reactive<any>;
  props?: Partial<FormProps<any>> & Record<string, any>;
  slotVars?: object;
  slotTemplate?: string;
  fixture?: string;
}) {
  const state = options.state ?? reactive({});

  if (options.fixture) {
    const fixture = await import(/* @vite-ignore */ `../components/fixtures/${options.fixture}.vue`).then((c) => c.default);
    return await mountSuspended(fixture, {
      props: options.props,
    });
  }

  return await mountSuspended(PForm, {
    props: {
      id: '42',
      state,
      ...options.props,
    },
    slots: {
      default: {
        // @ts-expect-error - Object literal may only specify known properties, and setup does not exist in type
        setup() {
          return { state, ...options.slotVars };
        },
        components: {
          PFormField,
          PForm,
          PInput,
          PRadioGroup,
          PTextarea,
          PCheckbox,
          PInputDate,
          PInputTime,
          PSelect,
          PSelectMenu,
          PInputMenu,
          PInputNumber,
          PSwitch,
          PSlider,
          PPinInput,
          PCheckboxGroup,
          PFileUpload,
          PInputRating,
          PListbox,
        },
        template: options.slotTemplate,
      },
    },
  });
}
