import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Button from '../../src/runtime/components/Button.vue';
import { classTokens, expectNoThemeClasses } from './helpers';

describe('button (unstyled)', () => {
  it('renders without default theme classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { label: 'Button' },
    });

    const base = wrapper.find('[data-slot="base"]');
    const label = wrapper.find('[data-slot="label"]');

    expect(base.exists()).toBe(true);
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Button');
    expectNoThemeClasses(base.attributes('class'));
    expectNoThemeClasses(label.attributes('class'));
  });

  it('keeps structure with variant props but still has no theme classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        label: 'Button',
        color: 'error',
        variant: 'outline',
        size: 'xl',
      },
    });

    const base = wrapper.find('[data-slot="base"]');
    const label = wrapper.find('[data-slot="label"]');
    expect(base.exists()).toBe(true);
    expect(label.text()).toBe('Button');
    expectNoThemeClasses(base.attributes('class'));
    expectNoThemeClasses(label.attributes('class'));
  });

  it('applies user class on base only', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { label: 'Button', class: 'my-btn' },
    });

    expect(classTokens(wrapper.find('[data-slot="base"]').attributes('class'))).toEqual(['my-btn']);
    expectNoThemeClasses(wrapper.find('[data-slot="label"]').attributes('class'));
  });

  it('applies ui slot classes without theme defaults', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { label: 'Button', ui: { label: 'font-bold' } },
    });

    expectNoThemeClasses(wrapper.find('[data-slot="base"]').attributes('class'));
    expect(classTokens(wrapper.find('[data-slot="label"]').attributes('class'))).toEqual(['font-bold']);
  });
});
