import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import buttonTheme from '#build/ui/button';
import { PButton, PInput } from '#components';
import FieldGroup from '../../src/runtime/components/FieldGroup.vue';
import { renderEach } from '../component-render';

describe('fieldGroup', () => {
  const sizes = Object.keys(buttonTheme.variants.size) as any;

  renderEach(FieldGroup, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'absolute' } }],
    // Slots
    ['with default slot', {
      slots: {
        default: {
          components: { PInput, PButton },
          template: '<PInput /> <PButton> Click me! </PButton>',
        },
      },
    }],
    ['orientation vertical with default slot', {
      props: { orientation: 'vertical' },
      slots: {
        default: {
          components: { PInput, PButton },
          template: '<PInput /> <PButton> Click me! </PButton>',
        },
      },
    }],
    ...sizes.map((size: string) =>
      [`with size ${size}`, {
        props: { size },
        slots: {
          default: {
            components: { PInput, PButton },
            template: '<PInput /> <PButton> Click me! </PButton>',
          },
        },
      }],
    ),
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(FieldGroup, {
      slots: {
        default: {
          template: '<PInput /> <PButton> Click me! </PButton>',
        },
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
