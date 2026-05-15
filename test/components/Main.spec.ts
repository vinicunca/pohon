import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Main from '../../src/runtime/components/Main.vue';
import { renderEach } from '../component-render';

describe('main', () => {
  renderEach(Main, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'min-h-full' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Main, {
      slots: {
        default: () => 'Default slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
