// @unocss-include

export default {
  slots: {
    base: 'relative text-2xl color-text-highlighted font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:color-primary [&>a>code]:text-xl/7 [&>a>code]:font-bold transition-colors [&>a>code]:transition-colors',
    leading: 'absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-background-elevated hover:color-primary rounded-md hidden lg:flex color-text-muted transition',
    leadingIcon: 'size-4 shrink-0',
    link: 'group lg:ps-2 lg:-ms-2',
  },
};
