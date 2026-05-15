import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Popover from '../../src/runtime/components/Popover.vue';
import { renderEach } from '../component-render';

describe('popover', () => {
  const props = { open: true, portal: false };

  renderEach(Popover, [
    // Props
    ['with open', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with class', { props: { ...props, class: 'shadow-xl' } }],
    ['with ui', { props: { ...props, ui: { content: 'shadow-xl' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with anchor slot', { props, slots: { anchor: () => 'Anchor slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Popover, {
      props: {
        open: true,
        portal: false,
        arrow: true,

      },
      slots: {
        default: () => 'Default Slot',
        content: () => 'Content Slot',
        anchor: () => 'Anchor Slot',
      },
    });

    expect(await axe(wrapper.element, {
      rules: {
        // Akar does not handle nor check for aria-dialog-name in their tests either
        // https://github.com/vinicunca/akar/blob/main/packages/core/src/Popover/Popover.test.ts
        'aria-dialog-name': {
          enabled: false,
        },
      },
    })).toHaveNoViolations();
  });
});
