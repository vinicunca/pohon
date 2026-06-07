import { defineConfig } from 'unocss';
import { BRANDS } from './layers/themes/app/constants';

export default defineConfig({
  outputToCssLayers: {
    allLayers: true,
  },

  presets: [
  ],

  theme: {
    font: {
      sans: 'Public Sans',
    },
  },

  safelist: [
    /**
     * In select.ts theme, we have a function that replace the `focus-visible` from input theme.
     * Therefore uno doesn't know about these dynamic classes, so we need to add them to the safelist.
     */
    () => ['focus:ring-2', 'focus:ring-inset'],
    ...BRANDS.map((brand) => `focus:ring-${brand}`),
  ],
});
