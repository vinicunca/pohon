import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PageAnchors from '../../src/runtime/components/PageAnchors.vue';
import { renderEach } from '../component-render';

describe('pageAnchors', () => {
  const links = [
    {
      label: 'Documentation',
      icon: 'i-lucide-book-open',
      to: '/docs',
    },
    {
      label: 'Playground',
      icon: 'i-simple-icons-stackblitz',
      to: '/playground',
    },
    {
      label: 'Roadmap',
      icon: 'i-lucide-map',
      to: '/roadmap',
      active: true,
    },
    {
      label: 'Releases',
      icon: 'i-lucide-rocket',
      to: 'https://github.com/vinicunca/pohon/releases',
      target: '_blank',
    },
  ];

  const props = { links };

  renderEach(PageAnchors, [
    // Props
    ['with links', { props }],
    ['with as', { props: { ...props, as: 'div' } }],
    ['with class', { props: { ...props, class: 'lg:mb-12' } }],
    ['with ui', { props: { ...props, ui: { list: 'gap-6' } } }],
    // Slots
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-label slot', { props, slots: { 'link-label': () => 'Link label slot' } }],
    ['with link-trailing slot', { props, slots: { 'link-trailing': () => 'Link trailing slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageAnchors, {
      props: {
        links,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
