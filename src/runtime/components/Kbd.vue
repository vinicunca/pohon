<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { KbdKey } from '../composables/useKbd';
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
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useKbd } from '../composables/useKbd';
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

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.kbd || {}) }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class], color: props.color, variant: props.variant, size: props.size })">
    <slot>
      {{ getKbdKey(props.value) }}
    </slot>
  </Primitive>
</template>
