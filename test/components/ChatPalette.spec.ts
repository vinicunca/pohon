import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import ChatPalette from '../../src/runtime/components/ChatPalette.vue';
import { renderEach } from '../component-render';

describe('chatPalette', () => {
  renderEach(ChatPalette, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'absolute' } }],
    ['with ui', { props: { ui: { prompt: 'py-5' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with prompt slot', { slots: { prompt: () => 'Prompt slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatPalette);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
