import type { ModuleOptions } from '../module';

// Highlight the prompt like a focused input when the text surface (native textarea or editor's contenteditable) is focused, without reacting to header/footer controls.
function focusHighlight(utilities: string) {
  return ['textarea', '[contenteditable]']
    .flatMap((element) => utilities.split(' ').map((utility) => `has-[${element}:focus-visible]:${utility}`))
    .join(' ');
}

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'relative flex flex-col items-stretch gap-2 px-2.5 py-2 w-full rounded-lg isolate before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-sm mt-$chat-prompt-queue-height',
    header: 'flex items-center gap-1.5',
    files: 'flex flex-wrap items-center gap-1.5 mt-0.5',
    queue: 'absolute bottom-full inset-x-2.5 z-10 flex flex-col px-1 rounded-t-lg border border-b-0 border-border bg-background-elevated/50 backdrop-blur-sm overflow-hidden',
    queueTrigger: 'flex items-center gap-1.5 w-full p-1.5 text-xs font-500 color-text-muted hover:color-text focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-inverted rounded-md',
    queueTriggerIcon: ['shrink-0 size-4 data-[state=open]:rotate-180', options.theme.transitions && 'transition-transform duration-200 ease-out motion-reduce:transition-none'],
    queueCount: 'color-text-dimmed tabular-nums',
    queueList: 'flex flex-col max-h-60 overflow-y-auto pb-1',
    queueItem: 'group/queue flex items-center gap-2 h-7 ps-2 pe-0.5 rounded-sm hover:bg-background-elevated',
    queueItemLeading: 'shrink-0 size-3 rounded-full ring ring-border-accented',
    queueItemLabel: 'flex-1 min-w-0 truncate text-sm color-text',
    queueItemActions: ['flex items-center shrink-0 [@media(hover:hover)]:opacity-0 group-hover/queue:opacity-100 group-focus-within/queue:opacity-100', options.theme.transitions && 'transition-opacity ease-out'],
    body: 'items-start gap-1.5',
    footer: 'flex items-center justify-between gap-1.5',
    base: 'px-0 rounded-none',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      outline: {
        root: 'bg-background/75 ring ring-border',
        queue: 'pohon:bottom-[calc(100%+1px)]',
      },
      soft: {
        root: 'bg-background-elevated/50',
        queue: 'pohon:border-0',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring ring-border',
        queue: 'pohon:bottom-[calc(100%+1px)]',
      },
      naked: {
        root: '',
      },
    },
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: ['outline', 'subtle'],
      class: { root: `outline-${color}/25 ${focusHighlight(`outline-3 ring-${color}`)}` },
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: 'soft',
      class: { root: `outline-${color}/25 ${focusHighlight('outline-3')}` },
    })),
    {
      color: 'neutral',
      variant: ['outline', 'subtle'],
      class: { root: `outline-border-inverted/25 ${focusHighlight('outline-3 ring-border-inverted')}` },
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: { root: `outline-border-inverted/25 ${focusHighlight('outline-3')}` },
    },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'outline',
  },
});
