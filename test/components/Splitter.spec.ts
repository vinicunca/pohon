import type { SplitterItem } from '../../src/runtime/components/Splitter.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Splitter from '../../src/runtime/components/Splitter.vue';
import { renderEach } from '../component-render';

describe('splitter', () => {
  const items: Array<SplitterItem> = [{
    minSize: 20,
    defaultSize: 30,
    collapsible: true,
    collapsedSize: 5,
    slot: 'sidebar',
  }, {
    slot: 'main',
  }];

  const slots = {
    sidebar: () => 'Sidebar',
    main: () => 'Main',
  };

  const props = { items };

  renderEach(Splitter<SplitterItem>, [
    // Props
    ['with items', { props, slots }],
    ['with orientation vertical', { props: { ...props, orientation: 'vertical' as const }, slots }],
    ['with id', { props: { ...props, id: 'test' }, slots }],
    ['with autoSaveId', { props: { ...props, autoSaveId: 'test' }, slots }],
    ['with keyboardResizeBy', { props: { ...props, keyboardResizeBy: 10 }, slots }],
    ['with as', { props: { ...props, as: 'section' }, slots }],
    ['with sizeUnit', { props: { items: [{ defaultSize: 200, minSize: 100, sizeUnit: 'px', slot: 'sidebar' }, { slot: 'main' }] as Array<SplitterItem> }, slots }],
    ['with disabled', { props: { ...props, disabled: true }, slots }],
    ['with class', { props: { ...props, class: 'h-96' }, slots }],
    ['with ui', { props: { ...props, ui: { handle: 'bg-primary' } }, slots }],
    // Slots
    ['with index fallback slots', { props: { items: [{}, {}] as Array<SplitterItem> }, slots: { 'panel-0': () => 'First', 'panel-1': () => 'Second' } }],
    ['with resize-handle slot', { props, slots: { ...slots, 'resize-handle': () => 'Handle' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Splitter, {
      props: { items },
      slots,
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
