import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PageLinks from '../../src/runtime/components/PageLinks.vue';
import { renderEach } from '../component-render';

describe('pageLinks', () => {
  const links = [
    {
      label: 'Documentation',
      icon: 'i-lucide-book-open',
      to: '/docs',
    },
    {
      label: 'Playground',
      icon: 'i-simple-icons-stackblitz',
      to: 'https://stackblitz.com/edit/pohon-ui',
      target: '_blank',
    },
    {
      label: 'Roadmap',
      icon: 'i-lucide-map',
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

  renderEach(PageLinks, [
    // Props
    ['with links', { props }],
    ['with title', { props: { ...props, title: 'Resources' } }],
    ['with as', { props: { ...props, as: 'div' } }],
    ['with class', { props: { ...props, class: 'gap-1.5' } }],
    ['with ui', { props: { ...props, ui: { list: 'gap-3' } } }],
    // Slots
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-label slot', { props, slots: { 'link-label': () => 'Link label slot' } }],
    ['with link-trailing slot', { props, slots: { 'link-trailing': () => 'Link trailing slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageLinks, {
      props: {
        title: 'Resources',
        links,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
