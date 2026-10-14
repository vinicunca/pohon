import { mountSuspended } from '@nuxt/test-utils/runtime';
import { DrawerRoot } from 'akar';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { h, nextTick } from 'vue';
import theme from '#build/ui/drawer';
import Drawer from '../../src/runtime/components/Drawer.vue';
import { renderEach } from '../component-render';

describe('drawer', () => {
  const directions = Object.keys(theme.variants.direction) as any;

  const props = { open: true, portal: false };

  renderEach(Drawer, [
    // Props
    ['with title', { props: { ...props, title: 'Title' } }],
    ['with description', { props: { ...props, title: 'Title', description: 'Description' } }],
    ...directions.map((direction: string) => [`with direction ${direction}`, { props: { ...props, direction, title: 'Title', description: 'Description' } }]),
    ...directions.map((direction: string) => [`with direction ${direction} inset`, { props: { ...props, direction, inset: true, title: 'Title', description: 'Description' } }]),
    ['without handle', { props: { ...props, handle: false, title: 'Title', description: 'Description' } }],
    ['without overlay', { props: { ...props, overlay: false, title: 'Title', description: 'Description' } }],
    ['with close', { props: { ...props, close: true, title: 'Title', description: 'Description' } }],
    ['with closeIcon', { props: { ...props, close: true, closeIcon: 'i-lucide-trash', title: 'Title', description: 'Description' } }],
    ['with class', { props: { ...props, class: 'bg-background-elevated' } }],
    ['with ui', { props: { ...props, ui: { handle: 'w-20' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with actions slot', { props: { ...props, title: 'Title' }, slots: { actions: () => 'Actions slot' } }],
    ['with close slot', { props, slots: { close: () => 'Close slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: {
        open: true,
        portal: false,
        title: 'Title',
        description: 'Description',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it.each([
    ['bottom', 'down'],
    ['top', 'up'],
    ['left', 'left'],
    ['right', 'right'],
  ] as const)('maps %s to the %s swipe direction', async (direction, swipeDirection) => {
    const wrapper = await mountSuspended(Drawer, { props: { ...props, direction } });
    expect(wrapper.get('[data-slot="content"]').attributes('data-swipe-direction')).toBe(swipeDirection);
    wrapper.unmount();
  });

  it('forwards snap-point state and updates', async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: { ...props, snapPoints: [0.5, 1], snapPoint: 0.5, snapToSequentialPoints: true },
    });
    const root = wrapper.findComponent(DrawerRoot);
    expect(root.props('snapPoint')).toBe(0.5);
    expect(root.props('snapToSequentialPoints')).toBe(true);
    root.vm.$emit('update:snapPoint', 1);
    expect(wrapper.emitted('update:snapPoint')).toEqual([[1]]);
    await wrapper.setProps({ snapPoint: 1 });
    expect(root.props('snapPoint')).toBe(1);
    wrapper.unmount();
  });

  it.each(['swipe', 'escape-key', 'outside-press'] as const)('prevents %s dismissal when dismissible is false', async (reason) => {
    const wrapper = await mountSuspended(Drawer, { props: { ...props, dismissible: false } });
    let canceled = false;
    wrapper.findComponent(DrawerRoot).vm.$emit('update:open', false, {
      reason,
      cancel() {
        canceled = true;
      },
      get isCanceled() {
        return canceled;
      },
    });
    expect(canceled).toBe(true);
    expect(wrapper.emitted('update:open')).toBeUndefined();
    expect(wrapper.emitted('close:prevent')).toHaveLength(1);
    wrapper.unmount();
  });

  it('settles back open after an actual swipe when dismissal is disabled', async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: { defaultOpen: true, portal: false, dismissible: false, title: 'Swipe test' },
    });
    const content = wrapper.get('[data-slot="content"]').element as HTMLElement;
    // DOM test environments do not implement pointer capture.
    content.setPointerCapture = () => {};
    content.releasePointerCapture = () => {};
    content.hasPointerCapture = () => false;
    Object.defineProperty(content, 'offsetHeight', { configurable: true, value: 800 });
    for (const [type, clientY, buttons] of [
      ['pointerdown', 100, 1],
      ['pointermove', 120, 1],
      ['pointermove', 700, 1],
      ['pointerup', 700, 0],
    ] as const) {
      const event = new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerType: 'mouse',
        pointerId: 1,
        button: 0,
        buttons,
        clientX: 100,
        clientY,
      });
      Object.defineProperty(event, 'timeStamp', { value: 0 });
      content.dispatchEvent(event);
    }
    await nextTick();
    await nextTick();
    expect(content.getAttribute('data-state')).toBe('open');
    expect(content.hasAttribute('data-swipe-dismissed')).toBe(false);
    expect(content.style.getPropertyValue('--drawer-swipe-movement-y')).toBe('0px');
    expect(wrapper.emitted('close:prevent')).toHaveLength(1);
    expect(wrapper.emitted('update:open')).toBeUndefined();
    wrapper.unmount();
  });

  it('keeps modal scroll locking when the visible overlay is disabled', async () => {
    const wrapper = await mountSuspended(Drawer, { props: { ...props, overlay: false } });
    await nextTick();
    expect(wrapper.get('[data-slot="overlay"]').classes()).toContain('hidden');
    expect(document.body.style.overflow).toBe('hidden');
    wrapper.unmount();
  });

  it('supports trap-focus modality without a blocking overlay', async () => {
    const wrapper = await mountSuspended(Drawer, { props: { ...props, modal: 'trap-focus' } });
    expect(wrapper.find('[data-slot="overlay"]').exists()).toBe(false);
    expect(wrapper.findComponent(DrawerRoot).props('modal')).toBe('trap-focus');
    wrapper.unmount();
  });

  it('allows the close button when dismissible is false', async () => {
    const wrapper = await mountSuspended(Drawer, { props: { ...props, close: true, dismissible: false } });
    await wrapper.get('[data-slot="close"]').trigger('click');
    expect(wrapper.emitted('update:open')?.[0]?.[0]).toBe(false);
    expect(wrapper.emitted('close:prevent')).toBeUndefined();
    wrapper.unmount();
  });

  it('lets consumers cancel an open change', async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: { 'portal': false, 'onUpdate:open': (_open, details) => details.cancel() },
      slots: { default: () => h('button', 'Open') },
    });
    await wrapper.get('button').trigger('click');
    expect(wrapper.find('[data-slot="content"]').exists()).toBe(false);
    wrapper.unmount();
  });

  it('emits lifecycle events only for the drawer animation, once per state', async () => {
    const wrapper = await mountSuspended(Drawer, { props: { open: false, portal: false } });
    expect(wrapper.emitted('after:leave')).toBeUndefined();
    await wrapper.setProps({ open: true });
    await wrapper.get('[data-slot="container"]').trigger('animationend');
    expect(wrapper.emitted('after:enter')).toBeUndefined();
    await wrapper.get('[data-slot="content"]').trigger('animationend');
    expect(wrapper.emitted('after:enter')).toHaveLength(1);
    wrapper.findComponent(DrawerRoot).vm.$emit('update:openComplete', true);
    expect(wrapper.emitted('after:enter')).toHaveLength(1);
    expect(wrapper.emitted('update:openComplete')).toEqual([[true]]);
    // happy-dom has no CSS animations; signal the native completion for close.
    await wrapper.setProps({ open: false });
    wrapper.findComponent(DrawerRoot).vm.$emit('update:openComplete', false);
    expect(wrapper.emitted('after:leave')).toHaveLength(1);
    wrapper.unmount();
  });
});
