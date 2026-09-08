import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import theme from '#build/ui/avatar';
import Avatar from '../../src/runtime/components/Avatar.vue';
import { renderEach } from '../component-render';

describe('avatar', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const colors = Object.keys(theme.variants.color) as any;

  renderEach(Avatar, [
    // Props
    ['with src', { props: { src: 'https://github.com/praburangki.png' } }],
    ['with alt', { props: { alt: 'praburangki' } }],
    ['with text', { props: { text: '+1' } }],
    ['with icon', { props: { icon: 'i-lucide-image' } }],
    ['with chip', { props: { chip: { text: '1' } } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { src: 'https://github.com/praburangki.png', size } }]),
    ...colors.map((color: string) => [`with color ${color}`, { props: { alt: 'praburangki', color } }]),
    ['with as', { props: { as: 'section' } }],
    ['with as (object)', { props: { src: 'https://github.com/praburangki.png', as: { root: 'section', img: 'p' } } }],
    ['with as (partial object)', { props: { src: 'https://github.com/praburangki.png', as: { img: 'p' } } }],
    ['with class', { props: { class: 'bg-background' } }],
    ['with ui', { props: { ui: { fallback: 'font-700' } } }],
    ['with custom size', { props: { class: 'size-100', src: 'https://github.com/praburangki.png' } }],
    // Slots
    ['with default slot', { slots: { default: '🇫🇷' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        alt: 'praburangki',
        src: 'https://github.com/praburangki.png',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
