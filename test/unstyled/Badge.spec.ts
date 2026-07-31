import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Badge from '../../src/runtime/components/Badge.vue';
import { classTokens, expectNoThemeClasses } from './helpers';

describe('badge (unstyled)', () => {
  it('renders without default theme classes', async () => {
    const wrapper = await mountSuspended(Badge, {
      props: { label: 'Badge' },
    });

    const base = wrapper.find('[data-slot="base"]');
    const label = wrapper.find('[data-slot="label"]');

    expect(base.exists()).toBe(true);
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Badge');
    expectNoThemeClasses(base.attributes('class'));
    expectNoThemeClasses(label.attributes('class'));
  });

  it('keeps structure with variant props but still has no theme classes', async () => {
    const wrapper = await mountSuspended(Badge, {
      props: {
        label: 'Badge',
        color: 'error',
        variant: 'outline',
        size: 'xl',
      },
    });

    const base = wrapper.find('[data-slot="base"]');
    const label = wrapper.find('[data-slot="label"]');
    expect(base.exists()).toBe(true);
    expect(label.text()).toBe('Badge');
    expectNoThemeClasses(base.attributes('class'));
    expectNoThemeClasses(label.attributes('class'));
  });

  it('applies user class on base only', async () => {
    const wrapper = await mountSuspended(Badge, {
      props: { label: 'Badge', class: 'my-badge' },
    });

    expect(classTokens(wrapper.find('[data-slot="base"]').attributes('class'))).toEqual(['my-badge']);
    expectNoThemeClasses(wrapper.find('[data-slot="label"]').attributes('class'));
  });

  it('applies ui slot classes without theme defaults', async () => {
    const wrapper = await mountSuspended(Badge, {
      props: { label: 'Badge', ui: { label: 'font-bold' } },
    });

    expectNoThemeClasses(wrapper.find('[data-slot="base"]').attributes('class'));
    expect(classTokens(wrapper.find('[data-slot="label"]').attributes('class'))).toEqual(['font-bold']);
  });
});
