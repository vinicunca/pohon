import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    list: '',
    item: 'relative',
    link: 'group text-sm flex items-center gap-1.5 py-1 rounded-sm outline-primary/25 focus-visible:outline-3',
    linkLeading: 'rounded-md p-1 inline-flex ring-inset ring',
    linkLeadingIcon: 'size-4 shrink-0',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'size-3 absolute top-0 text-dimmed',
  },
  variants: {
    active: {
      true: {
        link: 'text-primary font-600',
        linkLeading: 'bg-primary ring-primary color-text-inverted',
      },
      false: {
        link: ['text-muted hover:color-text font-medium', options.theme.transitions && 'transition-colors'],
        linkLeading: ['bg-background-elevated/50 ring-ring-accented text-dimmed group-hover:bg-primary group-hover:ring-primary group-hover:color-text-inverted', options.theme.transitions && 'transition'],
      },
    },
  },
});
