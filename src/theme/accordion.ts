export default {
  slots: {
    root: 'w-full',
    item: 'border-b border-border last:border-b-0',
    header: 'flex',
    trigger: 'group flex-1 flex items-center gap-1.5 font-500 text-sm py-3.5 outline-primary/25 focus-visible:outline-3 min-w-0 rounded-md',
    content: 'focus:outline-none data-[state=closed]:overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    body: 'text-sm pb-3.5',
    leadingIcon: 'shrink-0 size-5',
    trailingIcon: 'ms-auto shrink-0 size-5 transition-transform-280 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none',
    label: 'text-start break-words',
  },
  variants: {
    disabled: {
      true: {
        trigger: 'cursor-not-allowed opacity-75',
      },
    },
  },
};
