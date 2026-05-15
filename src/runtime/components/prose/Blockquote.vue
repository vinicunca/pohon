<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/blockquote';

type ProseBlockquote = ComponentConfig<typeof theme, AppConfig, 'blockquote', 'ui.prose'>;

export interface ProseBlockquoteProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseBlockquoteSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseBlockquoteProps>();

defineSlots<ProseBlockquoteSlots>();

const props = useComponentProps('prose.blockquote', _props);

const appConfig = useAppConfig() as ProseBlockquote['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.blockquote || {}) }));
</script>

<template>
  <blockquote :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </blockquote>
</template>
