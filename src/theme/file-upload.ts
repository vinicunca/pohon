import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    base: '',
    wrapper: '',
    icon: '',
    avatar: '',
    label: '',
    description: '',
    actions: '',
    files: '',
    file: '',
    fileLeadingAvatar: '',
    fileWrapper: '',
    fileName: '',
    fileSize: '',
    fileTrailingButton: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      area: {
        wrapper: '',
        base: '',
      },
      button: {
      },
    },
    size: {
      xs: {
        base: '',
        icon: '',
        file: '',
        fileWrapper: '',
      },
      sm: {
        base: '',
        icon: '',
        file: '',
        fileWrapper: '',
      },
      md: {
        base: '',
        icon: '',
        file: '',
      },
      lg: {
        base: '',
        icon: '',
        file: '',
        fileSize: '',
      },
      xl: {
        base: '',
        icon: '',
        file: '',
      },
    },
    layout: {
      list: {
        root: '',
        files: '',
        file: '',
        fileTrailingButton: '',
      },
      grid: {
        fileWrapper: '',
        fileLeadingAvatar: '',
        fileTrailingButton: '',
      },
    },
    position: {
      inside: '',
      outside: '',
    },
    dropzone: {
      true: '',
    },
    interactive: {
      true: '',
    },
    highlight: {
      true: '',
    },
    multiple: {
      true: '',
    },
    disabled: {
      true: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    color: 'primary',
    variant: 'area',
    size: 'md',
  },
});
