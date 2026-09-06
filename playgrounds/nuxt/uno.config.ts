import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

// @keep-sorted
export default defineConfig({
  outputToCssLayers: {
    allLayers: true,
  },

  presets: [
    presetVinicunca(),
  ],

  safelist: [
    'isolate',
    'font-sans',
  ],

  theme: {
    font: {
      sans: 'Public Sans',
    },

    colors: {
      text: {
        dimmed: 'var(--ui-color-text-dimmed)',
        muted: 'var(--ui-color-text-muted)',
        toned: 'var(--ui-color-text-toned)',
        DEFAULT: 'var(--ui-color-text)',
        highlighted: 'var(--ui-color-text-highlighted)',
        inverted: 'var(--ui-color-text-inverted)',
      },
      background: {
        'DEFAULT': 'var(--ui-color-bg)',
        'muted': 'var(--ui-color-bg-muted)',
        'elevated': 'var(--ui-color-bg-elevated)',
        'accented': 'var(--ui-color-bg-accented)',
        'inverted': 'var(--ui-color-bg-inverted)',
        'border': 'var(--ui-color-border)',
        'header': 'var(--ui-color-bg-header)',
        'sidebar': 'var(--ui-color-bg-sidebar)',
        'sidebar-deep': 'var(--ui-color-bg-sidebar-deep)',
      },
      border: {
        DEFAULT: 'var(--ui-color-border)',
        muted: 'var(--ui-color-border-muted)',
        accented: 'var(--ui-color-border-accented)',
        inverted: 'var(--ui-color-border-inverted)',
        bg: 'var(--ui-color-bg)',
      },
      ring: {
        DEFAULT: 'var(--ui-color-border)',
        muted: 'var(--ui-color-border-muted)',
        accented: 'var(--ui-color-border-accented)',
        inverted: 'var(--ui-color-border-inverted)',
        bg: 'var(--ui-color-bg)',
        offset: {
          DEFAULT: 'var(--ui-color-border)',
          muted: 'var(--ui-color-border-muted)',
          accented: 'var(--ui-color-border-accented)',
          inverted: 'var(--ui-color-border-inverted)',
          bg: 'var(--ui-color-bg)',
        },
      },
      divide: {
        DEFAULT: 'var(--ui-color-border)',
        muted: 'var(--ui-color-border-muted)',
        accented: 'var(--ui-color-border-accented)',
        inverted: 'var(--ui-color-border-inverted)',
      },
      outline: {
        DEFAULT: 'var(--ui-color-border)',
        inverted: 'var(--ui-color-border-inverted)',
      },
      stroke: {
        DEFAULT: 'var(--ui-color-border)',
        inverted: 'var(--ui-color-border-inverted)',
      },
      fill: {
        DEFAULT: 'var(--ui-color-border)',
        inverted: 'var(--ui-color-border-inverted)',
      },
    },
  },
});
