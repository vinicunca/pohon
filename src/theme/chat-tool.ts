import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    trigger: ['group flex w-full items-center gap-1.5 color-text-muted text-sm disabled:cursor-default disabled:hover:color-text-muted hover:color-text min-w-0', options.theme.transitions && 'transition-colors'],
    leading: 'relative size-4 shrink-0',
    leadingIcon: 'size-4 shrink-0',
    chevronIcon: 'shrink-0 size-4 transition-transform-280 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none',
    label: 'truncate',
    suffix: 'color-text-dimmed ms-1',
    trailingIcon: 'shrink-0 size-4 transition-transform-280 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none',
    content: 'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down data-[state=closed]:overflow-hidden',
    body: 'text-sm color-text-dimmed whitespace-pre-wrap',
    actions: 'flex items-center justify-end gap-1.5',
  },
  variants: {
    variant: {
      inline: {
        trigger: 'rounded-sm outline-primary/25 focus-visible:outline-3',
        body: 'pt-2',
        actions: 'pt-2',
      },
      card: {
        root: 'rounded-md ring ring-ring overflow-hidden outline-primary/25 has-focus-visible:outline-3 has-focus-visible:ring-primary',
        trigger: 'px-2 py-1 focus:outline-none',
        trailingIcon: 'ms-auto',
        body: 'border-t border-border p-2 max-h-[200px] overflow-y-auto focus:outline-none',
        actions: 'border-t border-border p-2',
      },
    },
    chevron: {
      leading: '',
      trailing: '',
    },
    loading: {
      true: {
        leadingIcon: 'animate-spin',
      },
    },
    alone: {
      false: {
        leadingIcon: ['inset-0 absolute group-data-[state=open]:opacity-0 group-hover:opacity-0', options.theme.transitions && 'transition-opacity-280 ease-out'],
        chevronIcon: ['opacity-0 inset-0 absolute group-data-[state=open]:opacity-100 group-hover:opacity-100', options.theme.transitions && 'transition-[transform,opacity]-280 ease-out motion-reduce:transition-none'],
      },
    },
  },
});
