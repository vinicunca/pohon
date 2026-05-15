import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import FooterColumns from '../../src/runtime/components/FooterColumns.vue';
import { renderEach } from '../component-render';

describe('footerColumns', () => {
  const columns = [
    {
      label: 'Community',
      children: [{
        label: 'Nuxters',
        to: 'https://nuxters.nuxt.com',
        target: '_blank',
        icon: 'i-lucide-users',
      }, {
        label: 'Nuxt on GitHub',
        to: 'https://github.com/nuxt',
        target: '_blank',
      }, {
        label: 'Documentation',
      }, {
        label: 'Design Kit',
      }],
    },
    {
      label: 'Enterprise',
      children: [{
        label: 'Support',
      }, {
        label: 'Agencies',
      }, {
        label: 'Jobs',
      }, {
        label: 'Sponsors',
      }],
    },
    {
      label: 'Solutions',
      children: [{
        label: 'Nuxt Content',
        to: 'https://content.nuxt.com/',
        target: '_blank',
      }, {
        label: 'Nuxt DevTools',
        to: 'https://devtools.nuxt.com/',
        target: '_blank',
      }, {
        label: 'Nuxt Image',
        to: 'https://image.nuxt.com/',
        target: '_blank',
      }, {
        label: 'Pohon UI',
        to: 'https://pohon.vinicunca.dev/',
        target: '_blank',
      }],
    },
  ];

  const props = { columns };

  renderEach(FooterColumns, [
    // Props
    ['with columns', { props }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'px-10' } }],
    ['with ui', { props: { ...props, ui: { list: 'lg:gap-1.5' } } }],
    // Slots
    ['with left slot', { props, slots: { left: () => 'Left slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with right slot', { props, slots: { right: () => 'Right slot' } }],
    ['with column-label slot', { props, slots: { 'column-label': () => 'Column label slot' } }],
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-label slot', { props, slots: { 'link-label': () => 'Link label slot' } }],
    ['with link-trailing slot', { props, slots: { 'link-trailing': () => 'Link trailing slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(FooterColumns, {
      props,
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
