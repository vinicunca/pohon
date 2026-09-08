import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';
import { BRANDS } from './app/designs/design.constants';

// eslint-disable-next-line no-template-curly-in-string
const COLOR_PLACEHOLDER = '${color}';
const TOKEN_PATTERN = /[^\s`]+/g;

// @keep-sorted
export default defineConfig({
  extractors: [
    /**
     * In the theme files there are bunch of placeholders like ${color} that we need to extract and add to the safelist.
     */
    {
      name: 'pohon-colors-extractor',
      extract({ code }) {
        const matches = code
          .match(TOKEN_PATTERN)
          ?.filter((token) => token.includes(COLOR_PLACEHOLDER));

        if (matches !== undefined) {
          return matches.flatMap((match) => {
            return BRANDS.map((brand) => match.replace(COLOR_PLACEHOLDER, brand));
          });
        }
      },
    },
  ],

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
          'collapsible-down': {
            from: { height: 0 },
            to: { height: 'var(--akar-collapsible-content-height)' },
          },
          'collapsible-up': {
            from: { height: 'var(--akar-collapsible-content-height)' },
            to: { height: 0 },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'collapsible-down': 'collapsible-down 0.2s ease-in-out',
          'collapsible-up': 'collapsible-up 0.2s ease-in-out',
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
        DEFAULT: 'var(--ui-color-bg)',
        muted: 'var(--ui-color-bg-muted)',
        elevated: 'var(--ui-color-bg-elevated)',
        accented: 'var(--ui-color-bg-accented)',
        inverted: 'var(--ui-color-bg-inverted)',
        border: 'var(--ui-color-border)',
        header: 'var(--ui-color-bg-header)',
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
        bg: 'var(--ui-color-bg)',
        inverted: 'var(--ui-color-border-inverted)',
      },
      fill: {
        DEFAULT: 'var(--ui-color-border)',
        bg: 'var(--ui-color-bg)',
        inverted: 'var(--ui-color-border-inverted)',
      },

      primary: 'var(--ui-color-primary)',
      secondary: 'var(--ui-color-secondary)',
      success: 'var(--ui-color-success)',
      info: 'var(--ui-color-info)',
      warning: 'var(--ui-color-warning)',
      error: 'var(--ui-color-error)',
    },

    containers: {
      center: true,
      padding: {
        'DEFAULT': '1.25rem',
        'sm': '2rem',
        'lg': '2rem',
        'xl': '4rem',
        '2xl': '4rem',
      },
      maxWidth: {
        'sm': '40rem',
        'md': '48rem',
        'lg': '64rem',
        'xl': '87.5rem',
        '2xl': '100rem',
      },
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
