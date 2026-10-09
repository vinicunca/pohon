export default {
  slots: {
    root: 'group flex gap-$gap [--duration:20s] [--gap:--spacing(16)] items-center relative overflow-hidden',
    content: 'flex shrink-0 gap-$gap min-w-max items-center justify-around',
  },
  variants: {
    orientation: {
      horizontal: {
        content: 'w-full',
      },
      vertical: {
        content: 'h-full',
      },
    },
    pauseOnHover: {
      true: {
        content: 'group-hover:[animation-play-state:paused]',
      },
    },
    reverse: {
      true: {
        content: '![animation-direction:reverse]',
      },
    },
    overlay: {
      true: {
        root: 'after:pointer-events-none after:content-empty after:absolute after:z-2 after:from-background after:to-transparent before:pointer-events-none before:content-empty before:absolute before:z-2 before:from-background before:to-transparent',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      class: {
        root: 'flex-row',
        content: 'flex-row motion-safe:animate-marquee motion-safe:rtl:animate-marquee backface-hidden',
      },
    },
    {
      orientation: 'horizontal',
      overlay: true,
      class: {
        root: 'backface-hidden after:h-full after:w-1/3 after:content-empty after:end-0 after:inset-y-0 after:bg-gradient-to-l before:h-full before:w-1/3 before:content-empty before:start-0 before:inset-y-0 before:bg-gradient-to-r rtl:after:bg-gradient-to-r rtl:before:bg-gradient-to-l',
      },
    },
    {
      orientation: 'vertical',
      class: {
        root: 'flex-col',
        content: 'flex-col motion-safe:animate-marquee-vertical pohon:h-fit backface-hidden',
      },
    },
    {
      orientation: 'vertical',
      overlay: true,
      class: {
        root: 'backface-hidden after:h-1/3 after:w-full after:content-empty after:inset-x-0 after:bottom-0 after:bg-gradient-to-t before:h-1/3 before:w-full before:content-empty before:inset-x-0 before:top-0 before:bg-gradient-to-b',
      },
    },
  ],
};
