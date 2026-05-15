import type { VinicuncaTheme } from '@vinicunca/unocss-preset';
import { presetVinicunca } from '@vinicunca/unocss-preset';
import { definePreset } from 'unocss';

const COLOR_PATTERN = /([^\s`]*\$\{color\}[^\s`]*)/g;

const BRANDS = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
  'neutral',
];

export const presetPohon = definePreset<undefined, VinicuncaTheme>(() => {
  return {
    name: 'uno-preset-pohon',

    layers: {
      'pohon': 100,
      'p-variant': 200,
    },

    extractors: [
      /**
       * In the theme files there are bunch of placeholders like ${color} that we need to extract and add to the safelist.
       */
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

    preflights: [
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
        layer: 'preflights',
        getCSS: () => `
          body {
            @apply bg-background color-text scheme-light dark:scheme-dark font-sans;
          }
        `,
      },
    ],

    safelist: [
      'isolate',
    ],

    theme: {
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

    presets: [
      presetVinicunca({
        wind4: {
          preflights: {
            theme: true,
          },
        },

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

            'toast-collapsed-closed': {
              from: { transform: 'var(--transform)' },
              to: { transform: 'translateY(calc((var(--before) - var(--height)) * var(--gap))) scale(var(--scale))' },
            },
            'toast-closed': {
              from: { transform: 'var(--transform)' },
              to: { transform: 'translateY(calc((var(--offset) - var(--height)) * var(--translate-factor)))' },
            },

            'carousel': {
              '0%, 100%': { width: '50%' },
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(200%)' },
            },

            'carousel-rtl': {
              '0%, 100%': { width: '50%' },
              '0%': { transform: 'translateX(100%)' },
              '100%': { transform: 'translateX(-200%)' },
            },

            'carousel-vertical': {
              '0%, 100%': { height: '50%' },
              '0%': { transform: 'translateY(-100%)' },
              '100%': { transform: 'translateY(200%)' },
            },

            'carousel-inverse': {
              '0%, 100%': { width: '50%' },
              '0%': { transform: 'translateX(200%)' },
              '100%': { transform: 'translateX(-100%)' },
            },

            'carousel-inverse-rtl': {
              '0%, 100%': { width: '50%' },
              '0%': { transform: 'translateX(-200%)' },
              '100%': { transform: 'translateX(100%)' },
            },

            'carousel-inverse-vertical': {
              '0%, 100%': { height: '50%' },
              '0%': { transform: 'translateY(200%)' },
              '100%': { transform: 'translateY(-100%)' },
            },

            'swing': {
              '0%, 100%': {
                width: '50%',
                transform: 'translateX(-25%)',
              },
              '50%': { transform: 'translateX(125%)' },
            },

            'swing-vertical': {
              '0%, 100%': {
                height: '50%',
                transform: 'translateY(-25%)',
              },
              '50%': { transform: 'translateY(125%)' },
            },

            'elastic': {
              /* Firefox doesn't do "margin: 0 auto", we have to play with margin-left */
              '0%, 100%': {
                'width': '50%',
                'margin-left': '25%',
              },

              '50%': {
                'width': '90%',
                'margin-left': '5%',
              },
            },

            'elastic-vertical': {
              '0%, 100%': {
                'height': '50%',
                'margin-top': '25%',
              },

              '50%': {
                'height': '90%',
                'margin-top': '5%',
              },
            },

            'marquee': {
              from: {
                transform: 'translate3d(0, 0, 0)',
              },

              to: {
                transform: 'translate3d(calc(-100% - var(--gap)), 0, 0)',
              },
            },

            'marquee-rtl': {
              from: {
                transform: 'translate3d(0, 0, 0)',
              },

              to: {
                transform: 'translate3d(calc(100% + var(--gap)), 0, 0)',
              },
            },

            'marquee-vertical': {
              from: {
                transform: 'translate3d(0, 0, 0)',
              },

              to: {
                transform: 'translate3d(0, calc(-100% - var(--gap)), 0)',
              },
            },

            'marquee-vertical-rtl': {
              from: {
                transform: 'translate3d(0, calc(-100% - var(--gap)), 0)',
              },

              to: {
                transform: 'translate3d(0, calc(-100% * var(--gap)), 0)',
              },
            },
          },

          animation: {
            'collapsible-down': 'collapsible-down 0.2s ease-in-out',
            'collapsible-up': 'collapsible-up 0.2s ease-in-out',
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',

            'toast-collapsed-closed': 'toast-collapsed-closed 200ms ease-in-out',
            'toast-closed': 'toast-closed 200ms ease-in-out',

            'carousel': 'carousel 2s ease-in-out infinite',
            'carousel-rtl': 'carousel-rtl 2s ease-in-out infinite',
            'carousel-vertical': 'carousel-vertical 2s ease-in-out infinite',
            'carousel-inverse': 'carousel-inverse 2s ease-in-out infinite',
            'carousel-inverse-rtl': 'carousel-inverse-rtl 2s ease-in-out infinite',
            'carousel-inverse-vertical': 'carousel-inverse-vertical 2s ease-in-out infinite',
            'swing': 'swing 2s ease-in-out infinite',
            'swing-vertical': 'swing-vertical 2s ease-in-out infinite',
            'elastic': 'elastic 2s ease-in-out infinite',
            'elastic-vertical': 'elastic-vertical 2s ease-in-out infinite',
            'marquee': 'marquee var(--duration) linear infinite',
            'marquee-rtl': 'marquee-rtl var(--duration) linear infinite',
            'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
            'marquee-vertical-rtl': 'marquee-vertical-rtl var(--duration) linear infinite',
          },
        },
      }),
    ],
  };
});
