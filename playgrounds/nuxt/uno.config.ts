import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

// @keep-sorted
export default defineConfig({

  layers: {
    'pohon': 100,
    'p-variant': 200,
  },

  outputToCssLayers: {
    allLayers: true,
  },

  presets: [
    presetVinicunca({
      extendedTheme: {
        keyframes: {
          'accordion-down': {
            from: { height: 0 },
            to: { height: 'var(--akar-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--akar-accordion-content-height)' },
            to: { height: 0 },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    }),
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

      primary: 'var(--ui-color-primary)',
      secondary: 'var(--ui-color-secondary)',
      success: 'var(--ui-color-success)',
      info: 'var(--ui-color-info)',
      warning: 'var(--ui-color-warning)',
      error: 'var(--ui-color-error)',
    },
  },

  variants: [
    (matcher) => {
      if (matcher.startsWith('pohon:')) {
        return {
          matcher: matcher.replace('pohon:', 'uno-layer-pohon:'),
        };
      }

      if (matcher.startsWith('p-variant:')) {
        return {
          matcher: matcher.replace('p-variant:', 'uno-layer-p-variant:'),
        };
      }
    },
  ],
});
