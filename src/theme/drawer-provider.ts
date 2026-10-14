import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'relative isolate',
    background: 'absolute inset-0 bg-background-inverted',
    content: 'relative',
  },
  variants: {
    scale: {
      true: {
        content: ['pohon-drawer-indent bg-background overflow-hidden', options.theme.transitions && 'pohon-drawer-indent-transition'],
      },
    },
  },
});
