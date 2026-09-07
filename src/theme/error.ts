export default {
  slots: {
    root: 'min-h-[calc(100vh-var(--ui-header-height))] flex flex-col items-center justify-center text-center',
    leading: 'mb-4 flex items-center justify-center',
    leadingIcon: 'size-10 shrink-0 text-primary',
    statusCode: 'text-base font-600 text-primary',
    statusMessage: 'mt-2 text-4xl sm:text-5xl font-bold color-text-highlighted text-balance',
    message: 'mt-4 text-lg color-text-muted text-balance',
    links: 'mt-8 flex items-center justify-center gap-6',
  },
};
