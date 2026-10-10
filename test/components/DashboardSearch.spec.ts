import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import theme from '#build/ui/dashboard-search';
import CommandPalette from '../../src/runtime/components/CommandPalette.vue';
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue';
import DashboardSearch from '../../src/runtime/components/DashboardSearch.vue';
import Modal from '../../src/runtime/components/Modal.vue';
import { renderEach } from '../component-render';

const DashboardWrapper = defineComponent({
  components: {
    PDashboardGroup: DashboardGroup as any,
    PDashboardSearch: DashboardSearch as any,
  },
  inheritAttrs: false,
  template: `<PDashboardGroup>
  <PDashboardSearch v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </PDashboardSearch>
</PDashboardGroup>`,
});

describe('dashboardSearch', () => {
  const sizes = Object.keys(theme.variants.size) as any;

  const groups = [
    {
      id: 'links',
      label: 'Go to',
      items: [{
        label: 'Home',
        to: '/',
      }],
    },
  ];

  const props = { groups, open: true, portal: false };

  renderEach(
    DashboardWrapper,
    [
    // Props
      ['with groups', { props }],
      ['with icon', { props: { ...props, icon: 'i-lucide-home' } }],
      ['with placeholder', { props: { ...props, placeholder: 'Search' } }],
      ['with loading', { props: { ...props, loading: true } }],
      ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: 'i-lucide-loading' } }],
      ['without colorMode', { props: { ...props, colorMode: false } }],
      ['with fullscreen', { props: { ...props, fullscreen: true } }],
      ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
      ['with ui', { props: { ...props, ui: { input: '[&>input]:text-lg' } } }],
      ['with class', { props: { ...props, class: 'sm:max-w-5xl' } }],
    ],
    async (_, options) => {
      const wrapper = await mountSuspended(DashboardWrapper, options);
      await vi.dynamicImportSettled();
      expect(wrapper.html()).toMatchSnapshot();
    },
  );

  it('mounts the modal once opened', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, { props: { ...props, open: false } });

    expect(wrapper.findComponent(Modal).exists()).toBe(false);

    await wrapper.setProps({ open: true } as any);
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CommandPalette).text()).toContain('Home');
  });

  it('mounts the modal before opening with `unmountOnHide: false`', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, { props: { ...props, open: false, unmountOnHide: false } });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CommandPalette).text()).toContain('Home');
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, {
      props,
    });
    await vi.dynamicImportSettled();

    expect(await axe(wrapper.element, {
      // "ARIA input fields must have an accessible name (aria-input-field-name)"
      //
      // Fix any of the following:
      //  aria-label attribute does not exist or is empty
      //  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
      //  Element has no title attribute
      rules: {
        'aria-input-field-name': { enabled: false },
      },
    })).toHaveNoViolations();
  });
});
