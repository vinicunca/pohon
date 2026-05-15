import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PageGrid from '../../src/runtime/components/PageGrid.vue';
import { renderEach } from '../component-render';

describe('pageGrid', () => {
  renderEach(PageGrid, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'xl:grid-cols-4' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageGrid, {
      slots: {
        default: () => 'Default slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
