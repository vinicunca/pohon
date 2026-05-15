import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PageColumns from '../../src/runtime/components/PageColumns.vue';
import { renderEach } from '../component-render';

describe('pageColumns', () => {
  renderEach(PageColumns, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'xl:columns-4' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageColumns, {
      slots: {
        default: () => 'Default slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
