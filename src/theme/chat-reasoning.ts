import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    trigger: ['group flex w-full items-center gap-1.5 color-text-muted text-sm disabled:cursor-default disabled:hover:color-text-muted hover:color-text rounded-sm outline-primary/25 focus-visible:outline-3 min-w-0', options.theme.transitions && 'transition-colors'],
    leading: 'relative size-4 shrink-0',
    leadingIcon: 'size-4 shrink-0',
    chevronIcon: 'shrink-0 size-4 transition-transform-280 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none',
    label: 'truncate',
    trailingIcon: 'shrink-0 size-4 transition-transform-280 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none',
    content: 'outline-primary/25 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down rounded-sm has-focus-visible:outline-3 data-[state=closed]:overflow-hidden',
    body: 'max-h-[200px] pt-2 overflow-y-auto text-sm color-text-dimmed whitespace-pre-wrap focus:outline-none',
  },
  variants: {
    chevron: {
      leading: {
        leadingIcon: 'group-hover:opacity-0',
      },
      trailing: '',
    },
    alone: {
      false: {
        leadingIcon: ['inset-0 absolute group-data-[state=open]:opacity-0', options.theme.transitions && 'transition-opacity-280 ease-out'],
        chevronIcon: ['opacity-0 inset-0 absolute group-data-[state=open]:opacity-100 group-hover:opacity-100', options.theme.transitions && 'transition-[transform,opacity]-280 ease-out motion-reduce:transition-none'],
      },
    },
  },
});
