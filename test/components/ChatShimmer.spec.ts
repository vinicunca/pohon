import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import ChatShimmer from '../../src/runtime/components/ChatShimmer.vue';
import { renderEach } from '../component-render';

describe('chatShimmer', () => {
  const props = {
    text: 'Loading...',
  };

  renderEach(ChatShimmer, [
    // Props
    ['with text', { props }],
    ['with duration', { props: { ...props, duration: 3 } }],
    ['with spread', { props: { ...props, spread: 4 } }],
    ['with class', { props: { ...props, class: 'font-bold' } }],
    ['with ui', { props: { ...props, ui: { base: 'font-bold' } } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatShimmer, {
      props,
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
