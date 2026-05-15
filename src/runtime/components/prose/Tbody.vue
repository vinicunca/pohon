<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/tbody';

type ProseTbody = ComponentConfig<typeof theme, AppConfig, 'tbody', 'ui.prose'>;

export interface ProseTbodyProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseTbodySlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseTbodyProps>();

defineSlots<ProseTbodySlots>();

const props = useComponentProps('prose.tbody', _props);

const appConfig = useAppConfig() as ProseTbody['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.tbody || {}) }));
</script>

<template>
  <tbody :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </tbody>
</template>
