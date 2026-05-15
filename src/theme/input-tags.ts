import type { ModuleOptions } from '../module';
import { defuFn } from 'defu';
import { fieldGroupVariant } from './field-group';
import input from './input';

export default (options: Required<ModuleOptions>) => {
  return defuFn({
    slots: {
      root: '',
      base: '',
      item: '',
      itemText: '',
      itemDelete: '',
      itemDeleteIcon: '',
      input: '',
    },
    variants: {
      ...fieldGroupVariant,
      size: {
        xs: {
          item: '',
          itemDeleteIcon: '',
        },
        sm: {
          item: '',
          itemDeleteIcon: '',
        },
        md: {
          item: '',
          itemDeleteIcon: '',
        },
        lg: {
          item: '',
          itemDeleteIcon: '',
        },
        xl: {
          item: '',
          itemDeleteIcon: '',
        },
      },
      variant: (prev: Record<string, string>) => Object.fromEntries(
        Object.entries(prev).map(([key]) => [key, '']),
      ),
    },
    compoundVariants: [],

  }, input(options));
};
