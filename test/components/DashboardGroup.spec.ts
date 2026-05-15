import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue';
import { renderEach } from '../component-render';

describe('dashboardGroup', () => {
  renderEach(DashboardGroup, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'inset-4' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardGroup);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
