import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue';
import DashboardPanel from '../../src/runtime/components/DashboardPanel.vue';
import { renderEach } from '../component-render';

const DashboardWrapper = defineComponent({
  components: {
    PDashboardGroup: DashboardGroup as any,
    PDashboardPanel: DashboardPanel as any,
  },
  inheritAttrs: false,
  template: `<PDashboardGroup>
  <PDashboardPanel v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </PDashboardPanel>
</PDashboardGroup>`,
});

describe('dashboardPanel', () => {
  renderEach(
    DashboardWrapper,
    [
    // Props
      ['with id', { props: { id: 'test' } }],
      ['with minSize', { props: { minSize: 10 } }],
      ['with maxSize', { props: { maxSize: 100 } }],
      ['with defaultSize', { props: { defaultSize: 50 } }],
      ['with resizable', { props: { resizable: true } }],
      ['with class', { props: { class: 'lg:border-none' } }],
      ['with ui', { props: { ui: { body: 'p-8' } } }],
      // Slots
      ['with default slot', { slots: { default: () => 'Default slot' } }],
      ['with body slot', { slots: { body: () => 'Body slot' } }],
      ['with header slot', { slots: { header: () => 'Header slot' } }],
      ['with footer slot', { slots: { footer: () => 'Footer slot' } }],
      ['with resize-handle slot', { slots: { 'resize-handle': () => 'Resize handle slot' } }],
    ],
    async (_, options) => {
      const wrapper = await mountSuspended(DashboardWrapper, options);
      expect(wrapper.html()).toMatchSnapshot();
    },
  );

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, {
      props: {
        id: 'test',
        resizable: true,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
