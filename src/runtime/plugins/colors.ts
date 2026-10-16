import type { UseHeadInput } from '@unhead/vue/types';
import { colors } from '@unocss/preset-wind4/colors';
import { computed } from 'vue';
import { defineNuxtPlugin, injectHead, useAppConfig, useHead, useNuxtApp } from '#imports';

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function getColor(color: keyof typeof colors, shade: typeof shades[number]): string {
  if (color in colors && typeof colors[color] === 'object' && shade in colors[color]) {
    return colors[color][shade] as string;
  }
  return '';
}

function generateShades(key: string, value: string, prefix?: string) {
  const prefixStr = prefix ? `${prefix}-` : '';
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--${prefixStr}color-${value === 'neutral' ? 'old-neutral' : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`).join('\n  ')}`;
}
function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}

function removeTemporaryColorsStyle() {
  document.querySelector('[data-pohon-ui-colors]')?.remove();
}

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const nuxtApp = useNuxtApp();

  const root = computed(() => {
    const { neutral, ...colors } = appConfig.ui.colors;
    const prefix = (appConfig.ui as { prefix?: string }).prefix;

    return `@layer theme {
  :root, :host {
  ${Object.entries(appConfig.ui.colors).map(([key, value]: [string, string]) => generateShades(key, value, prefix)).join('\n  ')}
  }
  :root, :host, .light {
  ${Object.keys(colors).map((key) => generateColor(key, 500)).join('\n  ')}
  --ui-chart-1: var(--ui-primary);
  --ui-chart-2: var(--color-blue-500, oklch(62.3% 0.214 259.815));
  --ui-chart-3: var(--color-violet-500, oklch(60.6% 0.25 292.717));
  --ui-chart-4: var(--color-amber-500, oklch(76.9% 0.188 70.08));
  --ui-chart-5: var(--color-rose-500, oklch(64.5% 0.246 16.439));
  --ui-chart-6: var(--color-cyan-500, oklch(71.5% 0.143 215.221));
  }
  .dark {
  ${Object.keys(colors).map((key) => generateColor(key, 400)).join('\n  ')}
  --ui-chart-1: var(--ui-primary);
  --ui-chart-2: var(--color-blue-400, oklch(70.7% 0.165 254.624));
  --ui-chart-3: var(--color-violet-400, oklch(70.2% 0.183 293.541));
  --ui-chart-4: var(--color-amber-400, oklch(82.8% 0.189 84.429));
  --ui-chart-5: var(--color-rose-400, oklch(71.2% 0.194 13.428));
  --ui-chart-6: var(--color-cyan-400, oklch(78.9% 0.154 211.53));
  }
}`;
  });

  // Head
  const headData: UseHeadInput = {
    style: [{
      innerHTML: root,
      tagPriority: 'critical',
      id: 'pohon-ui-colors',
    }],
  };

  // SPA mode
  if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style');

    style.innerHTML = root.value;
    style.setAttribute('data-pohon-ui-colors', '');
    document.head.appendChild(style);

    // `hookOnce` is only available on unhead v2's `Hookable`. In v3 `hooks` is a `HookableCore`
    // that exposes `hook` only, so self-unhook to keep the once semantics across both versions.
    const head = injectHead();
    const unhook = head.hooks?.hook('dom:rendered', () => {
      removeTemporaryColorsStyle();
      unhook?.();
    });
  }

  useHead(headData);
});
