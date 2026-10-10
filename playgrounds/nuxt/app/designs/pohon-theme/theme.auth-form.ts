// @unocss-include
import type {
  PThemeAuthForm,
} from 'pohon-ui';

export const themeAuthForm = {
  slots: {
    root: 'w-full space-y-6',
    header: 'text-center flex flex-col',
    leading: 'mb-2',
    leadingIcon: 'shrink-0 size-8 inline-block',
    title: 'text-xl color-text-highlighted font-600 text-pretty',
    description: 'text-base color-text-muted mt-1 text-pretty',
    body: 'flex flex-col gap-y-6',
    providers: 'space-y-3',
    select: 'w-full',
    password: 'w-full',
    otp: 'w-full',
    input: 'w-full',
    form: 'space-y-5',
    footer: 'text-sm color-text-muted mt-2 text-center',
  },
} satisfies PThemeAuthForm;
