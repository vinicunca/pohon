<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/kbd';

type ProseKbd = ComponentConfig<typeof theme, AppConfig, 'kbd', 'ui.prose'>;

export interface ProseKbdProps {
  value?: string;
  class?: any;
  ui?: { base?: any };
}

export interface ProseKbdSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PKbd from '../Kbd.vue';

const _props = defineProps<ProseKbdProps>();
defineSlots<ProseKbdSlots>();

const props = useComponentProps('prose.kbd', _props);

const appConfig = useAppConfig() as ProseKbd['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.kbd || {}) }));
</script>

<template>
  <PKbd :value="props.value" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </PKbd>
</template>
