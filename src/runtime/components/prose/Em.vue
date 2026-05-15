<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/em';

type ProseEm = ComponentConfig<typeof theme, AppConfig, 'em', 'ui.prose'>;

export interface ProseEmProps {
  class?: string;
  ui?: { base?: any };
}

export interface ProseEmSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseEmProps>();

defineSlots<ProseEmSlots>();

const props = useComponentProps('prose.em', _props);

const appConfig = useAppConfig() as ProseEm['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.em || {}) }));
</script>

<template>
  <em :class="ui({ class: [props.ui?.base, props.class] })"><slot /></em>
</template>
