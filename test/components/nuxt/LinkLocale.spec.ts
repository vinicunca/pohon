import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { h, onUnmounted } from 'vue';
import { useNuxtApp } from '#imports';
import Button from '../../../src/runtime/components/Button.vue';
import Link from '../../../src/runtime/components/Link.vue';

function createLocalePathFallbackFixture(component: typeof Link | typeof Button) {
  return {
    setup() {
      const nuxtApp = useNuxtApp() as ReturnType<typeof useNuxtApp>;
      const originalLocalePath = nuxtApp.$localePath;

      nuxtApp.$localePath = () => '';

      onUnmounted(() => {
        nuxtApp.$localePath = originalLocalePath;
      });

      return () => h(component, { to: '/dashboard' }, () => 'Dashboard');
    },
  };
}

describe('link locale fallback', () => {
  it('falls back to the original internal path when localePath returns an empty string', async () => {
    const wrapper = await mountSuspended(createLocalePathFallbackFixture(Link));

    const link = wrapper.get('a');

    expect(link.attributes('href')).toBe('/dashboard');
    expect(link.text()).toContain('Dashboard');
  });

  it('keeps button links navigable when localePath cannot resolve the route', async () => {
    const wrapper = await mountSuspended(createLocalePathFallbackFixture(Button));

    const link = wrapper.get('a');

    expect(link.attributes('href')).toBe('/dashboard');
    expect(link.text()).toContain('Dashboard');
  });
});
