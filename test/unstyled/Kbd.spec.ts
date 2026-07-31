import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Kbd from '../../src/runtime/components/Kbd.vue';
import { classTokens, expectNoThemeClasses } from './helpers';

// Kbd is slot-less: its theme is a top-level `base` plus variants, with no
// `slots` object. Regression cover for `applyUnstyled` skipping `base`.
describe('kbd (unstyled)', () => {
  it('renders without default theme classes', async () => {
    const wrapper = await mountSuspended(Kbd, {
      props: { value: 'meta' },
    });

    const kbd = wrapper.find('kbd');
    expect(kbd.exists()).toBe(true);
    expectNoThemeClasses(kbd.attributes('class'));
  });

  it('has no classes at all when the user supplies none', async () => {
    const wrapper = await mountSuspended(Kbd, {
      props: { value: 'meta' },
    });

    expect(classTokens(wrapper.find('kbd').attributes('class'))).toEqual([]);
  });

  it('keeps structure with variant props but still has no theme classes', async () => {
    const wrapper = await mountSuspended(Kbd, {
      props: { value: 'meta', color: 'error', variant: 'solid', size: 'lg' },
    });

    const kbd = wrapper.find('kbd');
    expect(kbd.exists()).toBe(true);
    expectNoThemeClasses(kbd.attributes('class'));
    expect(classTokens(kbd.attributes('class'))).toEqual([]);
  });

  it('applies only the user class', async () => {
    const wrapper = await mountSuspended(Kbd, {
      props: { value: 'meta', class: 'my-kbd' },
    });

    expect(classTokens(wrapper.find('kbd').attributes('class'))).toEqual(['my-kbd']);
  });
});
