export default {
  slots: {
    root: 'py-8 hidden overflow-y-auto lg:pe-6.5 lg:ps-4 lg:max-h-[calc(100vh-var(--ui-header-height))] lg:block lg:top-$ui-header-height lg:sticky lg:-ms-4',
    container: 'relative',
    top: 'sticky -top-8 -mt-8 pointer-events-none z-1',
    topHeader: 'h-8 bg-background -mx-4 px-4',
    topBody: 'bg-background relative pointer-events-auto flex flex-col -mx-4 px-4',
    topFooter: 'px-4 h-8 from-background bg-gradient-to-b -mx-4',
  },
};
