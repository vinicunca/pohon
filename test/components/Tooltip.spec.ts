import { mountSuspended } from '@nuxt/test-utils/runtime';
import { TooltipProvider } from 'akar';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import Tooltip from '../../src/runtime/components/Tooltip.vue';
import { renderEach } from '../component-render';

const TooltipWrapper = defineComponent({
  components: {
    TooltipProvider,
    PTooltip: Tooltip,
  },
  inheritAttrs: false,
  template: `<TooltipProvider>
  <PTooltip v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </PTooltip>
</TooltipProvider>`,
});

const TooltipProviderContentWrapper = defineComponent({
  components: {
    TooltipProvider,
    PTooltip: Tooltip,
  },
  inheritAttrs: false,
  template: `<TooltipProvider :content="{ side: 'right', sideOffset: 12 }">
  <PTooltip v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </PTooltip>
</TooltipProvider>`,
});

describe('tooltip', () => {
  const props = { text: 'Tooltip', open: true, portal: false };

  renderEach(TooltipWrapper, [
    // Props
    ['with text', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with kbds', { props: { ...props, kbds: ['meta', 'K'] } }],
    ['with class', { props: { ...props, class: 'text-sm' } }],
    ['with ui', { props: { ...props, ui: { content: 'text-sm' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
  ]);

  it('respects provider content defaults', async () => {
    const wrapper = await mountSuspended(TooltipProviderContentWrapper, {
      props: { text: 'Tooltip', open: true, portal: false },
    });

    const content = wrapper.find('[data-slot="content"]');
    expect(content.attributes('data-side')).toBe('right');
  });

  it('allows per-tooltip content to override provider defaults', async () => {
    const wrapper = await mountSuspended(TooltipProviderContentWrapper, {
      props: { text: 'Tooltip', open: true, portal: false, content: { side: 'top' } },
    });

    const content = wrapper.find('[data-slot="content"]');
    expect(content.attributes('data-side')).toBe('top');
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(TooltipWrapper, {
      props: {
        ...props,
        arrow: true,
        kbds: ['meta', 'K'],
      },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
