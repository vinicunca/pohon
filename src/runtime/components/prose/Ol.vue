<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/ol';

type ProseOl = ComponentConfig<typeof theme, AppConfig, 'ol', 'ui.prose'>;

export interface ProseOlProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseOlSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseOlProps>();

defineSlots<ProseOlSlots>();

const props = useComponentProps('prose.ol', _props);

const appConfig = useAppConfig() as ProseOl['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.ol || {}) }));
</script>

<template>
  <ol :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </ol>
</template>
