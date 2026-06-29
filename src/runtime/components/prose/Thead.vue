<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/thead';

type ProseThead = ComponentConfig<typeof theme, AppConfig, 'thead', 'ui.prose'>;

export interface ProseTheadProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseTheadSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseTheadProps>();

defineSlots<ProseTheadSlots>();

const props = useComponentProps('prose.thead', _props);

const appConfig = useAppConfig() as ProseThead['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.thead || {}) }));
</script>

<template>
  <thead :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </thead>
</template>
