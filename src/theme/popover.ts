export default {
  slots: {
    content: 'bg-background shadow-lg rounded-md ring ring-ring data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--akar-popover-content-transform-origin) focus:outline-none pointer-events-auto',
    arrow: 'fill-bg stroke-default',
  },
};
