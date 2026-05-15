import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue';
import DashboardResizeHandle from '../../src/runtime/components/DashboardResizeHandle.vue';
import { renderEach } from '../component-render';

const DashboardWrapper = defineComponent({
  components: {
    PDashboardGroup: DashboardGroup as any,
    PDashboardResizeHandle: DashboardResizeHandle as any,
  },
  inheritAttrs: false,
  template: `<PDashboardGroup>
  <PDashboardResizeHandle v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </PDashboardResizeHandle>
</PDashboardGroup>`,
});

describe('dashboardResizeHandle', () => {
  renderEach(
    DashboardWrapper,
    [
    // Props
      ['with as', { props: { as: 'section' } }],
      ['with class', { props: { class: 'absolute' } }],
      // Slots
      ['with default slot', { slots: { default: () => 'Default slot' } }],
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
