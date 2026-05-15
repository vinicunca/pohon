import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import theme from '#build/ui/user';
import User from '../../src/runtime/components/User.vue';
import { renderEach } from '../component-render';

describe('user', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const orientations = Object.keys(theme.variants.orientation) as any;

  const props = {
    name: 'Benjamin Canac',
    description: 'Software Engineer',
    avatar: { src: 'https://github.com/benjamincanac.png', alt: 'User avatar' },
  };

  renderEach(User, [
    // Props
    ['with name', { props: { name: props.name } }],
    ['with description', { props: { name: props.name, description: props.description } }],
    ['with to', { props: { ...props, to: 'https://github.com/benjamincanac' } }],
    ['with avatar', { props }],
    ['with chip', { props: { ...props, chip: { color: 'success' } } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { ...props, orientation } }]),
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with ui', { props: { ...props, ui: { name: 'font-bold' } } }],
    // Slots
    ['with avatar slot', { props, slots: { avatar: () => 'Avatar slot' } }],
    ['with name slot', { props, slots: { name: () => 'Name slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(User, {
      props: {
        ...props,
        to: 'https://github.com/benjamincanac',
        chip: { color: 'info' },
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
