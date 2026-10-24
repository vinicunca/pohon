import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import Prompt from '../../../src/runtime/components/prose/Prompt.vue';

afterEach(() => vi.restoreAllMocks());

describe('prose prompt', () => {
  it('preserves line breaks, list markers and inline code in the prompt prop', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const prompt = 'Build a form.\n\n- Use `PInput`\n- Validate on submit';
    const wrapper = await mountSuspended(Prompt, {
      props: {
        prompt,
        actions: ['cursor'],
      },
      slots: {
        default: () => h('p', 'Fallback text'),
      },
    });
    const cursorButton = wrapper.findAll('button').find((button) => button.text().includes('Cursor'))!;
    await cursorButton.trigger('click');
    expect(open).toHaveBeenLastCalledWith(`cursor://anysphere.cursor-deeplink/prompt?text=${encodeURIComponent(prompt)}`, '_self');

    await wrapper.setProps({ prompt: '  Revised\n- Keep this list  ' });
    await cursorButton.trigger('click');
    expect(open).toHaveBeenLastCalledWith(`cursor://anysphere.cursor-deeplink/prompt?text=${encodeURIComponent('Revised\n- Keep this list')}`, '_self');

    await wrapper.setProps({ prompt: undefined });
    await cursorButton.trigger('click');
    expect(open).toHaveBeenLastCalledWith(`cursor://anysphere.cursor-deeplink/prompt?text=${encodeURIComponent('Fallback text')}`, '_self');
    wrapper.unmount();
  });
});
