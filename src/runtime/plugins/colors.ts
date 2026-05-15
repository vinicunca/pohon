import type { UseHeadInput } from '@unhead/vue/types';
import { colors } from '@unocss/preset-wind4/colors';
import { computed } from 'vue';
import { defineNuxtPlugin, useAppConfig, useHead, useNuxtApp } from '#imports';

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function getColor(color: keyof typeof colors, shade: typeof shades[number]): string {
  if (color in colors && typeof colors[color] === 'object' && shade in colors[color]) {
    return colors[color][shade] as string;
  }
  return '';
}

function generateShades(key: string, value: string, prefix?: string) {
  const prefixStr = prefix ? `${prefix}-` : '';
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--${prefixStr}colors-${value === 'neutral' ? 'old-neutral' : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`).join('\n  ')}`;
}
function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const nuxtApp = useNuxtApp();

  const root = computed(() => {
    const { neutral, ...colors } = appConfig.ui.colors;
    const prefix = (appConfig.ui as { prefix?: string }).prefix;

    return `@layer properties {
  :root, :host {
  ${Object.entries(appConfig.ui.colors).map(([key, value]: [string, string]) => generateShades(key, value, prefix)).join('\n  ')}
  }
  :root, :host, .light {
  ${Object.keys(colors).map((key) => generateColor(key, 500)).join('\n  ')}
  }
  .dark {
  ${Object.keys(colors).map((key) => generateColor(key, 400)).join('\n  ')}
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

    headData.script = [
      {
        innerHTML: 'document.head.removeChild(document.querySelector(\'[data-pohon-ui-colors]\'))',
      },
    ];
  }

  useHead(headData);
});
