<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { KbdKey, KbdKeySpecific } from '../composables/useKbd';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/kbd';

type Kbd = ComponentConfig<typeof theme, AppConfig, 'kbd'>;

export interface KbdProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'kbd'
   */
  as?: any;
  value?: KbdKey | string;
  /**
   * @defaultValue 'neutral'
   */
  color?: Kbd['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: Kbd['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Kbd['variants']['size'];
  class?: any;
  ui?: { base?: any };
}

export interface KbdSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig, useHead } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { kbdKeysPlatformMap, useKbd } from '../composables/useKbd';
import { uv } from '../utils/uv';

const _props = withDefaults(
  defineProps<KbdProps>(),
  {
    as: 'kbd',
  },
);
defineSlots<KbdSlots>();

const props = useComponentProps('kbd', _props);

const { getKbdKey } = useKbd();
const appConfig = useAppConfig() as Kbd['AppConfig'];

const platformKey = computed(() => props.value && Object.hasOwn(kbdKeysPlatformMap, props.value) ? kbdKeysPlatformMap[props.value as KbdKeySpecific] : undefined);

if (!import.meta.client && platformKey.value) {
  useHead({
    script: [{
      key: 'ui-kbd-macos',
      innerHTML: '/Macintosh;/.test(navigator.userAgent)&&document.documentElement.classList.add(\'ui-macos\')',
      tagPosition: 'head',
    }],
  });
}

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.kbd || {}) }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class], color: props.color, variant: props.variant, size: props.size })">
    <slot>
      <template v-if="platformKey">
        <span class="hidden in-[.ui-macos]:inline">{{ platformKey.macos }}</span>
        <span class="in-[.ui-macos]:hidden">{{ platformKey.other }}</span>
      </template>
      <template v-else>
        {{ getKbdKey(props.value) }}
      </template>
    </slot>
  </Primitive>
</template>
