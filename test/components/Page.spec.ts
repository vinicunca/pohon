import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Page from '../../src/runtime/components/Page.vue';
import { renderEach } from '../component-render';

describe('page', () => {
  renderEach(Page, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'lg:gap-4' } }],
    ['with ui', { props: { ui: { right: 'order-last lg:order-first' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' as any } }],
    ['with left slot', { slots: { left: () => 'Left slot' as any } }],
    ['with right slot', { slots: { right: () => 'Right slot' as any } }],
    ['with all slots', { slots: { left: () => 'Left slot' as any, right: () => 'Right slot' as any, default: () => 'Default slot' as any } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Page, {
      slots: {
        default: () => 'Default slot',
        left: () => 'Left slot',
        right: () => 'Right slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
