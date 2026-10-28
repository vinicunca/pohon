import type { ModuleOptions } from '../module';

// Classes are never merged: overrides use the `pohon:` layer so they win over
// the classes they replace (the variant they override or the `PButton` defaults).
export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'group/attachment relative flex min-w-0 max-w-full w-fit shrink-0',
    leading: 'relative flex items-center justify-center shrink-0 aspect-square overflow-hidden rounded-lg bg-background-elevated color-text-muted',
    leadingIcon: 'absolute shrink-0',
    image: 'size-full object-cover',
    wrapper: 'grid grid-cols-[minmax(0,1fr)_auto] items-center min-w-0 flex-1',
    name: 'block truncate font-500 color-text-highlighted',
    description: 'block truncate row-start-2 text-xs color-text-muted',
    remove: 'shrink-0',
  },
  variants: {
    size: {
      xs: {
        root: 'gap-1.5 p-1 rounded-lg text-xs data-[orientation=vertical]:w-20 data-[variant=thumbnail]:w-10',
        leading: 'w-7 pohon:rounded-md',
        leadingIcon: 'size-3.5',
        description: 'pohon:text-[10px]/3',
      },
      sm: {
        root: 'gap-2 p-1.5 text-xs data-[orientation=vertical]:w-24 data-[variant=thumbnail]:w-12',
        leading: 'w-8',
        leadingIcon: 'size-4',
      },
      md: {
        root: 'gap-2.5 p-2 text-sm data-[orientation=vertical]:w-30 data-[variant=thumbnail]:w-14',
        leading: 'w-10',
        leadingIcon: 'size-5',
        description: 'mt-0.5',
      },
      lg: {
        root: 'gap-3 p-2.5 text-sm data-[orientation=vertical]:w-36 data-[variant=thumbnail]:w-20',
        leading: 'w-12',
        leadingIcon: 'size-6',
        description: 'mt-0.5',
      },
      xl: {
        root: 'gap-3 p-3 text-base data-[orientation=vertical]:w-44 data-[variant=thumbnail]:w-30',
        leading: 'w-14 pohon:rounded-xl',
        leadingIcon: 'size-7',
        description: 'mt-0.5 pohon:text-sm',
      },
    },
    orientation: {
      horizontal: {
        root: 'items-center pe-2.5',
        remove: 'col-start-2 row-start-1 -my-1 ms-1',
      },
      vertical: {
        root: 'flex-col',
        leading: 'pohon:w-full',
        leadingIcon: 'pohon:size-6',
        wrapper: 'px-1',
        remove: 'absolute top-3 end-3 pohon:rounded-full bg-background/75 backdrop-blur-xs',
      },
    },
    variant: {
      card: {
        root: 'pohon:rounded-xl border border-border bg-background',
      },
      thumbnail: {
        root: 'pohon:p-0',
        leading: 'pohon:w-full outline -outline-offset-1 outline-border',
        wrapper: 'contents',
        name: 'sr-only',
        description: 'sr-only',
        remove: ['absolute pohon:-top-1.5 pohon:-end-1.5 pohon:m-0 pohon:p-0 pohon:rounded-full pohon:bg-background-inverted pohon:color-text-inverted pohon:hover:bg-background-inverted/90 pohon:active:bg-background-inverted/90 ring-2 ring-background [@media(hover:hover)]:opacity-0 group-hover/attachment:opacity-100 group-focus-within/attachment:opacity-100', options.theme.transitions && 'transition-opacity ease-out'],
      },
    },
    status: {
      idle: '',
      uploading: {
        leading: 'has-data-[slot=image]:color-text-highlighted',
        leadingIcon: 'animate-spin',
        image: 'opacity-50',
      },
      error: {
        root: 'pohon:border-error/30',
        leading: 'pohon:bg-error/10 pohon:color-error pohon:outline-error/30',
        image: 'opacity-50',
        description: 'pohon:color-error',
      },
    },
  },
  compoundVariants: [
    {
      // Thumbnails keep the base `min-w-0`
      variant: 'card',
      orientation: 'horizontal',
      class: {
        root: 'pohon:min-w-40',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    status: 'idle',
    variant: 'card',
  },
});
