import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import DashboardSearchButton from '../../src/runtime/components/DashboardSearchButton.vue';
import { renderEach } from '../component-render';

describe('dashboardSearchButton', () => {
  renderEach(DashboardSearchButton, [
    // Props
    ['with label', { props: { label: 'Open' } }],
    ['with icon', { props: { icon: 'i-lucide-house' } }],
    ['with kbds', { props: { kbds: ['alt', 'o'] } }],
    ['with collapsed', { props: { collapsed: true } }],
    ['with class', { props: { class: 'w-full' } }],
  ]);

  it('hides the icon when icon is false', async () => {
    const withIcon = await mountSuspended(DashboardSearchButton);
    expect(withIcon.find('[data-slot="leadingIcon"]').exists()).toBe(true);

    const withoutIcon = await mountSuspended(DashboardSearchButton, { props: { icon: false } });
    expect(withoutIcon.find('[data-slot="leadingIcon"]').exists()).toBe(false);
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardSearchButton, {
      props: {
        label: 'Open',
        icon: 'i-lucide-house',
        kbds: ['alt', 'o'],
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
