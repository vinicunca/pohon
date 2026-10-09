export default {
  slots: {
    root: 'relative overflow-hidden',
    title: 'text-lg text-center font-600 color-text-highlighted',
    logos: 'mt-10',
    logo: 'size-10 shrink-0',
  },
  variants: {
    marquee: {
      false: {
        logos: 'flex shrink-0 gap-$gap [--gap:--spacing(16)] items-center justify-around',
      },
    },
  },
};
