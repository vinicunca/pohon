<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/li';

type ProseLi = ComponentConfig<typeof theme, AppConfig, 'li', 'ui.prose'>;

export interface ProseLiProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseLiSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseLiProps>();

defineSlots<ProseLiSlots>();

const props = useComponentProps('prose.li', _props);

const appConfig = useAppConfig() as ProseLi['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.li || {}) }));
</script>

<template>
  <li :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </li>
</template>
