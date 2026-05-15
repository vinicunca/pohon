import type { Editor } from '@tiptap/vue-3';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import EditorDragHandle from '../../src/runtime/components/EditorDragHandle.vue';
import { renderEach } from '../component-render';

describe('editorDragHandle', () => {
  const props = { editor: { registerPlugin: vi.fn() } as unknown as Editor };

  renderEach(EditorDragHandle, [
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'items-start' } }],
    ['with ui', { props: { ...props, ui: { handle: 'px-4' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(EditorDragHandle, {
      props,
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
