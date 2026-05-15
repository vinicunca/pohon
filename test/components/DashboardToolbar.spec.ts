import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import DashboardToolbar from '../../src/runtime/components/DashboardToolbar.vue';
import { renderEach } from '../component-render';

describe('dashboardToolbar', () => {
  renderEach(DashboardToolbar, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'px-8' } }],
    ['with ui', { props: { ui: { left: 'items-center' } }, slots: { left: (): string => 'Left slot' } }],
    // Slots
    ['with default slot', { slots: { default: (): string => 'Default slot' } }],
    ['with left slot', { slots: { left: (): string => 'Left slot' } }],
    ['with right slot', { slots: { right: (): string => 'Right slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardToolbar);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
