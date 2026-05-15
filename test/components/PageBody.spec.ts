import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PageBody from '../../src/runtime/components/PageBody.vue';
import { renderEach } from '../component-render';

describe('pageBody', () => {
  renderEach(PageBody, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'mt-12' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageBody, {
      slots: {
        default: () => 'Default slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
