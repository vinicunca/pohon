// @unocss-include
export const themePopover = {
  slots: {
    content: 'bg-background shadow-lg rounded-md ring ring-ring data-[state=open]:animate-[scale-in_100ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto',
    arrow: 'fill-bg stroke-default'
  }
};
