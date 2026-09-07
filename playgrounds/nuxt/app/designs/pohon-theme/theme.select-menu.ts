// @unocss-include
import { defuFn } from 'defu'
import { themeSelect } from './theme.select';
export const themeSelectMenu = defuFn({
    slots: {
      input: 'border-b border-border',
      focusScope: 'flex flex-col min-h-0',
      viewport: 'relative scroll-py-1 overflow-y-auto flex-1',
      content: (content: string) => [content, 'max-h-[min(15rem,var(--reka-combobox-content-available-height,15rem))] origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)'],
      trailingClear: 'p-0'
    },
    variants: {
      virtualize: {
        true: {
          viewport: 'p-1 isolate'
        },
        false: {
          viewport: 'divide-y divide-divide'
        }
      }
    }
  }, themeSelect);
