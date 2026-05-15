import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

import { BRANDS } from './layers/themes/app/constants';

const COLOR_PATTERN = /([^\s`]*\$\{color\}[^\s`]*)/g;

const preflights: Array<Preflight> = [
  {
    layer: 'preflights',
    getCSS: () => `
      :root, :host {
        --ui-header-height: 4rem;
        --ui-radius: 0.25rem;
        --ui-container: 80rem;
      }

      :root, :host, .light {
        --ui-text-dimmed: var(--ui-color-neutral-400);
        --ui-text-muted: var(--ui-color-neutral-500);
        --ui-text-toned: var(--ui-color-neutral-600);
        --ui-text: var(--ui-color-neutral-700);
        --ui-text-highlighted: var(--ui-color-neutral-900);
        --ui-text-inverted: white;

        --ui-bg: white;
        --ui-bg-muted: var(--ui-color-neutral-50);
        --ui-bg-elevated: var(--ui-color-neutral-100);
        --ui-bg-accented: var(--ui-color-neutral-200);
        --ui-bg-inverted: var(--ui-color-neutral-900);

        --ui-border: var(--ui-color-neutral-200);
        --ui-border-muted: var(--ui-color-neutral-200);
        --ui-border-accented: var(--ui-color-neutral-300);
        --ui-border-inverted: var(--ui-color-neutral-900);
      }

      .dark {
        --ui-text-dimmed: var(--ui-color-neutral-500);
        --ui-text-muted: var(--ui-color-neutral-400);
        --ui-text-toned: var(--ui-color-neutral-300);
        --ui-text: var(--ui-color-neutral-200);
        --ui-text-highlighted: white;
        --ui-text-inverted: var(--ui-color-neutral-900);

        --ui-bg: var(--ui-color-neutral-900);
        --ui-bg-muted: var(--ui-color-neutral-800);
        --ui-bg-elevated: var(--ui-color-neutral-800);
        --ui-bg-accented: var(--ui-color-neutral-700);
        --ui-bg-inverted: white;

        --ui-border: var(--ui-color-neutral-800);
        --ui-border-muted: var(--ui-color-neutral-700);
        --ui-border-accented: var(--ui-color-neutral-700);
        --ui-border-inverted: white;
      }
    `,
  },
  {
    layer: 'base',
    getCSS: () => `
      body {
        @apply bg-background color-text scheme-light dark:scheme-dark font-sans;
      }
    `,
  },
];

export default defineConfig({
  presets: [
    presetVinicunca({
      wind4: {
        preflights: {
          theme: true,
        },
      },
    }),
  ],

  outputToCssLayers: true,

  extractors: [
    {
      name: 'pohon-colors-extractor',
      extract({ code }) {
        const matches = code.match(COLOR_PATTERN);

        if (matches !== null) {
          return matches.flatMap((match) => {
            // eslint-disable-next-line no-template-curly-in-string
            return BRANDS.map((brand) => match.replace('${color}', brand));
          });
        }
      },
    },
  ],

  preflights,

  safelist: [
    'isolate',
  ],

  theme: {
    font: {
      sans: 'Public Sans',
    },

    colors: {
      text: {
        dimmed: 'var(--ui-text-dimmed)',
        muted: 'var(--ui-text-muted)',
        toned: 'var(--ui-text-toned)',
        DEFAULT: 'var(--ui-text)',
        highlighted: 'var(--ui-text-highlighted)',
        inverted: 'var(--ui-text-inverted)',
      },
      background: {
        DEFAULT: 'var(--ui-bg)',
        muted: 'var(--ui-bg-muted)',
        elevated: 'var(--ui-bg-elevated)',
        accented: 'var(--ui-bg-accented)',
        inverted: 'var(--ui-bg-inverted)',
        border: 'var(--ui-border)',
      },
      border: {
        DEFAULT: 'var(--ui-border)',
        muted: 'var(--ui-border-muted)',
        accented: 'var(--ui-border-accented)',
        inverted: 'var(--ui-border-inverted)',
        bg: 'var(--ui-bg)',
      },
      ring: {
        DEFAULT: 'var(--ui-border)',
        muted: 'var(--ui-border-muted)',
        accented: 'var(--ui-border-accented)',
        inverted: 'var(--ui-border-inverted)',
        bg: 'var(--ui-bg)',
        offset: {
          DEFAULT: 'var(--ui-border)',
          muted: 'var(--ui-border-muted)',
          accented: 'var(--ui-border-accented)',
          inverted: 'var(--ui-border-inverted)',
          bg: 'var(--ui-bg)',
        },
      },
      divide: {
        DEFAULT: 'var(--ui-border)',
        muted: 'var(--ui-border-muted)',
        accented: 'var(--ui-border-accented)',
        inverted: 'var(--ui-border-inverted)',
      },
      outline: {
        DEFAULT: 'var(--ui-border)',
        inverted: 'var(--ui-border-inverted)',
      },
      stroke: {
        DEFAULT: 'var(--ui-border)',
        inverted: 'var(--ui-border-inverted)',
      },
      fill: {
        DEFAULT: 'var(--ui-border)',
        inverted: 'var(--ui-border-inverted)',
      },
      primary: 'var(--ui-primary)',
      secondary: 'var(--ui-secondary)',
      success: 'var(--ui-success)',
      info: 'var(--ui-info)',
      warning: 'var(--ui-warning)',
      error: 'var(--ui-error)',
    },
  },
});
