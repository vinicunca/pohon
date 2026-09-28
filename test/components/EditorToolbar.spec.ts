import type { Editor } from '@tiptap/vue-3';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { TooltipProvider } from 'akar';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import EditorToolbar from '../../src/runtime/components/EditorToolbar.vue';
import { renderEach } from '../component-render';

const EditorToolbarWrapper = defineComponent({
  components: { TooltipProvider, EditorToolbar },
  inheritAttrs: false,
  template: '<TooltipProvider><EditorToolbar v-bind="$attrs" /></TooltipProvider>',
});

describe('editorToolbar', () => {
  const items = [[{
    'icon': 'i-lucide-heading',
    'aria-label': 'Headings',
    'content': {
      align: 'start',
    },
    'items': [{
      kind: 'heading',
      level: 1,
      icon: 'i-lucide-heading-1',
      label: 'Heading 1',
    }, {
      kind: 'heading',
      level: 2,
      icon: 'i-lucide-heading-2',
      label: 'Heading 2',
    }, {
      kind: 'heading',
      level: 3,
      icon: 'i-lucide-heading-3',
      label: 'Heading 3',
    }, {
      kind: 'heading',
      level: 4,
      icon: 'i-lucide-heading-4',
      label: 'Heading 4',
    }],
  }], [{
    'kind': 'mark',
    'mark': 'bold',
    'icon': 'i-lucide-bold',
    'aria-label': 'Bold',
  }, {
    'kind': 'mark',
    'mark': 'italic',
    'icon': 'i-lucide-italic',
    'aria-label': 'Italic',
  }, {
    'kind': 'mark',
    'mark': 'underline',
    'icon': 'i-lucide-underline',
    'aria-label': 'Underline',
  }, {
    'kind': 'mark',
    'mark': 'strike',
    'icon': 'i-lucide-strikethrough',
    'aria-label': 'Strikethrough',
  }, {
    'kind': 'mark',
    'mark': 'code',
    'icon': 'i-lucide-code',
    'aria-label': 'Code',
  }]];
  const props = { editor: { registerPlugin: vi.fn() } as unknown as Editor, items };

  renderEach(EditorToolbar, [
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with layout bubble', { props: { ...props, layout: 'bubble' } }],
    ['with layout floating', { props: { ...props, layout: 'floating' } }],
    ['with class', { props: { ...props, class: 'overflow-x-auto' } }],
    ['with ui', { props: { ...props, ui: { separator: 'bg-background' } } }],
    // Slots
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(EditorToolbar, {
      props,
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('names icon-only buttons from their tooltips', async () => {
    const wrapper = await mountSuspended(EditorToolbarWrapper, {
      props: {
        editor: { registerPlugin: vi.fn() } as unknown as Editor,
        items: [[
          { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold', tooltip: { text: 'Bold' } },
          { 'kind': 'mark', 'mark': 'italic', 'icon': 'i-lucide-italic', 'tooltip': { text: 'Italic' }, 'aria-label': 'Italic text' },
          { kind: 'mark', mark: 'underline', icon: 'i-lucide-underline', label: 'Underline', tooltip: { text: 'Underline' } },
          { kind: 'mark', mark: 'strike', icon: 'i-lucide-strikethrough' },
        ]],
      },
    });

    const buttons = wrapper.findAll('[role=toolbar] button');
    expect(buttons).toHaveLength(4);
    expect(buttons[0]!.attributes('aria-label')).toBe('Bold');
    expect(buttons[1]!.attributes('aria-label')).toBe('Italic text');
    expect(buttons[2]!.attributes('aria-label')).toBeUndefined();
    expect(buttons[2]!.text()).toContain('Underline');
    expect(buttons[3]!.attributes('aria-label')).toBeUndefined();
  });

  it('names dropdown triggers from their tooltips', async () => {
    const wrapper = await mountSuspended(EditorToolbarWrapper, {
      props: {
        editor: { registerPlugin: vi.fn() } as unknown as Editor,
        items: [[{
          icon: 'i-lucide-heading',
          tooltip: { text: 'Headings' },
          items: [{ kind: 'heading', level: 1, icon: 'i-lucide-heading-1', label: 'Heading 1' }],
        }]],
      },
    });

    expect(wrapper.find('[role=toolbar] button').attributes('aria-label')).toBe('Headings');
  });
});
