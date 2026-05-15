import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PageAside from '../../src/runtime/components/PageAside.vue';
import { renderEach } from '../component-render';

describe('pageAside', () => {
  renderEach(PageAside, [
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: 'lg:flex' } }],
    ['with ui', { props: { ui: { container: 'absolute' } } }],
    // Slots
    ['with top slot', { slots: { top: () => 'Top slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with bottom slot', { slots: { bottom: () => 'Bottom slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageAside, {
      slots: {
        top: () => 'Top slot',
        default: () => 'Default slot',
        bottom: () => 'Bottom slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
