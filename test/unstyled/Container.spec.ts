import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Container from '../../src/runtime/components/Container.vue';
import { classTokens } from './helpers';

// Container's theme is a bare top-level `base` with no `slots` and no variants —
// the minimal slot-less shape, so its classes come entirely from `base`.
describe('container (unstyled)', () => {
  it('has no classes at all when the user supplies none', async () => {
    const wrapper = await mountSuspended(Container, {
      slots: { default: () => 'content' },
    });

    const root = wrapper.find('div');
    expect(root.exists()).toBe(true);
    expect(classTokens(root.attributes('class'))).toEqual([]);
  });

  it('applies only the user class', async () => {
    const wrapper = await mountSuspended(Container, {
      props: { class: 'my-container' },
      slots: { default: () => 'content' },
    });

    expect(classTokens(wrapper.find('div').attributes('class'))).toEqual(['my-container']);
  });

  it('applies the ui.base class without theme defaults', async () => {
    const wrapper = await mountSuspended(Container, {
      props: { ui: { base: 'max-w-sm' } },
      slots: { default: () => 'content' },
    });

    expect(classTokens(wrapper.find('div').attributes('class'))).toEqual(['max-w-sm']);
  });
});
