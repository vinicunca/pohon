import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Container from '../../src/runtime/components/Container.vue';
import { renderEach } from '../component-render';

describe('container', () => {
  renderEach(Container, [
    // Props
    ['with as', { props: { as: 'article' } }],
    ['with class', { props: { class: 'max-w-5xl' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Container);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
