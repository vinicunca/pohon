import type { ModuleOptions } from '../module';
import { defuFn } from 'defu';
import select from './select';

export default (options: Required<ModuleOptions>) => {
  return defuFn({
    slots: {
      input: 'border-b border-border',
      focusScope: 'flex flex-col min-h-0',
      viewport: 'relative scroll-py-1 overflow-y-auto flex-1',
      content: (content: string) => [content, 'max-h-[min(15rem,var(--akar-combobox-content-available-height,15rem))] origin-(--akar-combobox-content-transform-origin) w-(--akar-combobox-trigger-width)'],
      trailingClear: 'p-0',
    },
    variants: {
      virtualize: {
        true: {
          viewport: 'p-1 isolate',
        },
        false: {
          viewport: 'divide-y divide-divide',
        },
      },
    },
  }, select(options));
};
