export default {
  slots: {
    root: 'px-2.5 flex flex-1 flex-col gap-1 w-full [&>article]:last-of-type:min-h-$last-message-height',
    indicator: 'py-3 flex gap-1 h-6 items-center *:rounded-full *:bg-background-accented *:size-2 motion-safe:[&>*:nth-child(1)]:animate-bounce motion-safe:[&>*:nth-child(1)]:animate-duration-1000 motion-safe:[&>*:nth-child(1)]:animate-[bounce_1s_infinite] motion-safe:[&>*:nth-child(2)]:animate-[bounce_1s_0.15s_infinite] motion-safe:[&>*:nth-child(3)]:animate-[bounce_1s_0.3s_infinite]',
    viewport: 'inset-x-0 top-[86%] absolute data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
    autoScroll: 'rounded-full absolute right-1/2 translate-x-1/2 bottom-0',
  },
  variants: {
    compact: {
      true: '',
      false: '',
    },
  },
};
