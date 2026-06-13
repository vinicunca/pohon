import type { ModuleOptions } from '../module';
import { pick } from '../runtime/utils';
import icons from '../theme/icons';

export function resolveColors(colors?: Array<string>) {
  return colors?.length
    ? [...new Set(['primary', ...colors])]
    : ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
}

export function getDefaultConfig(theme?: ModuleOptions['theme']) {
  return {
    colors: pick({
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    }, [...(theme?.colors || []), 'neutral' as any]),
    icons,
  };
}

export const defaultOptions = {
  prefix: 'P',
  fonts: true,
  colorMode: true,
  theme: {
    colors: undefined,
    transitions: true,
    unstyled: false,
    defaultVariants: {
      color: undefined,
      size: undefined,
    },
    prefix: undefined,
  },
  prose: false,
  mdc: false,
  content: false,
};
