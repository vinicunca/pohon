import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    trigger: ['group flex w-full items-center gap-1.5 color-text-muted text-sm disabled:cursor-default disabled:hover:color-text-muted hover:color-text min-w-0', options.theme.transitions && 'transition-colors'],
    leading: 'relative size-4 shrink-0',
    leadingIcon: 'size-4 shrink-0',
    chevronIcon: 'size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-280',
    label: 'truncate',
    suffix: 'color-text-dimmed ms-1',
    trailingIcon: 'size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-280',
    content: 'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=closed]:overflow-hidden',
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
        leadingIcon: ['absolute inset-0 group-hover:opacity-0 group-data-[state=open]:opacity-0', options.theme.transitions && 'transition-opacity duration-280'],
        chevronIcon: ['absolute inset-0 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100', options.theme.transitions && 'transition-[rotate,opacity] duration-280'],
      },
    },
  },
});
