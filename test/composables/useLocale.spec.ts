import type { AppProps } from '../../src/runtime/components/App.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h, shallowRef } from 'vue';
import PApp from '../../src/runtime/components/App.vue';
import PButton from '../../src/runtime/components/Button.vue';
import PPagination from '../../src/runtime/components/Pagination.vue';
import { useLocale } from '../../src/runtime/composables/useLocale';
import ar from '../../src/runtime/locale/ar';
import de from '../../src/runtime/locale/de';

const teardowns: Array<() => void> = [];

afterEach(() => {
  teardowns.splice(0).forEach((fn) => {
    fn();
  });
});

async function mountDir(appProps?: Pick<AppProps, 'dir' | 'locale'>, localeOverride?: typeof ar) {
  let dir: string | undefined;

  const Probe = defineComponent({
    setup() {
      dir = useLocale(localeOverride && shallowRef(localeOverride)).dir.value;
      return () => null;
    },
  });

  const wrapper = await mountSuspended(defineComponent({
    render: () => appProps ? h(PApp, appProps, () => h(Probe)) : h(Probe),
  }));
  teardowns.push(() => wrapper.unmount());

  return dir;
}

describe('useLocale', () => {
  it('defaults to ltr without an App', async () => {
    expect(await mountDir()).toBe('ltr');
  });

  it('follows the App dir prop without a locale', async () => {
    expect(await mountDir({ dir: 'rtl' })).toBe('rtl');
  });

  it('follows the locale dir', async () => {
    expect(await mountDir({ locale: ar })).toBe('rtl');
  });

  it('lets the App dir prop override the locale dir', async () => {
    expect(await mountDir({ locale: ar, dir: 'ltr' })).toBe('ltr');
  });

  it('keeps the dir of a locale passed to useLocale without an App', async () => {
    expect(await mountDir(undefined, ar)).toBe('rtl');
  });

  it('keeps the dir of a locale passed to useLocale over the App dir prop', async () => {
    expect(await mountDir({ dir: 'ltr' }, ar)).toBe('rtl');
  });

  it('flips Pagination icons with the App dir prop and no locale', async () => {
    const wrapper = await mountSuspended(defineComponent({
      render: () => h(PApp, { dir: 'rtl' }, () => h(PPagination, { total: 100, page: 5, showEdges: true })),
    }));
    teardowns.push(() => wrapper.unmount());

    const icon = (control: string) => wrapper.findAllComponents(PButton).find((b) => b.attributes('data-slot') === control)?.props('icon');

    expect(icon('first')).toBe('i-lucide-chevrons-right');
    expect(icon('prev')).toBe('i-lucide-chevron-right');
    expect(icon('next')).toBe('i-lucide-chevron-left');
    expect(icon('last')).toBe('i-lucide-chevrons-left');
  });

  it('labels Pagination controls and pages in the App locale', async () => {
    const wrapper = await mountSuspended(defineComponent({
      render: () => h(PApp, { locale: de }, () => h(PPagination, { total: 30 })),
    }));
    teardowns.push(() => wrapper.unmount());

    expect(wrapper.findAll('button').map((button) => button.attributes('aria-label'))).toEqual([
      'Erste Seite',
      'Vorherige Seite',
      'Seite 1',
      'Seite 2',
      'Seite 3',
      'Nächste Seite',
      'Letzte Seite',
    ]);
  });
});
