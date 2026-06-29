<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/tr';

type ProseTr = ComponentConfig<typeof theme, AppConfig, 'tr', 'ui.prose'>;

export interface ProseTrProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseTrSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseTrProps>();

defineSlots<ProseTrSlots>();

const props = useComponentProps('prose.tr', _props);

const appConfig = useAppConfig() as ProseTr['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.tr || {}) }));
</script>

<template>
  <tr :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </tr>
</template>
