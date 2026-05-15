import type { ModuleOptions } from '../module';
import { defuFn } from 'defu';
import select from './select';

export default (options: Required<ModuleOptions>) => {
  return defuFn(
    {
      slots: {
        input: '',
        focusScope: '',
        viewport: '',
        content: '',
        trailingClear: '',
      },
      variants: {
        virtualize: {
          true: {
            viewport: '',
          },
          false: {
            viewport: '',
          },
        },
      },
      compoundVariants: [],

    },
    select(options),
  );
};
