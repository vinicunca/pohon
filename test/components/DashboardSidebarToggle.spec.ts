import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue';
import DashboardSidebarToggle from '../../src/runtime/components/DashboardSidebarToggle.vue';
import { renderEach } from '../component-render';

const DashboardWrapper = defineComponent({
  components: {
    PDashboardGroup: DashboardGroup as any,
    PDashboardSidebarToggle: DashboardSidebarToggle as any,
  },
  inheritAttrs: false,
  template: `<PDashboardGroup>
  <PDashboardSidebarToggle v-bind="$attrs" />
</PDashboardGroup>`,
});

describe('dashboardSidebarToggle', () => {
  renderEach(
    DashboardWrapper,
    [
    // Props
      ['with color', { props: { color: 'primary' as const } }],
      ['with variant', { props: { variant: 'solid' as const } }],
      ['with side', { props: { side: 'right' as const } }],
      ['with class', { props: { class: 'p-3' } }],
    ],
    async (_, options) => {
      const wrapper = await mountSuspended(DashboardWrapper, options);
      expect(wrapper.html()).toMatchSnapshot();
    },
  );

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
