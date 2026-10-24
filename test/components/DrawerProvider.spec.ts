import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { h } from 'vue';
import Drawer from '../../src/runtime/components/Drawer.vue';
import DrawerProvider from '../../src/runtime/components/DrawerProvider.vue';
import { renderEach } from '../component-render';

describe('drawer provider', () => {
  renderEach(DrawerProvider, [
    [
      'with as',
      {
        props: { as: 'section' },
      },
    ],
    [
      'with scale',
      {
        props: { scale: true },
      },
    ],
    [
      'with class',
      {
        props: { class: 'min-h-screen' },
      },
    ],
    [
      'with ui',
      {
        props: {
          ui: { content: 'p-4' },
        },
      },
    ],
    [
      'with default slot',
      {
        slots: {
          default: () => 'Page content',
        },
      },
    ],
  ]);

  it('tracks open drawers and restores the page after close', async () => {
    const wrapper = await mountSuspended(DrawerProvider, {
      props: { scale: true },
      slots: {
        default: () => h(Drawer, { portal: false, title: 'Title', close: true }, {
          default: () => h('button', 'Open'),
        }),
      },
    });
    expect(wrapper.get('[data-slot="content"]').attributes('data-inactive')).toBe('');
    await wrapper.get('button').trigger('click');
    expect(wrapper.get('[data-slot="content"]').attributes('data-active')).toBe('');
    await wrapper.get('[data-slot="close"]').trigger('click');
    expect(wrapper.get('[data-slot="content"]').attributes('data-inactive')).toBe('');
    wrapper.unmount();
  });

  it('does not render a scaling background by default', async () => {
    const wrapper = await mountSuspended(DrawerProvider);
    expect(wrapper.find('[data-slot="background"]').exists()).toBe(false);
    wrapper.unmount();
  });

  it('preserves a caller data-slot on the root', async () => {
    const wrapper = await mountSuspended(DrawerProvider, {
      attrs: { 'data-slot': 'page' },
    });
    expect(wrapper.get('[data-slot="page"]').element.tagName).toBe('DIV');
    expect(wrapper.find('[data-slot="content"]').exists()).toBe(true);
    wrapper.unmount();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DrawerProvider, {
      props: { scale: true },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
    wrapper.unmount();
  });
});
